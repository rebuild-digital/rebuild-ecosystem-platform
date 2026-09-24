"use server";

import { Client } from "@notionhq/client";
import * as fs from "node:fs";
import * as path from "node:path";
import { getDb } from "../server/db";
import { listPublishedPlatforms } from "../server/db/directory";
import { dailyOrder } from "../lib/dailyOrder";

// Imports stay relative: this module is also bundled into the Nitro boot
// plugin (warmDataCaches.ts), where "~" is the project root (ADR 0001).

const CACHE_FILE = path.join(process.cwd(), ".cache/builders.json");
const MEMORY_TTL = 5 * 60 * 1000;

let memCache: { data: Builder[]; ts: number } | null = null;
let pendingRefresh: Promise<Builder[]> | null = null;

/** A published directory entry, public fields only. */
export interface Builder {
  id: string;
  name: string;
  description: string;
  link: string;
  category: string[];
  country: string[];
}

function readFileCache(): Builder[] | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    }
  } catch {
    // cache unreadable
  }
  return null;
}

function writeFileCache(data: Builder[]) {
  try {
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch {
    // cache write failed, non-fatal
  }
}

async function fetchFromNotion(): Promise<Builder[]> {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_BUILDERS_DB_ID;

  if (!token || !dbId) {
    throw new Error("Notion credentials not configured");
  }

  const notion = new Client({ auth: token });
  const database = await notion.databases.retrieve({ database_id: dbId });
  const dataSourceId = (database as any).data_sources?.[0]?.id;

  if (!dataSourceId) {
    throw new Error("No data source found in database");
  }

  let allResults: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const queryOptions: any = {
      data_source_id: dataSourceId,
      filter: {
        property: "PUBLISHED?",
        checkbox: { equals: true },
      },
      page_size: 100,
    };
    if (startCursor) queryOptions.start_cursor = startCursor;

    const response = await (notion as any).dataSources.query(queryOptions);
    allResults = allResults.concat(response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }

  const data: Builder[] = allResults.map((page: any) => ({
    id: page.id,
    name: page.properties.Name?.title[0]?.plain_text || "Untitled",
    description:
      page.properties.DESCRIPTION?.rich_text[0]?.plain_text || "",
    link: page.properties.WEBSITE?.url || "",
    category:
      page.properties.CATEGORY?.multi_select?.map((t: any) => t.name) ||
      [],
    country:
      page.properties.COUNTRY?.multi_select?.map((t: any) => t.name) ||
      [],
  }));

  // The file cache holds the unshuffled list; dailyOrder() runs on every read.
  writeFileCache(data);
  const shuffled = dailyOrder(data);
  memCache = { data: shuffled, ts: Date.now() };
  console.log(`Fetched ${data.length} platforms from the directory.`);
  return shuffled;
}

function refreshInBackground() {
  if (pendingRefresh) return;
  pendingRefresh = fetchFromNotion()
    .catch((err) => {
      console.warn("Background builder refresh failed:", err.message);
      return memCache?.data ?? [];
    })
    .finally(() => {
      pendingRefresh = null;
    });
}

/**
 * The directory, from the source DIRECTORY_SOURCE selects (plan §2.4).
 * "postgres" reads the migrated data; anything else keeps Notion. If
 * Postgres fails or has no published platforms, it falls back to Notion,
 * so a bad deploy or a missed import can't empty the directory.
 */
export async function getBuilders(): Promise<Builder[]> {
  if (process.env.DIRECTORY_SOURCE === "postgres") {
    try {
      const builders = await getBuildersFromPostgres();
      if (builders.length > 0) return builders;
      console.warn("[directory] Postgres has no published platforms; using Notion.");
    } catch (err) {
      console.error("[directory] Postgres read failed; using Notion:", err);
    }
  }
  return getBuildersFromNotion();
}

async function getBuildersFromPostgres(): Promise<Builder[]> {
  const rows = await listPublishedPlatforms(getDb());
  return dailyOrder(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description ?? "",
      link: r.website ?? "",
      category: r.categories,
      country: r.country ? [r.country] : [],
    })),
  );
}

/** Notion, behind a memory + file cache. Also warmed at boot as the fallback. */
export async function getBuildersFromNotion(): Promise<Builder[]> {
  if (memCache && Date.now() - memCache.ts < MEMORY_TTL) {
    return memCache.data;
  }

  const fileCached = readFileCache();
  if (fileCached && fileCached.length > 0) {
    const shuffled = dailyOrder(fileCached);
    memCache = { data: shuffled, ts: Date.now() };
    refreshInBackground();
    return shuffled;
  }

  if (pendingRefresh) return pendingRefresh;

  try {
    pendingRefresh = fetchFromNotion();
    return await pendingRefresh;
  } catch (error: any) {
    console.error("Notion API failed:", error.message);
    return [];
  } finally {
    pendingRefresh = null;
  }
}

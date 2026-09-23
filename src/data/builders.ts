"use server";

import { Client } from "@notionhq/client";
import * as fs from "node:fs";
import * as path from "node:path";
import { dailyOrder } from "~/lib/dailyOrder";

const CACHE_FILE = path.join(process.cwd(), ".cache/builders.json");
const MEMORY_TTL = 5 * 60 * 1000;

let memCache: { data: Builder[]; ts: number } | null = null;
let pendingRefresh: Promise<Builder[]> | null = null;

export interface Builder {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
  category: string[];
  stage: string;
  country: string[];
  yearFounded: number | null;
  published: boolean;
  order: number;
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
    imageUrl:
      page.properties.Image?.files[0]?.file?.url ||
      page.properties.Image?.files[0]?.external?.url ||
      "",
    link: page.properties.WEBSITE?.url || "",
    tags:
      page.properties.TAGS?.multi_select?.map((t: any) => t.name) || [],
    category:
      page.properties.CATEGORY?.multi_select?.map((t: any) => t.name) ||
      [],
    stage: page.properties.STAGE?.select?.name || "",
    country:
      page.properties.COUNTRY?.multi_select?.map((t: any) => t.name) ||
      [],
    yearFounded: page.properties["YEAR FOUNDED"]?.number || null,
    published: page.properties["PUBLISHED?"]?.checkbox || false,
    order: page.properties.Order?.number || 999,
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

export async function getBuilders(): Promise<Builder[]> {
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

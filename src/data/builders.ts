"use server";

import { Client } from "@notionhq/client";
import * as fs from "node:fs";
import * as path from "node:path";

const CACHE_FILE = path.join(process.cwd(), ".cache/builders.json");

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

function readCache(): Builder[] | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    }
  } catch {
    // cache unreadable
  }
  return null;
}

function writeCache(data: Builder[]) {
  try {
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch {
    // cache write failed, non-fatal
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getBuilders(): Promise<Builder[]> {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_BUILDERS_DB_ID;

  if (!token || !dbId) {
    console.warn(
      "Notion credentials not found, using cached builders data if available."
    );
    return readCache() ?? [];
  }

  const notion = new Client({ auth: token });

  try {
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

    const shuffled = shuffle(data);
    writeCache(shuffled);
    console.log(`Fetched ${data.length} platforms from the directory.`);
    return shuffled;
  } catch (error: any) {
    console.error("Notion API failed:", error.message);
    console.warn("Attempting to use cached data...");
    return readCache() ?? [];
  }
}

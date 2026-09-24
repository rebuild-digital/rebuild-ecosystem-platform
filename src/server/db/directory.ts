import { eq, sql } from "drizzle-orm";
import type { Db } from "./index";
import * as schema from "./schema";

const { categories, platformCategories, platforms, publicPlatformColumns } = schema;

/**
 * The public directory (plan §2.4): published platforms, [public] columns
 * only, with category names in their Notion order.
 */
export async function listPublishedPlatforms(db: Db) {
  return db
    .select({
      ...publicPlatformColumns,
      categories: sql<string[]>`coalesce(
        array_agg(${categories.name} order by ${platformCategories.position})
          filter (where ${categories.name} is not null),
        '{}'
      )`,
    })
    .from(platforms)
    .leftJoin(platformCategories, eq(platformCategories.platformId, platforms.id))
    .leftJoin(categories, eq(categories.id, platformCategories.categoryId))
    .where(eq(platforms.status, "published"))
    .groupBy(platforms.id);
}

export type PublishedPlatform = Awaited<ReturnType<typeof listPublishedPlatforms>>[number];

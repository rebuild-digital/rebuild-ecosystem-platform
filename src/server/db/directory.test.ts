import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { beforeAll, describe, expect, it } from "vitest";
import { listPublishedPlatforms } from "./directory";
import { type Db, casing } from "./index";
import * as schema from "./schema";

const { categories, platformCategories, platforms } = schema;
const db = drizzle(new PGlite(), { schema, casing }) as unknown as Db;

beforeAll(async () => {
  await migrate(db as never, { migrationsFolder: "./drizzle" });
  const [a] = await db
    .insert(platforms)
    .values([
      { slug: "alpha", name: "Alpha", status: "published", website: "https://alpha.example", contactInfo: "a@example.org" },
      { slug: "beta", name: "Beta", status: "published" },
      { slug: "draft", name: "Draft", status: "draft" },
    ])
    .returning();
  const [video, messaging] = await db
    .insert(categories)
    .values([
      { slug: "video", name: "Video" },
      { slug: "messaging", name: "Messaging" },
    ])
    .returning();
  // Chosen in Notion as Messaging, then Video: the reverse of insert order.
  await db.insert(platformCategories).values([
    { platformId: a.id, categoryId: video.id, position: 1 },
    { platformId: a.id, categoryId: messaging.id, position: 0 },
  ]);
});

describe("listPublishedPlatforms", () => {
  it("returns published platforms with public fields and categories in Notion order", async () => {
    const rows = (await listPublishedPlatforms(db)).sort((x, y) => x.name.localeCompare(y.name));

    expect(rows.map((r) => r.name)).toEqual(["Alpha", "Beta"]);
    expect(rows[0].categories).toEqual(["Messaging", "Video"]);
    expect(rows[1].categories).toEqual([]);
    expect(Object.keys(rows[0]).sort()).toEqual(
      ["categories", "country", "description", "foundingYear", "id", "logoUrl", "name", "slug", "stage", "website"].sort(),
    );
    expect(JSON.stringify(rows)).not.toContain("a@example.org");
  });
});

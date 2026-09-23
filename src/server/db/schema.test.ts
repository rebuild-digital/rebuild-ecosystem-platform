import { PGlite } from "@electric-sql/pglite";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { beforeAll, describe, expect, it } from "vitest";
import { casing } from "./index";
import * as schema from "./schema";

const { categories, platformCategories, platforms, publicPlatformColumns } = schema;

// In-process Postgres (PGlite) running the real migrations from drizzle/.
const db = drizzle(new PGlite(), { schema, casing });

beforeAll(async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
});

describe("platforms schema", () => {
  it("public selects never include internal columns", async () => {
    const [published] = await db
      .insert(platforms)
      .values({
        slug: "open-platform",
        name: "Open Platform",
        status: "published",
        priority: "top",
        contactName: "Secret Contact",
        contactInfo: "secret@example.org",
        notes: "internal note",
        enrichment: { "Total Capital Raised": 1_000_000 },
      })
      .returning({ id: platforms.id });
    await db.insert(platforms).values({ slug: "draft-platform", name: "Draft", status: "draft" });

    const rows = await db
      .select(publicPlatformColumns)
      .from(platforms)
      .where(eq(platforms.status, "published"));

    expect(rows).toHaveLength(1);
    expect(rows[0].id).toBe(published.id);
    const internal = ["status", "priority", "contactName", "contactInfo", "notes", "enrichment", "notionId", "publishDate"];
    for (const key of internal) expect(rows[0]).not.toHaveProperty(key);
    const json = JSON.stringify(rows);
    for (const secret of ["Secret Contact", "secret@example.org", "internal note", "1000000"]) {
      expect(json).not.toContain(secret);
    }
  });

  it("deleting a platform or category removes its category links", async () => {
    const [p] = await db.insert(platforms).values({ slug: "linked", name: "Linked" }).returning();
    const [c1, c2] = await db
      .insert(categories)
      .values([
        { slug: "messaging", name: "Messaging" },
        { slug: "video", name: "Video" },
      ])
      .returning();
    await db.insert(platformCategories).values([
      { platformId: p.id, categoryId: c1.id },
      { platformId: p.id, categoryId: c2.id },
    ]);

    await db.delete(categories).where(eq(categories.id, c2.id));
    expect(await db.select().from(platformCategories).where(eq(platformCategories.platformId, p.id))).toHaveLength(1);

    await db.delete(platforms).where(eq(platforms.id, p.id));
    expect(await db.select().from(platformCategories).where(eq(platformCategories.platformId, p.id))).toHaveLength(0);
  });
});

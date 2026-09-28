import { PGlite } from "@electric-sql/pglite";
import { generateX25519Identity, identityToRecipient } from "age-encryption";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { describe, expect, it } from "vitest";
import { type Db, casing } from "../db";
import * as schema from "../db/schema";
import { openSnapshot, sealSnapshot } from "./archive";
import { restoreSnapshot, takeSnapshot } from "./snapshot";

const { categories, platformCategories, platforms } = schema;

async function freshDb(): Promise<Db> {
  const db = drizzle(new PGlite(), { schema, casing });
  await migrate(db, { migrationsFolder: "./drizzle" });
  return db as unknown as Db;
}

describe("database snapshots", () => {
  it("round-trips every table through an encrypted archive", async () => {
    const source = await freshDb();
    const [p] = await source
      .insert(platforms)
      .values({
        slug: "alpha",
        name: "Ålpha \"quoted\"",
        status: "published",
        priority: "save_for_later",
        stage: "beta",
        foundingYear: 2019,
        contactInfo: "alpha@example.org",
        enrichment: { "Total Capital Raised": 1_000_000, Investors: ["A", "B"] },
        publishDate: "2025-01-15",
      })
      .returning();
    const [c] = await source.insert(categories).values({ slug: "video", name: "Video" }).returning();
    await source.insert(platformCategories).values({ platformId: p.id, categoryId: c.id, position: 2 });

    const snapshot = await takeSnapshot(source);
    expect(snapshot.tables.map((t) => `${t.schema}.${t.name}`)).toEqual(
      expect.arrayContaining(["public.platforms", "public.categories", "public.platform_categories", "drizzle.__drizzle_migrations"]),
    );
    const order = snapshot.tables.map((t) => t.name);
    expect(order.indexOf("platform_categories")).toBeGreaterThan(order.indexOf("platforms"));
    expect(order.indexOf("platform_categories")).toBeGreaterThan(order.indexOf("categories"));

    const identity = await generateX25519Identity();
    const sealed = await sealSnapshot(snapshot, await identityToRecipient(identity));
    expect(new TextDecoder().decode(sealed)).not.toContain("alpha@example.org");

    const target = await freshDb();
    await target.insert(platforms).values({ slug: "stale", name: "Stale row" });
    await restoreSnapshot(target, await openSnapshot(sealed, identity));

    const restored = await takeSnapshot(target);
    expect(restored.tables).toEqual(snapshot.tables);

    // Sequences continue after the restored ids.
    await target.execute(sql`insert into drizzle.__drizzle_migrations (hash, created_at) values ('next', 1)`);
  });

  it("refuses to open an archive with the wrong key", async () => {
    const snapshot = await takeSnapshot(await freshDb());
    const sealed = await sealSnapshot(snapshot, await identityToRecipient(await generateX25519Identity()));
    await expect(openSnapshot(sealed, await generateX25519Identity())).rejects.toThrow();
  });
});

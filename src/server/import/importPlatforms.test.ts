import { PGlite } from "@electric-sql/pglite";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { casing } from "../db";
import * as schema from "../db/schema";
import { type Db, importPlatforms } from "./importPlatforms";
import type { LogoStore } from "./logos";
import { reconcile } from "./reconcile";
import { page } from "./testPages";

const { categories, platformCategories, platforms } = schema;
const CDN = "https://cdn.example";

let db: Db;
const uploads: string[] = [];
const store: LogoStore = {
  async put(path) {
    uploads.push(path);
    return `${CDN}/${path}`;
  },
};

beforeEach(async () => {
  const pg = drizzle(new PGlite(), { schema, casing });
  await migrate(pg, { migrationsFolder: "./drizzle" });
  db = pg as unknown as Db;
  uploads.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) =>
      url.includes("broken")
        ? new Response("nope", { status: 404 })
        : new Response(new Uint8Array([1, 2, 3]), { headers: { "content-type": "image/png" } }),
    ),
  );
});
afterEach(() => vi.unstubAllGlobals());

const pages = [
  page("a", {
    name: "Alpha",
    published: true,
    description: "First",
    website: "https://alpha.example",
    categories: ["Messaging", "Video"],
    logo: { type: "file", url: "https://notion.example/alpha.png" },
    contactInfo: "alpha@example.org",
    created: "2025-01-01T00:00:00.000Z",
  }),
  page("b", {
    name: "Alpha",
    description: "Same name, newer",
    categories: ["Video"],
    logo: { type: "external", url: "https://broken.example/logo.png" },
    created: "2025-02-01T00:00:00.000Z",
  }),
];

describe("importPlatforms", () => {
  it("imports rows, categories, links and logos, and reconciles cleanly", async () => {
    const report = await importPlatforms(db, pages, store);

    expect(report).toMatchObject({ notionRows: 2, published: 1, inserted: 2, updated: 0, categories: 2, categoryLinks: 3 });
    expect(report.logos.rehosted).toBe(1);
    expect(report.logos.failed).toEqual([{ name: "Alpha", reason: "download failed: HTTP 404" }]);

    const rows = await db.select().from(platforms).orderBy(platforms.createdAt);
    expect(rows.map((r) => r.slug)).toEqual(["alpha", "alpha-2"]);
    expect(rows[0].logoUrl).toMatch(new RegExp(`^${CDN}/platform-logos/alpha-[0-9a-f]{12}\\.png$`));
    expect(rows[1].logoUrl).toBeNull();

    const checks = await reconcile(db, pages, CDN);
    const failed = checks.filter((c) => !c.ok).map((c) => c.name);
    // Only "b" is incomplete (a draft, so fine) and its logo failed to download.
    expect(failed).toEqual(["Every logo is served from Bunny (1 of 2)"]);
  });

  it("re-runs idempotently, keeps slugs and re-links changed categories", async () => {
    await importPlatforms(db, pages, store);
    const renamed = [
      page("a", { name: "Alpha Renamed", published: true, categories: ["Messaging"], created: "2025-01-01T00:00:00.000Z" }),
      pages[1],
    ];
    const report = await importPlatforms(db, renamed, null);

    expect(report).toMatchObject({ inserted: 0, updated: 2, categoryLinks: 2 });
    const [alpha] = await db.select().from(platforms).where(eq(platforms.notionId, "a"));
    expect(alpha).toMatchObject({ slug: "alpha", name: "Alpha Renamed", logoUrl: null });
    const links = await db.select().from(platformCategories).where(eq(platformCategories.platformId, alpha.id));
    expect(links).toHaveLength(1);
    expect(await db.select().from(categories)).toHaveLength(2);
    expect((await reconcile(db, renamed)).slice(0, 4).every((c) => c.ok)).toBe(true);
  });

  it("strips invisible characters before a pasted logo URL and sends a User-Agent", async () => {
    const pasted = page("c", {
      name: "Pasted",
      logo: { type: "external", url: "\u{FFFC}\u{FFFC}https://images.example/pasted.png" },
    });
    const report = await importPlatforms(db, [pasted], store);
    expect(report.logos).toMatchObject({ rehosted: 1, failed: [] });
    const [url, init] = vi.mocked(fetch).mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://images.example/pasted.png");
    expect(new Headers(init.headers).get("user-agent")).toContain("RebuildLogoImporter");
  });

  it("retries a blocked logo download with other headers", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("blocked", { status: 403 }));
    const report = await importPlatforms(db, [pages[0]], store);
    expect(report.logos).toMatchObject({ rehosted: 1, failed: [] });
    const calls = vi.mocked(fetch).mock.calls as unknown as [string, RequestInit][];
    expect(calls.map(([, init]) => new Headers(init.headers).has("user-agent"))).toEqual([true, false]);
  });

  it("keeps the stored logo when Bunny isn't configured", async () => {
    await importPlatforms(db, pages, store);
    const report = await importPlatforms(db, pages, null);
    expect(report.logos.skipped).toBe(true);
    const [alpha] = await db.select().from(platforms).where(eq(platforms.notionId, "a"));
    expect(alpha.logoUrl).toMatch(/^https:\/\/cdn\.example\//);
  });

  it("reports rows that disappeared from Notion without deleting them", async () => {
    await importPlatforms(db, pages, null);
    const report = await importPlatforms(db, [pages[0]], null);
    expect(report.orphaned).toEqual(["Alpha"]);
    expect(await db.select().from(platforms)).toHaveLength(2);
  });
});

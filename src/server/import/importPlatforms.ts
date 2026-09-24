// Upsert the Notion directory into Postgres (plan §2.3).
//
// Idempotent: rows are matched on notionId, so re-running syncs the latest
// Notion state. Slugs are kept once assigned (URLs must not change). Rows
// that disappeared from Notion are reported, never deleted. Everything
// except logo uploads happens in one transaction.
//
// Reports name platforms (public data) but never contact fields.

import { inArray, isNotNull, sql } from "drizzle-orm";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "../db/schema";
import { type LogoStore, rehostLogo } from "./logos";
import { type NotionPage, mapPage, slugify } from "./notion";

const { categories, platformCategories, platforms } = schema;

export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

export interface ImportReport {
  notionRows: number;
  published: number;
  inserted: number;
  updated: number;
  categories: number;
  categoryLinks: number;
  /** Platforms in Postgres whose Notion page is gone. Left untouched. */
  orphaned: string[];
  /** Platforms that had more than one COUNTRY; only the first is kept. */
  droppedCountries: { name: string; kept: string | null; dropped: string[] }[];
  logos: { rehosted: number; failed: { name: string; reason: string }[]; skipped: boolean };
  warnings: { name: string; warning: string }[];
}

// Updated from Notion on every run. Not id, slug or createdAt.
const SYNCED = [
  "name",
  "description",
  "website",
  "country",
  "logoUrl",
  "stage",
  "foundingYear",
  "status",
  "priority",
  "contactName",
  "contactInfo",
  "notes",
  "enrichment",
  "publishDate",
  "updatedAt",
] as const;

const snake = (key: string) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function chunks<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export async function importPlatforms(
  db: Db,
  pages: NotionPage[],
  logoStore: LogoStore | null,
): Promise<ImportReport> {
  // Oldest first, so slug collisions resolve the same way on every run.
  const mapped = pages
    .map(mapPage)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime() || a.notionId.localeCompare(b.notionId));

  const existing = await db
    .select({ notionId: platforms.notionId, slug: platforms.slug, logoUrl: platforms.logoUrl })
    .from(platforms);
  const byNotionId = new Map(existing.filter((r) => r.notionId).map((r) => [r.notionId!, r]));
  const usedSlugs = new Set(existing.map((r) => r.slug));

  const slugs = new Map<string, string>();
  for (const p of mapped) {
    let slug = byNotionId.get(p.notionId)?.slug;
    if (!slug) {
      const base = slugify(p.name);
      slug = base;
      for (let n = 2; usedSlugs.has(slug); n++) slug = `${base}-${n}`;
      usedSlugs.add(slug);
    }
    slugs.set(p.notionId, slug);
  }

  const report: ImportReport = {
    notionRows: mapped.length,
    published: mapped.filter((p) => p.status === "published").length,
    inserted: mapped.filter((p) => !byNotionId.has(p.notionId)).length,
    updated: mapped.filter((p) => byNotionId.has(p.notionId)).length,
    categories: 0,
    categoryLinks: 0,
    orphaned: [],
    droppedCountries: mapped
      .filter((p) => p.droppedCountries.length)
      .map((p) => ({ name: p.name, kept: p.country, dropped: p.droppedCountries })),
    logos: { rehosted: 0, failed: [], skipped: !logoStore },
    warnings: mapped.flatMap((p) => p.warnings.map((warning) => ({ name: p.name, warning }))),
  };

  // Logos first: network work stays outside the transaction.
  const logoUrls = await mapLimit(mapped, 6, async (p) => {
    const current = byNotionId.get(p.notionId)?.logoUrl ?? null;
    if (!p.logo) return null;
    if (!logoStore) return current;
    try {
      const url = await rehostLogo(p.logo, slugs.get(p.notionId)!, logoStore);
      report.logos.rehosted++;
      return url;
    } catch (err) {
      report.logos.failed.push({ name: p.name, reason: (err as Error).message });
      return current;
    }
  });

  const rows = mapped.map((p, i) => ({
    notionId: p.notionId,
    slug: slugs.get(p.notionId)!,
    name: p.name,
    description: p.description,
    website: p.website,
    country: p.country,
    logoUrl: logoUrls[i],
    stage: p.stage,
    foundingYear: p.foundingYear,
    status: p.status,
    priority: p.priority,
    contactName: p.contactName,
    contactInfo: p.contactInfo,
    notes: p.notes,
    enrichment: p.enrichment,
    publishDate: p.publishDate,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));

  const categoryNames = [...new Set(mapped.flatMap((p) => p.categories))].sort();

  await db.transaction(async (tx) => {
    const idByNotionId = new Map<string, string>();
    for (const batch of chunks(rows, 250)) {
      const saved = await tx
        .insert(platforms)
        .values(batch)
        .onConflictDoUpdate({
          target: platforms.notionId,
          set: Object.fromEntries(SYNCED.map((k) => [k, sql.raw(`excluded.${snake(k)}`)])),
        })
        .returning({ id: platforms.id, notionId: platforms.notionId });
      for (const r of saved) idByNotionId.set(r.notionId!, r.id);
    }

    if (categoryNames.length) {
      const usedCategorySlugs = new Set<string>();
      const values = categoryNames.map((name) => {
        let slug = slugify(name);
        for (let n = 2; usedCategorySlugs.has(slug); n++) slug = `${slugify(name)}-${n}`;
        usedCategorySlugs.add(slug);
        return { name, slug };
      });
      await tx.insert(categories).values(values).onConflictDoNothing({ target: categories.name });
    }
    const categoryIds = new Map(
      (await tx.select({ id: categories.id, name: categories.name }).from(categories)).map((c) => [c.name, c.id]),
    );
    report.categories = categoryNames.length;

    const platformIds = [...idByNotionId.values()];
    for (const batch of chunks(platformIds, 500)) {
      await tx.delete(platformCategories).where(inArray(platformCategories.platformId, batch));
    }
    const links = mapped.flatMap((p) =>
      [...new Set(p.categories)].map((name) => ({
        platformId: idByNotionId.get(p.notionId)!,
        categoryId: categoryIds.get(name)!,
      })),
    );
    for (const batch of chunks(links, 1000)) await tx.insert(platformCategories).values(batch);
    report.categoryLinks = links.length;

    const seen = new Set(mapped.map((p) => p.notionId));
    report.orphaned = (
      await tx.select({ notionId: platforms.notionId, name: platforms.name }).from(platforms).where(isNotNull(platforms.notionId))
    )
      .filter((r) => !seen.has(r.notionId!))
      .map((r) => r.name);
  });

  return report;
}


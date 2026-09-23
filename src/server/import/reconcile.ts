// Reconcile Postgres against Notion after an import (plan §2.3). Instead of
// spot-checking a few records, every row is compared field by field.
// Details name platforms and fields, never values, so the output is safe to
// log (contact fields are compared but never printed).

import { eq, isNotNull } from "drizzle-orm";
import * as schema from "../db/schema";
import type { Db } from "./importPlatforms";
import { type NotionPage, mapPage } from "./notion";

const { categories, platformCategories, platforms } = schema;

export interface Check {
  name: string;
  ok: boolean;
  details: string[];
}

const COMPARED = [
  "name",
  "description",
  "website",
  "country",
  "stage",
  "foundingYear",
  "status",
  "priority",
  "contactName",
  "contactInfo",
  "notes",
  "publishDate",
] as const;

// jsonb doesn't keep key order, so compare objects with sorted keys.
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, canonical((value as Record<string, unknown>)[k])]),
    );
  }
  return value ?? null;
}

const sameJson = (a: unknown, b: unknown) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));

export async function reconcile(db: Db, pages: NotionPage[], cdnUrl?: string): Promise<Check[]> {
  const mapped = pages.map(mapPage);
  const rows = await db.select().from(platforms).where(isNotNull(platforms.notionId));
  const byNotionId = new Map(rows.map((r) => [r.notionId!, r]));
  const links = await db
    .select({ platformId: platformCategories.platformId, name: categories.name })
    .from(platformCategories)
    .innerJoin(categories, eq(categories.id, platformCategories.categoryId));
  const categoriesOf = new Map<string, string[]>();
  for (const l of links) categoriesOf.set(l.platformId, [...(categoriesOf.get(l.platformId) ?? []), l.name]);
  const categoryNames = new Set((await db.select({ name: categories.name }).from(categories)).map((c) => c.name));

  const missing = mapped.filter((p) => !byNotionId.has(p.notionId)).map((p) => p.name);
  const checks: Check[] = [
    {
      name: `Every Notion row is in Postgres (${mapped.length})`,
      ok: missing.length === 0,
      details: missing,
    },
  ];

  const expectedCategories = [...new Set(mapped.flatMap((p) => p.categories))];
  const absent = expectedCategories.filter((c) => !categoryNames.has(c));
  checks.push({
    name: `Every Notion category exists (${expectedCategories.length})`,
    ok: absent.length === 0,
    details: absent,
  });

  const fieldMismatches: string[] = [];
  const linkMismatches: string[] = [];
  for (const p of mapped) {
    const row = byNotionId.get(p.notionId);
    if (!row) continue;
    const fields = COMPARED.filter((k) => !sameJson(row[k], p[k]));
    if (!sameJson(row.enrichment, p.enrichment)) fields.push("enrichment" as never);
    if (fields.length) fieldMismatches.push(`${p.name}: ${fields.join(", ")}`);
    const got = [...(categoriesOf.get(row.id) ?? [])].sort();
    const want = [...new Set(p.categories)].sort();
    if (!sameJson(got, want)) linkMismatches.push(`${p.name}: ${got.length} links, expected ${want.length}`);
  }
  checks.push({ name: "Every field matches Notion", ok: fieldMismatches.length === 0, details: fieldMismatches });
  checks.push({
    name: `Category links match (${mapped.filter((p) => p.categories.length > 1).length} multi-category platforms)`,
    ok: linkMismatches.length === 0,
    details: linkMismatches,
  });

  const incomplete = rows
    .filter((r) => r.status === "published")
    .flatMap((r) => {
      const empty = (["name", "slug", "website", "description"] as const).filter((k) => !r[k]);
      return empty.length ? [`${r.name}: no ${empty.join(", ")}`] : [];
    });
  checks.push({
    name: "Published platforms have name, slug, website and description",
    ok: incomplete.length === 0,
    details: incomplete,
  });

  const withLogo = mapped.filter((p) => p.logo).length;
  const stored = rows.filter((r) => r.logoUrl);
  const offCdn = cdnUrl ? stored.filter((r) => !r.logoUrl!.startsWith(cdnUrl)).map((r) => r.name) : [];
  checks.push({
    name: cdnUrl
      ? `Every logo is served from Bunny (${stored.length} of ${withLogo})`
      : `Logos not checked: Bunny isn't configured (${withLogo} in Notion)`,
    ok: Boolean(cdnUrl) && stored.length === withLogo && offCdn.length === 0,
    details: offCdn,
  });

  return checks;
}

// Plane B schema: the platform directory and its taxonomy (plan §2.2).
//
// Every platforms column is tagged [public] or [internal]. Public reads must
// select `publicPlatformColumns`, never whole rows: contact PII, curation
// fields and enrichment metrics must not reach the client (AGENTS.md rule 1).
//
// Imports stay relative: this module is also bundled into Nitro plugins,
// where "~" resolves to the project root (docs/decisions/0001).

import {
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const platformStatus = pgEnum("platform_status", ["published", "draft"]);

// Verbatim from Notion PRIORITY: Top | Next | Last | Save 4 Later | Discarded.
export const platformPriority = pgEnum("platform_priority", [
  "top",
  "next",
  "last",
  "save_for_later",
  "discarded",
]);

// Verbatim from Notion Stage: Concept | Alpha | Beta | Growth | Shut down.
export const platformStage = pgEnum("platform_stage", [
  "concept",
  "alpha",
  "beta",
  "growth",
  "shut_down",
]);

export type PlatformEnrichment = Record<string, string | number | string[]>;

export const platforms = pgTable(
  "platforms",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull().unique(), // [public]   generated from name
    name: text().notNull(), // [public]   Notion Name
    description: text(), // [public]   Notion DESCRIPTION
    website: text(), // [public]   Notion WEBSITE
    country: text(), // [public]   Notion COUNTRY (first value)
    logoUrl: text(), // [public]   Notion LOGO, re-hosted on Bunny
    stage: platformStage(), // [public]   Notion Stage
    foundingYear: integer(), // [public]   Notion Founding Year
    // --- internal / curation only ---
    notionId: text().unique(), // [internal] source page, for re-runs + reconciliation
    status: platformStatus().notNull().default("draft"), // [internal] Notion PUBLISHED?
    priority: platformPriority(), // [internal] Notion PRIORITY
    contactName: text(), // [internal] PII
    contactInfo: text(), // [internal] PII (email)
    notes: text(), // [internal] Notion NOTES
    enrichment: jsonb().$type<PlatformEnrichment>(), // [internal] business metrics
    publishDate: date(), // [internal] Notion Publish Date
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [index().on(t.status)],
);

// Notion CATEGORY is a multi-select, hence the join table.
export const categories = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  name: text().notNull().unique(),
});

export const platformCategories = pgTable(
  "platform_categories",
  {
    platformId: uuid()
      .notNull()
      .references(() => platforms.id, { onDelete: "cascade" }),
    categoryId: uuid()
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    // Order as chosen in Notion; cards show category badges in this order.
    position: smallint().notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.platformId, t.categoryId] }), index().on(t.categoryId)],
);

/** The only platforms columns a public page or API may select. */
export const publicPlatformColumns = {
  id: platforms.id,
  slug: platforms.slug,
  name: platforms.name,
  description: platforms.description,
  website: platforms.website,
  country: platforms.country,
  logoUrl: platforms.logoUrl,
  stage: platforms.stage,
  foundingYear: platforms.foundingYear,
};

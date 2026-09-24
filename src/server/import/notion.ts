// Notion Platforms database → platform rows (plan §2.3, ADR 0006).
// Everything here is pure except fetchNotionPages.

import { Client, collectAllDataSourceRows, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";
import type { PlatformEnrichment } from "../db/schema";

export type NotionPage = Pick<
  PageObjectResponse,
  "id" | "created_time" | "last_edited_time" | "properties"
>;
type NotionProperty = PageObjectResponse["properties"][string];

/** Every row, published or not: drafts carry curation data too. */
export async function fetchNotionPages(token: string, databaseId: string): Promise<NotionPage[]> {
  const notion = new Client({ auth: token });
  const database = await notion.databases.retrieve({ database_id: databaseId });
  const dataSourceId = "data_sources" in database ? database.data_sources[0]?.id : undefined;
  if (!dataSourceId) throw new Error("No data source found in the Notion database");
  const rows = await collectAllDataSourceRows(notion, { data_source_id: dataSourceId });
  return rows.filter(isFullPage);
}

const PRIORITY = {
  Top: "top",
  Next: "next",
  Last: "last",
  "Save 4 Later": "save_for_later",
  Discarded: "discarded",
} as const;

const STAGE = {
  Concept: "concept",
  Alpha: "alpha",
  Beta: "beta",
  Growth: "growth",
  "Shut down": "shut_down",
} as const;

// Properties with their own column. Everything else that has a value goes
// into the [internal] enrichment column.
const MAPPED = new Set([
  "Name",
  "DESCRIPTION",
  "WEBSITE",
  "COUNTRY",
  "LOGO",
  "Stage",
  "Founding Year",
  "PUBLISHED?",
  "PRIORITY",
  "CONTACT NAME",
  "CONTACT INFO",
  "NOTES",
  "Publish Date",
  "CATEGORY",
  "Last edited",
]);

export interface LogoSource {
  url: string;
  hosted: "notion" | "external";
}

export interface MappedPlatform {
  notionId: string;
  name: string;
  description: string | null;
  website: string | null;
  country: string | null;
  /** COUNTRY values beyond the first, which the single column drops. */
  droppedCountries: string[];
  logo: LogoSource | null;
  stage: (typeof STAGE)[keyof typeof STAGE] | null;
  foundingYear: number | null;
  status: "published" | "draft";
  priority: (typeof PRIORITY)[keyof typeof PRIORITY] | null;
  contactName: string | null;
  contactInfo: string | null;
  notes: string | null;
  enrichment: PlatformEnrichment | null;
  publishDate: string | null;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
  warnings: string[];
}

// Letters that Unicode normalisation doesn't split into base + accent.
const LETTERS: Record<string, string> = { ł: "l", ø: "o", æ: "ae", œ: "oe", ß: "ss", đ: "d", ð: "d", þ: "th", ı: "i" };

export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[łøæœßđðþı]/g, (c) => LETTERS[c])
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "platform";
}

function text(prop: NotionProperty | undefined): string | null {
  if (!prop) return null;
  const parts =
    prop.type === "title" ? prop.title : prop.type === "rich_text" ? prop.rich_text : null;
  const value = parts?.map((p) => p.plain_text).join("").trim();
  return value || null;
}

/** A property's value in plain JSON, or null when it's empty. */
export function propertyValue(prop: NotionProperty): string | number | string[] | null {
  switch (prop.type) {
    case "title":
    case "rich_text":
      return text(prop);
    case "number":
      return prop.number;
    case "select":
      return prop.select?.name ?? null;
    case "multi_select":
      return prop.multi_select.length ? prop.multi_select.map((o) => o.name) : null;
    case "date":
      return prop.date?.start ?? null;
    case "url":
      return prop.url || null;
    case "email":
      return prop.email || null;
    case "checkbox":
      return prop.checkbox ? "Yes" : null;
    default:
      return null;
  }
}

function logoSource(prop: NotionProperty | undefined): LogoSource | null {
  if (prop?.type !== "files" || !prop.files[0]) return null;
  const file = prop.files[0];
  if (file.type === "file") return { url: file.file.url, hosted: "notion" };
  if (file.type === "external") return { url: file.external.url, hosted: "external" };
  return null;
}

export function mapPage(page: NotionPage): MappedPlatform {
  const props = page.properties;
  const warnings: string[] = [];
  const value = (key: string) => (props[key] ? propertyValue(props[key]) : null);
  const one = (key: string) => {
    const v = value(key);
    return typeof v === "string" ? v : null;
  };

  const countries = (value("COUNTRY") as string[] | null) ?? [];

  const priorityName = one("PRIORITY");
  const priority = priorityName ? (PRIORITY[priorityName as keyof typeof PRIORITY] ?? null) : null;
  if (priorityName && !priority) warnings.push(`unknown PRIORITY "${priorityName}"`);

  const stageName = one("Stage");
  const stage = stageName ? (STAGE[stageName as keyof typeof STAGE] ?? null) : null;
  if (stageName && !stage) warnings.push(`unknown Stage "${stageName}"`);

  const year = value("Founding Year");

  const enrichment: PlatformEnrichment = {};
  for (const [key, prop] of Object.entries(props)) {
    if (MAPPED.has(key)) continue;
    const v = propertyValue(prop);
    if (v !== null) enrichment[key] = v;
  }

  const published = props["PUBLISHED?"];

  return {
    notionId: page.id,
    name: one("Name") ?? "Untitled",
    description: one("DESCRIPTION"),
    website: one("WEBSITE"),
    country: countries[0] ?? null,
    droppedCountries: countries.slice(1),
    logo: logoSource(props.LOGO),
    stage,
    foundingYear: typeof year === "number" ? Math.trunc(year) : null,
    status: published?.type === "checkbox" && published.checkbox ? "published" : "draft",
    priority,
    contactName: one("CONTACT NAME"),
    contactInfo: one("CONTACT INFO"),
    notes: one("NOTES"),
    enrichment: Object.keys(enrichment).length ? enrichment : null,
    publishDate: one("Publish Date")?.slice(0, 10) ?? null,
    categories: (value("CATEGORY") as string[] | null) ?? [],
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
    warnings,
  };
}

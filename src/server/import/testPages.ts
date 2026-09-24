// Minimal Notion page fixtures for the import tests.
import type { NotionPage } from "./notion";

const rich = (value: string) => [{ plain_text: value }];

export function page(id: string, fields: {
  name?: string;
  published?: boolean;
  description?: string;
  website?: string;
  countries?: string[];
  categories?: string[];
  priority?: string;
  stage?: string;
  foundingYear?: number;
  contactName?: string;
  contactInfo?: string;
  notes?: string;
  logo?: { type: "file" | "external"; url: string };
  capitalRaised?: number;
  investors?: string;
  created?: string;
  edited?: string;
}): NotionPage {
  const p = {
    Name: { type: "title", title: fields.name ? rich(fields.name) : [] },
    DESCRIPTION: { type: "rich_text", rich_text: fields.description ? rich(fields.description) : [] },
    WEBSITE: { type: "url", url: fields.website ?? null },
    COUNTRY: { type: "multi_select", multi_select: (fields.countries ?? []).map((name) => ({ name })) },
    CATEGORY: { type: "multi_select", multi_select: (fields.categories ?? []).map((name) => ({ name })) },
    "PUBLISHED?": { type: "checkbox", checkbox: fields.published ?? false },
    PRIORITY: { type: "select", select: fields.priority ? { name: fields.priority } : null },
    Stage: { type: "select", select: fields.stage ? { name: fields.stage } : null },
    "Founding Year": { type: "number", number: fields.foundingYear ?? null },
    "CONTACT NAME": { type: "rich_text", rich_text: fields.contactName ? rich(fields.contactName) : [] },
    "CONTACT INFO": { type: "email", email: fields.contactInfo ?? null },
    NOTES: { type: "rich_text", rich_text: fields.notes ? rich(fields.notes) : [] },
    "Publish Date": { type: "date", date: fields.published ? { start: "2025-01-15" } : null },
    LOGO: {
      type: "files",
      files: fields.logo
        ? [fields.logo.type === "file"
            ? { type: "file", name: "logo", file: { url: fields.logo.url } }
            : { type: "external", name: "logo", external: { url: fields.logo.url } }]
        : [],
    },
    "Total Capital Raised": { type: "number", number: fields.capitalRaised ?? null },
    Investors: { type: "rich_text", rich_text: fields.investors ? rich(fields.investors) : [] },
    "Latest Valuation": { type: "number", number: null },
    "Last edited": { type: "last_edited_time", last_edited_time: fields.edited ?? "2026-01-02T00:00:00.000Z" },
  };
  return {
    id,
    created_time: fields.created ?? "2025-01-01T00:00:00.000Z",
    last_edited_time: fields.edited ?? "2026-01-02T00:00:00.000Z",
    properties: p,
  } as unknown as NotionPage;
}

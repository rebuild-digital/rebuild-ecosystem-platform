import { type Db, type ImportReport, importPlatforms } from "./importPlatforms";
import { bunnyLogoStore } from "./logos";
import { fetchNotionPages } from "./notion";
import { type Check, reconcile } from "./reconcile";

export type { Db };

/** Fetch Notion, upsert into Postgres, then reconcile. Shared by the CLI dry run and the boot import. */
export async function runNotionImport(db: Db) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_BUILDERS_DB_ID;
  if (!token || !databaseId) throw new Error("NOTION_TOKEN and NOTION_BUILDERS_DB_ID must be set");

  const pages = await fetchNotionPages(token, databaseId);
  const report = await importPlatforms(db, pages, bunnyLogoStore());
  const checks = await reconcile(db, pages, process.env.BUNNY_CDN_URL?.replace(/\/$/, ""));
  return { report, checks, ok: checks.every((c) => c.ok) };
}

const MAX_DETAILS = 10;

/** Log-safe summary: platform names and counts, never contact fields. */
export function formatImport(report: ImportReport, checks: Check[]): string[] {
  const lines = [
    `Notion rows: ${report.notionRows} (${report.published} published)`,
    `Platforms inserted: ${report.inserted}, updated: ${report.updated}`,
    `Categories: ${report.categories}, category links: ${report.categoryLinks}`,
    report.logos.skipped
      ? "Logos: skipped (Bunny Storage not configured)"
      : `Logos re-hosted: ${report.logos.rehosted}, failed: ${report.logos.failed.length}`,
  ];
  const list = (title: string, items: string[]) => {
    if (!items.length) return;
    lines.push(`${title} (${items.length}):`);
    for (const item of items.slice(0, MAX_DETAILS)) lines.push(`  - ${item}`);
    if (items.length > MAX_DETAILS) lines.push(`  … and ${items.length - MAX_DETAILS} more`);
  };
  list("Logo failures", report.logos.failed.map((f) => `${f.name}: ${f.reason}`));
  list(
    "Extra countries dropped",
    report.droppedCountries.map((d) => `${d.name}: kept ${d.kept}, dropped ${d.dropped.join(", ")}`),
  );
  list("Warnings", report.warnings.map((w) => `${w.name}: ${w.warning}`));
  list("In Postgres but no longer in Notion (left untouched)", report.orphaned);
  lines.push("Reconciliation:");
  for (const check of checks) {
    lines.push(`  ${check.ok ? "PASS" : "FAIL"}  ${check.name}`);
    for (const d of check.details.slice(0, MAX_DETAILS)) lines.push(`          - ${d}`);
    if (check.details.length > MAX_DETAILS) lines.push(`          … and ${check.details.length - MAX_DETAILS} more`);
  }
  return lines;
}

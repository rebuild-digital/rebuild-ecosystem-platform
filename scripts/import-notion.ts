// Dry-run the Notion → Postgres import (plan §2.3).
//
//   npm run db:import-notion                 # throwaway in-memory Postgres (PGlite)
//   npm run db:import-notion -- --database-url   # your local Postgres (DATABASE_URL)
//
// Runs the migrations, imports, reconciles, then imports a second time to
// prove re-runs are idempotent. Risved's database isn't reachable from here;
// production imports run at boot with NOTION_IMPORT=true.

import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import { migrate as migratePostgres } from "drizzle-orm/postgres-js/migrator";
import { casing, getDb } from "../src/server/db";
import * as schema from "../src/server/db/schema";
import { type Db, formatImport, runNotionImport } from "../src/server/import";

async function openDb(): Promise<{ db: Db; label: string; close: () => Promise<void> }> {
  if (process.argv.includes("--database-url")) {
    const db = getDb();
    await migratePostgres(db, { migrationsFolder: "./drizzle" });
    return { db, label: "DATABASE_URL", close: () => db.$client.end() };
  }
  const client = new PGlite();
  const db = drizzlePglite(client, { schema, casing });
  await migratePglite(db, { migrationsFolder: "./drizzle" });
  return { db, label: "in-memory PGlite (discarded afterwards)", close: () => client.close() };
}

const { db, label, close } = await openDb();
console.log(`Importing Notion into ${label}\n`);

const first = await runNotionImport(db);
console.log(formatImport(first.report, first.checks).join("\n"));

console.log("\nSecond run (should update everything and insert nothing):");
const second = await runNotionImport(db);
const idempotent = second.report.inserted === 0 && second.ok === first.ok;
console.log(`  inserted ${second.report.inserted}, updated ${second.report.updated}: ${idempotent ? "PASS" : "FAIL"}`);

await close();
process.exit(first.ok && idempotent ? 0 : 1);

// Test-restore a database backup (plan §7.11).
//
//   npm run db:restore -- --latest --identity ~/rebuild-backup-identity.txt
//   npm run db:restore -- ./db-2026-09-24T0200Z.json.gz.age --identity key.txt
//
// --latest downloads the newest backup (needs BACKUP_STORAGE_ZONE and
// BACKUP_STORAGE_KEY in .env). By default it restores into a throwaway
// in-memory Postgres (PGlite) and checks every table against the snapshot.
// Add --database-url --overwrite to restore into DATABASE_URL instead (this
// replaces all its data).

import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import { migrate as migratePostgres } from "drizzle-orm/postgres-js/migrator";
import { BACKUP_DIR } from "../src/server/backup";
import { openSnapshot } from "../src/server/backup/archive";
import { backupDate } from "../src/server/backup/retention";
import { restoreSnapshot, takeSnapshot } from "../src/server/backup/snapshot";
import { bunnyStorage } from "../src/server/bunny";
import { type Db, casing, getDb } from "../src/server/db";
import * as schema from "../src/server/db/schema";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const option = (name: string) => args[args.indexOf(name) + 1];

const identityPath = option("--identity");
if (!flag("--identity") || !identityPath) {
  console.error("Pass --identity <file with the AGE-SECRET-KEY-… line>.");
  process.exit(1);
}
const identity = readFileSync(identityPath.replace(/^~/, process.env.HOME ?? "~"), "utf8")
  .split("\n")
  .find((line) => line.startsWith("AGE-SECRET-KEY-"));
if (!identity) {
  console.error(`No AGE-SECRET-KEY-… line in ${identityPath}.`);
  process.exit(1);
}

async function loadArchive(): Promise<{ name: string; bytes: Uint8Array }> {
  if (!flag("--latest")) {
    const file = args.find((a) => !a.startsWith("--") && a !== identityPath);
    if (!file) throw new Error("Pass a backup file or --latest.");
    return { name: file, bytes: readFileSync(file) };
  }
  const { BACKUP_STORAGE_ZONE: zone, BACKUP_STORAGE_KEY: key, BACKUP_STORAGE_HOST: host } = process.env;
  if (!zone || !key) throw new Error("--latest needs BACKUP_STORAGE_ZONE and BACKUP_STORAGE_KEY in .env.");
  const storage = bunnyStorage(zone, key, host || undefined);
  const newest = (await storage.list(BACKUP_DIR))
    .filter((f) => backupDate(f.name))
    .sort((a, b) => backupDate(b.name)!.getTime() - backupDate(a.name)!.getTime())[0];
  if (!newest) throw new Error(`No backups in ${zone}/${BACKUP_DIR}.`);
  return { name: newest.name, bytes: await storage.get(`${BACKUP_DIR}/${newest.name}`) };
}

async function openTarget(): Promise<{ db: Db; label: string; close: () => Promise<void> }> {
  if (flag("--database-url")) {
    if (!flag("--overwrite")) throw new Error("--database-url replaces all data in DATABASE_URL; add --overwrite to confirm.");
    const db = getDb();
    await migratePostgres(db, { migrationsFolder: "./drizzle" });
    return { db, label: "DATABASE_URL", close: () => db.$client.end() };
  }
  const client = new PGlite();
  const db = drizzlePglite(client, { schema, casing });
  await migratePglite(db, { migrationsFolder: "./drizzle" });
  return { db: db as unknown as Db, label: "in-memory PGlite (discarded afterwards)", close: () => client.close() };
}

const archive = await loadArchive();
const snapshot = await openSnapshot(archive.bytes, identity);
console.log(`Decrypted ${archive.name} (taken ${snapshot.createdAt}).`);

const { db, label, close } = await openTarget();
await restoreSnapshot(db, snapshot);
const restored = await takeSnapshot(db);
await close();

console.log(`Restored into ${label}:`);
let ok = true;
for (const t of snapshot.tables) {
  const back = restored.tables.find((r) => r.schema === t.schema && r.name === t.name);
  const same = JSON.stringify(back?.rows) === JSON.stringify(t.rows);
  ok &&= same;
  console.log(`  ${same ? "PASS" : "FAIL"}  ${t.schema}.${t.name}: ${t.rows.length} rows`);
}
console.log(ok ? "Test restore passed: every table matches the backup." : "Test restore FAILED.");
process.exit(ok ? 0 : 1);

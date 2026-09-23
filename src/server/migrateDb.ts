import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { useStorage } from "nitropack/runtime";
import { getDb } from "./db";

/**
 * Nitro plugin: apply pending Drizzle migrations when the server boots.
 *
 * Risved can't reach the database from a laptop or a build step, and the
 * runtime container holds only .output/, so the drizzle/ folder ships as a
 * Nitro server asset (see app.config.ts). The migrator reads a folder, so
 * the assets are written to a temp dir first.
 *
 * Without DATABASE_URL (CI, local without Postgres) this is a no-op. A failed
 * migration is logged and the site keeps serving: nothing reads the
 * database yet, and the directory still falls back to Notion.
 */
export default function migrateDb() {
  if (!process.env.DATABASE_URL) {
    console.log("[db] DATABASE_URL not set; skipping migrations.");
    return;
  }
  void runMigrations();
}

async function runMigrations() {
  const assets = useStorage("assets:migrations");
  const dir = await mkdtemp(join(tmpdir(), "rebuild-migrations-"));
  try {
    for (const key of await assets.getKeys()) {
      const path = join(dir, ...key.split(":"));
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, (await assets.getItemRaw(key)) as string | Buffer);
    }
    await migrate(getDb(), { migrationsFolder: dir });
    console.log("[db] Migrations applied.");
  } catch (err) {
    console.error("[db] Migration failed:", err);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

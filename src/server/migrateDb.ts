import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { useStorage } from "nitropack/runtime";
import { getDb } from "./db";
import { formatImport, runNotionImport } from "./import";

/**
 * Nitro plugin: apply pending Drizzle migrations when the server boots.
 *
 * Risved can't reach the database from a laptop or a build step, and the
 * runtime container holds only .output/, so the drizzle/ folder ships as a
 * Nitro server asset (see app.config.ts). The migrator reads a folder, so
 * the assets are written to a temp dir first.
 *
 * With NOTION_IMPORT=true it then syncs the Notion directory into Postgres
 * and logs the reconciliation (plan §2.3). That's the only way to import
 * into Risved's private database: set the variable, redeploy, read the log.
 *
 * Without DATABASE_URL (CI, local without Postgres) this is a no-op. A
 * failure is logged and the site keeps serving: nothing reads the database
 * yet, and the directory still falls back to Notion.
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
    return;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }

  if (process.env.NOTION_IMPORT !== "true") return;
  console.log("[notion-import] Starting (Notion rows + logo uploads take a minute or two)…");
  try {
    const { report, checks, ok } = await runNotionImport(getDb());
    for (const line of formatImport(report, checks)) console.log(`[notion-import] ${line}`);
    console.log(`[notion-import] ${ok ? "Reconciliation passed." : "Reconciliation found problems (see above)."}`);
  } catch (err) {
    console.error("[notion-import] Failed:", err);
  }
}

import { Cron } from "croner";
import { getDb } from "./db";
import { backupConfig, runBackup } from "./backup";
import { dbReady } from "./migrateDb";

/**
 * Nitro plugin: nightly encrypted database backup to a private Bunny zone
 * at 02:00 UTC (plan §7.11). BACKUP_ON_BOOT=true also runs one right after
 * startup, to check the setup after a deploy. Logs table row counts only.
 */
export default function backupDb() {
  const config = backupConfig();
  if (!config) {
    console.log("[backup] Not configured; nightly backups are off.");
    return;
  }
  if ("error" in config) {
    console.error(`[backup] ${config.error} Nightly backups are off.`);
    return;
  }

  const run = async () => {
    if (!(await dbReady)) {
      console.error("[backup] Skipped: the database isn't ready (see [db] lines).");
      return;
    }
    try {
      const result = await runBackup(getDb(), config);
      const rows = result.tables.map((t) => `${t.name}=${t.rows}`).join(", ");
      console.log(`[backup] Uploaded ${result.name} (${result.bytes} bytes): ${rows}`);
      if (result.deleted.length) console.log(`[backup] Pruned ${result.deleted.length}: ${result.deleted.join(", ")}`);
    } catch (err) {
      console.error("[backup] Failed:", err);
    }
  };

  // protect: never start a run while the previous one is still going.
  new Cron("0 2 * * *", { timezone: "UTC", protect: true }, run);
  console.log("[backup] Nightly backup scheduled for 02:00 UTC.");
  if (process.env.BACKUP_ON_BOOT === "true") void run();
}

import { type BunnyStorage, bunnyStorage } from "../bunny";
import type { Db } from "../db";
import { sealSnapshot } from "./archive";
import { backupName, backupsToDelete } from "./retention";
import { takeSnapshot } from "./snapshot";

export const BACKUP_DIR = "db-backups";

export interface BackupConfig {
  storage: BunnyStorage;
  recipient: string;
}

/**
 * Nightly backups need BACKUP_STORAGE_ZONE + BACKUP_STORAGE_KEY (a private
 * Bunny zone with no pull zone) and BACKUP_AGE_RECIPIENT (the public key
 * from `npm run backup:keygen`). BACKUP_STORAGE_HOST is optional. Returns
 * null when none are set, or an error when the setup is unsafe or partial.
 */
export function backupConfig(env = process.env): BackupConfig | { error: string } | null {
  const zone = env.BACKUP_STORAGE_ZONE;
  const key = env.BACKUP_STORAGE_KEY;
  const recipient = env.BACKUP_AGE_RECIPIENT?.trim();
  if (!zone && !key && !recipient) return null;
  if (!zone || !key || !recipient) {
    return { error: "Set all of BACKUP_STORAGE_ZONE, BACKUP_STORAGE_KEY and BACKUP_AGE_RECIPIENT." };
  }
  if (zone === env.BUNNY_STORAGE_ZONE) {
    return { error: "BACKUP_STORAGE_ZONE is the public logo zone. Backups need their own zone with no pull zone." };
  }
  if (!recipient.startsWith("age1")) {
    return { error: "BACKUP_AGE_RECIPIENT must be an age public key (age1…), never the private key." };
  }
  return { storage: bunnyStorage(zone, key, env.BACKUP_STORAGE_HOST || undefined), recipient };
}

export interface BackupResult {
  name: string;
  bytes: number;
  tables: { name: string; rows: number }[];
  deleted: string[];
}

/** Snapshot, encrypt, upload, then prune by the retention rule. */
export async function runBackup(db: Db, config: BackupConfig, now = new Date()): Promise<BackupResult> {
  const snapshot = await takeSnapshot(db);
  const sealed = await sealSnapshot(snapshot, config.recipient);
  const name = backupName(now);
  await config.storage.put(`${BACKUP_DIR}/${name}`, sealed);

  const existing = (await config.storage.list(BACKUP_DIR)).map((f) => f.name);
  const deleted = backupsToDelete(existing, now);
  for (const old of deleted) await config.storage.remove(`${BACKUP_DIR}/${old}`);

  return {
    name,
    bytes: sealed.byteLength,
    tables: snapshot.tables.map((t) => ({ name: `${t.schema}.${t.name}`, rows: t.rows.length })),
    deleted,
  };
}

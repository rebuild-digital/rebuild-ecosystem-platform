// Which backups to keep (plan §7.11): every backup from the last 14 days,
// plus the newest backup of each of the last 8 ISO weeks.

export const BACKUP_PREFIX = "db-";
export const BACKUP_SUFFIX = ".json.gz.age";

const DAYS = 14;
const WEEKS = 8;
const DAY_MS = 24 * 60 * 60 * 1000;

/** db-2026-09-24T0200Z.json.gz.age */
export function backupName(date: Date): string {
  const iso = date.toISOString(); // 2026-09-24T02:00:00.000Z
  return `${BACKUP_PREFIX}${iso.slice(0, 10)}T${iso.slice(11, 13)}${iso.slice(14, 16)}Z${BACKUP_SUFFIX}`;
}

export function backupDate(name: string): Date | null {
  const m = name.match(/^db-(\d{4}-\d{2}-\d{2})T(\d{2})(\d{2})Z\.json\.gz\.age$/);
  return m ? new Date(`${m[1]}T${m[2]}:${m[3]}:00Z`) : null;
}

/** Monday 00:00 UTC of the ISO week `date` falls in. */
function weekStart(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  return d.getTime() - ((d.getUTCDay() + 6) % 7) * DAY_MS;
}

/** Backup file names to delete. Names that aren't backups are never touched. */
export function backupsToDelete(names: string[], now: Date): string[] {
  const backups = names
    .map((name) => ({ name, date: backupDate(name) }))
    .filter((b): b is { name: string; date: Date } => b.date !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const keep = new Set<string>();
  const newestPerWeek = new Map<number, string>();
  for (const b of backups) {
    if (now.getTime() - b.date.getTime() < DAYS * DAY_MS) keep.add(b.name);
    const week = weekStart(b.date);
    if (!newestPerWeek.has(week)) newestPerWeek.set(week, b.name);
  }
  const oldestWeek = weekStart(now) - (WEEKS - 1) * 7 * DAY_MS;
  for (const [week, name] of newestPerWeek) if (week >= oldestWeek) keep.add(name);

  return backups.filter((b) => !keep.has(b.name)).map((b) => b.name);
}

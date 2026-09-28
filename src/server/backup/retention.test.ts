import { describe, expect, it } from "vitest";
import { backupDate, backupName, backupsToDelete } from "./retention";

const DAY = 24 * 60 * 60 * 1000;

describe("backup retention", () => {
  it("names backups by UTC time and parses them back", () => {
    const date = new Date("2026-09-24T02:00:00Z");
    expect(backupName(date)).toBe("db-2026-09-24T0200Z.json.gz.age");
    expect(backupDate(backupName(date))).toEqual(date);
    expect(backupDate("notes.txt")).toBeNull();
  });

  it("keeps 14 days of dailies plus the newest backup of each of the last 8 weeks", () => {
    const now = new Date("2026-09-24T02:00:00Z"); // a Thursday
    const names = Array.from({ length: 120 }, (_, i) => backupName(new Date(now.getTime() - i * DAY)));
    const deleted = new Set(backupsToDelete([...names, "README.txt"], now));
    const kept = names.filter((n) => !deleted.has(n));

    expect(deleted.has("README.txt")).toBe(false);
    // The last 14 days, all kept.
    for (const n of names.slice(0, 14)) expect(kept).toContain(n);
    // Older ones: only Sundays (the newest backup of an ISO week), back to 8 weeks.
    const older = kept.slice(14).map((n) => backupDate(n)!);
    expect(older.every((d) => d.getUTCDay() === 0)).toBe(true);
    expect(older.at(-1)!.getTime()).toBeGreaterThanOrEqual(now.getTime() - 8 * 7 * DAY);
    expect(kept.length).toBeLessThanOrEqual(14 + 8);
    expect(deleted.size).toBe(names.length - kept.length);
  });
});

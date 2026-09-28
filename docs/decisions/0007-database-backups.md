# 0007 — Database backups: in-app JSON snapshots, age-encrypted, on a private Bunny zone

- **Status:** Accepted
- **Date:** 2026-09-24

## Context
Risved's Postgres add-on isn't backed up by Risved (ADR 0005), and Risved Cloud gives no SSH access. The app container has no `pg_dump`, and the database is reachable only from inside the app. Plan §7.11 asks for nightly, encrypted, off-server backups, 14 daily + 8 weekly copies, and one test restore.

## Decision
- **The app backs itself up.** A Nitro plugin schedules a job with `croner` at 02:00 UTC, after migrations. `BACKUP_ON_BOOT=true` also runs one right after a deploy.
- **Logical snapshots in SQL, no `pg_dump`.** Every table in the `public` and `drizzle` schemas is exported with `json_agg`, in foreign-key order. Restore uses `json_populate_recordset`, so Postgres casts every value back to its column type (enums, jsonb, dates, uuids), then resets sequences. New tables, such as Better Auth's in Phase 3, are included automatically.
- **Encryption with age (X25519).** Official `age-encryption` library; files decrypt with the standard `age` CLI too. The server only has the **public** key. The private key stays in the maintainer's password manager, so a leaked server environment or storage password can't read backups.
- **Storage:** a **separate private Bunny zone with no pull zone**. The job refuses to run if it's the public logo zone.
- **Retention:** pruned after each run to 14 days + the newest backup of each of the last 8 ISO weeks.
- **Test restore:** `npm run db:restore -- --latest --identity <key>` restores into a throwaway PGlite and compares every table to the backup.

## Consequences
- No extra service, container or credentials beyond one Bunny zone.
- A snapshot holds data, not schema. Restore into a database migrated to the same code; the migration records travel in the backup, so a mismatch is visible.
- The whole database is built in memory: fine at this size (~150 KB encrypted for the directory). Revisit with streaming if it grows past tens of MB.
- **If the private key is lost, every backup is unreadable.** Keep it in the password manager, and consider a second copy with another trustee.
- There's no point-in-time recovery: worst case, a day of writes is lost (as accepted in ADR 0005).

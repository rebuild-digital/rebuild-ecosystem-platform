# 0005 — Postgres via Risved's add-on instead of Scaleway Managed PostgreSQL

- **Status:** Accepted
- **Date:** 2026-09-23
- **Supersedes:** the Database row of the plan's §2 stack table (Scaleway Managed PostgreSQL)

## Context
The plan chose Scaleway Managed PostgreSQL, and listed "self-host Postgres on the Risved box" as a contingency. Risved Cloud, our host, has a Postgres add-on: a Postgres container with its own Docker volume, next to the app on the same Hetzner server, reachable only on Risved's private `risved` Docker network. Risved injects `DATABASE_URL`, `POSTGRES_*` and `PG*` into build, release and runtime.

What Scaleway would have given us, and Risved doesn't:
- automated backups with point-in-time recovery (Risved backs up only its own config, not the database volume)
- isolation from the app server
- guaranteed encryption at rest
- TLS
- a master user plus the ability to create a limited app role
- managed upgrades

## Decision
Use Risved's Postgres add-on for Plane B. We take on the operational gaps ourselves:
- **Backups (plan §7.11):** a nightly logical backup, encrypted, shipped off the server to Bunny Storage (EU), plus one test restore. This must pass before Phase 2 is done. There's no SSH on Risved Cloud, so the job runs inside the app or a sibling Risved project; the mechanism is chosen in Phase 2.
- **TLS (§7.8):** not required while traffic stays on the host's private network. TLS becomes mandatory if the database moves off-host or is exposed.
- **Least privilege (§7.6):** create a limited app role if the Risved user can. If it can't, record that as an accepted risk, mitigated by private-network-only access.
- **Development:** your own local Postgres via `DATABASE_URL`; tests use PGlite (in-process). Migrations run at server boot (`src/server/migrateDb.ts`). The real database isn't reachable from a laptop.

## Consequences
- No extra provider, cost or credentials. One fewer processor in the DPA register (Risved/Hetzner now process the database; Scaleway stays for email only).
- The worst-case data loss is up to one day of writes (no point-in-time recovery). One server failure takes down both the app and the database; recovery is restoring the latest backup.
- The database shares CPU, memory and disk with the app. Watch capacity.
- **Exit:** if any of this becomes too fragile, especially once Phase 3 adds user personal data, move to Scaleway Managed PostgreSQL with `pg_dump`/`pg_restore`. Nothing in the schema or code is Risved-specific.
- **Never press "Remove"** on the Postgres card in Risved: assume it deletes the volume.

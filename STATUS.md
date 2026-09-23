# Rebuild Platform — Status

_Last updated: 2026-09-23_

## Where we are
**Phases 0 and 1 are complete. Phase 2 (Postgres + directory off Notion) is next.**
Phase 1 was signed off on 2026-09-23 without the parallel-run week (see `docs/decisions/0004-phase-1-signoff.md`). The SolidStart app runs on Risved staging; Eleventy stays in production until Phase 4.
Authoritative plan: `REBUILD_PLATFORM_TRANSITION_PLAN.md`. Agent conventions: `AGENTS.md` / `CLAUDE.md`.

**Re-sequenced 2026-09-23:** DNS cutover moved from Phase 2 to **Phase 4**, after Postgres (now 2) and Auth (now 3). Everything is built and proven on staging first; DNS is the last, isolated infra change. After cutover, only `BETTER_AUTH_URL` changes (staging → production) and the app is redeployed. No users exist before cutover, so there are no sessions to migrate.

## Locked decisions (quick reference)
- **Framework:** SolidStart, **server preset** (not static).
- **Hosting:** Hetzner via Risved. **DNS:** Cloudflare → Bunny (registration stays at GoDaddy).
- **DB:** Risved Postgres add-on + Drizzle (ADR 0005; Scaleway is the fallback). **Auth:** Better Auth, magic-link, invite-only.
- **Email:** Scaleway TEM. **Media:** Bunny Storage. **CMS (later):** Decap. **Analytics:** Pirsch now, Umami optional later.
- **Curation:** Drizzle Studio (solo, Phase 2) → Directus (team/PII, from Phase 3) → optional custom admin later.

## Phase status
| Phase | What | Status |
| --- | --- | --- |
| 0 | Decisions + plan | ✅ Done |
| 1 | SolidStart rebuild on Risved staging, feature-parity, still Notion+forms | ✅ Done (2026-09-23) |
| 2 | Postgres + migrate directory off Notion | ▶️ **Next** |
| 3 | Auth (Better Auth, invite-only, profiles, association, registration, badges) — built and tested on staging | ⬜ Pending |
| 4 | DNS cutover to Bunny + domain → Risved; `BETTER_AUTH_URL` → production | ⬜ Pending |
| 5 | Decap CMS for editorial | ⬜ Deferred (independent; can run alongside any phase) |

## Immediate next steps
**Close out Phase 1**
- Redeploy staging with `VITE_SITE_INDEXABLE` **unset** (#59 is merged). Confirm with `curl -sI <staging-url> | grep -i x-robots-tag`.

**Phase 2 (plan §Phase 2)**
1. ✅ Risved Postgres add-on enabled (2026-09-23); Risved injects `DATABASE_URL`. **Never press "Remove"** on it.
2. Add Drizzle, the `platforms` / `categories` / `platform_categories` schema (§2.2), a local Docker Postgres for development, and migrations that run on deploy.
3. Nightly encrypted off-server backup to Bunny Storage, plus one test restore (§7.11). Check whether the Risved user can create a scoped app role (§7.6).
4. Write the Notion → Postgres migration, including moving logos to Bunny (§2.3a). Dry-run it against the local Postgres and reconcile (§2.3).
5. Switch the directory read path to Postgres behind a feature flag. Select only `[public]` columns where `status = 'published'` (§2.4).

## Open items (from plan §9)
1. Platform-association rigor (self-serve vs approval).
2. Event-registration fields (reuse gathering form vs streamlined).
3. Who administers invites.
4. Postgres capacity on the shared Risved server; move to Scaleway if it outgrows it.
5. Notion retirement once the Postgres directory is verified (Phase 2).
6. Which external datasets feed badge matching.

## Needs confirmation
- Current live-site inventory: has rebuild.net changed since the docs were written (page/component count, RSS path `feed.xml` vs `rss.xml`, any new pages/forms)?

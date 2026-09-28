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
- **Curation:** Notion + re-import until our own `/admin` ships in Phase 3.5 (ADR 0008; Directus dropped).

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
2. ✅ Drizzle, the `platforms` / `categories` / `platform_categories` schema (§2.2, ADR 0006), migrations that run at server boot, and PGlite-backed tests.
3. Nightly encrypted off-server backup plus test restore (§7.11, ADR 0007). Built and tested end to end locally; **needs you:**
   1. In Bunny, create a **new storage zone with no pull zone** (e.g. `rebuild-backups`, EU region).
   2. Run `npm run backup:keygen`. Put the private key in your password manager and delete the file.
   3. In Risved, set `BACKUP_STORAGE_ZONE`, `BACKUP_STORAGE_KEY` (that zone's password), `BACKUP_AGE_RECIPIENT` (the printed `age1…` key) and `BACKUP_ON_BOOT=true`. Redeploy.
   4. The log should show `[backup] Uploaded db-….json.gz.age` and `[db] Connected as … createrole=…` (the §7.6 answer). Then unset `BACKUP_ON_BOOT`.
   5. Locally: put the backup zone's name and password in `.env`, then run `npm run db:restore -- --latest --identity <key file>`. It should end with "Test restore passed".
4. ✅ Notion → Postgres import with field-by-field reconciliation (§2.3). **Ran on Risved on 2026-09-24:** 844 rows, every data check PASS, logos 136/151 on Bunny.
   - **Accepted (2026-09-24):** 15 platforms stay without a logo. Their Notion links are dead, point to web pages, or block servers: GuruWalk, Almenr, Hostwire, Fate, Abeam, Semble, Hotel Hideaway, Ernit, BRYGHT, MoSo, MyLifeWith, Nexus Mods, Depop, PeoplePerHour, Clyx. The directory doesn't show logos today.
5. ✅ Directory read path behind `DIRECTORY_SOURCE` with Notion fallback (§2.4). Parity: 583/589 cards identical, and the rest are explained.
6. **Go live on Risved** (needs you):
   1. ✅ Set `NOTION_IMPORT=true`, redeployed, and checked the `[notion-import]` log (2026-09-24). **Unset it now.**
   2. Set `DIRECTORY_SOURCE=postgres`, redeploy, and check `/directory` (no `[directory]` fallback lines in the log).

**Curation until Phase 3.5 (ADR 0008):** the team keeps editing in Notion. To publish changes, set `NOTION_IMPORT=true` in Risved, redeploy, check the `[notion-import]` log, then unset it.

**Phase 2 verification (plan §Phase 2)**
- [x] Directory renders from Postgres, public columns only; counts match Notion; category filters work
- [x] No contact PII or internal fields in page source (all 385 contact emails, 272 names and 141 notes scanned)
- [x] Slugs generated and stable across re-runs (there are no platform URLs yet, so none can break)
- [x] Logos load from Bunny: 136/151. The other 15 are accepted without a logo (dead or blocked source links)
- [ ] The build no longer depends on Notion for the directory: after step 6 (Notion remains the fallback until retired, §9.5)
- [ ] Nightly off-server backup has run on Risved, plus one test restore (step 3; verified locally against a stand-in Bunny zone)
- [ ] §7.6 app role outcome recorded (step 3.4)

## Open items (from plan §9)
1. Platform-association rigor (self-serve vs approval).
2. Event-registration fields (reuse gathering form vs streamlined).
3. Who administers invites.
4. Postgres capacity on the shared Risved server; move to Scaleway if it outgrows it.
5. Notion retirement once the Postgres directory is verified (Phase 2).
6. Which external datasets feed badge matching.

## Needs confirmation
- Current live-site inventory: has rebuild.net changed since the docs were written (page/component count, RSS path `feed.xml` vs `rss.xml`, any new pages/forms)?

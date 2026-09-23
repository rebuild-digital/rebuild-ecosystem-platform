# Rebuild Platform — Status

_Last updated: 2026-09-23_

## Where we are
**Phase 0 (architecture + planning) is complete. Phase 1 (SolidStart rebuild) is in progress.**
Authoritative plan: `REBUILD_PLATFORM_TRANSITION_PLAN.md`. Agent conventions: `AGENTS.md` / `CLAUDE.md`.

**Re-sequenced 2026-09-23:** DNS cutover moved from Phase 2 to **Phase 4**, after Postgres (now 2) and Auth (now 3). Everything is built and proven on staging first; DNS is the last, isolated infra change. After cutover, only `BETTER_AUTH_URL` changes (staging → production) and the app is redeployed. No users exist before cutover, so there are no sessions to migrate.

## Locked decisions (quick reference)
- **Framework:** SolidStart, **server preset** (not static).
- **Hosting:** Hetzner via Risved. **DNS:** Cloudflare → Bunny (registration stays at GoDaddy).
- **DB:** Scaleway Managed PostgreSQL + Drizzle. **Auth:** Better Auth, magic-link, invite-only.
- **Email:** Scaleway TEM. **Media:** Bunny Storage. **CMS (later):** Decap. **Analytics:** Pirsch now, Umami optional later.
- **Curation:** Drizzle Studio (solo, Phase 2) → Directus (team/PII, from Phase 3) → optional custom admin later.

## Phase status
| Phase | What | Status |
| --- | --- | --- |
| 0 | Decisions + plan | ✅ Done |
| 1 | SolidStart rebuild on Risved staging, feature-parity, still Notion+forms | ▶️ **In progress** |
| 2 | Postgres + migrate directory off Notion | ⬜ Pending |
| 3 | Auth (Better Auth, invite-only, profiles, association, registration, badges) — built and tested on staging | ⬜ Pending |
| 4 | DNS cutover to Bunny + domain → Risved; `BETTER_AUTH_URL` → production | ⬜ Pending |
| 5 | Decap CMS for editorial | ⬜ Deferred (independent; can run alongside any phase) |

## Immediate next steps (Phase 1 — see `PHASE_1_BRIEF.md`)
1. Create Risved account, connect the repo, confirm the SolidStart app deploys to staging.
2. Capture current Cloudflare DNS records now (cheap insurance for Phase 4).
3. Finish the SEO & URL preservation gate (plan §1.7): redirect map, canonicals, sitemap/RSS, staging `noindex`.
4. Walk `PHASE_1_TEST_CHECKLIST.md` against staging.

## Open items (from plan §9)
1. Platform-association rigor (self-serve vs approval).
2. Event-registration fields (reuse gathering form vs streamlined).
3. Who administers invites.
4. Scaleway PG sizing / when to add HA, based on traffic.
5. Notion retirement once the Postgres directory is verified (Phase 2).
6. Which external datasets feed badge matching.

## Needs confirmation
- Current live-site inventory: has rebuild.net changed since the docs were written (page/component count, RSS path `feed.xml` vs `rss.xml`, any new pages/forms)?

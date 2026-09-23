# 0001 — Render on request; cache the data, not the pages

- **Status:** Accepted
- **Date:** 2026-09-23 (PRs c6bcb87, 323c4d2, #51, #53)

## Context
The plan (§1.3) sketched a "build-time/server fetch" for the Notion directory. In practice:
- Build-time prerendering produced empty `/` and `/directory` pages, because Notion credentials aren't available during the Risved Docker build.
- Nitro `swr` route rules never applied: vinxi registers the SolidStart SSR router as middleware, and Nitro only caches handlers registered as routes.

## Decision
- Every page is server-rendered on request, with no prerendering and no page cache.
- The external data modules (`src/data/builders.ts` for Notion, `src/data/espea.ts`) keep an in-memory copy and a `.cache/` file copy. They serve the cached copy and refresh it in the background (stale-while-revalidate, with deduplicated requests).
- A Nitro plugin (`src/server/warmDataCaches.ts`) starts both fetches at boot, so the first visitor after a deploy doesn't wait on Notion (~4–5 s) or ESPEA (~2–4 s).
- The builders list is shuffled once per day from an id-sorted order (`src/lib/dailyOrder.ts`), so the server and client, and every cache path, agree on the order.

## Consequences
- Warm renders take ~3–30 ms, and a Notion outage serves the last good copy (the "cache fallback" acceptance item).
- Code bundled into the Nitro plugin must use **relative imports**. Nitro resolves `~` to the project root, not `src/`, which broke the build once (#59).
- Phase 2 replaces the Notion fetch with a Postgres query. The caching layer may become unnecessary for the directory at that point.

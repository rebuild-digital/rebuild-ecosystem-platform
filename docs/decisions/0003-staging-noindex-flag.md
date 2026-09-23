# 0003 — noindex by default; production opts in with VITE_SITE_INDEXABLE

- **Status:** Accepted
- **Date:** 2026-09-23 (#59)

## Context
Plan §1.7 requires staging to be `noindex` and production indexable. The app hard-coded `index, follow`, so the live Risved staging site could be indexed.

## Decision
- `VITE_SITE_INDEXABLE=true` (read at build time, like `VITE_SITE_URL`) is the only way to make a build indexable.
- Otherwise, pages get `<meta name="robots" content="noindex, nofollow">`, and a `/**` Nitro route rule adds `X-Robots-Tag: noindex, nofollow` to every response, including the feed, the sitemap and static downloads.
- `robots.txt` keeps allowing crawls, since a crawler that's blocked never sees the `noindex`.

## Consequences
Forgetting the flag fails safe: the site stays hidden rather than leaking staging. The Phase 4 cutover must set `VITE_SITE_INDEXABLE=true` and the production `VITE_SITE_URL`, then redeploy (plan §4.2).

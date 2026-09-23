# 0004 — Phase 1 signed off without the parallel-run week

- **Status:** Accepted
- **Date:** 2026-09-23

## Context
Phase 1's brief called for about a week of parallel running on staging before sign-off. Time pressure doesn't allow that.

## Decision
Phase 1 is marked done on 2026-09-23, on these grounds:
- Staging is deployed on Risved.
- The maintainer walked `PHASE_1_TEST_CHECKLIST.md` on staging.
- The Cloudflare DNS records are captured, stored outside the repo rather than in `compliance/`.

Accepted as-is:
- `/directory` serves ~1.14 MB of uncompressed HTML (#54). Judged negligible for now.

## Differences from the plan, recorded for accuracy
- The RSS feed lives at `/feed.xml` (the Eleventy path), not `rss.xml`.
- There are six forms, not five: a Rebuild 3 invitation form was added.
- `robots.txt` blocks AI crawlers (GPTBot, CCBot, Google-Extended and others).
- The directory fetch runs at request time with caching, not at build time (ADR 0001).
- Beyond strict parity, the site gained a design system (`DESIGN.md`), a 404/500 page and page transitions (ADR 0002).

## Consequences
Latent issues that a week of real traffic would have surfaced may appear during Phase 2. The Eleventy site stays in production until Phase 4, so the rollback is still zero-impact.

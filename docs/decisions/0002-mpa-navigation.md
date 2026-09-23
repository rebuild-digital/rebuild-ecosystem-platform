# 0002 — Multi-page navigation with CSS transitions

- **Status:** Accepted
- **Date:** 2026-09-23 (PRs 323c4d2, #39)

## Context
With client-side (SPA) navigation, every internal link click triggered a `/_server` round-trip to the upstream data sources, and page changes took 20+ s.

## Decision
- The router uses `explicitLinks`, so plain `<a>` links do full page loads (MPA).
- A small inline head script adds a fade between pages. Between non-home pages the header stays in place. It honours `prefers-reduced-motion` and bfcache, and uses speculation-rules prefetch on hover.

## Consequences
Navigation is fast and simple, and each page is a full document (good for SEO parity). Client state doesn't survive navigation. Anything that needs to (for example a logged-in session UI in Phase 3) must come from the server or cookies, not in-memory signals.

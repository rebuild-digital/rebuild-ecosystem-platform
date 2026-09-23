# 0006 — Directory schema: what we take from Notion, and how

- **Status:** Accepted
- **Date:** 2026-09-23

## Context
Before writing the schema, I checked the plan's §2.2 against the live Notion Platforms database: 845 rows, 590 published, 35 properties. Findings:
- **COUNTRY** is a multi-select (the plan assumed single). Only 1 published platform has more than one country.
- **Stage** and **Founding Year** exist (25 and 93 published rows), but the Phase 1 code reads `STAGE` and `YEAR FOUNDED`, so they're always empty. The same goes for `Image` instead of `LOGO`, and `TAGS` and `Order`, which don't exist. The directory UI uses none of these fields, so nothing is visibly broken.
- About 20 **business-metric** properties the plan didn't mention, such as Total Capital Raised (279 rows), team sizes, rounds, Confidence, Domain, Investors, Founder Median Age, Total Users and MRR. Five are completely empty.
- **NOTES** is a rich-text property, not the page body. **PRIORITY** options are `Top | Next | Last | Save 4 Later | Discarded`.

## Decision
- `country`: a single text column. The migration keeps the first value and lists any platform that had more.
- `stage` (enum) and `foundingYear` (int): **[public]** columns, ready for a platform page (#17).
- The populated metrics go into one **[internal]** `enrichment` jsonb column. The five empty properties aren't migrated. A metric becomes a real column only when a feature needs it.
- `notionId` (**[internal]**, unique) keeps the source page id, so the migration can be re-run idempotently and reconciled.
- Public reads go through `publicPlatformColumns` in `src/server/db/schema.ts`. A PGlite test asserts it never returns internal values.

## Consequences
- The schema stays lean and lossless for everything populated.
- `enrichment` holds business data about platforms. It isn't PII, but `Founder Median Age` can come close for tiny teams, so it stays internal.
- The Phase 1 Notion reader's wrong property names stop mattering once the directory reads from Postgres. Until then they're harmless dead fields.

# 0000 — The transition plan is ADR #0

- **Status:** Accepted
- **Date:** 2026-09-23

## Context
The locked stack (SolidStart server preset, Risved/Hetzner, Scaleway Postgres, Better Auth, Bunny, Decap) and its phasing were decided up front, in one document.

## Decision
`REBUILD_PLATFORM_TRANSITION_PLAN.md` is the founding decision record. The records in this folder cover choices made *during* implementation, and where the build departs from the plan.

Phase order as re-sequenced on 2026-09-23 (#58): 1 Rebuild → 2 Postgres → 3 Auth → 4 DNS → 5 CMS. DNS moved last, so everything is proven on staging first and the cutover only changes nameservers and a few env vars.

## Consequences
When a choice here contradicts the plan, update the plan so it stays accurate.

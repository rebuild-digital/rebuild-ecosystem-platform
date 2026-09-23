# AGENTS.md

Conventions for any AI agent (Claude Code, etc.) working in this repository. Read this first, every session. The authoritative plan is `REBUILD_PLATFORM_TRANSITION_PLAN.md`.

## What this project is
The Rebuild platform: a directory of European social platforms plus, increasingly, an app with invited user accounts. Being rebuilt from Eleventy to **server-rendered SolidStart**, moved to **European self-hosted infrastructure**, and given **user accounts**. It is intended to be open-sourced and reskinned by others, so keep everything legible and self-hostable.

## Stack (do not substitute without a decision record)
- **Framework:** SolidStart (SolidJS), **server preset (Nitro/node-server)** — never the static preset (auth needs a runtime).
- **Hosting:** Hetzner via Risved (git-push deploys).
- **DB:** Scaleway Managed PostgreSQL, accessed via **Drizzle** (typed schema + migrations).
- **Auth:** Better Auth, **magic-link**, **invite-only** (no public signup).
- **Email:** Scaleway TEM. **DNS:** Bunny. **CDN/media:** Bunny Storage. **CMS (later):** Decap.

## The two data planes (never conflate)
- **Plane A — editorial content** (insights, page copy): lives as Markdown/YAML in git, edited via Decap. Renders through the block registry.
- **Plane B — application data** (users, platforms/directory, taxonomy, associations, registrations, badges): lives in Postgres via Drizzle.
- The **directory is Plane B** (Postgres), not CMS content.

## Hard rules
1. **Public vs internal columns.** Tables carry `[public]` and `[internal]` fields. Server load functions and APIs return **only the fields the page needs** — never whole rows. The public directory returns public columns only; **never** expose contact PII, `status`, `priority`, `notes`, or any `[internal]` field to the client.
2. **PII discipline.** Never log emails, tokens, or magic-link URLs (log user *ids*). No PII in analytics event props. See plan §7.
3. **TLS to DB** (`sslmode=require`). App connects with the **scoped app role**, not the master DB user.
4. **Block components live in code** (`src/components/blocks/` + `registry.ts`); the CMS only references them. Pages are ordered arrays of typed blocks rendered via `<Dynamic>`.
5. **Media:** store files in Bunny Storage, store only URLs in Postgres. Never persist expiring third-party (e.g. Notion) file URLs.
6. **Additive & reversible.** New tables, feature flags, staging first. Don't do destructive changes without a rollback path.
7. **Deletes cascade** across user-owned tables (`profiles`, `user_platforms`, `user_badges`, `event_registrations`).
8. **Errors never reach the client raw.** Solid serializes thrown errors (message, stack, server paths) to the browser. Wrap every `"use server"` query body in `guardServer()` (`src/lib/guardServer.ts`); page errors go through `SafeErrorBoundary`, already in `app.tsx`.

## Building features (applies to every UI or code change)
These three rules are repeated in `CLAUDE.md` and `DESIGN.md` on purpose. They are not optional polish. A PR that breaks them is not done.

1. **Design from `DESIGN.md`.** Read the relevant sections of `DESIGN.md` (tokens, components, states, accessibility, motion, voice) before building any feature, and follow them. The design system decides colors, type, spacing, radius, motion and copy. Personal taste doesn't.
2. **Reuse before you create.** Build from the existing components (`src/components/`, `src/components/blocks/`), utilities (`src/lib/`, `src/app.css`) and patterns described in `DESIGN.md`. Being "on brand" doesn't justify a new component. The bar is *nothing existing can do this*. In order of preference:
   - use an existing component as is;
   - compose existing components;
   - extend an existing component with a variant or prop;
   - only then create a new one, and document it in `DESIGN.md` §Components in the same PR.

   Don't create near-duplicates (a second card, button, badge, section wrapper, etc.). This rule exists to prevent codebase bloat.
3. **Follow best practice, the Solid way.** Write DRY, accessible, performant code, and use what SolidJS/SolidStart provide instead of porting React habits:
   - **DRY:** extract shared logic and markup once. Don't copy-paste blocks between routes or components. Reuse tokens and utilities, never hard-coded values.
   - **Accessible:** meet WCAG 2.1 AA from the start. Use semantic HTML first and ARIA only where needed. Every interactive element needs keyboard support and a visible focus state, and every animation needs a reduced-motion guard (see `DESIGN.md` §Accessibility).
   - **Performant:** render on the server by default and ship minimal client JS. Lazy-load heavy or below-the-fold pieces with `lazy()`. Size and lazy-load images. Don't add dependencies without need.
   - **Idiomatic Solid:**
     - Use fine-grained reactivity. Don't destructure props; use `splitProps`/`mergeProps`.
     - Derive values with plain functions or `createMemo`, not `createEffect` plus a signal. Keep `createEffect` for real side effects, and clean up with `onCleanup`.
     - Use control-flow components (`<Show>`, `<For>`/`<Index>`, `<Switch>`/`<Match>`, `<Dynamic>`) instead of ternaries and `.map()`.
     - Use `createStore` for nested state.
     - Load data with `query`/`createAsync` (and preload) and mutate with `action`. Use `"use server"` functions for server-only code.
     - Wrap async UI in `<Suspense>`/`<ErrorBoundary>`.

## Workflow
- Work **one phase at a time** (see the plan's phases). A phase's **Verification list is its acceptance criteria** — not done until all pass in staging.
- Small, single-purpose PRs. Don't start the next phase until the current one is verified.
- Before Phase 3 ships, the **Security/PII checklist (§7)** must be satisfied — it's a hard gate.
- Record significant choices in `docs/decisions/` (one short ADR each).
- **Every follow-up gets an issue.** List work a PR leaves undone under a `## Follow-ups` heading (or "Not in this PR" / "Saved for later"). Before opening the PR, check each item against open issues (`gh issue list --search "<keywords>"`). If one exists, link it; if not, create it with enough context to act on without the PR (what, where in the code, which DESIGN.md or plan section, acceptance), labelled `follow-up`. Then end each bullet with its issue number, e.g. "Skeleton fallbacks (#47)". When a PR merges, `.github/workflows/follow-up-issues.yml` creates a bare issue for any bullet still without a `#number` and comments the links on the PR. That's a safety net, not a substitute: its issues only quote the bullet.

## Testing (proportionate)
Unit: pure logic (slugs, dates, block registry, migration transforms). Integration: auth/invite flows + the "no `[internal]` column leaks" guarantee. E2E (Playwright): home/directory + invite→login→edit→register. Test the things that would be *quietly wrong* (PII leaks, auth gates, migration data loss).

## Verify current docs before trusting sketches
Schema and config in the plan are **sketches**. For Better Auth (now under new ownership) and Directus, check the current official docs before implementing.

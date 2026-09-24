# 0008 — A custom curation admin instead of Directus

- **Status:** Accepted
- **Date:** 2026-09-24
- **Supersedes:** plan §2.5's Directus step ("graduate to Directus at Phase 3")

## Context
Moving the directory into Postgres left Notion doing only one job: the team's editing UI. The plan bridged that with Drizzle Studio (solo), then Directus (team, from Phase 3), with a custom `/admin` as an optional later destination.

Two things changed:
- **Drizzle Studio can't reach the database.** Risved's Postgres is private to Risved (ADR 0005).
- **Directus conflicts with the project's independence goal.** It's made by Monospace Inc., a US company, under the source-available BSL 1.1, which the vendor can change. Self-hosting would keep the data in the EU, but the tool's licence and roadmap would still sit with a US vendor, and the open-source blueprint would ship with a non-OSI dependency.

We looked for a European equivalent that edits *existing* tables in place with per-field permissions and found none. Strapi (France) and Baserow (Netherlands) want to own their own tables. Budibase (UK) can connect to external Postgres, but it's a heavy extra stack with hand-built screens. Pimcore, Sulu and Wagtail are full CMSs with their own data models.

## Decision
- **Skip Directus.** Build the planned custom SolidStart `/admin` as plan §3.5, right after Better Auth and its admin role (§3.1–3.2). It's scoped to what the team uses in Notion today:
  - saved views (backlog / in review / published) and search
  - an edit form (status, priority, ordered categories, notes, contact fields, logo upload to Bunny)
  - adding a platform
  - a small `audit_log`
- **Until then, the team keeps curating in Notion**, and changes reach the site through the idempotent import (`NOTION_IMPORT=true`, redeploy).
- **At cut-over**, the import is retired and the Notion database archived, since a later import would overwrite admin edits.
- Decap (Phase 5) moves to `/admin/content`, so all admin tooling sits under `/admin`.

## Consequences
- **No vendor dependency** for curation: MIT code in this repo, EU-hosted, and reskinnable with the rest of the blueprint.
- **Field-level access is enforced by design:** each admin server function selects and updates named columns for a given role. There's no generic table editor to misconfigure.
- **More work than installing Directus.** It's a sequence of small PRs in Phase 3, reusing `DESIGN.md` components and the existing schema, import and Bunny code. Features Directus has for free (kanban, arbitrary layouts, a rich activity log) are built only if a real need appears.
- **Curation stays in Notion longer**, and changes go live only when the import runs. Acceptable while the directory changes slowly.
- The admin grows naturally toward issue #10 (an ecosystem admin dashboard) without a second tool.

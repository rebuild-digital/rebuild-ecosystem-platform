# Rebuild Platform Transition Plan

> **Status:** Architecture locked, ready for phased implementation.
> **Supersedes/extends:** `SOLIDSTART_MIGRATION_PLAN.md` (which assumed a static-export SolidStart on Vercel; this plan replaces that with a server-rendered SolidStart on European infrastructure, plus user accounts and a CMS).
> **Primary implementer:** Claude Code, phase by phase.
> **Non-negotiable constraint throughout:** European data sovereignty (EU-incorporated providers, no US CLOUD Act exposure) and self-hostable, open-sourceable architecture.

---

## 1. What this plan does

Three intertwined workstreams, sequenced so each changes **one variable at a time**:

1. **Framework:** Eleventy (Nunjucks + vanilla JS) → **SolidStart** (SolidJS, server-rendered).
2. **European service migration:** hosting → **Hetzner via Risved**; DNS → **Bunny** (registration stays at GoDaddy); the directory data source → off **Notion** into **Postgres**.
3. **User accounts feature:** invite-only accounts for **ecosystem participants** (group one), with profile editing, platform association, and event registration.

Plus a fourth, deliberately deferred: an editorial **CMS (Decap)** for insights/pages, and a **block-based component architecture** built during the rebuild so pages can be composed from reusable, reorderable components.

---

## 2. The locked stack

| Concern | Choice | Why (short) |
| --- | --- | --- |
| Framework | SolidStart (SolidJS), **server preset (Nitro/Node)** | Auth needs a runtime; static export cannot host sessions/magic links. JSX familiarity for the maintainer. |
| Hosting / deploy | Hetzner VPS via **Risved** | EU (Hetzner DE/FI), single-tenant, git-push deploys, AGPL, first-class SolidStart support. |
| DNS | **Bunny DNS** (nameservers Cloudflare → Bunny) | EU provider; consolidates with existing Bunny CDN/fonts. Registration stays at GoDaddy. |
| Database | **Risved Postgres** (adjacent container on the Risved-managed Hetzner server) | Already part of the hosting; EU (Hetzner), no extra processor or cost; reachable only on Risved's private network. Relational fit for taxonomy + concurrent writes. Backups are ours to run (§7.11). See ADR 0005. |
| ORM | **Drizzle** | Typed schema + migrations; native Postgres; works with Better Auth. |
| Auth | **Better Auth**, magic-link (passwordless), invite-only | Self-hostable library (runs in-app, on your infra — sovereignty unaffected by its Vercel ownership); official SolidStart integration. |
| Transactional email | **Scaleway TEM** | EU (France), ~€0.25/1,000, API+SMTP; sends magic links + notifications. |
| Editorial CMS | **Decap** (deferred phase) | Git-based, framework-agnostic admin (drops into SolidStart cleanly), zero extra datastore, clone-and-go for open-sourcing. |
| CDN / assets / fonts | **Bunny** (existing) | EU-founded; already in use. |
| Analytics | **Pirsch** now; **Umami** (self-hosted) optional later | Pirsch is already EU (Germany). Umami is the self-hostable upgrade if you want to own it — MIT, cookieless, single Node+Postgres container on Risved. Not urgent. |
| Newsletter | **MailerLite** (existing) | Lithuania; already EU. |

**Contingencies documented, not adopted now:**
- If Better Auth's roadmap (now Vercel-steered) ever diverges badly → **Ory (Kratos)**, German-founded, self-hostable. Your auth data is in your own Postgres schema, so an exit is contained.
- If running Postgres ourselves proves too fragile (backups, isolation from the app server, capacity) → **Scaleway Managed PostgreSQL** (French, EU-only, automated backups + PITR, encryption at rest). Migration is `pg_dump`/`pg_restore` (all just Postgres).
- If Decap's editing UX proves too thin → run **Keystatic**'s admin as a standalone React app against the same repo (its Reader API reads fine into Solid; only its React admin needs separate hosting).

---

## 3. The two data planes (read this before building anything)

The single most important conceptual split in this project. Conflating these is the main architectural risk. **They are different systems with different storage, different editors, and different lifecycles.**

### Plane A — Editorial content
- **What:** insights posts, static page copy, marketing/narrative content.
- **Editors:** the Rebuild team (and future contributors).
- **Storage:** git-based, as Markdown/YAML in the repo.
- **Tooling:** Decap CMS (deferred phase) writing into the block schema.
- **Lifecycle:** version-controlled, reviewed, published via commits. Clones with the open-source blueprint.

### Plane B — Application data
- **What:** user accounts, the **platform directory** records, taxonomy/categories, user↔platform associations, event registrations.
- **Editors:** the app itself and (for their own profiles/platforms) logged-in users.
- **Storage:** **Postgres** (Risved-managed container), via Drizzle.
- **Tooling:** SolidStart server routes + Better Auth.
- **Lifecycle:** live, concurrent, user-mutable; backed up off the server by our own nightly job (§7.11).
- **Public vs internal fields:** even within Plane B, not every field is public. The directory table alone carries **contact PII** (contact name + email) and **curation-only fields** (priority, notes, status) that must never render publicly. So the split is not just "content vs app data" — it's also **public columns vs admin-only columns within a single table**. This is what makes field-level permissions (Directus) matter, not just table-level ones.

### The crucial reframing
The **directory is Plane B, not Plane A.** It currently lives in Notion as if it were editorial content, but the moment ecosystem participants can edit their own platform profiles, it becomes user-editable application data. **So the directory migrates from Notion → Postgres, NOT into the CMS.** The CMS only ever touches Plane A (insights/pages).

---

## 4. Block-based component architecture (built during the rebuild, CMS-agnostic)

Requirement: reusable components that can be placed across pages and reordered. This is the "blocks" pattern, and it is decoupled from the CMS decision.

**Components live in one place — the SolidStart repo — and the CMS only references them.**

```
src/components/blocks/
  Hero.tsx
  FeatureGrid.tsx
  Quote.tsx
  CarouselBlock.tsx
  ...
  registry.ts        // { hero: Hero, featureGrid: FeatureGrid, quote: Quote, ... }
```

- A page is stored as an **ordered array of typed blocks**: `blocks: [{ type: "hero", ...fields }, { type: "quote", ...fields }]`.
- The renderer walks the array and resolves each block through the registry using SolidStart's `<Dynamic>`:

```tsx
<For each={page.blocks}>
  {(block) => <Dynamic component={registry[block.type]} {...block} />}
</For>
```

- **Single source of truth for UI** = the block components in code. The CMS stores only which blocks, in what order, with what field values.
- **Reskinning the open-source blueprint** = swap component implementations, keep schema/content — or swap content, keep components.
- Because the block system is pure code, it is built in Phase 1 (the rebuild) and the CMS (Phase 5) is just an editing layer bolted on afterward. **This is why the CMS decision can safely come last.**

---

## 5. Execution order (and why)

| Phase | Workstream | One variable changed | Rollback anchor |
| --- | --- | --- | --- |
| 0 | Decisions + this doc | — | — |
| 1 | SolidStart rebuild on Risved/Hetzner, **feature-parity**, still reading Notion + markdown | Framework + host | Eleventy site still live; SolidStart on staging subdomain only |
| 2 | Postgres + migrate directory off Notion | Directory data source | Keep Notion read path behind a flag until verified |
| 3 | **Auth feature** (Better Auth, magic link, profiles, platform association, event registration) | New stateful feature | Feature-flag/gate; DB is additive |
| 4 | **DNS cutover** to Bunny + point domain at Risved | DNS only | Revert nameservers to Cloudflare |
| 5 | Decap CMS for editorial content | Editorial editing layer | Content already in git; CMS is additive |

Sequencing rationale:
- **Directory to Postgres before auth:** users will edit platform profiles, so the directory must already be app-data in Postgres when auth arrives.
- **Auth before DNS:** build and fully test auth on staging; then cut DNS over and update `BETTER_AUTH_URL` to the production domain. No real users exist before the cutover, so there are no sessions to migrate — just one env var to update and redeploy.
- **DNS is isolated and last of the infra changes.** Highest blast radius (breaks site *and* email if wrong), so it's done alone, after everything else is proven on staging.
- **CMS is independent.** It can run parallel to or after any other phase.

---

## Phase 1 — SolidStart rebuild on Risved/Hetzner (feature parity)

**Goal:** the current site, rebuilt in server-rendered SolidStart, deployed to Risved on a staging subdomain, behaving identically to today. No new features, no DNS change, no DB yet. Notion + markdown remain the data sources exactly as now.

### 1.1 Project setup
- Scaffold SolidStart (TypeScript, with Tailwind).
- **Set the server preset, NOT static.** In `app.config.ts`, use the Nitro **node-server** preset (the deployable-runtime target), because later phases need a live server:
  ```ts
  import { defineConfig } from "@solidjs/start/config";
  export default defineConfig({
    server: { preset: "node-server" },
  });
  ```
- Port assets, `main.css`, and Tailwind config from the Eleventy repo.

### 1.2 Layout + components (per the old plan, but as blocks where relevant)
- Convert `base.njk` → `Layout.tsx`, `header.njk` → `Header.tsx`, `footer.njk` → `Footer.tsx`.
- Stand up the **block registry** (Section 4). Convert repeating page sections (hero, previews, carousel, feature grids) into block components registered in `registry.ts`.
- Conversion patterns: `{% if %}` → `<Show>`, `{% for %}` → `<For>`, `{{ var }}` → `{var()}`, class-based state → `createSignal`/`createMemo`, lifecycle → `onMount`/`onCleanup`.

### 1.3 Data layer (unchanged sources this phase)
- `builders.js` (Notion) → `src/data/builders.ts`, keep build-time/server fetch + cache fallback. **Do not migrate off Notion yet** — that's Phase 2.
- `site.js` → typed `src/data/site.ts`.
- Insights markdown → MDX collection utility.

### 1.4 Interactive components
- DirectoryFilter, InsightsFilter, Carousel, FormSidebar → Solid components with signals/memos (per the interactive-components section of the old plan).

### 1.5 Forms
- Keep the existing form backends working (Bunny Edge Script / MailerLite / Notion) so behaviour is identical. Wire SolidStart forms to the current endpoints; do **not** rebuild the backend yet.

### 1.6 Deploy to Risved (staging)
- Connect the git repo to Risved; confirm it auto-detects SolidStart and builds the node-server output.
- Configure env vars in Risved (encrypted): `NOTION_TOKEN`, `NOTION_BUILDERS_DB_ID`, Bunny CDN vars, Pirsch, MailerLite, `VITE_SITE_URL` (staging URL for now).
- Deploy to a **staging subdomain** (e.g. `next.rebuild.net` or a Risved-provided URL). Parallel-run against the live Eleventy site.

### 1.7 SEO & URL preservation gate (do NOT skip — a framework swap is where sites quietly lose search ranking)
Before this phase can be marked done, all of the following must hold:
- **URL parity:** every existing URL either resolves to the same content or **301-redirects** to its new location. Produce an explicit **redirect map** from the old Eleventy routes; add redirects in SolidStart (or Risved/Nitro route rules) for anything that changed.
- **Canonical tags** on every page point to the correct absolute URL.
- **`sitemap.xml` and `rss.xml`** generate and match (or supersede) the old ones; **meta + Open Graph/social tags** present and correct on every page.
- **No accidental `noindex`:** confirm staging is `noindex` (so Google doesn't index the staging subdomain) and production is indexable — this flips at Phase 4.
- **Post-cutover (after Phase 4):** submit the new sitemap in Google Search Console + Bing Webmaster Tools; watch Coverage/crawl errors for two weeks.

### Verification
- Every page renders at parity; directory filters 100+ builders; insights sort/filter; carousel autoplay + keyboard nav; mobile menu; forms submit; RSS + sitemap generate; meta/social tags present; Lighthouse ≥ 90; **redirect map complete and tested; canonicals correct; staging is `noindex`.**

### Rollback
- Eleventy site remains the production site on the current host. SolidStart is staging-only; abandoning is zero-impact.

---

## Phase 2 — Postgres + migrate the directory off Notion

**Goal:** stand up Postgres (Risved's managed add-on), model the directory + taxonomy in Drizzle, migrate the Notion directory data into it, and switch the site's directory read path to Postgres. Rendering is unchanged; only the source moves.

### 2.1 Provision
- Enable **Risved's Postgres add-on** for the project. Risved injects `DATABASE_URL` (plus `POSTGRES_*`/`PG*`) into build, release and runtime. The database is reachable only on Risved's private Docker network, not from a laptop.
- **Never press "Remove"** on the Postgres card in Risved: assume it deletes the volume and the data.
- **Local development** uses a local Postgres (Docker). Schema migrations run on deploy (Drizzle migrations in the release/boot step), not from a laptop against the real database.
- **Least-privilege role (§7.6):** check whether the Risved-provided user can create a limited app role. Record the outcome.
- **Off-server backups (§7.11):** set up the nightly backup job and do one test restore.
- Add **Drizzle** (`drizzle-orm`, `drizzle-kit`, `postgres`/`pg`).

### 2.2 Schema (Plane B — directory + taxonomy)

Mapped from the actual Notion "Platforms" database. Each Notion property is tagged **[public]** (renders on the site) or **[internal]** (curation/admin only, never public).

```ts
// platforms — the directory entries (migrated from Notion)
platforms: {
  id,
  slug (unique),                 // NOT in Notion — generated from name; needed for URLs
  name,                          // [public]   Notion Title
  description,                   // [public]   Notion "DESCRIPTION" (rich text)
  website,                       // [public]   Notion "WEBSITE" (URL)
  country,                       // [public]   Notion "COUNTRY" (single select)
  logoUrl,                       // [public]   Notion "LOGO" (file) — see 2.3a media note
  // --- internal / curation only ---
  status,                        // [internal] publication state (from "PUBLISHED" checkbox) — see below
  priority,                      // [internal] curation triage (Notion "PRIORITY" select) — see below
  contactName,                   // [internal] Notion "CONTACT NAME" — PII
  contactInfo,                   // [internal] Notion "CONTACT INFO" (email) — PII
  notes,                         // [internal] Notion page body "NOTES"
  publishDate,                   // [internal] Notion "Publish Date" (date)
  createdAt,
  updatedAt                      // seed from Notion "Last edited"
}

// categories — taxonomy (from Notion "CATEGORY", confirmed MULTI-select)
categories: { id, slug (unique), name }

// platform_categories — many-to-many (a platform can have several categories)
platform_categories: { platformId → platforms.id,
                       categoryId → categories.id }  // PK (platformId, categoryId)
```

**Two separate curation axes (corrected).** Notion had two orthogonal fields, and they stay separate in Postgres rather than being merged:

- **`status`** = publication lifecycle, from the **PUBLISHED checkbox**. Enum: `published | draft`. Migration: checkbox **checked → `published`**, unchecked → `draft`. The public directory query filters `where status = 'published'` — reproducing exactly what the checkbox did.
- **`priority`** = curation triage, from the **PRIORITY select** (confirmed single-select). Enum, verbatim from Notion: `top | next | last | save_for_later | discarded`. Never public; drives the team's backlog ordering only.

This keeps the model faithful and lossless. Note that `discarded` platforms are also `draft` (so they never render publicly); if you want them excluded from the working backlog view too, that's a Directus saved-view filter (`priority != discarded`), not a schema change. **CATEGORY is confirmed multi-select**, so the many-to-many join is exactly right — this also explains the old directory filter's `.includes()`.

### 2.3 Migrate data (dry-run first, then reconcile)
- **Dry run against a copy, never straight to production.** Run the migration into a throwaway local Postgres (Docker) first; the Risved database becomes production at Phase 4. The script reads the Notion Platforms DB via the existing token, transforms to the schema above, and inserts. Preserve slugs so existing URLs don't break.
- **Reconcile before trusting it** — a short checklist the script (or you) verifies after the dry run:
  - Row count in `platforms` == number of Notion records.
  - Every distinct Notion CATEGORY value exists in `categories`, and multi-category platforms have the right number of `platform_categories` rows.
  - No `null` in required public fields (`name`, `slug`, `website`, `description`) for `published` rows.
  - Spot-check 5–10 records field-by-field against Notion, including a multi-category one.
  - Every logo resolves from Bunny (not Notion) — see media note below.
- Only after reconciliation passes, run it against production Postgres.
- Keep the Notion read path behind a **feature flag** so you can flip back instantly if the Postgres path misbehaves.

### 2.3a Media / images — the general strategy (applies beyond logos)
Notion (and any external CMS) hand out **temporary, expiring file URLs**, so you never store those URLs. The rule for all binary media in this project:
1. **Store the file in Bunny Storage; store only the URL in Postgres.** During migration the script downloads each Notion file (logos here) and re-uploads to Bunny, then writes the stable Bunny CDN URL into `logoUrl`.
2. **Serve + optimize via Bunny** (Bunny Optimizer handles resizing/format) rather than shipping originals.
3. **Going forward**, user-uploaded images (profile avatars in Phase 3, block images in Phase 5) follow the same path: upload to Bunny Storage → store the URL. The database never holds binaries, only URLs.
This keeps Postgres small, media on the CDN, and nothing dependent on a third party's expiring links.

### 2.4 Switch read path
- Point `directory.tsx` (and any preview sections) at Postgres via Drizzle instead of the Notion fetch.
- The public query selects **only the [public] columns** where `status = 'published'` — never contact PII, priority, notes, or status. Verify filter/sort parity against the live site.

### 2.5 Curation experience (replacing the Notion admin)

Notion was doing two jobs: the datastore (now Postgres) **and** the admin UI (views, the Published checkbox, the backlog). This is the plan for the second job.

- **Now, solo (Phase 2):** use **local Drizzle Studio** (`drizzle-kit studio`). Zero setup, free, correct while you're the only editor and before any user PII exists.
- **Graduate to Directus at Phase 3** — triggered by either **team members needing curation access** or **auth introducing user PII**, whichever comes first. Rationale: Drizzle Studio (and Drizzle Gateway) grant **blanket, all-tables** database access with no per-user roles; once teammates are involved and/or `users` holds PII, that's inappropriate — and note the platforms table *already* holds contact PII from day one. **Directus** solves this: point it at the same Postgres (it introspects the tables and adds only its own system tables, without modifying your schema), then use **role + field-level permissions** to scope curators to the platforms/categories collections and hide the PII/internal columns. It also restores the Notion-like experience: saved filtered **views** (backlog / in-review / published), a **status** control, and layouts (table/kanban/gallery).
  - **Data-model note for the status workflow:** the `status` enum + saved filters in Directus *are* your Notion "views." No extra modelling needed beyond §2.2.
- **Destination (post-launch):** an optional **custom SolidStart `/admin`** (gated by a Better Auth admin role) keeps everything in one MIT codebase for the open-source blueprint. Build it when the crunch eases; Directus bridges until then.
- License/sovereignty notes: Directus is **BSL 1.1** (source-available, free under €/$5M finances) — fine for Rebuild, but not OSI-open-source, so flag it in the blueprint. Self-host on Hetzner so data stays EU regardless of vendor incorporation. Drizzle Studio is not open-source either; Drizzle Gateway is a small paid, alpha tool — hence Directus is the better team destination.

### Verification
- Directory renders identically from Postgres (public columns only); counts match Notion; category filters work; slugs/URLs unchanged; logos load from Bunny (not Notion); no contact PII or internal fields exposed in page source or API; build no longer depends on Notion for the directory; **the nightly off-server backup has run and one test restore succeeded**; the §7.6 role outcome is recorded.

### Rollback
- Flip the feature flag back to the Notion read path. Postgres additions are non-destructive to the running site.

---

## Phase 3 — Auth feature (Better Auth, invite-only, magic link)

**Goal:** ecosystem participants (group one) can be invited, log in via magic link, edit a bio/profile, associate with a platform, and register for events. No public sign-up page. Built on the now-stable, EU-hosted, Postgres-backed SolidStart app.

### 3.0 Scope guardrails
- **Group one only:** ecosystem participants (platform builders, founders, investors, pioneers, media). Group two (general public) is a separate, later feature set — **do not build it now.**
- **Invite-only enrollment:** there is **no "Create your account" CTA and no public signup page.** Accounts come into existence only via an invite.
- **Curation-tool graduation trigger:** this phase introduces `users` + PII into the DB. That is the hard cutoff for retiring blanket-DB access (Drizzle Studio/Gateway) for anyone but you and moving team curation to **Directus with scoped roles** (see §2.5). Do not give teammates Drizzle Studio access after this phase.
- **Passwordless:** magic link is the primary (and initial only) method. Passkey upgrade can be added later.
- **Security & PII gate:** this phase does not ship to production until the **Security, PII & compliance checklist (§7)** has been walked and its items are in place. Auth is the point where real personal data goes live, so §7 is a hard gate here, not a nice-to-have.

### 3.1 Better Auth setup
- Install Better Auth; configure the **Drizzle adapter** against the app's Postgres.
- Enable the **magic-link** plugin; wire its email sender to **Scaleway TEM** (API or SMTP).
- Mount the handler in SolidStart: `src/routes/api/auth/[...auth].ts` (per Better Auth's official SolidStart integration).
- Set `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (staging URL for now — updated to production domain after Phase 4 DNS cutover), Scaleway TEM creds in Risved env.
- Let Better Auth generate its core tables (user, session, account, verification) in Postgres via its migration/CLI.

### 3.2 Invite-only flow
- Add an **invites** table (or use Better Auth's organization/invitation plugin if the model fits):
  ```ts
  invites: { id, email, token (unique), invitedBy → user.id,
             status (pending|accepted|revoked|expired),
             expiresAt, createdAt }
  ```
- **Gate account creation on a valid invite:** magic-link sign-in is only issued to emails with a valid pending invite (or existing users). No open self-registration path exists.
- Admin path (minimal for now): a protected route/action to create invites and send the invite email via Scaleway TEM.

### 3.3 App data model additions (Plane B)
```ts
// profile — the editable bio page (1:1 with user)
profiles: { userId → user.id (PK), displayName, bio, avatarUrl,
            links (jsonb), updatedAt }

// user_platforms — associate a participant with a platform
user_platforms: { userId → user.id, platformId → platforms.id,
                  role (founder|team|contributor|...),
                  status (pending|approved|revoked) }  // PK (userId, platformId)

// event_registrations — event sign-ups (mirror existing gathering form fields)
event_registrations: { id, userId → user.id, event (e.g. "Rebuild 2"),
                       identityGroup, contribution, status,
                       createdAt }

// badges — a catalog of assignable badges (defined from a list)
badges: { id, slug (unique), label, description }

// user_badges — which users hold which badges (bulk-assignable)
user_badges: { userId → user.id, badgeId → badges.id,
               assignedBy, assignedAt,
               displayOptIn (boolean, default false) }  // PK (userId, badgeId)
```
- **Association likely needs approval** (a participant claiming a platform), so `user_platforms.status` supports a pending→approved review step. Confirm the desired verification rigor before building the approval UI.
- **Badges (schema only for now, no automation required).** Badges represent a user's prior activity/history of contribution with the project. The requirement is simply: a **catalog** (`badges`) you populate from a list, and a **`user_badges`** join that supports **bulk assignment** — e.g. "add badge X to every user whose email also appears in dataset Y." To make that matching clean and in-EU, **transfer the external datasets (letter signees, etc.) into this Postgres** and match in-database on normalized (lowercased/trimmed) email. Two light guardrails: (1) `displayOptIn` defaults to **false** so a badge is only shown publicly if the user opts in — a badge should never surface an affiliation the user didn't choose to display; (2) keep badge **labels about contribution** ("Founding platform", "Pioneer") rather than anything that reveals sensitive/political affiliation. Automation can come later; day one is just the schema + a bulk-assign action.

### 3.4 Logged-in features
- **Profile/bio editing:** protected route; user edits `profiles`; renders on a public bio page.
- **Platform association:** logged-in user requests association with a platform; shows on the platform's directory subpage once approved.
- **Event registration:** logged-in users register for events; streamlined vs. the anonymous form since identity is known.
- Protect routes via Better Auth session checks in SolidStart server load/actions.

### Verification
- Invite → magic-link email (via Scaleway TEM) → sign-in works end to end; no path exists to self-register without an invite; profile edits persist and render; platform association appears after approval; event registration writes correctly; sessions/cookies correct on the staging domain (production domain verified after Phase 4); sign-out works.

### Rollback
- Auth is additive (new tables, new gated routes). Feature-flag the logged-in surfaces; the public site is unaffected if disabled.

---

## Phase 4 — DNS cutover to Bunny + point domain at Risved

**Goal:** move nameservers Cloudflare → Bunny and point the domain at the Risved-hosted SolidStart site. Isolated, highest-blast-radius change. Registration stays at GoDaddy. After cutover, update `BETTER_AUTH_URL` to the production domain and redeploy.

### 4.1 Pre-cutover (do NOT skip — email must not break)
- **Export every current DNS record from Cloudflare**: A/AAAA, CNAME, MX, TXT, and specifically **SPF, DKIM, DMARC** (email auth) and any verification TXT records. Save this as a checklist artifact. *(Capture this early, during Phase 1 — see `PHASE_1_BRIEF.md` Step 0b.)*
- Lower TTLs on the affected records 24–48h in advance to speed propagation/rollback.
- Confirm the Risved app's target A/AAAA (or CNAME) for `rebuild.net` and `www`.

### 4.2 Cutover
- Create the zone in **Bunny DNS**; replicate **all** records exactly, with the apex A/AAAA pointing at the Risved app.
- Double-check MX + SPF + DKIM + DMARC are identical to Cloudflare's — email deliverability depends on these.
- At **GoDaddy**, change nameservers from Cloudflare to Bunny's.
- Watch propagation.
- **Once the domain resolves to Risved:** update `BETTER_AUTH_URL` from the staging URL to `https://www.rebuild.net`, set `VITE_SITE_URL` to the production URL and `VITE_SITE_INDEXABLE=true` (this lifts the staging `noindex`, see §1.7) in Risved env vars, and redeploy. No users exist yet, so no sessions to migrate.

### 4.3 Verify
- Site resolves and serves the SolidStart app over HTTPS (Risved auto-TLS) at `rebuild.net` and `www`.
- **Send + receive test emails**; validate SPF/DKIM/DMARC alignment (e.g. via a mail-tester tool).
- **Auth still works on the production domain** — test a magic-link invite→sign-in flow.
- Analytics still recording; no console errors.

### Rollback — step by step (you do NOT need to be confident in advance; follow this exactly)

Do this the moment the site or email misbehaves after cutover. It reverses the one change you made (nameservers).

1. **Log in to GoDaddy** → your domain → **Nameservers / DNS management**.
2. Change the nameservers **back to the Cloudflare ones you recorded before cutover** (in Phase 4.1 you saved them — they look like `xxx.ns.cloudflare.com`). Save.
3. **Do not delete the Cloudflare zone.** It's still there with all your records intact, which is why this rollback works instantly.
4. Wait for propagation. Because you **pre-lowered TTLs** in Phase 4.1, this is usually minutes, not hours. Check progress at a DNS-propagation checker (e.g. search "dnschecker" and enter `rebuild.net`) — you're waiting for the nameservers to show the Cloudflare ones again.
5. **Verify recovery:** load `https://rebuild.net` (should serve normally again) and **send yourself a test email** to confirm mail flow is back.
6. Revert `BETTER_AUTH_URL` to the staging URL if you changed it. Only after you've confirmed the Cloudflare path is healthy, investigate what went wrong on the Bunny side before re-attempting.

**Why this is safe:** the cutover changed exactly one thing (which nameservers GoDaddy points to). Rolling back changes only that one thing back. Nothing was deleted, so there's nothing to rebuild.

---

## Phase 5 — Decap CMS for editorial content (deferred)

**Goal:** give the team a git-based editing UI for Plane A (insights + page copy), writing into the block schema. Can run parallel to or after Phase 3.

### 5.1 Setup
- Add Decap's static admin SPA at `/admin` with a config that mirrors the block schema (collections for insights + page singletons; the block list as a typed/variable-type list widget so editors add and reorder blocks).
- **Git-auth backend:** since you're off Netlify, wire Decap's GitHub/GitLab backend via an OAuth client (a small OAuth proxy). Document this in the blueprint — it's the one setup wrinkle.

### 5.2 Content model
- Editorial content stays as Markdown/YAML in the repo (Plane A). Decap edits those files; commits are the publish mechanism.
- The site already renders these via the block registry from Phase 1, so wiring is minimal.

### Verification
- Editors can create/edit an insight and a page's block layout, reorder blocks, and see commits; the rendered site reflects changes; no external datastore introduced.

### Fallback
- If Decap's editing UX is too thin, run **Keystatic**'s admin as a standalone React app pointed at the same repo (Reader API reads into Solid fine).

---

## 6. Cross-cutting: environment variables

Maintain in Risved (encrypted), by phase introduced:

| Var | Phase | Purpose |
| --- | --- | --- |
| `NOTION_TOKEN`, `NOTION_BUILDERS_DB_ID` | 1 (retire after 2) | Notion directory during transition |
| Bunny CDN / fonts vars | 1 | Assets |
| `PIRSCH_*` | 1 | Analytics |
| `MAILERLITE_*` | 1 | Newsletter |
| `VITE_SITE_URL` | 1 | Site URL (staging → prod) |
| `VITE_SITE_INDEXABLE` | 1 (set `true` at Phase 4) | Unset = `noindex` everywhere (staging); `true` = indexable (production) |
| `DATABASE_URL` | 2 | Postgres, injected by Risved's add-on. Swap in the **scoped app role** if one can be created (see §7.6) |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | 3 (URL updated to prod domain at Phase 4) | Auth |
| `SCALEWAY_TEM_*` | 3 | Transactional email (magic links) |
| Decap OAuth client id/secret | 5 | CMS git auth |
| `UMAMI_*` / analytics vars | later (optional) | Only if/when you self-host Umami |

---

## 7. Security, PII & compliance

Everything here is deliberately **low-key and proportionate** to a small EU project — no enterprise ceremony. Walk this before Phase 3 ships (it's the §3.0 gate).

### 7.1 What PII we hold, lawful basis, and the privacy notice
Keep a short table (in the privacy policy and internally). One row per category:

| PII category | Where | Lawful basis (GDPR) | Notice must say |
| --- | --- | --- | --- |
| Platform contact (name, email) | `platforms` | Legitimate interest (curating the directory; contacting platforms to confirm affiliation) | We hold contacts to run/verify the directory |
| User account (email, name) | Better Auth tables | Consent (they accept an invite) + contract (providing the account) | What we store, why, retention, that email may be matched to other Rebuild datasets for badges |
| Event registration | `event_registrations` | Consent | We store your registration + what you shared |
| Badges via dataset matching | `user_badges` | Consent (opt-in to display) | Your email may be matched across Rebuild datasets to award contribution badges |

**Action baked into the plan:** update the **privacy notice** as part of Phase 3, covering accounts, retention, and the cross-dataset badge matching. Keep it plain-language.

### 7.2 Data minimization
Collect only what a feature needs. Specific call: platform **contact name/email is retained** because you use it to email associated people and confirm their affiliation once they make an account — that's a legitimate purpose. Once affiliation is confirmed (or a platform is user-managed), that contact PII can be minimized/removed. Don't collect fields "just in case."

### 7.3 Retention + erasure (low-key)
Simple defaults, enforced by a periodic cleanup job (not a whole system):

| Data | Keep for |
| --- | --- |
| Magic-link tokens | Minutes (single-use, short TTL) — Better Auth handles |
| Sessions | Rolling, e.g. 30–90 days idle then expire |
| Inactive accounts | Review/erase after ~24 months inactivity |
| Event registrations | Until event + a reasonable window, then archive/erase |
| Discarded platform contacts | Erase contact PII once marked `discarded` |

**Erasure:** deleting a user must cascade to `profiles`, `user_platforms`, `user_badges`, `event_registrations` (define `ON DELETE CASCADE` or a delete routine). Better Auth won't cascade your app tables for you.

### 7.4 DSAR (data subject requests) — minimal
Publish one line in the privacy notice: **email `privacy@rebuild.net`** to request access, correction, or deletion. Handle manually (query by email, export or delete). No portal needed at this scale.

### 7.5 DPAs — how to actually maintain this (it's easier than it sounds)
A DPA (Data Processing Agreement) is a standard contract every processor already publishes. You don't draft anything. Once, per provider:
1. Find their DPA (usually in dashboard legal/privacy settings or their site), **accept/download** it.
2. Drop the PDF in a `compliance/dpa/` folder.
3. Keep a one-line register: provider · what they process · DPA date/link.

Providers to cover: **Risved** (hosting + database; Hetzner as its sub-processor), **Scaleway** (email), **Bunny** (incl. backup storage), **MailerLite**, **Pirsch/Umami**. All EU, so all straightforward. That register *is* your Article 30 record at this scale — done.

### 7.6 Least-privilege DB access (plain-English)
Risved's add-on gives you **one** database user, likely the owner of the database (create/drop tables, read everything). If your app connects with that user and the app is ever compromised, the attacker inherits "anything." So: create a **second, limited role** that can only read/write *your app's tables* — not drop databases, not superuser. The app (`DATABASE_URL`) uses that limited role; you keep the master user for migrations/admin only. It's a few SQL statements once (`CREATE ROLE ... GRANT SELECT, INSERT, UPDATE, DELETE ON ...`). Blast radius shrinks from "everything" to "the app's own tables." **If the Risved user can't create roles** (no `CREATEROLE`), record that as an accepted risk in the decision log. The mitigation is that the database is reachable only from this app on Risved's private network.

### 7.7 PII never in logs, page source, or API
- **Logs:** never log emails, tokens, or magic-link URLs. Log user *ids*, not emails. Check that error handlers don't dump request bodies containing PII.
- **Page source / API:** server load functions return **only the fields the page needs** — the public directory/API returns `[public]` columns only; a profile page returns only what the user chose to expose. Never send the whole row to the client "and hide it in CSS."
- **Analytics:** Pirsch/Umami are cookieless and store no PII — keep it that way (don't pass emails as event props).

### 7.8 Transport & storage
- **TLS to the database:** required whenever database traffic crosses a network we don't control (`sslmode=require`). With Risved's add-on, traffic stays on the host's private Docker network, so plain connections are acceptable **only** there. If the database ever moves off-host (e.g. to Scaleway) or is exposed, TLS becomes mandatory again.
- **At rest:** encryption at rest depends on the Hetzner disk and isn't guaranteed. Ask Risved, and note the answer in the DPA register. Backups (§7.11) **are** encrypted before they leave the server.

### 7.9 Rate limiting
Rate-limit the auth, magic-link, and invite endpoints to stop email enumeration and abuse. Better Auth has rate-limiting config; enable it. Risved/Nitro can add a coarse layer too.

### 7.10 Audit logging (kept deliberately light)
No bespoke audit system — that *would* be bloat at this scale. You get enough from: **Directus's built-in activity log** (curation changes) and **Better Auth's events** (sign-ins, etc.). That's sufficient; revisit only if a real need appears.

### 7.11 Backups
Risved backs up only its own configuration, **not** the Postgres volume, so backups are ours. A **nightly logical backup** (`pg_dump` or equivalent), **encrypted**, shipped **off the server** to Bunny Storage (EU), keeping e.g. 14 daily + 8 weekly copies. On Risved Cloud there's no SSH, so the job runs inside the app or a sibling Risved project (mechanism decided in Phase 2). **Do one test restore** into a scratch DB so you know it works *before* you depend on it. No point-in-time recovery: the worst case loses up to a day of writes. Backups contain PII, so they inherit the retention rules above.

### 7.12 Breach process (simple, written down once)
If personal data is exposed or you suspect it:
1. **Contain** — revoke keys/sessions, take the affected path offline if needed.
2. **Assess** — what data, whose, how many, what risk to them.
3. **Record** — time, cause, scope, actions (a dated note in `compliance/`).
4. **Notify** — if there's a risk to people, notify your supervisory authority **within 72 hours** of becoming aware; notify affected users if the risk is high.
5. **Fix + review** — patch the cause, write down the lesson.
Keep the DPA register handy — it tells you which processor to contact if the breach is on their side.

---

## 8. Testing, observability & handoff hygiene

### 8.1 Every phase is a self-contained Claude Code brief with acceptance criteria
Hand Claude Code **one phase at a time**. Each phase in this doc already has Actions + Verification + Rollback; treat the **Verification list as pass/fail acceptance criteria** — the phase isn't "done" until every item passes. Keep PRs small (one coherent change), review before merge, and don't start the next phase until the current one is verified in staging.

### 8.2 Repo `AGENTS.md` + `CLAUDE.md`
Commit the provided **`AGENTS.md`** (canonical conventions: stack, the two data planes, the public/internal column rule, PII rules, commit/PR style) and **`CLAUDE.md`** (points to `AGENTS.md` + Claude-Code specifics) at the repo root, so every agent session starts aligned.

### 8.3 Testing strategy (proportionate — not 100% coverage theatre)
- **Unit tests** for pure logic: slug generation, date/format utilities, the block registry, the Notion→Postgres transform functions.
- **Integration tests** for the risky server paths, especially Phase 3: invite → magic-link issuance → sign-in → session; profile save; platform-association approval; the "public query returns no `[internal]` columns" guarantee (assert PII never appears in the response).
- **End-to-end (Playwright)** for the few critical user journeys: home/directory renders; a full invite→login→edit-profile→register flow.
- **Migration test:** the Phase 2 dry-run + reconciliation checklist (§2.3) *is* the migration's test.
- Rule of thumb: test the things that would be **quietly wrong** (PII leaks, auth gates, migration data loss), not every getter.

### 8.4 Observability (can wait — but do the cheap half now)
Full error monitoring can be deferred. But do the **cheap, high-value half at Phase 4**: an **uptime monitor** hitting `rebuild.net` every minute (so you learn about a bad DNS/deploy immediately), plus watch Risved's build/deploy logs. Add EU-hosted **error monitoring later** (e.g. self-hosted GlitchTip, a Sentry-compatible OSS option, on Risved) once auth is live and errors matter more. Not a launch blocker.

### 8.5 Decision log (ADRs)
Keep a lightweight `docs/decisions/` folder — one short markdown file per significant choice (why SolidStart, why Risved Postgres, why Decap, why Directus-for-curation, the badge display-opt-in rule). Each: context → decision → consequences. This is what makes the open-source blueprint legible to future contributors and reminds *you* why later. This whole plan is effectively ADR #0.

---

## 9. Open items to confirm before / during build

1. **Platform association rigor** (Phase 3.3): self-serve claim vs. admin approval vs. lightweight verification? Affects the approval UI.
2. **Event-registration fields** (Phase 3.3): reuse the existing gathering-form fields (identity group, contribution, etc.), or a streamlined logged-in version?
3. **Admin surface** (Phase 3.2): how invites get created initially — a minimal protected route is assumed; confirm who administers it.
4. **Postgres capacity** (Phase 2.1): the database shares the Risved server with the app. Watch memory/disk; if it outgrows the box or needs HA, move to Scaleway (see §2 contingencies).
5. **Notion retirement** (post-Phase 2): confirm Notion is fully decommissioned as a directory source once Postgres is verified.
6. **Which external datasets** (Phase 3.3 badges): confirm the list of datasets to transfer into Postgres for badge matching (letter signees + any others).

---

## 10. Guiding principles (for every phase)

- **One variable at a time.** Never stack framework + infra + feature changes in a single cutover.
- **DNS is done alone, with rollback ready.** It breaks site *and* email if wrong.
- **Additive over destructive.** New tables, feature flags, staging subdomains — keep the escape hatch until each phase is verified.
- **Sovereignty is a hard constraint, not a preference.** Every provider EU-incorporated; every choice self-hostable or exportable.
- **Document as you go.** This project is meant to be open-sourced and reskinned; the blueprint's legibility is a feature.

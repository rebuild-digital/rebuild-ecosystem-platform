# Visual Discrepancies — rebuild.net vs. local implementation

Audit date: 2026-09-17  
Method: Playwright screenshots at 1920×1080, full-page, networkidle  
Live: https://www.rebuild.net  
Local: http://localhost:3000

---

## CRITICAL — Pages rendering blank (only header/footer visible)

These 5 pages have all their content missing in the local build. They each show nothing between the nav and the footer.

| # | Route | Live has |
|---|---|---|
| C1 | `/journey/` | Full journey page: intro text, framework diagram, Rebuild 1/2/3 gathering cards (coloured full-bleed), Programmes section, CTA footer |
| C2 | `/apply/` | "Join the Directory" form (platform name, email, phone, website, category, location, description, impact, stage, team size, 2 checkboxes, submit button) |
| C3 | `/newsletter/` | "Stay Updated" form (email, first name, last name, interest dropdown, consent checkbox, subscribe button) |
| C4 | `/suggest/` | "Suggest a platform" form |
| C5 | `/gathering-request/` | Rebuild 3 invitation request form |

**Root cause to investigate:** These are all pages that use `layouts/base.njk` in the Eleventy source and render a form or heavy page content. In the SolidStart implementation they likely exist as route files but the component/content hasn't been ported yet, or the route is defined but the `<main>` slot is empty.

---

## LAYOUT — Insight post pages

| # | What | Live | Local |
|---|---|---|---|
| L1 | Featured image position | Full-bleed hero image at the very top (edge-to-edge, no padding, sits flush under the nav bar) | Image appears below the title, constrained width, not full-bleed |
| L2 | Tag label position | Tags appear below the title | Tag label appears above the title |
| L3 | Title area | Title below the image, left-aligned | Title above the image |

**Affected routes:** All 15 `/insights/<slug>/` pages.

---

## LAYOUT — Insights listing page (`/insights/`)

| # | What | Live | Local |
|---|---|---|---|
| L4 | Card grid layout | Masonry (Pinterest-style staggered heights, cards fill available vertical space) | Uniform 3-column grid (all rows same height) |
| L5 | Filter controls | Not visible at page top / hidden or absent | Filter tag buttons visible prominently at the top of the page |

---

## LAYOUT — Rebuild 3 countdown (`/gatherings/rebuild-3/`)

| # | What | Live | Local |
|---|---|---|---|
| L6 | Countdown display | Stacked vertical: "87 days / 29 minutes / 59 seconds" (one unit per line, large monospace, labels inline) | Horizontal 4-column row: `87 | 01 | 28 | 58` with `Days Hours Minutes Seconds` labels below each number |

---

## LAYOUT — Homepage additional issues ✅ ALL FIXED

| # | What | Fix applied |
|---|---|---|
| H1 | Carousel background bleed | `index.tsx` restructured: `HeroSplash` renders outside the container; all other blocks wrapped in `lg:max-w-max-width mx-auto px-md`. Carousel's `-mx-(--spacing-md) md:mx-0` now correctly bleeds on mobile and is contained on desktop. |
| H2 | Programmes animation | `ProgrammesPreview.tsx`: added `IntersectionObserver` on mount with 100ms stagger per item. `app.css`: added initial hidden state (opacity 0, translateX -1rem, 0.5s transition) for `.programme-item`. |
| H3 | Header colour on scroll | `Header.tsx`: added `scrolledPastHero` signal + scroll listener (rAF-throttled). Header gets `transparent` class only when on home page AND hero is still in view. Matches Eleventy's `header-scroll.js` logic exactly. |

---

## LAYOUT — Directory page (`/directory/`) ✅ FIXED

Fully ported to match live. Changes made to `src/routes/directory.tsx`:
- Large `text-7xl` heading + "What is this?" info tooltip (click to toggle)
- CTA buttons (Join / Suggest) moved to top-right of header, matching live layout
- "Filter by category" label above filters
- Filter buttons now use custom category order (Bundled → Social marketplace → … → Other)
- Filter active state now applies category-specific tint colour (not just dark bg)
- 3-column CSS masonry grid (`columns-1 md:columns-2 lg:columns-3`, `break-inside-avoid`)
- Cards: white bg, `border-2`, `rounded`, padding — matching builder-row.njk
- Each card shows: name (linked), URL, description, category colour badges, country badge
- Data projection expanded to include `description` and `country`

---

## MINOR / TO VERIFY

| # | What | Notes |
|---|---|---|
| M1 | Home — directory entries | Different platforms listed (expected — Notion data is shuffled per-request). Not a bug. |
| M2 | Home — Programmes colours | Live shows coloured pill/bar items; local also has colours but arrangement may differ slightly. Needs close inspection. |
| M3 | Directory page length | Local appears to pull more entries from Notion than the live build cached version. Likely because Notion credentials now work locally. Not a bug. |

---

## Pages confirmed matching ✓

- `/` (home) — structure matches, content variations expected
- `/about/` — identical
- `/gatherings/` — identical
- `/gatherings/rebuild-2/` — identical
- `/gatherings/rebuild-3/` — layout matches except countdown (L6 above)
- `/data/` — identical
- `/tools/` — identical
- `/people/` — identical
- `/get-in-touch/` — identical
- `/open-positions/` — identical
- `/privacy/` — identical
- `/changelog/` — identical

---

## Fix priority order

1. **C1–C5** — blank pages (highest user impact; 5 routes completely non-functional)
2. **L1–L3** — insight post layout (15 pages affected, visible on every article)
3. **L4–L5** — insights listing (1 page, but masonry is a notable visual difference)
4. **L6** — countdown layout (1 page, cosmetic)

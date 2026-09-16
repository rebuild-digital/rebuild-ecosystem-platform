# Phase 1 — Manual Test Checklist

Items that need browser or local-environment verification before Phase 1 is complete. Check each off once confirmed on staging (or locally with `npm run dev` + env vars set).

## Prerequisites

```
# .env (local or Risved staging)
NOTION_TOKEN=<your token>
NOTION_BUILDERS_DB_ID=<your db id>
API_URL=https://rebuild-production.b-cdn.net
VITE_SITE_URL=http://localhost:3000       # or staging URL
```

---

## Step 2 — Assets & styling
- [ ] Correct fonts load (ABCSocialMono-Book)
- [ ] Colours/background match the live Eleventy site
- [ ] No FOUC (flash of unstyled content)

## Step 3 — Layout, Header, Footer
- [ ] Header nav matches live site (desktop)
- [ ] Mobile hamburger menu opens/closes
- [ ] Mobile menu links work and close the menu
- [ ] Footer renders, links are correct
- [ ] Skip-to-content link works (Tab → Enter on page load)

## Step 4 — Block registry & homepage
- [ ] Homepage renders all blocks in correct order: HeroSplash, Carousel, DirectoryPreview, InsightsPreview, GatheringsPreview, ProgrammesPreview, HalfCircle, Engage
- [ ] Reordering blocks in `src/data/homepage.ts` reorders the page

## Step 5 — Data layer
- [ ] Directory shows same builder count as live site (with Notion creds)
- [ ] Directory works from cache fallback (without Notion creds)
- [ ] Insights listing shows all 15 articles
- [ ] Insight detail pages render markdown content correctly

## Step 6 — Interactive components
- [ ] **Directory filter:** toggle category pills on/off; count updates; "Clear all" resets
- [ ] **Directory filter:** 100+ entries filter without lag (needs Notion creds)
- [ ] **Insights filter:** toggle tag pills; count updates; grid re-renders
- [ ] **Carousel:** autoplays (5s interval)
- [ ] **Carousel:** pause/play button works
- [ ] **Carousel:** ArrowLeft / ArrowRight keyboard nav
- [ ] **Carousel:** dot navigation works
- [ ] **FormSidebar:** opens when any `data-form` button is clicked
- [ ] **FormSidebar:** closes on overlay click
- [ ] **FormSidebar:** closes on Escape key
- [ ] **FormSidebar:** body scroll is locked while open

## Step 7 — Forms (requires `API_URL` env var)

### Newsletter (`data-form="newsletter"`)
- [ ] Form fields render: email*, first name, last name, interest (select), consent*
- [ ] Required-field validation fires on empty submit (email, consent)
- [ ] Email format validation fires on invalid email
- [ ] Successful submission shows success message
- [ ] Check MailerLite: subscriber appeared in the correct group

### Join the directory (`data-form="builder-application"`)
- [ ] Form fields render: platform name*, email*, phone, website, category, location, description, impact, stage, team size, consent*, newsletter opt-in
- [ ] Required-field validation (platform name, email, consent)
- [ ] URL validation on website field
- [ ] Successful submission shows success message
- [ ] Check Notion: row appeared in the Builders database

### Suggest a platform (`data-form="builder-promo"`)
- [ ] Form fields render: platform name*, platform website, why promote, your name*, your email*, your relationship, newsletter opt-in
- [ ] Required-field validation (platform name, your name, your email)
- [ ] Successful submission shows success message
- [ ] Check Notion: row appeared in the Builders database

### Request an invitation — Rebuild 2 (`data-form="gathering-invitation"`)
- [ ] Form fields render: name*, email*, phone, platform link, country, group, contribution, consent*, newsletter opt-in
- [ ] Hidden fields sent: `form_type=gathering-invitation`, `gathering=Rebuild 2`
- [ ] Successful submission shows success message
- [ ] Check Notion: row appeared in the Gathering database

### Request an invitation — Rebuild 3 (`data-form="gathering-invitation-rebuild3"`)
- [ ] Same fields as above
- [ ] Hidden fields sent: `form_type=gathering-invitation-rebuild3`, `gathering=Rebuild 3`
- [ ] Successful submission shows success message

### Apply to Rebuild 1 (`data-form="application-rebuild1"`)
- [ ] Form fields render: name*, email*, organisation, role, country, newsletter opt-in
- [ ] Hidden field sent: `form_type=application-rebuild1`
- [ ] Successful submission shows success message
- [ ] Check Notion + MailerLite: row in Rebuild 1 DB, subscriber in Rebuild 1 group

### Cross-form checks
- [ ] Switching between forms resets fields and validation state
- [ ] Submitting with server down shows "Could not reach the server" error
- [ ] Submit button disables during submission (no double-submit)
- [ ] `API_URL` does NOT appear in browser network tab as a client-side request origin

## Step 8 — SEO & URL preservation (not yet built)
- [ ] Redirect map: every old URL either works or 301s to the new one
- [ ] Canonical tags present and correct on every page
- [ ] `sitemap.xml` generates and validates
- [ ] RSS feed generates at the correct path
- [ ] Meta/OG tags on every page
- [ ] Staging returns `noindex` robots meta

## Step 9 — Deploy & acceptance (not yet built)
- [ ] Deployed to Risved staging URL
- [ ] Every page renders at parity with live site (desktop + mobile)
- [ ] Lighthouse ≥ 90 on homepage
- [ ] No console errors
- [ ] Notion cache fallback works (site still serves if Notion is down)

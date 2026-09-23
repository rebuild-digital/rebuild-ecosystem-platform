---
version: "alpha"
name: Rebuild Ecosystem Platform
description: >
  A monospaced, editorial design system for a cultural ecosystem platform.
  Dark ink on warm off-white, one typeface (ABC Social Mono Book), six chromatic
  hues each with four variants (shade, base, tint, light), and generous spacing.

colors:
  # Brand chromatic — each with shade (darker) and tint (lighter) variants
  red: "#ac1d24"
  red-shade: "#8a1f1f"
  red-tint: "#d16b6b"
  red-light: "#EDDFE0"

  blue: "#6ba1cc"
  blue-shade: "#3d5f83"
  blue-tint: "#8fb5d9"
  blue-light: "#E7ECF0"

  green: "#669e67"
  green-shade: "#316139"
  green-tint: "#73b088"
  green-light: "#E6ECE6"

  blush: "#e1aeb0"
  blush-shade: "#b17d7d"
  blush-tint: "#e8cdcd"
  blush-light: "#F3EDEE"

  blonde: "#f4e2d2"
  blonde-shade: "#d4b59a"
  blonde-tint: "#f7ebe0"
  blonde-light: "#F4F3F1"

  orange: "#bf6e36"
  orange-shade: "#9a5e2e"
  orange-tint: "#d4a77a"
  orange-light: "#EFE7E1"

  # Neutrals
  white: "#f7f8f9"
  light: "#e8e8e8"
  lighter: "#d9d9e0"
  muted: "#9c9cb4"
  darker: "#5f5f79"
  dark: "#22223e"

typography:
  h1:
    fontFamily: ABC Social Mono
    fontSize: 2.25rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  h2:
    fontFamily: ABC Social Mono
    fontSize: 1.875rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  h3:
    fontFamily: ABC Social Mono
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  h4:
    fontFamily: ABC Social Mono
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  h5:
    fontFamily: ABC Social Mono
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  h6:
    fontFamily: ABC Social Mono
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  body-lg:
    fontFamily: ABC Social Mono
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: -0.02em
  body-md:
    fontFamily: ABC Social Mono
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: -0.02em
  body-sm:
    fontFamily: ABC Social Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: -0.02em
  label-sm:
    fontFamily: ABC Social Mono
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  label-md:
    fontFamily: ABC Social Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.02em
  button-lg:
    fontFamily: ABC Social Mono
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.02em
  button-md:
    fontFamily: ABC Social Mono
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.02em
  button-sm:
    fontFamily: ABC Social Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.02em

rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 20px
  3xl: 24px
  4xl: 28px
  5xl: 32px
  6xl: 40px
  7xl: 48px
  8xl: 56px
  9xl: 64px
  full: 9999px

z-index:
  0: 0
  10: 10
  20: 20
  30: 30
  40: 40
  50: 50
  max: 999

spacing:
  xxs: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  2xl: 64px
  3xl: 96px
  4xl: 128px

components:
  # =============================================
  # BUTTONS — Primary (3 sizes × 6 color themes)
  # =============================================
  # "dark" is the default primary. Colored variants (red, blue, green,
  # orange, blush) are accent buttons — use them sparingly for special
  # sections, featured cards, or unique pages, not for routine actions.
  # Rounded corners always match the size token (sm→sm, md→md, lg→lg).
  # No border or outline on any primary or secondary button.
  # Text color is whichever of dark/white achieves WCAG AA contrast.

  # --- Size: sm (14px text, 8px / 16px padding) ---
  button-primary-sm-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    typography: "{typography.button-sm}"
  button-primary-sm-dark-hover:
    backgroundColor: "{colors.darker}"
    textColor: "{colors.white}"

  button-primary-sm-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    typography: "{typography.button-sm}"
  button-primary-sm-red-hover:
    backgroundColor: "{colors.red-tint}"
    textColor: "{colors.dark}"

  button-primary-sm-blue:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    typography: "{typography.button-sm}"
  button-primary-sm-blue-hover:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.dark}"

  button-primary-sm-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.dark}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    typography: "{typography.button-sm}"
  button-primary-sm-green-hover:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.dark}"

  button-primary-sm-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    typography: "{typography.button-sm}"
  button-primary-sm-orange-hover:
    backgroundColor: "{colors.orange-tint}"
    textColor: "{colors.dark}"

  button-primary-sm-blush:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.dark}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    typography: "{typography.button-sm}"
  button-primary-sm-blush-hover:
    backgroundColor: "{colors.blush-tint}"
    textColor: "{colors.dark}"

  # --- Size: md (16px text, 10px / 24px padding) ---
  button-primary-md-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: 10px 24px
    typography: "{typography.button-md}"
  button-primary-md-dark-hover:
    backgroundColor: "{colors.darker}"
    textColor: "{colors.white}"

  button-primary-md-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: 10px 24px
    typography: "{typography.button-md}"
  button-primary-md-red-hover:
    backgroundColor: "{colors.red-tint}"
    textColor: "{colors.dark}"

  button-primary-md-blue:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: 10px 24px
    typography: "{typography.button-md}"
  button-primary-md-blue-hover:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.dark}"

  button-primary-md-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: 10px 24px
    typography: "{typography.button-md}"
  button-primary-md-green-hover:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.dark}"

  button-primary-md-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: 10px 24px
    typography: "{typography.button-md}"
  button-primary-md-orange-hover:
    backgroundColor: "{colors.orange-tint}"
    textColor: "{colors.dark}"

  button-primary-md-blush:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: 10px 24px
    typography: "{typography.button-md}"
  button-primary-md-blush-hover:
    backgroundColor: "{colors.blush-tint}"
    textColor: "{colors.dark}"

  # --- Size: lg (18px text, 14px / 32px padding) ---
  button-primary-lg-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: 14px 32px
    typography: "{typography.button-lg}"
  button-primary-lg-dark-hover:
    backgroundColor: "{colors.darker}"
    textColor: "{colors.white}"

  button-primary-lg-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: 14px 32px
    typography: "{typography.button-lg}"
  button-primary-lg-red-hover:
    backgroundColor: "{colors.red-tint}"
    textColor: "{colors.dark}"

  button-primary-lg-blue:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 14px 32px
    typography: "{typography.button-lg}"
  button-primary-lg-blue-hover:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.dark}"

  button-primary-lg-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 14px 32px
    typography: "{typography.button-lg}"
  button-primary-lg-green-hover:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.dark}"

  button-primary-lg-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 14px 32px
    typography: "{typography.button-lg}"
  button-primary-lg-orange-hover:
    backgroundColor: "{colors.orange-tint}"
    textColor: "{colors.dark}"

  button-primary-lg-blush:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 14px 32px
    typography: "{typography.button-lg}"
  button-primary-lg-blush-hover:
    backgroundColor: "{colors.blush-tint}"
    textColor: "{colors.dark}"

  # =============================================
  # BUTTONS — Secondary (3 sizes, single color)
  # =============================================

  button-secondary-sm:
    backgroundColor: "{colors.lighter}"
    textColor: "{colors.dark}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
    typography: "{typography.button-sm}"
  button-secondary-sm-hover:
    backgroundColor: "{colors.light}"
    textColor: "{colors.dark}"

  button-secondary-md:
    backgroundColor: "{colors.lighter}"
    textColor: "{colors.dark}"
    rounded: "{rounded.md}"
    padding: 10px 24px
    typography: "{typography.button-md}"
  button-secondary-md-hover:
    backgroundColor: "{colors.light}"
    textColor: "{colors.dark}"

  button-secondary-lg:
    backgroundColor: "{colors.lighter}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
    padding: 14px 32px
    typography: "{typography.button-lg}"
  button-secondary-lg-hover:
    backgroundColor: "{colors.light}"
    textColor: "{colors.dark}"

  # =============================================
  # BUTTONS — Special purpose
  # =============================================

  # Filter pill buttons (directory, programme filters)
  filter-button:
    backgroundColor: transparent
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    padding: 8px 24px
    typography: "{typography.button-sm}"
  filter-button-hover:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.white}"

  # Hero splash CTA buttons (outlined, on image)
  splash-cta-button:
    backgroundColor: transparent
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: 16px 24px
  splash-cta-button-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark}"

  # =============================================
  # OTHER COMPONENTS
  # =============================================

  # Standard link
  link:
    textColor: "{colors.dark}"
  link-hover:
    textColor: "{colors.blue-shade}"

  # Blockquote
  blockquote:
    backgroundColor: "{colors.light}"
    textColor: "{colors.dark}"

  # Code inline
  code-inline:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.green}"

  # Code block
  code-block:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.light}"

  # Table header
  table-header:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.light}"

  # Callout variants
  callout-info:
    backgroundColor: "{colors.blue-tint}"
  callout-warning:
    backgroundColor: "{colors.orange-tint}"
  callout-error:
    backgroundColor: "{colors.blush}"
  callout-success:
    backgroundColor: "{colors.green-tint}"
---

## Overview

The Rebuild Ecosystem Platform uses an editorial, monospaced aesthetic rooted in
cultural publishing. Every piece of text is set in **ABC Social Mono** at its
single "Book" weight (400) — headings, body, labels, and code all share the same
typeface and weight. Hierarchy comes from size and spacing, never from bold or
italic variations.

The palette pairs a deep navy-ink dark (`#22223e`) with a cool off-white
(`#f7f8f9`) as the default surface. Six chromatic hues — red, blue, green,
blush, blonde, orange — each carry four stops (shade → base → tint → light),
giving 24 chromatic values plus 6 neutrals (30 total). The light stops are
near-white pastels used for subtle backgrounds, graphic elements, and color
overlays. There is **no dark mode**; the system ships a single light theme.

The visual language is flat and direct: no gradients (except the hero splash
overlay), no drop shadows anywhere, and minimal border radius.
Buttons are either borderless text or outlined pills. The overall feeling is
a curated programme booklet — restrained, typographic, confident.

## Colors

30 total values: six chromatic hues with four stops each (shade → base → tint →
light), plus six neutrals from white to dark. No dark mode — single light theme.

### Chromatic hues

Each chromatic color has four stops, from darkest to lightest:

- **Shade** — darkest; hover states, pressed states, emphasis.
- **Base** — the primary, recognisable value of the hue.
- **Tint** — lighter; secondary fills, callout backgrounds, soft accents.
- **Light** — lightest, near-white; subtle page backgrounds, graphic
  elements, color overlays, section tinting.

| Name   | Shade     | Base      | Tint      | Light     | Role |
|--------|-----------|-----------|-----------|-----------|------|
| Red    | `#8a1f1f` | `#ac1d24` | `#d16b6b` | `#EDDFE0` | Accent, alerts, beta-banner callouts |
| Blue   | `#3d5f83` | `#6ba1cc` | `#8fb5d9` | `#E7ECF0` | Links (focus ring), info callouts, interactive highlights |
| Green  | `#316139` | `#669e67` | `#73b088` | `#E6ECE6` | Success states, inline code text |
| Blush  | `#b17d7d` | `#e1aeb0` | `#e8cdcd` | `#F3EDEE` | Soft accent, table row hover, error callouts |
| Blonde | `#d4b59a` | `#f4e2d2` | `#f7ebe0` | `#F4F3F1` | Warm background accents |
| Orange | `#9a5e2e` | `#bf6e36` | `#d4a77a` | `#EFE7E1` | Warning callouts, highlight marks |

### Neutrals

| Name    | Hex       | Role |
|---------|-----------|------|
| White   | `#f7f8f9` | Default page background, header background |
| Light   | `#e8e8e8` | Secondary backgrounds (blockquotes, even table rows, beta banner) |
| Lighter | `#d9d9e0` | Subtle borders, dividers |
| Muted   | `#9c9cb4` | Disabled text, placeholder borders, horizontal rules |
| Darker  | `#5f5f79` | Secondary text (captions, metadata, figcaptions) |
| Dark    | `#22223e` | Primary text, headings, hero overlay, code block backgrounds |

### Usage rules

- **Text on white surface:** always `dark` (`#22223e`).
- **Focus rings:** `blue` (`#6ba1cc`), 2px outline with 2px offset.
- **Borders on interactive elements:** `dark` (`#22223e`), 2px width.
- **Color overlays on images:** use the `dark` color in RGBA at varying
  opacities with `mix-blend-multiply`. The hero splash uses a vertical gradient
  (0.1–0.95); past-event gathering cards use the gathering's brand color at
  40% opacity over a grayscaled image. When overlaying imagery elsewhere,
  prefer `mix-blend-multiply` with a chromatic or neutral color at 30–50%
  opacity — never a solid block that hides the image entirely.
- **Transparent header:** text flips to `light` / `white`; logo inverts via CSS
  filter. Standard header uses `white` background.

## Typography

One typeface, one weight. Hierarchy comes from size and spacing only.

### Typeface

**ABC Social Mono — Book (weight 400)**

This is the only loaded font file (`ABCSocialMono-Book.woff2`). The font is
loaded with `font-display: optional`, so on slow connections the system
monospace fallback renders instead.

Fallback stack: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Single weight constraint

The design system uses **only weight 400**. Do not apply `font-weight: bold`,
`font-weight: 600`, or any other weight to ABC Social Mono — the font file does
not include those weights and the browser will synthesize a faux-bold that looks
wrong. Use font size and spacing to create hierarchy instead.

### Type scale

| Token  | Size (rem) | Size (px) | Use |
|--------|-----------|-----------|-----|
| `xs`   | 0.75      | 12        | Smallest labels, fine print, image credits |
| `sm`   | 0.875     | 14        | Captions, filter buttons, metadata, footer text |
| `base` | 1         | 16        | Body text, form inputs, h6 |
| `lg`   | 1.125     | 18        | Body text at md+ breakpoints, h5, h4 (mobile) |
| `xl`   | 1.25      | 20        | h4 (desktop), h3 (mobile), page subtitles |
| `2xl`  | 1.5       | 24        | h3 (desktop), h2 (mobile) |
| `3xl`  | 1.875     | 30        | h2 (desktop), h1 (mobile), splash title (mobile) |
| `4xl`  | 2.25      | 36        | h1 (desktop), page titles (mobile) |
| `5xl`  | 3         | 48        | Page titles (md+), section h2s (md+), HalfCircle h2 (lg+) |
| `6xl`  | 3.75      | 60        | Page titles (lg+) |
| `7xl`  | 4.5       | 72        | Splash alt-title (lg+) only |
| `8xl`  | 6         | 96        | Display numbers, decorative text |

### Heading scale

These are the CSS-reset defaults applied in `@layer base`. Rich-text headings
(`.rich-text`) follow the same scale — there is no separate rich-text heading
scale.

| Level | Desktop       | Mobile (< 768px) |
|-------|---------------|-------------------|
| h1    | `4xl` (36px)  | `3xl` (30px)      |
| h2    | `3xl` (30px)  | `2xl` (24px)      |
| h3    | `2xl` (24px)  | `xl` (20px)       |
| h4    | `xl` (20px)   | `lg` (18px)       |
| h5    | `lg` (18px)   | `lg` (18px)       |
| h6    | `base` (16px) | `base` (16px)     |

### Page title pattern

Page-level h1 elements use a linear progression: `text-4xl md:text-5xl lg:text-6xl`
(36 → 48 → 60px). This is the standard pattern across all route pages.

### Line heights

| Context              | Line height | Why |
|----------------------|-------------|-----|
| Buttons & controls   | 1           | Text sits optically centred in the hit target; vertical padding alone controls height. |
| Labels & tags        | 1.2         | Compact but still readable as standalone text; keeps pill shapes tight. |
| Headings             | 1.2         | Tight leading for large sizes that don't need inter-line breathing room. |
| Body text            | 1.7         | Comfortable reading rhythm for monospaced text. |

**Rule of thumb:** if the text is inside a clickable control (button, CTA, nav
link, filter pill), use `line-height: 1` so the element's padding is the only
thing shaping its box. If the text is a label that sits on its own (tag, badge,
caption), use `1.2`. For reading text, use `1.7`.

### Letter spacing

The body default is `-0.02em` (slightly tightened). This is applied globally
and inherited by all elements.

## Layout

Pages are a single vertical column at every width. On phone, content
stretches edge-to-edge minus 24px gutters; at `lg` (1024px) the container
caps at 1400px and centres. Grids are single-column on phone, switching to
two or three columns at `md` or `lg`. Full-bleed sections break out of the
container with a calc pattern and re-contain their children.

### Container

- **Max width:** 1400px (the `max-w-max-width` utility, from `--container-max-width`)
- **Horizontal padding:** 1.5rem (24px) — applied as `px-md`, constant at all
  breakpoints (no responsive padding scaling).
- **Centering:** `max-w-max-width mx-auto px-md`

The shell layout (`app.tsx`) applies `lg:max-w-max-width mx-auto px-md` to
`<main>`, so the max-width constraint only activates at `lg` (1024px) and above.
Below `lg`, content stretches to the viewport width minus the `px-md` gutters.

Always use token-based utilities for widths and spacing — never hardcode
pixel values in arbitrary Tailwind brackets.

#### Full-bleed sections

Some sections need to break out of the container to span the full viewport.
Use this inline-style pattern:

```css
margin-left: calc(-50vw + 50%);
margin-right: calc(-50vw + 50%);
width: 100vw;
```

Then re-establish the container inside the full-bleed wrapper with
`max-w-max-width mx-auto px-md` so inner content stays aligned.

Used by: hero splash, gathering event sections, HalfCircle, DirectoryPreview,
GatheringsPreview, QuoteCarousel, and programme highlight sections.

The homepage hero (`HeroSplash`) uses `w-screen` instead of the calc pattern —
either technique works, but prefer the calc pattern for sections that live
inside the container flow.

### Spacing scale

The spacing scale uses semantic names. Always prefer these tokens over Tailwind
numeric classes (e.g. `gap-lg` not `gap-8`, `mt-sm` not `mt-4`).

| Token | Value   | Px  | Common use |
|-------|---------|-----|------------|
| `xxs` | 0.25rem | 4   | Tight internal padding (code inline, kbd) |
| `xs`  | 0.5rem  | 8   | Gap between inline elements, list item margin, small component padding |
| `sm`  | 1rem    | 16  | Paragraph margin, card padding, button padding-y |
| `md`  | 1.5rem  | 24  | Container gutter, button padding-x, card gap |
| `lg`  | 2rem    | 32  | Between content blocks, heading margin-bottom |
| `xl`  | 3rem    | 48  | Section breaks, heading margin-top, component group separation |
| `2xl` | 4rem    | 64  | Large section gaps, image margins |
| `3xl` | 6rem    | 96  | Section padding (mobile), component section padding |
| `4xl` | 8rem    | 128 | Section padding (desktop) |
| `5xl` | 12rem   | 192 | Header clearance (`pt-5xl` on `<main>`), heavy vertical breaks |
| `6xl` | 16rem   | 256 | Standard page-bottom padding (`pb-6xl`); most common large spacer |
| `7xl` | 20rem   | 320 | Rare; single use for extra-large bottom padding |
| `8xl` | 24rem   | 384 | Rare; single use for extra-large responsive padding |

**Note:** the jump from `xs` (8px) to `sm` (16px) is the widest ratio gap in
the lower end of the scale. If a 12px value is needed (e.g. tag/badge padding),
use `px-3` as an exception — but do not introduce it as a recurring pattern
without adding a token.

#### Section vertical padding conventions

- **Page bottom:** `pb-3xl md:pb-6xl` (96px → 256px) is the standard pattern.
- **Section separators:** `py-xl md:py-3xl` for preview/block components.
- **Heavy sections:** `py-2xl lg:py-4xl` for full-bleed event sections.

### Breakpoints

| Name | Width  | Role |
|------|--------|------|
| `sm` | 640px  | Small phones → wider phones |
| `md` | 768px  | Phone → tablet; primary responsive typography breakpoint |
| `lg` | 1024px | Tablet → desktop; hero title scale-up, container max-width activates |
| `xl` | 1280px | Desktop → wide desktop |

`2xl` (1536px) is defined but has only a single use in the codebase. Do not
introduce new `2xl:` breakpoint classes — use `xl:` or a `max-w` constraint
instead.

The primary responsive breakpoint is `md` (768px). Typography, grid layouts,
and navigation switch between mobile/desktop at this point.

### Responsive behaviour

**Phone (< 768px):** single-column flow throughout. Grids stack vertically,
flex rows become `flex-col`, images are full-width. Navigation collapses to
a hamburger menu. Text scales down one step (e.g. `text-4xl` instead of
`text-5xl`). Spacing tokens contract (`pb-3xl` instead of `pb-6xl`).

**Tablet (768px – 1023px / `md`):** grids switch to two columns
(`md:grid-cols-2`), flex rows go horizontal, and typography steps up. The
container still stretches to the viewport — the max-width cap doesn't activate
until `lg`. This is the main content reflow breakpoint.

**Desktop (1024px+ / `lg`):** the container centres at 1400px max. Some grids
expand to three columns (`lg:grid-cols-3`). Desktop-only navigation appears.
Spacing opens up (`lg:py-4xl`, `lg:gap-3xl`). Hero title hits its largest
scale (`lg:text-6xl`).

#### Grid column patterns

| Pattern | Where |
|---------|-------|
| `grid-cols-1 md:grid-cols-2` | Event sections, FAQ, insights listing, people grid, data page |
| `grid-cols-1 md:grid-cols-3` | Outcomes grid, data stats, InsightsPreview |
| `grid-cols-1 lg:grid-cols-2` | About, tools, carousel slides, open positions, programme highlights |
| `grid-cols-1 lg:grid-cols-3` | GatheringsPreview cards |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | People avatars, people board grid |

**Rule:** use `md:` for content grids (articles, proof points, stats) and
`lg:` for structural grids (sidebar + content, card groups where the third
column needs room). Do not use `sm:` for column count — keep mobile
single-column until `md`.

### Page structure

- **Fixed header** at the top. Non-home pages add `pt-5xl` (192px) to `<main>`
  to clear it.
- **Header modes:** default (white background, dark text) and transparent
  (transparent background, light text, inverted logo) — used on the homepage
  hero.
- **Navigation:** full horizontal nav at `lg`; below `lg` it collapses to a
  hamburger menu button that opens a slide-over mobile nav panel.
- **Full-bleed hero** on the homepage: 90vh height, full viewport width via
  `w-screen`, with a gradient overlay and absolute-positioned content.

## Elevation & Depth

**This is a shadowless design system.** No drop shadows, no box-shadows, no
elevation through shadow. Depth comes from borders, color fills, overlays,
and z-index stacking — never from shadows.

The decision is deliberate: the editorial, flat aesthetic treats the page as a
printed surface. Shadows imply a light source and physical depth that conflict
with the ink-on-paper metaphor. Use 2px `dark` borders to define interactive
elements. Use semi-transparent overlays (`bg-dark/50`) for modals and scrims.

### Z-index

| Token | Value | Use |
|-------|-------|-----|
| `0`   | 0     | Default stacking |
| `10`  | 10    | Splash background images, carousel controls, tooltips |
| `20`  | 20    | Splash gradient overlay |
| `30`  | 30    | Splash content |
| `40`  | 40    | — |
| `50`  | 50    | Fixed header, dropdowns, mobile menu |
| `max` | 999   | Modal overlays (FormSidebar), skip-link |

**Rule:** always use the token scale. Do not introduce ad-hoc z-index values.
The `max` layer is reserved for elements that must sit above everything,
including the fixed header.

### Overlays

- **Modal scrim:** `bg-dark/50` full-screen fixed overlay.
- **Image credits:** `bg-dark/50 text-white` (light theme) or
  `bg-light/80 text-dark` (dark theme) — small absolute-positioned labels.
- **Hero text contrast:** `mix-blend-multiply` with `dark` at 60–70% opacity,
  plus a simplified bottom gradient covering the lower third.
- **Past-event images:** `grayscale(100%)` on the image, then a
  `mix-blend-multiply` color overlay at 40% opacity using the event's brand
  color.

## Shapes

Rectangular by default. Rounded corners are reserved for buttons and badges;
tags, chips, and badges always receive `rounded-full`.

### Border radius

| Token  | Value  | Use |
|--------|--------|-----|
| `none` | 0px    | Default for cards, inputs, containers |
| `sm`   | 4px    | Small buttons |
| `md`   | 8px    | Medium buttons |
| `lg`   | 12px   | Large buttons, image containers (rare) |
| `xl`   | 16px   | Available |
| `2xl`  | 20px   | Available |
| `3xl`  | 24px   | Available |
| `4xl`  | 28px   | Available |
| `5xl`  | 32px   | Available |
| `6xl`  | 40px   | Available |
| `7xl`  | 48px   | Available |
| `8xl`  | 56px   | Available |
| `9xl`  | 64px   | Available |
| `full` | 9999px | Badges, tags, chips, filter pills |

**Guidance:** buttons use the radius that matches their size (`sm` → `sm`,
`md` → `md`, `lg` → `lg`). Cards, images, and containers are rectangular
(`none`) unless specifically designed. All badges, tags, and chips use
`rounded-full` — no exceptions.

### Borders

Standard interactive borders are **2px solid `dark`** (`#22223e`).
Subtle dividers use **1px** or **2px `muted`** or `lighter`.

## Accessibility

WCAG 2.1 compliance is **paramount**. Every component, every page, every
interaction must be accessible from the ground up — not retrofitted. This is
not a nice-to-have; it is a first-class design constraint equal to typography
and color.

### Focus rings

All interactive elements receive a visible focus indicator on `:focus-visible`:
2px `blue` outline with 2px offset. This is enforced globally in `app.css` on
`a`, `button`, `input[type="checkbox"]`, and `.filter-button`. Apply the same
pattern to any new interactive element:

```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue
```

The `#main-content` target suppresses its outline to avoid a ring when the
skip-link lands there.

### Skip link

A visually-hidden "Skip to main content" link is the first focusable element
on every page. It targets `#main-content` (which receives `tabindex="-1"`).
On `:focus-visible`, the link appears on-screen at `z-max` with a `blue`
background and `white` text.

### Reduced motion

Respect `prefers-reduced-motion: reduce`. Components that auto-advance
(carousels, marquee) must check this preference and either stop auto-play or
fall back to a static view.

**Rule:** every `@keyframes` animation and every JS-driven `setInterval`
slideshow must have a reduced-motion guard. CSS-only guard:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Components with reduced-motion guards:

- **HeroSplash** — JS `matchMedia` check, skips `setInterval` slideshow.
- **Carousel** — JS `matchMedia` check, disables autoplay.
- **ProgrammesPreview** — JS `matchMedia` check skips the
  `IntersectionObserver` entrance animation; CSS media query in `app.css`
  sets `opacity: 1; transform: none` so items are visible immediately.
- **Marquee banner / beta-pulse** — CSS media query in `app.css` sets
  `animation: none`.

### Contrast

All text/background combinations must meet WCAG AA (4.5:1 for normal text,
3:1 for large text). See the verified contrast table in the Buttons section.
When adding new color pairings, verify the ratio before shipping.

### ARIA patterns in use

- **Carousels:** `aria-roledescription="carousel"` / `"slide"`, `aria-label`
  with position counts, `aria-hidden` on inactive slides.
- **Header:** `aria-expanded`, `aria-controls`, `aria-haspopup` on the mobile
  toggle and dropdown triggers, `aria-current="page"` on active links.
- **Modals:** `aria-modal="true"`, `aria-hidden` on the backdrop, `aria-label`
  for the dialog.
- **Decorative elements:** `aria-hidden="true"` on Unicode icons, decorative
  images, and visual flourishes.
- **Dynamic content:** `aria-live="polite"` on regions that update without
  a page load.

### Alt text

All `<img>` elements must have an `alt` attribute. Meaningful images get
descriptive text. Decorative images use `alt=""`. Never omit the attribute.

### Keyboard navigation

Native focusable elements (links, buttons) handle keyboard access. Custom
interactive widgets (carousels, dropdowns, tooltips) should add `onKeyDown`
handlers for arrow keys, Escape, and Enter/Space where the native element
does not provide them.

Keyboard handlers are implemented on the carousel (Escape stops autoplay),
the desktop dropdown menu (ArrowDown/ArrowUp/Escape/Enter for full submenu
navigation), and the directory tooltip (Escape closes it).

## Icon System

**Text-first.** The design system uses Unicode characters instead of an icon
library. No SVG icon sprites, no icon fonts, no third-party icon packages.

### Standard characters

| Character | Unicode  | Use | Component(s) |
|-----------|----------|-----|---------------|
| ✕         | U+2715   | Dismiss / close | FormSidebar, Header (mobile), filter pills |
| +         | U+002B   | Open / expand | Header (mobile menu toggle) |
| ⓘ         | U+24D8   | Info / help | Directory tooltip |
| →         | U+2192   | Navigate / link | CTA buttons, read-more links |

### Rules

- **Expandable system:** the table above is the current set, not a closed list.
  New Unicode characters can be added as needs arise — just add them to the
  table and follow the rules below.
- **Standardized dismiss character:** always use ✕ (U+2715), never × (U+00D7)
  or ✖ (U+2716) or any other variant.
- **Sizing:** match the surrounding text size or one step up. Use `text-xl`
  or `text-2xl` with `leading-none` for standalone icon use.
- **Accessibility:** always wrap in a `<span>` with `aria-hidden="true"` and
  provide an `aria-label` on the parent interactive element.
- **No icon library:** if a pictogram is needed and no Unicode character works,
  use a simple inline SVG — but prefer text.

## Logo Usage

The Rebuild logo is a single-line logotype rendered as an SVG image
(`/public/assets/images/logo.svg`). It is not a font glyph.

### Sizing

- **Minimum height:** `h-6` (24px). Never render the logo smaller than this.
- **Larger sizes are allowed** wherever the design of a page or feature calls
  for it. There is no maximum — use judgement.
- **Maintain aspect ratio.** Always use `w-auto` paired with a height class.

### Color modes

- **Default (dark surface or light background):** dark logotype, no filter.
- **Transparent header (over hero splash):** inverted to white via
  `filter: brightness(0) invert(1)`. The header component handles this
  automatically when in transparent mode.

### Placement

- **Header:** left-aligned, `h-6`, links to `/`.
- **Footer:** left-aligned within the footer's left column.
- **Do not** place the logo on patterned or busy backgrounds without sufficient
  contrast. Use the inverted variant on dark backgrounds.

## Image Treatment

### Aspect ratios

Three standard ratios. Use only these:

| Name       | Ratio | Class / style          | Use |
|------------|-------|------------------------|-----|
| Square     | 1:1   | `aspect-square`        | Portraits, avatars, small thumbnails |
| Video      | 16:9  | `aspect-video`         | Hero images, tool cards, wide content |
| Portrait   | 3:4   | `style="aspect-ratio: 3/4"` | Tall editorial images, carousels |

**Rule:** `object-cover` on every image within these containers. No
`object-contain`, no `object-fill`.

### Grayscale and blend modes

- **Past events:** apply `grayscale(100%)` to the image, then overlay a
  `<div>` with the event's brand color at `mix-blend-multiply` and 40%
  opacity. This desaturates the image while tinting it with the event color.
- **General grayscale:** may be used for editorial effect on historical or
  archival imagery. Always pair with a color overlay or sufficient text
  contrast.
- **`mix-blend-multiply`:** the primary blending tool. Use it for color
  overlays on images, hero text contrast layers, and tinted scrims.

### Lazy loading

All below-the-fold images use `loading="lazy"` for native browser lazy loading.

## Form Input Styles

### Text inputs, textareas, selects

| Property | Value |
|----------|-------|
| Width | `w-full` |
| Padding | `px-sm` (16px) horizontal, `py-xs` (8px) vertical |
| Font | `text-base` (16px), inherits ABC Social Mono |
| Background | `bg-white` (`#f7f8f9`) |
| Border radius | `none` (rectangular) |
| Placeholder | `--color-darker` (`#5f5f79`) |

### Border states

Three states using the neutrals palette:

| State   | Border | Color |
|---------|--------|-------|
| Empty   | 1px solid | `lighter` (`#d9d9e0`) or `muted` (`#9c9cb4`) |
| Filled  | 2px solid | `darker` (`#5f5f79`) |
| Active / focus | 2px solid | `dark` (`#22223e`) |

**Current implementation:** `border-dark/30` default, `border-dark` on focus.
The target system above adds a visible distinction for filled fields.

### Validation

- **Error border:** `border-red` (use the project token `--color-red`, not
  Tailwind's `red-600`).
- **Error text:** `text-sm text-red mt-[2px]` below the field.
- **Required indicator:** red asterisk after the label.

Error styles use the project's `--color-red` token throughout.

### Labels

- Class: `block text-sm text-darker mb-[4px]`.
- Always visible above the field. Do not use placeholder-only labels.

### Checkbox

Custom 32×32px checkbox. `appearance: none`, 2px `dark` border, transparent
background. Checked state shows a "✕" (U+2715) via `::after` pseudo-element.

### Submit button

Full-width, `dark` background, `light` text, 2px `dark` border, `text-lg`.
Hover: `bg-darker`. Follows the primary button pattern but is always
full-width within the form context.

## Components

Flat, borderless buttons in three sizes; a fixed header with two modes; and a
rich-text wrapper for CMS content. The visual language is minimal — color fills
and typography do the work.

### Buttons — Primary

Three sizes, six color themes, no border/outline. Rounded corners always match
the size token. Text color is whichever of `dark` or `white` meets WCAG AA
contrast on that background.

**`dark` is the default primary button.** Use it for all standard actions
(submit, confirm, navigate, CTA). The five colored variants — red, blue, green,
orange, blush — are accent buttons for rare, intentional use: a featured section
card, a unique landing page, a special-event CTA, or anywhere a page already
commits to a specific hue. If in doubt, use `dark`.

#### Sizes

| Size | Font     | Padding (v / h) | Rounded | Height (approx) |
|------|----------|-----------------|---------|------------------|
| `sm` | 14px     | 8px / 16px      | `sm` (4px)  | 30px |
| `md` | 16px     | 10px / 24px     | `md` (8px)  | 36px |
| `lg` | 18px     | 14px / 32px     | `lg` (12px) | 46px |

#### Color themes

| Theme    | Background       | Text    | Hover background     | Hover text | Usage |
|----------|------------------|---------|----------------------|------------|-------|
| `dark`   | `dark` #22223e   | `white` | `darker` #5f5f79     | `white`    | **Default.** All standard actions. |
| `red`    | `red` #ac1d24    | `white` | `red-tint` #d16b6b   | `dark`     | Accent only. Alerts, destructive actions. |
| `blue`   | `blue` #6ba1cc   | `dark`  | `blue-tint` #8fb5d9  | `dark`     | Accent only. Info-themed sections. |
| `green`  | `green` #669e67  | `dark`  | `green-tint` #73b088 | `dark`     | Accent only. Success, completion. |
| `orange` | `orange` #bf6e36 | `dark`  | `orange-tint` #d4a77a| `dark`     | Accent only. Warmth, featured content. |
| `blush`  | `blush` #e1aeb0  | `dark`  | `blush-tint` #e8cdcd | `dark`     | Accent only. Soft, editorial pages. |

**Contrast ratios (verified):**

| Background           | Text    | Ratio  | WCAG AA |
|----------------------|---------|--------|---------|
| `dark`               | `white` | 14.5:1 | Pass |
| `darker` (hover)     | `white` | 5.8:1  | Pass |
| `red`                | `white` | 6.7:1  | Pass |
| `red-tint` (hover)   | `dark`  | 4.4:1  | Pass for lg; borderline sm/md — acceptable as transient hover |
| `blue`               | `dark`  | 5.6:1  | Pass |
| `blue-tint` (hover)  | `dark`  | 7.2:1  | Pass |
| `green`              | `dark`  | 4.9:1  | Pass |
| `green-tint` (hover) | `dark`  | 6.1:1  | Pass |
| `orange`             | `dark`  | 4.0:1  | Pass for lg; borderline sm/md — acceptable as accent use only |
| `orange-tint` (hover)| `dark`  | 7.0:1  | Pass |
| `blush`              | `dark`  | 8.0:1  | Pass |
| `blush-tint` (hover) | `dark`  | 10.3:1 | Pass |

### Buttons — Secondary

Single color scheme, same three sizes as primary. No border/outline. Rounded
corners match the size token.

| State   | Background          | Text   |
|---------|---------------------|--------|
| Default | `lighter` #d9d9e0   | `dark` |
| Hover   | `light` #e8e8e8     | `dark` |

Contrast: `lighter` → `dark` is 10.9:1, `light` → `dark` is 12.5:1. Both pass
comfortably.

### Badges

Small labels identifying categories or types. Always `rounded-full` with a
solid background color and contrasting text.

#### Sizes

| Size | Font | Padding (v / h) |
|------|------|-----------------|
| `sm` | `text-xs` (12px) | 4px / 8px |
| `md` | `text-sm` (14px) | 6px / 12px |
| `lg` | `text-base` (16px) | 8px / 16px |

#### Color variants

Available in all brand colors plus neutrals. Text is always `dark`
(`#22223e`) — the tint variants provide enough contrast.

| Variant  | Background  | Use |
|----------|-------------|-----|
| `red`    | `red-tint`  | Alerts, categories (Bundled, Forum, Microblogging) |
| `blue`   | `blue-tint` | Info categories (Community, Creator platform, Messaging) |
| `green`  | `green-tint`| Success, categories (Groups, Location) |
| `orange` | `orange-tint`| Warning, categories (Events, Social marketplace) |
| `blush`  | `blush-tint`| Soft categories (Dating, Photo sharing) |
| `blonde` | `blonde-tint`| Neutral categories (Resource sharing, Video sharing, Other) |
| `dark`   | `dark`      | Dark variant — `white` text |
| `lighter`| `lighter`   | Muted/neutral labels |

#### Current usage

Directory cards use the `Badge` component (`~/components/Badge.tsx`) with
per-category color mapping defined in `CATEGORY_COLORS`. Country labels
use the `lighter` variant.

Insights posts should use the `lighter` variant for topic tags when tag
data is added to the data model.

### Chips / Pills

Interactive toggle elements for filtering and selection. Always `rounded-full`.
The original pattern comes from the directory/programme filter buttons.

#### Sizes

| Size | Font | Padding (v / h) |
|------|------|-----------------|
| `sm` | `text-xs` (12px) | 4px / 12px |
| `md` | `text-sm` (14px) | 6px / 16px |
| `lg` | `text-base` (16px) | 8px / 24px |

#### Variants

**Outlined (default for filters):**
- Default: `white` background, 2px `dark` border, `dark` text.
- Active: colored `--light` background, 2px `dark` border, `dark` text,
  dismiss ✕ (U+2715) appended.
- Hover (inactive): `lighter` background.
- The existing `.filter-button` class uses this variant with `xs` (8px)
  vertical / `md` (24px) horizontal padding. This is the one button type
  that keeps a visible border.

**Filled:**
- Default: `--light` variant of the brand color, no border, `dark` text.
- Hover: `--tint` variant of the brand color.
- Active/selected: `--base` (default) variant of the brand color, `dark` or
  `white` text for contrast, dismiss ✕ appended.

#### Filter pill color mapping

Each filter category maps to a brand color. When active, the pill shows that
color's `--light` variant as background, shifting to `--tint` on hover and
`--base` (default value) when selected.

### Card Component

Cards are content containers. The system has no shared card base class — each
variant is composed from utility classes. These are the common principles
extracted from the directory cards.

#### Principles

- **Surface:** `bg-white` with `border-2` (inherits `border-dark`).
- **Radius:** `rounded-none` (rectangular). Cards do not get rounded corners.
- **Padding:** `p-md` (24px) on desktop, `p-5` (20px) as a compact
  alternative.
- **Internal spacing:** `space-y-md` (24px vertical rhythm).
- **No shadows.** Depth comes from the border.

#### Card variants

**Directory card** (the canonical reference):
- Masonry layout (`columns-1 md:columns-2 lg:columns-3`).
- Contains: name/link, description (max-width `55ch`), category badges, and
  country pill.
- Outer: `break-inside-avoid mb-xs`.
- Inner: `bg-white space-y-md p-5 lg:p-md rounded border-2`.

**Tool card:**
- `bg-lighter`, no border, no rounded corners.
- Image at top with `aspect-video`, content in `p-md`.
- Action buttons use `border-2 border-dark`.

**Insight post card:**
- No surface — image and title only (`overflow-hidden mb-xl`).
- Image with `aspect-video`, title link below with `mt-md`.

**Gathering card:**
- No surface — image with colored overlay label.
- Fixed-height image (`h-125`), location/date row, optional CTA buttons.

**Person card:**
- No surface — square image (`aspect-square bg-muted`), name, specialty, bio.

### Header

Fixed top navigation with two visual modes:

- **Default:** `white` background, `dark` text/links, dark logo.
- **Transparent:** transparent background, `light` text/links, inverted
  (white) logo. Used when hero splash is directly behind.
- **Transition:** `--duration-slow` with `--ease-rebuild` on background-color, text color, border-color,
  and filter.

### Hero Splash

Full-viewport (90vh) image slideshow with text overlay and CTA buttons.

**Image overlay:** two layers —
1. Full-bleed `bg-dark/65` with `mix-blend-multiply` (tints without washing
   out the image).
2. Bottom-third gradient (`rgba(34,34,62,0.6)` → transparent) for extra CTA
   text contrast.

**Splash CTA buttons:** overlaid on the hero image, outside the standard
button size system.
- **Default:** transparent background (25% `dark`), 2px `light` border,
  `light` text, no border-radius.
- **Hover:** `light` background, `dark` text.
- **Layout:** flex-wrap row, scrollable on mobile.

**Slideshow:** auto-advances every 4s. Respects `prefers-reduced-motion` —
stops on the first image when the user prefers reduced motion.

### Rich Text

Wrapper class (`.rich-text`) for CMS-authored markdown/HTML content with
comprehensive typography, list, blockquote, table, code, and callout styling.
See the Typography and Colors sections for specific values.

### Beta Banner

Scrolling marquee strip, typically below the header.

- **Default mode:** `light` background, `dark` text, `dark` top border.
- **Transparent header mode:** transparent background, `light` text,
  `light` border.
- Animation: horizontal scroll, 60s cycle, pauses on hover.
- Desktop-only subtle opacity pulse (5s cycle).

## Navigation Patterns

### Header modes

The header operates in two visual modes based on scroll position:

1. **Transparent mode** (home page, above hero fold): transparent background,
   `light` text, inverted logo. Triggered by `isHome() && !scrolledPastHero()`.
2. **Default mode** (scrolled past hero, or any non-home page): `white`
   background, `dark` text, standard logo.

The transition between modes uses `--duration-slow` with `--ease-rebuild` on background-color, color,
border-color, and filter. An anti-FOUC measure suppresses the initial
transition on mount.

### Desktop navigation

- Horizontal `<nav>` with `flex gap-md`, hidden below `lg` breakpoint.
- Links: `no-underline hover:underline px-sm py-xs transition-rebuild`.
- Active page: `aria-current="page"`.
- Dropdown: parent `<li>` gets Tailwind `group` class. Submenu is `absolute
  top-full` with `hidden group-hover:block focus-within:block` for mouse users.
  Keyboard users get a parallel signal-based open state: ArrowDown/Enter on the
  trigger opens the submenu and focuses the first `menuitem`, ArrowUp/ArrowDown
  cycles items, Escape closes and returns focus to the trigger. Submenu items
  without a URL show as non-linked text styled by status (`line-through` for
  past, `text-muted` for future).

### Mobile navigation

- Full-screen overlay: `fixed inset-0 bg-white z-50`.
- Toggled by signal; body scroll is locked when open.
- Links use `text-4xl` — deliberately oversized for touch targets and visual
  impact. This is an intentional stylistic choice, not a bug.
- Secondary navigation appears below with `text-xl`, separated by a
  `border-b-2 border-dark`.
- Close button uses "Close" text + ✕ (U+2715).

### Improvements needed

- Dropdown should support keyboard navigation (arrow keys, Escape).
- Mobile menu close should trap focus within the overlay.

## Motion

### Custom easing

The Rebuild identity easing curve:

```
--ease-rebuild: cubic-bezier(0.33, 0, 0.1, 1)
```

A smooth, confident curve — quick off the mark, then settling gently into
place. No bounce, no overshoot. Like turning a page.

### Duration tokens

| Token              | Value | Use |
|--------------------|-------|-----|
| `--duration-fast`  | 150ms | Hover states, micro-interactions |
| `--duration-base`  | 250ms | General transitions |
| `--duration-slow`  | 350ms | Carousel crossfades |
| `--duration-slower`| 500ms | Entrance animations |

### The `transition-rebuild` utility

Combines the custom easing with a 220ms duration:

```css
@utility transition-rebuild {
  transition-duration: 220ms;
  transition-timing-function: var(--ease-rebuild);
}
```

Use `transition-rebuild` for most interactive transitions (buttons, links,
state changes). The 220ms duration sits between `fast` and `base` — quick
enough to feel responsive, slow enough to be perceptible.

### What animates

- **Hover states:** color shifts on buttons and links (`transition-rebuild`).
- **Header mode switch:** background-color, text color, border-color, filter
  (`--duration-slow` with `--ease-rebuild`).
- **Carousel slides:** opacity and visibility (`--duration-slow` with
  ease-in-out).
- **Hero splash images:** crossfade (1500ms ease-in-out).
- **Marquee banner:** continuous horizontal scroll (60s linear).
- **Programme items:** slide-in entrance (translateX + opacity,
  `--duration-slower` with `--ease-rebuild`).
- **Page transitions:** on internal link clicks the content fades out to the
  background color, then the next page fades in from it (220ms each,
  `--ease-rebuild`). Between non-home pages the header is held in place and
  only `main` and the footer fade; to/from the home page (transparent header)
  the whole page fades. Images that aren't decoded when a page reveals fade in
  on their own. Implemented in `src/lib/pageTransition.ts` (inline head
  script) and the "Page transitions" block in `app.css`. Skipped entirely for
  `prefers-reduced-motion: reduce`.

### What does not animate

- Layout shifts (no animated width/height changes).
- Scroll position.

### Reduced motion

All animations must respect `prefers-reduced-motion: reduce`. See the
Accessibility section for implementation details.

## Error, Empty, and Loading States

### Loading states

Use **shimmer skeletons** — placeholder shapes that pulse with a subtle
animation to indicate content is loading. Shimmer is an industry standard
and communicates that something is happening.

**Current state:** all `<Suspense>` boundaries render nothing while loading.
Shimmer skeletons need to be implemented.

**Skeleton guidelines:**
- Match the approximate layout of the content being loaded.
- Use `bg-lighter` as the base color with a shimmer animation sweeping
  `bg-light` across.
- Respect `prefers-reduced-motion` — static placeholder without animation
  for users who prefer reduced motion.

### Empty states

When data is genuinely empty (not loading, not errored — just nothing there),
display a descriptive message in the editorial voice.

**Tone:** write like an editor's note, not a system message. Be as
descriptive, detailed, and plain-language as possible. The reader is an adult
who deserves a clear explanation.

**Format:** use an em-dash (—) to separate the state from its explanation
when appropriate.

| Pattern | Example |
|---------|---------|
| No results | "No platforms match the selected filters." |
| Empty collection | "No platforms available — this is definitely an error." |
| Not found | "Not found" (with `text-4xl` heading) |

### Error states

**Form validation:**
- Error border: `border-red` (project token, not Tailwind red).
- Error text: `text-sm text-red` below the field.
- Server errors: descriptive message in the editorial voice.

**Page-level errors:**
- No `ErrorBoundary` component exists yet. When implemented, use the same
  editorial tone as empty states.

## Badge, Tag, and Chip Styles

See the **Badges** and **Chips / Pills** subsections under Components for the
full specification. Summary of the distinction:

| Element | Shape | Interactive? | Border |
|---------|-------|-------------|--------|
| Badge   | `rounded-full` | No (label only) | None — solid fill |
| Chip / Pill | `rounded-full` | Yes (toggle/dismiss) | 2px `dark` (outlined) or none (filled) |

Both use the same size scale (sm / md / lg) and are available in all brand
colors. Badges are static labels. Chips are interactive filters with hover,
active, and dismiss states.

## Footer Component

### Structure

Two-region layout inside a `flex-col lg:flex-row` container:

1. **Left column:** logo and site description.
2. **Right column:** `<nav>` with two `<ul>` lists side by side
   (`flex-row gap-xl`):
   - First list: main navigation links (`text-sm`, `hover:underline`).
   - Second list: secondary navigation (`text-xs`). Non-clickable items
     render as `<span>` with `cursor-not-allowed` and `aria-disabled`.

A copyright line sits below both columns.

### Responsive

- Below `lg`: columns stack vertically (`flex-col`), constrained to
  `max-w-200`.
- At `lg` and above: horizontal layout, `max-w-max-width`.

### Styling

- No background color (inherits page background).
- No top border or divider — separation comes from spacing.
- Links follow the standard `dark` text, `hover:underline` pattern.

## Content Voice and Tone

### Core principles

**Plain language, at eye level.** Write as if explaining something to a
thoughtful peer over coffee. No jargon, no corporate speak, no hedging.
The reader is a grown-up — give them clear, direct information and trust
them to understand it.

**Be an editor, not a marketer.** Every piece of text should read like an
editor's note: informed, precise, and genuinely useful. Never sell. Never
hype. State what something is, what it does, and why it matters.

**Concise but complete.** Say everything that needs saying, nothing more.
A single well-constructed sentence beats three that circle the point. Cut
filler words. Cut throat-clearing introductions. Start with the substance.

### Voice characteristics

- **Direct:** "We are mapping all the social platforms in Europe." Not "We're
  excited to announce our initiative to comprehensively catalogue..."
- **Honest:** acknowledge limitations and uncertainties. "This is definitely
  an error" is better than pretending nothing happened.
- **Inclusive:** write for an international audience. Avoid idioms, cultural
  references, or humor that assumes a specific background.
- **Warm but not casual:** friendly without being flip. No exclamation marks
  in UI text. No emoji (unless explicitly documented as part of a component).

### Editorial reference

The Rebuild Letter sets the tone for long-form and inspirational prose:
confident, rooted, culturally aware, and written from a place of genuine
conviction. It uses simple sentence structures, concrete imagery, and speaks
to the reader as a collaborator, not an audience.

When writing longer content (about pages, manifestos, programme descriptions),
channel this voice: grounded, specific, and human. Avoid abstraction. Name
real places, real challenges, real aspirations.

### UI text guidelines

- **Labels and buttons:** imperative mood. "Join the directory", not "Click
  here to join."
- **Descriptions:** present tense, active voice. "We are mapping..." not "The
  platforms are being mapped..."
- **Empty states:** write like an editor's note. Descriptive, detailed, plain
  language.
- **Error messages:** explain what happened and what to do. Never blame the
  user. "Something went wrong" is acceptable as a last resort, but prefer
  specificity.
- **Tooltips and help text:** answer the question the reader is asking.
  "What is this?" deserves a real, complete answer.

## Do's and Don'ts

Ground rules for staying within the system and avoiding common drift.

### Do

- **Use a single font weight.** ABC Social Mono Book (400) only. Create
  hierarchy with size and spacing.
- **Keep it flat.** No shadows anywhere. Use borders and color fills to
  define interactive elements and create visual hierarchy.
- **Use the shade/tint system.** Hover states should use the shade variant;
  background fills should use the tint variant.
- **Respect the container.** Content sits inside a 1400px max-width container
  with 24px side padding. Only the hero splash breaks out full-bleed.
- **Use semantic spacing tokens** (`xs`, `sm`, `md`, `lg`, `xl`) rather than
  arbitrary pixel values.
- **Default to the `dark` button.** It is the primary button for all standard
  actions. Colored variants are accent buttons — use them only when a section,
  card, or page already commits to a specific hue.
- **Match button radius to size.** `sm` → `rounded-sm`, `md` → `rounded-md`,
  `lg` → `rounded-lg`. Only pills and badges use `rounded-full`.
- **No borders on standard buttons.** Primary and secondary buttons have no
  border or outline — color alone distinguishes them. Only filter pills and
  splash CTAs keep a border.
- **Pick button text color for contrast.** Use `white` on dark/saturated
  backgrounds (dark, red), `dark` on light/medium backgrounds (blue, green,
  lighter, light). See the verified contrast table.
- **Set focus rings.** All interactive elements need a visible 2px `blue`
  outline with 2px offset on `:focus-visible`.
- **Use the z-index token scale.** Never introduce ad-hoc z-index values.
- **Use the `transition-rebuild` utility** for interactive transitions.
- **Respect reduced motion.** Every animation needs a
  `prefers-reduced-motion` guard.
- **Design for WCAG 2.1 AA** from the start. Contrast, focus, keyboard
  access, and ARIA are not optional.

### Don't

- **Don't use bold or italic** on ABC Social Mono (except in `.rich-text`
  for CMS content where semantic markup matters).
- **Don't introduce new colors.** The 30-value palette (6 chromatic × 4 stops
  + 6 neutrals) is the complete set.
- **Don't use shadows.** Not for elevation, not for hover, not for depth.
  This is a shadowless design system by deliberate choice.
- **Don't use gradients** outside the hero splash overlay.
- **Don't use rounded corners on cards or containers.** They stay rectangular.
  Only buttons, badges, and pills get radii.
- **Don't put borders on standard buttons.** Primary and secondary buttons are
  borderless. Don't add outlines to "make them look more clickable."
- **Don't use colored buttons for routine actions.** A form's "Submit" is
  `dark`, not `blue`. Colored variants are for pages that have an intentional
  color identity.
- **Don't add a dark mode.** The system is single-theme (light).
- **Don't load additional font weights or font files.** The single .woff2 is
  intentional for performance.
- **Don't use icon libraries.** Use Unicode characters or simple inline SVGs.
- **Don't use Tailwind's built-in colors** (e.g., `red-600`, `gray-200`).
  Always use the project's color tokens.
- **Don't skip reduced-motion checks.** Animations without a
  `prefers-reduced-motion` guard are a11y violations.

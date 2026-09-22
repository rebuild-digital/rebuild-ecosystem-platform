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
  full: 9999px

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
overlay), no drop shadows on interactive elements, and minimal border radius.
Buttons are either borderless text or outlined pills. The overall feeling is
a curated programme booklet — restrained, typographic, confident.

## Colors

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

### Container

- **Max width:** 1400px (the `max-w-max-width` utility, from `--container-max-width`)
- **Horizontal padding:** 1.5rem (24px) — applied as `px-md`, constant at all
  breakpoints (no responsive padding scaling).
- **Centering:** `max-w-max-width mx-auto px-md`

The shell layout (`app.tsx`) applies `lg:max-w-max-width mx-auto px-md` to
`<main>`, so the max-width constraint only activates at `lg` (1024px) and above.
Below `lg`, content stretches to the viewport width minus the `px-md` gutters.

Always use the `max-w-max-width` utility — never hardcode `max-w-[1400px]`.

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

### Page structure

- **Fixed header** at the top. Non-home pages add `pt-5xl` (192px) to `<main>`
  to clear it.
- **Header modes:** default (white background, dark text) and transparent
  (transparent background, light text, inverted logo) — used on the homepage
  hero.
- **Full-bleed hero** on the homepage: 90vh height, full viewport width via
  `w-screen`, with a gradient overlay and absolute-positioned content.

## Elevation & Depth

The design is intentionally flat. Shadows are defined in the token system but
used sparingly:

| Token    | Value | Use |
|----------|-------|-----|
| `xs`     | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | — |
| `sm`     | `0 1px 3px …` | — |
| `md`     | `0 4px 6px …` | Code blocks in rich-text |
| `lg`     | `0 10px 15px …` | — |
| `xl`     | `0 20px 25px …` | — |
| `2xl`    | `0 25px 50px …` | — |
| `inner`  | `inset 0 2px 4px …` | — |

**Guidance:** prefer borders over shadows. The default interactive language
is a 2px `dark` border, not a shadow lift. If you must elevate, use `shadow-md`
or smaller.

### Z-index

| Token | Value | Use |
|-------|-------|-----|
| `0`   | 0     | Default stacking |
| `10`  | 10    | Splash background images |
| `20`  | 20    | Splash gradient overlay |
| `30`  | 30    | Splash content |
| `40`  | 40    | — |
| `50`  | 50    | Fixed header, modals |

## Shapes

### Border radius

| Token  | Value  | Use |
|--------|--------|-----|
| `none` | 0px    | Default for cards, inputs, containers |
| `sm`   | 4px    | Small buttons |
| `md`   | 8px    | Medium buttons |
| `lg`   | 12px   | Large buttons |
| `full` | 9999px | Filter pill buttons, tags |

**Guidance:** buttons use the radius that matches their size (`sm` → `sm`,
`md` → `md`, `lg` → `lg`). Everything else — cards, images, containers — is
rectangular (`none`) unless specifically designed. Only filter pills and tags
use `rounded-full`.

### Borders

Standard interactive borders are **2px solid `dark`** (`#22223e`).
Subtle dividers use **1px** or **2px `muted`** or `lighter`.

## Components

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

### Buttons — Special purpose

#### Filter Button (pill)

Pill-shaped toggle for directory/programme category filtering. **Not** part of
the sm/md/lg size system — uses its own dimensions and `rounded-full`.

- **Default:** transparent background, 2px `dark` border, `dark` text,
  `rounded-full`, padding `xs` (8px) vertical / `md` (24px) horizontal.
- **Hover/active:** `dark` background, `white` text.
- **Contains:** optional dismiss "✕" icon.
- This is the one button type that keeps a border.

#### Splash CTA Button

Call-to-action links overlaid on the hero splash image. Also outside the
standard size system — these are contextual to the hero.

- **Default:** transparent background (25% `dark` overlay), 2px `light` border,
  `light` text, no border-radius.
- **Hover:** `light` background, `dark` text.
- **Layout:** 2-column grid on desktop, vertical stack on mobile.

### Header

Fixed top navigation with two visual modes:

- **Default:** `white` background, `dark` text/links, dark logo.
- **Transparent:** transparent background, `light` text/links, inverted
  (white) logo. Used when hero splash is directly behind.
- **Transition:** 300ms ease on background-color, text color, border-color,
  and filter.

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

### Checkbox

Custom 32×32px checkbox with "✕" mark instead of the native checkmark.
2px `dark` border, transparent background.

## Do's and Don'ts

### Do

- **Use a single font weight.** ABC Social Mono Book (400) only. Create
  hierarchy with size and spacing.
- **Keep it flat.** Use borders, not shadows, to define interactive elements.
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
  `lg` → `rounded-lg`. Only pills use `rounded-full`.
- **No borders on standard buttons.** Primary and secondary buttons have no
  border or outline — color alone distinguishes them. Only filter pills and
  splash CTAs keep a border.
- **Pick button text color for contrast.** Use `white` on dark/saturated
  backgrounds (dark, red), `dark` on light/medium backgrounds (blue, green,
  lighter, light). See the verified contrast table.
- **Set focus rings.** All interactive elements need a visible 2px `blue`
  outline with 2px offset on `:focus-visible`.

### Don't

- **Don't use bold or italic** on ABC Social Mono (except in `.rich-text`
  for CMS content where semantic markup matters).
- **Don't introduce new colors.** The 30-value palette (6 chromatic × 4 stops
  + 6 neutrals) is the complete set.
- **Don't use gradients** outside the hero splash overlay.
- **Don't use rounded corners on cards or containers.** They stay rectangular.
  Only buttons and pills get radii.
- **Don't put borders on standard buttons.** Primary and secondary buttons are
  borderless. Don't add outlines to "make them look more clickable."
- **Don't use colored buttons for routine actions.** A form's "Submit" is `dark`,
  not `blue`. Colored variants are for pages that have an intentional color
  identity.
- **Don't apply shadows for hover states.** Use color shifts (tint variants for
  primary buttons, `light` for secondary) instead.
- **Don't add a dark mode.** The system is single-theme (light).
- **Don't use the system sans-serif** for visible UI text. The `--font-sans`
  token exists as a fallback stack but is not used in the design.
- **Don't load additional font weights or font files.** The single .woff2 is
  intentional for performance.

<!-- TODO: The sections below require input from the design owner. -->
<!-- See the checklist at the end of this file for what's still needed. -->

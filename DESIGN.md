---
version: "alpha"
name: Rebuild Ecosystem Platform
description: >
  A monospaced, editorial design system for a cultural ecosystem platform.
  Dark ink on warm off-white, one typeface (ABC Social Mono Book), six chromatic
  hues each with shade/tint variants, and generous spacing.

colors:
  # Brand chromatic — each with shade (darker) and tint (lighter) variants
  red: "#ac1d24"
  red-shade: "#8a1f1f"
  red-tint: "#d16b6b"

  blue: "#6ba1cc"
  blue-shade: "#3d5f83"
  blue-tint: "#8fb5d9"

  green: "#669e67"
  green-shade: "#316139"
  green-tint: "#73b088"

  blush: "#e1aeb0"
  blush-shade: "#b17d7d"
  blush-tint: "#e8cdcd"

  blonde: "#f4e2d2"
  blonde-shade: "#d4b59a"
  blonde-tint: "#f7ebe0"

  orange: "#bf6e36"
  orange-shade: "#9a5e2e"
  orange-tint: "#d4a77a"

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
    lineHeight: 1.6
    letterSpacing: -0.02em
  body-sm:
    fontFamily: ABC Social Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: -0.02em
  label-sm:
    fontFamily: ABC Social Mono
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
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
  # Filter pill buttons (directory, programme filters)
  filter-button:
    backgroundColor: transparent
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    padding: 8px 24px
    typography: "{typography.body-sm}"

  filter-button-hover:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.white}"

  # Hero splash CTA buttons
  splash-cta-button:
    backgroundColor: transparent
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: 16px 24px

  splash-cta-button-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark}"

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
blush, blonde, orange — each carry a shade (darker) and tint (lighter) variant,
giving 18 chromatic values plus 6 neutrals. There is **no dark mode**; the
system ships a single light theme.

The visual language is flat and direct: no gradients (except the hero splash
overlay), no drop shadows on interactive elements, and minimal border radius.
Buttons are either borderless text or outlined pills. The overall feeling is
a curated programme booklet — restrained, typographic, confident.

## Colors

### Chromatic hues

Each chromatic color has three stops: the **base** for primary use, a **shade**
for hover states and emphasis, and a **tint** for backgrounds and subtle fills.

| Name   | Base      | Shade     | Tint      | Role |
|--------|-----------|-----------|-----------|------|
| Red    | `#ac1d24` | `#8a1f1f` | `#d16b6b` | Accent, alerts, beta-banner callouts |
| Blue   | `#6ba1cc` | `#3d5f83` | `#8fb5d9` | Links (focus ring), info callouts, interactive highlights |
| Green  | `#669e67` | `#316139` | `#73b088` | Success states, inline code text |
| Blush  | `#e1aeb0` | `#b17d7d` | `#e8cdcd` | Soft accent, table row hover, error callouts |
| Blonde | `#f4e2d2` | `#d4b59a` | `#f7ebe0` | Warm background accents |
| Orange | `#bf6e36` | `#9a5e2e` | `#d4a77a` | Warning callouts, highlight marks |

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
- **Hero splash overlay:** `dark` in RGBA at varying opacities (0.1–0.95) as a
  vertical gradient over background imagery.
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

Exception: the `.rich-text strong` rule applies `font-bold` for user-authored
markdown content, where semantic emphasis is needed; this relies on browser
synthesis and is an accepted trade-off for CMS content only.

### Type scale

| Token     | Size (rem) | Size (px) | Use |
|-----------|-----------|-----------|-----|
| `xs`      | 0.75      | 12        | Smallest labels, fine print |
| `sm`      | 0.875     | 14        | Captions, filter buttons, metadata |
| `base`    | 1         | 16        | Body text, form inputs |
| `lg`      | 1.125     | 18        | Body text in rich-text blocks (desktop), h5, h4 (mobile) |
| `xl`      | 1.25      | 20        | h4 (desktop), h3 (mobile) |
| `2xl`     | 1.5       | 24        | h3 (desktop), h2 (mobile) |
| `3xl`     | 1.875     | 30        | h2 (desktop), h1 (mobile) |
| `4xl`     | 2.25      | 36        | h1 (desktop) |
| `5xl`     | 3         | 48        | Rich-text h1, splash title (mobile) |
| `6xl`     | 3.75      | 60        | — |
| `7xl`     | 4.5       | 72        | Splash title (desktop, lg+) |

### Heading scale (responsive)

| Level | Desktop       | Mobile (< 768px) |
|-------|---------------|-------------------|
| h1    | `4xl` (36px)  | `3xl` (30px)      |
| h2    | `3xl` (30px)  | `2xl` (24px)      |
| h3    | `2xl` (24px)  | `xl` (20px)       |
| h4    | `xl` (20px)   | `lg` (18px)       |
| h5    | `lg` (18px)   | `lg` (18px)       |
| h6    | `base` (16px) | `base` (16px)     |

### Line heights

| Context         | Line height |
|-----------------|-------------|
| Headings        | 1.2         |
| Rich-text headings | 1.3      |
| Body text       | 1.6         |
| Rich-text body  | 1.7         |

### Letter spacing

The body default is `-0.02em` (slightly tightened). This is applied globally
and inherited by all elements.

## Layout

### Container

- **Max width:** 1400px
- **Horizontal padding:** 1.5rem (24px) — applied as `px-md`
- **Centering:** `max-w-max-width mx-auto px-md`

### Spacing scale

The spacing scale uses semantic names rather than numeric multipliers:

| Token | Value  | Px  | Common use |
|-------|--------|-----|------------|
| `xxs` | 0.25rem | 4  | Tight internal padding (code inline, kbd) |
| `xs`  | 0.5rem  | 8  | Gap between inline elements, list item margin |
| `sm`  | 1rem    | 16 | Paragraph margin, card padding, button padding-y |
| `md`  | 1.5rem  | 24 | Section padding, container gutter, button padding-x |
| `lg`  | 2rem    | 32 | Between content blocks, heading margin-bottom |
| `xl`  | 3rem    | 48 | Major section breaks, heading margin-top |
| `2xl` | 4rem    | 64 | Hero content bottom padding, image margins |
| `3xl` | 6rem    | 96 | Large section padding |
| `4xl` | 8rem    | 128 | — |

### Breakpoints

| Name  | Width   | Role |
|-------|---------|------|
| `sm`  | 640px   | Small phones → wider phones |
| `md`  | 768px   | Phone → tablet; primary responsive typography breakpoint |
| `lg`  | 1024px  | Tablet → desktop; hero title scale-up |
| `xl`  | 1280px  | Desktop → wide desktop |
| `2xl` | 1536px  | Wide desktop |

The primary responsive breakpoint is `md` (768px). Typography, grid layouts,
and navigation switch between mobile/desktop at this point.

### Page structure

- **Fixed header** at the top. Non-home pages add `pt-48` (192px) to `<main>`
  to clear it.
- **Header modes:** default (white background, dark text) and transparent
  (transparent background, light text, inverted logo) — used on the homepage
  hero.
- **Full-bleed hero** on the homepage: 100vh, 100vw with negative margins to
  break out of the container.

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
| `none` | 0px    | Default for most elements (buttons, inputs, cards) |
| `sm`   | 4px    | Subtle rounding where needed |
| `md`   | 8px    | — |
| `lg`   | 12px   | — |
| `full` | 9999px | Filter pill buttons |

**Guidance:** the default shape is **rectangular** (no border-radius). Only
filter pills and tags use `rounded-full`. Do not round cards, images, or
containers unless specifically designed.

### Borders

Standard interactive borders are **2px solid `dark`** (`#22223e`).
Subtle dividers use **1px** or **2px `muted`** or `lighter`.

## Components

### Filter Button

Pill-shaped toggle for directory/programme category filtering.

- **Default:** transparent background, 2px `dark` border, `dark` text,
  `rounded-full`, padding `xs` vertical / `md` horizontal.
- **Hover/active:** `dark` background, `white` text.
- **Contains:** optional dismiss "✕" icon.

### Splash CTA Button

Call-to-action links overlaid on the hero splash image.

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
- **Default to rectangular shapes.** No border-radius is the norm; only use
  `rounded-full` for pills/tags.
- **Set focus rings.** All interactive elements need a visible 2px `blue`
  outline with 2px offset on `:focus-visible`.

### Don't

- **Don't use bold or italic** on ABC Social Mono (except in `.rich-text`
  for CMS content where semantic markup matters).
- **Don't introduce new colors.** The 24-value palette (6 chromatic × 3 stops
  + 6 neutrals) is the complete set.
- **Don't use gradients** outside the hero splash overlay.
- **Don't use rounded corners on cards or containers.** The design language is
  rectangular.
- **Don't apply shadows for hover states.** Use color shifts (shade variants)
  instead.
- **Don't add a dark mode.** The system is single-theme (light).
- **Don't use the system sans-serif** for visible UI text. The `--font-sans`
  token exists as a fallback stack but is not used in the design.
- **Don't load additional font weights or font files.** The single .woff2 is
  intentional for performance.

<!-- TODO: The sections below require input from the design owner. -->
<!-- See the checklist at the end of this file for what's still needed. -->

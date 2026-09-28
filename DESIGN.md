---
version: "alpha"
name: Rebuild Ecosystem Platform
description: >
  A monospaced, editorial design system
  for a cultural ecosystem platform.
  Dark ink on warm off-white, one
  typeface (ABC Social Mono Book), six
  chromatic hues each with four variants
  (shade, base, tint, light), and
  generous spacing.

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

  # Filter pill buttons (directory filters) — filled Chip, lg size.
  # Shown for one hue; each category uses its own hue's light/tint/base.
  filter-chip:
    backgroundColor: "{colors.blue-light}"
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    padding: 8px 24px
    typography: "{typography.button-md}"
  filter-chip-hover:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.dark}"
  filter-chip-active:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark}"

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
  # FORMS
  # =============================================
  # All box controls (input, textarea, select)
  # share one anatomy. Borders are always 2px;
  # only their color changes between states, so
  # nothing shifts on state change. See "Form
  # Input Styles" for border colors per state.

  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark}"
    rounded: "{rounded.none}"
    padding: 8px 16px
  input-disabled:
    backgroundColor: "{colors.light}"
    textColor: "{colors.darker}"
  input-readonly:
    backgroundColor: "{colors.light}"
    textColor: "{colors.dark}"

  select:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark}"
    rounded: "{rounded.none}"
    padding: 8px 48px 8px 16px # right padding clears the ↓ arrow

  checkbox:
    backgroundColor: transparent
    textColor: "{colors.dark}" # the ✕ mark
    rounded: "{rounded.none}"
    size: 32px

  radio:
    backgroundColor: transparent
    textColor: "{colors.dark}" # the 16px dot
    rounded: "{rounded.full}"
    size: 32px

  form-error-message:
    backgroundColor: "{colors.red-light}"
    textColor: "{colors.red}"
    padding: 8px 16px
    typography: "{typography.body-sm}"

  # =============================================
  # LOADING
  # =============================================

  loader:
    textColor: currentColor # three dots inherit the text color
    size: 0.375em # per dot

  skeleton:
    backgroundColor: "{colors.lighter}"
    rounded: "{rounded.none}"
  skeleton-pulse:
    backgroundColor: "{colors.light}"

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

The Rebuild Ecosystem Platform uses an
editorial, monospaced aesthetic rooted
in cultural publishing. Every piece of
text is set in **ABC Social Mono** at
its single "Book" weight (400) —
headings, body, labels, and code all
share the same typeface and weight.
Hierarchy comes from size and spacing,
never from bold or italic variations.

The palette pairs a deep navy-ink dark
(`#22223e`) with a cool off-white
(`#f7f8f9`) as the default surface. Six
chromatic hues — red, blue, green,
blush, blonde, orange — each carry four
stops (shade → base → tint → light),
giving 24 chromatic values plus 6
neutrals (30 total). The light stops are
near-white pastels used for subtle
backgrounds, graphic elements, and color
overlays. There is **no dark mode**; the
system ships a single light theme.

The visual language is flat and direct:
no gradients (except the hero splash
overlay), no drop shadows anywhere, and
minimal border radius. Buttons are
either borderless text or outlined
pills. The overall feeling is a curated
programme booklet — restrained,
typographic, confident.

### Building with this system

These rules apply to every new feature
and are repeated in `AGENTS.md` and
`CLAUDE.md` on purpose:

1. **This document is the spec.** Read
   the relevant sections before
   building anything, and follow them.
   Tokens, components, states,
   accessibility, motion and voice
   described here are requirements, not
   suggestions.
2. **Reuse before you create.** Build
   from the components and patterns
   documented below and implemented in
   `src/components/` and
   `src/components/blocks/`. A new
   component that is "on brand" is
   still a new component, and it still
   adds bloat. For example, every card
   is a `Card` (see [Card
   Component](#card-component)), never
   a hand-rolled surface. Prefer, in
   order:
   - use as is;
   - compose existing pieces;
   - extend an existing component with
     a variant or prop.

   Only when nothing existing can do
   the job should you create something
   new. Document it in
   [Components](#components) in the
   same PR, so the next feature can
   reuse it.
3. **Follow best practice, the Solid
   way.** Write DRY, accessible (see
   [Accessibility](#accessibility)) and
   performant code. Use SolidJS and
   SolidStart idioms rather than React
   habits. See `AGENTS.md` §Building
   features for the specifics.

## Colors

30 total values: six chromatic hues with
four stops each (shade → base → tint →
light), plus six neutrals from white to
dark. No dark mode — single light theme.

### Chromatic hues

Each chromatic color has four stops,
from darkest to lightest:

- **Shade** — darkest; hover states,
  pressed states, emphasis.
- **Base** — the primary, recognisable
  value of the hue.
- **Tint** — lighter; secondary fills,
  callout backgrounds, soft accents.
- **Light** — lightest, near-white;
  subtle page backgrounds, graphic
  elements, color overlays, section
  tinting.

| Name   | Shade     | Base      | Tint      | Light     | Role                                                      |
| ------ | --------- | --------- | --------- | --------- | --------------------------------------------------------- |
| Red    | `#8a1f1f` | `#ac1d24` | `#d16b6b` | `#EDDFE0` | Accent, alerts, beta-banner callouts                      |
| Blue   | `#3d5f83` | `#6ba1cc` | `#8fb5d9` | `#E7ECF0` | Focus ring (shade; base on dark), info callouts          |
| Green  | `#316139` | `#669e67` | `#73b088` | `#E6ECE6` | Success states, inline code text                          |
| Blush  | `#b17d7d` | `#e1aeb0` | `#e8cdcd` | `#F3EDEE` | Soft accent, table row hover, error callouts              |
| Blonde | `#d4b59a` | `#f4e2d2` | `#f7ebe0` | `#F4F3F1` | Warm background accents                                   |
| Orange | `#9a5e2e` | `#bf6e36` | `#d4a77a` | `#EFE7E1` | Warning callouts, highlight marks                         |

### Neutrals

| Name    | Hex       | Role                                                              |
| ------- | --------- | ----------------------------------------------------------------- |
| White   | `#f7f8f9` | Default page background, header background                        |
| Light   | `#e8e8e8` | Secondary backgrounds (blockquotes, even table rows, beta banner) |
| Lighter | `#d9d9e0` | Decorative dividers, disabled borders (never a control boundary)  |
| Muted   | `#9c9cb4` | Empty input borders (a11y exception), disabled marks, rules       |
| Darker  | `#5f5f79` | Secondary text (captions, metadata, figcaptions)                  |
| Dark    | `#22223e` | Primary text, headings, hero overlay, code block backgrounds      |

### Usage rules

- **Text on white surface:** always
  `dark` (`#22223e`).
- **Focus rings:** `blue-shade`
  (`#3d5f83`), 2px outline with 2px
  offset. On dark surfaces (hero splash,
  transparent header, controls over
  images) use `blue` (`#6ba1cc`)
  instead.
- **Borders on interactive elements:**
  `dark` (`#22223e`), 2px width.
- **Color overlays on images:** use the
  `dark` color in RGBA at varying
  opacities with `mix-blend-multiply`.
  The hero splash uses a vertical
  gradient (0.1–0.95); past-event
  gathering cards use the gathering's
  brand color at 40% opacity over a
  grayscaled image. When overlaying
  imagery elsewhere, prefer
  `mix-blend-multiply` with a chromatic
  or neutral color at 30–50% opacity —
  never a solid block that hides the
  image entirely.
- **Transparent header:** text flips to
  `light` / `white`; logo switches to
  the white variant (see Logo Usage).
  Standard header uses `white`
  background.

## Typography

One typeface, one weight. Hierarchy
comes from size and spacing only.

### Typeface

**ABC Social Mono — Book (weight 400)**

This is the only loaded font file
(`ABCSocialMono-Book.woff2`). The font
is loaded with `font-display: optional`,
so on slow connections the system
monospace fallback renders instead.

Fallback stack:
`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Single weight constraint

The design system uses **only weight
400**. Do not apply `font-weight: bold`,
`font-weight: 600`, or any other weight
to ABC Social Mono — the font file does
not include those weights and the
browser will synthesize a faux-bold that
looks wrong. Use font size and spacing
to create hierarchy instead.

### Type scale

| Token  | Size (rem) | Size (px) | Use                                                       |
| ------ | ---------- | --------- | --------------------------------------------------------- |
| `xs`   | 0.75       | 12        | Smallest labels, fine print, image credits                |
| `sm`   | 0.875      | 14        | Captions, filter buttons, metadata, footer text           |
| `base` | 1          | 16        | Body text, form inputs, h6                                |
| `lg`   | 1.125      | 18        | Body text at md+ breakpoints, h5, h4 (mobile)             |
| `xl`   | 1.25       | 20        | h4 (desktop), h3 (mobile), page subtitles                 |
| `2xl`  | 1.5        | 24        | h3 (desktop), h2 (mobile)                                 |
| `3xl`  | 1.875      | 30        | h2 (desktop), h1 (mobile), splash title (mobile)          |
| `4xl`  | 2.25       | 36        | h1 (desktop), page titles (mobile)                        |
| `5xl`  | 3          | 48        | Page titles (md+), section h2s (md+), HalfCircle h2 (lg+) |
| `6xl`  | 3.75       | 60        | Page titles (lg+)                                         |
| `7xl`  | 4.5        | 72        | Splash alt-title (lg+) only                               |
| `8xl`  | 6          | 96        | Display numbers, decorative text                          |

### Heading scale

These are the CSS-reset defaults applied
in `@layer base`. Rich-text headings
(`.rich-text`) follow the same scale —
there is no separate rich-text heading
scale.

| Level | Desktop       | Mobile (< 768px) |
| ----- | ------------- | ---------------- |
| h1    | `4xl` (36px)  | `3xl` (30px)     |
| h2    | `3xl` (30px)  | `2xl` (24px)     |
| h3    | `2xl` (24px)  | `xl` (20px)      |
| h4    | `xl` (20px)   | `lg` (18px)      |
| h5    | `lg` (18px)   | `lg` (18px)      |
| h6    | `base` (16px) | `base` (16px)    |

### Page title pattern

Page-level h1 elements use a linear
progression:
`text-4xl md:text-5xl lg:text-6xl` (36 →
48 → 60px). This is the standard pattern
across all route pages.

### Line heights

| Context            | Line height | Why                                                                                    |
| ------------------ | ----------- | -------------------------------------------------------------------------------------- |
| Buttons & controls | 1           | Text sits optically centred in the hit target; vertical padding alone controls height. |
| Labels & tags      | 1.2         | Compact but still readable as standalone text; keeps pill shapes tight.                |
| Headings           | 1.2         | Tight leading for large sizes that don't need inter-line breathing room.               |
| Body text          | 1.7         | Comfortable reading rhythm for monospaced text.                                        |

**Rule of thumb:** if the text is inside
a clickable control (button, CTA, nav
link, filter pill), use `line-height: 1`
so the element's padding is the only
thing shaping its box. If the text is a
label that sits on its own (tag, badge,
caption), use `1.2`. For reading text,
use `1.7`.

### Letter spacing

The body default is `-0.02em` (slightly
tightened). This is applied globally and
inherited by all elements.

## Layout

Pages are a single vertical column at
every width. On phone, content stretches
edge-to-edge minus 24px gutters; at `lg`
(1024px) the container caps at 1400px
and centres. Grids are single-column on
phone, switching to two or three columns
at `md` or `lg`. Full-bleed sections
break out of the container with a calc
pattern and re-contain their children.

### Container

- **Max width:** 1400px (the
  `max-w-max-width` utility, from
  `--container-max-width`)
- **Horizontal padding:** 1.5rem (24px)
  — applied as `px-md`, constant at all
  breakpoints (no responsive padding
  scaling).
- **Centering:**
  `max-w-max-width mx-auto px-md`

The shell layout (`app.tsx`) applies
`lg:max-w-max-width mx-auto px-md` to
`<main>`, so the max-width constraint
only activates at `lg` (1024px) and
above. Below `lg`, content stretches to
the viewport width minus the `px-md`
gutters.

Always use token-based utilities for
widths and spacing — never hardcode
pixel values in arbitrary Tailwind
brackets.

#### Full-bleed sections

Some sections need to break out of the
container to span the full viewport. Use
this inline-style pattern:

```css
margin-left: calc(-50vw + 50%);
margin-right: calc(-50vw + 50%);
width: 100vw;
```

Then re-establish the container inside
the full-bleed wrapper with
`max-w-max-width mx-auto px-md` so inner
content stays aligned.

Used by: hero splash, gathering event
sections, HalfCircle, DirectoryPreview,
GatheringsPreview, QuoteCarousel, and
programme highlight sections.

The homepage hero (`HeroSplash`) uses
`w-screen` instead of the calc pattern —
either technique works, but prefer the
calc pattern for sections that live
inside the container flow.

### Spacing scale

The spacing scale uses semantic names.
Always prefer these tokens over Tailwind
numeric classes (e.g. `gap-lg` not
`gap-8`, `mt-sm` not `mt-4`).

| Token | Value   | Px  | Common use                                                             |
| ----- | ------- | --- | ---------------------------------------------------------------------- |
| `xxs` | 0.25rem | 4   | Tight internal padding (code inline, kbd)                              |
| `xs`  | 0.5rem  | 8   | Gap between inline elements, list item margin, small component padding |
| `sm`  | 1rem    | 16  | Paragraph margin, card padding, button padding-y                       |
| `md`  | 1.5rem  | 24  | Container gutter, button padding-x, card gap                           |
| `lg`  | 2rem    | 32  | Between content blocks, heading margin-bottom                          |
| `xl`  | 3rem    | 48  | Section breaks, heading margin-top, component group separation         |
| `2xl` | 4rem    | 64  | Large section gaps, image margins                                      |
| `3xl` | 6rem    | 96  | Section padding (mobile), component section padding                    |
| `4xl` | 8rem    | 128 | Section padding (desktop)                                              |
| `5xl` | 12rem   | 192 | Header clearance (`pt-5xl` on `<main>`), heavy vertical breaks         |
| `6xl` | 16rem   | 256 | Standard page-bottom padding (`pb-6xl`); most common large spacer      |
| `7xl` | 20rem   | 320 | Rare; single use for extra-large bottom padding                        |
| `8xl` | 24rem   | 384 | Rare; single use for extra-large responsive padding                    |

**Note:** the jump from `xs` (8px) to
`sm` (16px) is the widest ratio gap in
the lower end of the scale. If a 12px
value is needed (e.g. tag/badge
padding), use `px-3` as an exception —
but do not introduce it as a recurring
pattern without adding a token.

#### Section vertical padding conventions

- **Page bottom:** `pb-3xl md:pb-6xl`
  (96px → 256px) is the standard
  pattern.
- **Section separators:**
  `py-xl md:py-3xl` for preview/block
  components.
- **Heavy sections:** `py-2xl lg:py-4xl`
  for full-bleed event sections.

### Breakpoints

| Name | Width  | Role                                                                 |
| ---- | ------ | -------------------------------------------------------------------- |
| `sm` | 640px  | Small phones → wider phones                                          |
| `md` | 768px  | Phone → tablet; primary responsive typography breakpoint             |
| `lg` | 1024px | Tablet → desktop; hero title scale-up, container max-width activates |
| `xl` | 1280px | Desktop → wide desktop                                               |

`2xl` (1536px) is defined but has only a
single use in the codebase. Do not
introduce new `2xl:` breakpoint classes
— use `xl:` or a `max-w` constraint
instead.

The primary responsive breakpoint is
`md` (768px). Typography, grid layouts,
and navigation switch between
mobile/desktop at this point.

### Responsive behaviour

**Phone (< 768px):** single-column flow
throughout. Grids stack vertically, flex
rows become `flex-col`, images are
full-width. Navigation collapses to a
hamburger menu. Text scales down one
step (e.g. `text-4xl` instead of
`text-5xl`). Spacing tokens contract
(`pb-3xl` instead of `pb-6xl`).

**Tablet (768px – 1023px / `md`):**
grids switch to two columns
(`md:grid-cols-2`), flex rows go
horizontal, and typography steps up. The
container still stretches to the
viewport — the max-width cap doesn't
activate until `lg`. This is the main
content reflow breakpoint.

**Desktop (1024px+ / `lg`):** the
container centres at 1400px max. Some
grids expand to three columns
(`lg:grid-cols-3`). Desktop-only
navigation appears. Spacing opens up
(`lg:py-4xl`, `lg:gap-3xl`). Hero title
hits its largest scale (`lg:text-6xl`).

#### Grid column patterns

| Pattern                                     | Where                                                               |
| ------------------------------------------- | ------------------------------------------------------------------- |
| `grid-cols-1 md:grid-cols-2`                | Event sections, FAQ, insights listing, people grid, data page       |
| `grid-cols-1 md:grid-cols-3`                | Outcomes grid, data stats, InsightsPreview                          |
| `grid-cols-1 lg:grid-cols-2`                | About, tools, carousel slides, open positions, programme highlights |
| `grid-cols-1 lg:grid-cols-3`                | GatheringsPreview cards                                             |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | People avatars, people board grid                                   |

**Rule:** use `md:` for content grids
(articles, proof points, stats) and
`lg:` for structural grids (sidebar +
content, card groups where the third
column needs room). Do not use `sm:` for
column count — keep mobile single-column
until `md`.

### Page structure

- **Fixed header** at the top. Non-home
  pages add `pt-5xl` (192px) to `<main>`
  to clear it.
- **Header modes:** default (white
  background, dark text) and transparent
  (transparent background, light text,
  inverted logo) — used on the homepage
  hero.
- **Navigation:** full horizontal nav at
  `lg`; below `lg` it collapses to a
  hamburger menu button that opens a
  slide-over mobile nav panel.
- **Full-bleed hero** on the homepage:
  90vh height, full viewport width via
  `w-screen`, with a gradient overlay
  and absolute-positioned content.

## Elevation & Depth

**This is a shadowless design system.**
No drop shadows, no box-shadows, no
elevation through shadow. Depth comes
from borders, color fills, overlays, and
z-index stacking — never from shadows.

The decision is deliberate: the
editorial, flat aesthetic treats the
page as a printed surface. Shadows imply
a light source and physical depth that
conflict with the ink-on-paper metaphor.
Use 2px `dark` borders to define
interactive elements. Use
semi-transparent overlays (`bg-dark/50`)
for modals and scrims.

### Z-index

| Token | Value | Use                                                   |
| ----- | ----- | ----------------------------------------------------- |
| `0`   | 0     | Default stacking                                      |
| `10`  | 10    | Splash background images, carousel controls, tooltips |
| `20`  | 20    | Splash gradient overlay                               |
| `30`  | 30    | Splash content                                        |
| `40`  | 40    | —                                                     |
| `50`  | 50    | Fixed header, dropdowns, mobile menu                  |
| `max` | 999   | Modal overlays (FormSidebar), skip-link               |

**Rule:** always use the token scale. Do
not introduce ad-hoc z-index values.
Tokens live under `--z-index-*` in
`app.css` — Tailwind v4 only generates
named utilities like `z-max` from that
namespace. The `max` layer is reserved
for elements that must sit above
everything,
including the fixed header.

### Overlays

- **Modal scrim:** `bg-dark/50`
  full-screen fixed overlay.
- **Image credits:**
  `bg-dark/50 text-white` (light theme)
  or `bg-light/80 text-dark` (dark
  theme) — small absolute-positioned
  labels.
- **Hero text contrast:**
  `mix-blend-multiply` with `dark` at
  40% opacity, plus a simplified
  bottom gradient covering the lower
  third.
- **Past-event images:**
  `grayscale(100%)` on the image, then a
  `mix-blend-multiply` color overlay at
  40% opacity using the event's brand
  color.

## Shapes

Rectangular by default. Rounded corners
are reserved for buttons, badges, and
cards that opt in to the soft `sm`
corner. Tags, chips, and badges always
receive `rounded-full`.

### Border radius

| Token  | Value  | Use                                    |
| ------ | ------ | -------------------------------------- |
| `none` | 0px    | Default for cards, inputs, containers  |
| `sm`   | 4px    | Small buttons, rounded cards (`<Card rounded>`) |
| `md`   | 8px    | Medium buttons                         |
| `lg`   | 12px   | Large buttons, image containers (rare) |
| `xl`   | 16px   | Available                              |
| `2xl`  | 20px   | Available                              |
| `3xl`  | 24px   | Available                              |
| `4xl`  | 28px   | Available                              |
| `5xl`  | 32px   | Available                              |
| `6xl`  | 40px   | Available                              |
| `7xl`  | 48px   | Available                              |
| `8xl`  | 56px   | Available                              |
| `9xl`  | 64px   | Available                              |
| `full` | 9999px | Badges, tags, chips, filter pills, radios |

**Guidance:** buttons use the radius
that matches their size (`sm` → `sm`,
`md` → `md`, `lg` → `lg`). Images and
containers are rectangular (`none`)
unless specifically designed. Cards are
rectangular by default and may use the
soft `sm` corner (4px) through the
`Card` component's `rounded` prop. They
never use a larger radius. All badges,
tags, and chips use `rounded-full` — no
exceptions. Form inputs are rectangular;
the radio button is the only round form
control.

### Borders

Standard interactive borders are **2px
solid `dark`** (`#22223e`). Subtle
dividers use **1px** or **2px `muted`**
or `lighter`.

## Accessibility

WCAG 2.1 compliance is **paramount**.
Every component, every page, every
interaction must be accessible from the
ground up — not retrofitted. This is not
a nice-to-have; it is a first-class
design constraint equal to typography
and color.

### Focus rings

All interactive elements receive a
visible focus indicator on
`:focus-visible`: 2px `blue-shade`
outline with 2px offset. This is enforced
globally in `app.css` on `a`, `button`,
and `input[type="checkbox"]`. Apply the
same pattern to any new interactive
element:

```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-shade
```

**Dark surfaces:** `blue-shade` is too
close to `dark` to see (2.3:1), so on
the hero splash, the transparent header,
and controls sitting on images use
`focus-visible:outline-blue` instead
(5.6:1 against `dark`). The transparent
header switches automatically in
`app.css`.

The `#main-content` target suppresses
its outline to avoid a ring when the
skip-link lands there.

Form controls use the same ring — never
`outline-none` without a replacement.
See Form Input Styles.

**Why `blue-shade`:** `blue` on `white`
is 2.6:1, below the 3:1 that WCAG 1.4.11
requires for a focus indicator.
`blue-shade` is 6.2:1.

### Skip link

A visually-hidden "Skip to main content"
link is the first focusable element on
every page. It targets `#main-content`
(which receives `tabindex="-1"`). On
`:focus-visible`, the link appears
on-screen at `z-max` with a `dark`
background, `light` text, and a 2px
`light` border.

### Reduced motion

Respect
`prefers-reduced-motion: reduce`.
Components that auto-advance (carousels,
marquee) must check this preference and
either stop auto-play or fall back to a
static view.

**Rule:** every `@keyframes` animation
and every JS-driven `setInterval`
slideshow must have a reduced-motion
guard. CSS-only guard:

```css
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
```

Components with reduced-motion guards:

- **HeroSplash** — JS `matchMedia`
  check, skips `setInterval` slideshow.
- **Carousel** — JS `matchMedia` check,
  disables autoplay.
- **ProgrammesPreview** — JS
  `matchMedia` check skips the
  `IntersectionObserver` entrance
  animation; CSS media query in
  `app.css` sets
  `opacity: 1; transform: none` so items
  are visible immediately.
- **Marquee banner / beta-pulse** — CSS
  media query in `app.css` sets
  `animation: none`.

### Contrast

All text/background combinations must
meet WCAG AA (4.5:1 for normal text, 3:1
for large text). See the verified
contrast table in the Buttons section.
When adding new color pairings, verify
the ratio before shipping.

**Non-text contrast (WCAG 1.4.11):**
anything that identifies a control or
its state — input borders, checkbox and
radio outlines, checked marks, focus
rings — needs 3:1 against the colors
next to it.

| Color on `white` | Ratio  | Use as a control boundary?     |
| ---------------- | ------ | ------------------------------ |
| `dark`           | 14.5:1 | Yes                            |
| `red`            | 6.7:1  | Yes (error state)              |
| `blue-shade`     | 6.2:1  | Yes                            |
| `darker`         | 5.8:1  | Yes                            |
| `blue`           | 2.6:1  | Only on dark surfaces          |
| `muted`          | 2.5:1  | Empty inputs only (exception)  |
| `lighter`        | 1.3:1  | No — decorative only           |

Disabled controls are exempt, which is
why `lighter` appears in disabled
states.

**Deliberate exception:** empty text
inputs, textareas, and selects use a
`muted` border (2.5:1). It's a design
decision to keep empty forms light; the
visible label above every field, the
`darker` placeholder, and the `dark`
border on focus make up for it. The
exception covers only the empty state
of box controls — checkboxes, radios,
and every other control boundary still
need 3:1.

### ARIA patterns in use

- **Carousels:**
  `aria-roledescription="carousel"` /
  `"slide"`, `aria-label` with position
  counts, `aria-hidden` on inactive
  slides.
- **Header:** `aria-expanded`,
  `aria-controls`, `aria-haspopup` on
  the mobile toggle and dropdown
  triggers, `aria-current="page"` on
  active links.
- **Modals:** `aria-modal="true"`,
  `aria-hidden` on the backdrop,
  `aria-label` for the dialog.
- **Decorative elements:**
  `aria-hidden="true"` on Unicode icons,
  decorative images, and visual
  flourishes.
- **Dynamic content:**
  `aria-live="polite"` on regions that
  update without a page load.

### Alt text

All `<img>` elements must have an `alt`
attribute. Meaningful images get
descriptive text. Decorative images use
`alt=""`. Never omit the attribute.

### Keyboard navigation

Native focusable elements (links,
buttons) handle keyboard access. Custom
interactive widgets (carousels,
dropdowns, tooltips) should add
`onKeyDown` handlers for arrow keys,
Escape, and Enter/Space where the native
element does not provide them.

Keyboard handlers are implemented on the
carousel (Escape stops autoplay), the
desktop dropdown menu
(ArrowDown/ArrowUp/Escape/Enter for full
submenu navigation), and the directory
tooltip (Escape closes it).

## Icon System

**Text-first.** The design system uses
Unicode characters instead of an icon
library. No SVG icon sprites, no icon
fonts, no third-party icon packages.

### Standard characters

| Character | Unicode | Use             | Component(s)                               |
| --------- | ------- | --------------- | ------------------------------------------ |
| ✕         | U+2715  | Dismiss / close | FormSidebar, Header (mobile), filter pills |
| +         | U+002B  | Open / expand   | Header (mobile menu toggle), AccordionItem |
| −         | U+2212  | Close / collapse | AccordionItem (open row)                  |
| ⓘ         | U+24D8  | Info / help     | Directory tooltip                          |
| ↓         | U+2193  | Select arrow    | Every `<select>`                           |
| →         | U+2192  | Navigate / link | CTA buttons, read-more links               |
| ✓         | U+2713  | Done / complete | Progress board (done tiles)                |

### Rules

- **Expandable system:** the table above
  is the current set, not a closed list.
  New Unicode characters can be added as
  needs arise — just add them to the
  table and follow the rules below.
- **Standardized dismiss character:**
  always use ✕ (U+2715), never ×
  (U+00D7) or ✖ (U+2716) or any other
  variant.
- **Sizing:** match the surrounding text
  size or one step up. Use `text-xl` or
  `text-2xl` with `leading-none` for
  standalone icon use.
- **Accessibility:** always wrap in a
  `<span>` with `aria-hidden="true"` and
  provide an `aria-label` on the parent
  interactive element.
- **No icon library:** if a pictogram is
  needed and no Unicode character works,
  use a simple inline SVG — but prefer
  text.

## Logo Usage

The Rebuild logo is a single-line
logotype rendered as an SVG image
(`/public/assets/images/logo.svg`). It
is not a font glyph.

### Sizing

- **Minimum height:** `h-6` (24px).
  Never render the logo smaller than
  this.
- **Larger sizes are allowed** wherever
  the design of a page or feature calls
  for it. There is no maximum — use
  judgement.
- **Maintain aspect ratio.** Always use
  `w-auto` paired with a height class.

### Variants

The logo comes in **exactly two
variants: dark or white.** Nothing else
is acceptable.

| Variant | Fill                  | Use on                                                                   |
| ------- | --------------------- | ------------------------------------------------------------------------ |
| Dark    | `dark` (`#22223e`)    | `white`, `light`, `lighter`, every `-light` and `-tint` stop, `blue`, `green`, `blush`, `blonde` |
| White   | `white` (`#f7f8f9`)   | `dark`, `darker`, `red`, and imagery under the `dark` overlay (hero splash) |

**Choosing:** use whichever variant has
the higher contrast against the
background, and require at least 4.5:1.
WCAG exempts logos, but we treat the
logotype like text. If neither variant
reaches 4.5:1 — `orange` base is the
one case in the palette (4.0:1 dark,
3.6:1 white) — don't place the logo
there; change the background.

**Never:**

- Recolor the logo in a chromatic hue,
  `muted`, `darker`, or any value other
  than `dark` or `white`.
- Lower its opacity, blend it
  (`mix-blend-*`), or put it behind a
  tint.
- Add outlines, strokes, gradients, or
  effects, or recolor parts of it.
- Stretch, skew, rotate, or crop it.

**Implementation:** two files,
`logo.svg` (`#22223e`) and
`logo-white.svg` (`#f7f8f9`). Never make
the white variant with a CSS filter —
`invert()` renders pure `#ffffff`, which
is outside the palette. The header
renders both images and shows one based
on its mode (`.logo-dark` /
`.logo-white` in `app.css`).

### Placement

- **Header:** left-aligned, `h-6`, links
  to `/`.
- **Footer:** left-aligned within the
  footer's left column.
- **Do not** place the logo on patterned
  or busy backgrounds without sufficient
  contrast. Use the white variant on
  dark backgrounds.

## Image Treatment

### Aspect ratios

Three standard ratios. Use only these:

| Name     | Ratio | Class / style               | Use                                   |
| -------- | ----- | --------------------------- | ------------------------------------- |
| Square   | 1:1   | `aspect-square`             | Portraits, avatars, small thumbnails  |
| Video    | 16:9  | `aspect-video`              | Hero images, tool cards, wide content |
| Portrait | 3:4   | `style="aspect-ratio: 3/4"` | Tall editorial images, carousels      |

**Rule:** `object-cover` on every image
within these containers. No
`object-contain`, no `object-fill`.

### Grayscale and blend modes

- **Past events:** apply
  `grayscale(100%)` to the image, then
  overlay a `<div>` with the event's
  brand color at `mix-blend-multiply`
  and 40% opacity. This desaturates the
  image while tinting it with the event
  color.
- **General grayscale:** may be used for
  editorial effect on historical or
  archival imagery. Always pair with a
  color overlay or sufficient text
  contrast.
- **`mix-blend-multiply`:** the primary
  blending tool. Use it for color
  overlays on images, hero text contrast
  layers, and tinted scrims.

### Lazy loading

All below-the-fold images use
`loading="lazy"` for native browser lazy
loading.

## Form Input Styles

Every form control speaks the same
language as the rest of the system:
rectangular, 2px borders, `dark` ink on
`white`, no fills or shadows. State is
carried by border color **plus** a
second cue that isn't color alone (a
message, a mark, or the focus ring), so
no one has to tell red from dark to
understand a form.

Borders are **2px in every state**. Only
the color changes, so nothing shifts by
a pixel when a field is focused, filled,
or in error.

### Field anatomy

Every field stacks the same four parts,
in this order:

| Part          | Class                                   | Notes                                                    |
| ------------- | --------------------------------------- | -------------------------------------------------------- |
| Label         | `block text-sm text-darker mb-xxs`      | Always visible. Never a placeholder-only label.           |
| Control       | See below                               |                                                          |
| Help text     | `text-xs text-darker mt-xxs`            | Optional. Linked with `aria-describedby`.                 |
| Error message | `text-sm text-red mt-xxs`               | Only when invalid. Linked with `aria-describedby`.        |

Fields in a form are separated by
`space-y-md` (24px).

**Labels describe, values are content.**
Labels and legends are small and
`darker`; what the person types or
chooses (input text, option labels) is
`text-base` and `dark`.

**Required fields:** a red asterisk
after the label (`aria-hidden="true"`),
plus the `required` attribute on the
control so screen readers announce it.
State once at the top of the form:
"Fields marked \* are required." If most
fields are required, mark the optional
ones with "(optional)" instead.

### Box controls — text input, textarea, select

| Property      | Value                                                       |
| ------------- | ----------------------------------------------------------- |
| Width         | `w-full`                                                    |
| Padding       | `px-sm` (16px) horizontal, `py-xs` (8px) vertical           |
| Font          | `text-base` (16px), inherits ABC Social Mono                |
| Background    | `bg-white` (`#f7f8f9`)                                      |
| Border        | 2px solid, color by state (below)                           |
| Border radius | `none` (rectangular)                                        |
| Placeholder   | `text-darker` (`#5f5f79`, 5.8:1)                            |
| Transition    | `transition-rebuild` on `border-color`                      |

**Never set inputs below 16px.** iOS
Safari zooms the page when a field under
16px is focused.

**Placeholders are examples, not
instructions.** "name@example.com" is
fine; "Enter your email" belongs in the
label or help text.

#### States

| State     | Border             | Background | Text     | Extra cue                             |
| --------- | ------------------ | ---------- | -------- | ------------------------------------- |
| Empty     | `muted`            | `white`    | —        | Visible label; `darker` placeholder   |
| Active    | `dark`             | `white`    | `dark`   | Focus ring (2px outline, 2px offset)  |
| Filled    | `darker`           | `white`    | `dark`   | The value itself                      |
| Error     | `red`              | `white`    | `dark`   | Error message below; `aria-invalid`   |
| Disabled  | `lighter`          | `light`    | `darker` | `cursor-not-allowed`; label `darker`  |
| Read-only | `lighter`          | `light`    | `dark`   | Still focusable and selectable        |

- **Empty uses `muted` — a deliberate
  accessibility exception.** `muted` is
  2.5:1 on `white`, below WCAG 1.4.11's
  3:1. We accept it to keep empty forms
  light; the always-visible label and
  the `dark` active border compensate.
  See Accessibility → Contrast. Don't
  extend the exception to other
  controls.
- **Active** is the focused field;
  **filled** is a field with a value
  that isn't focused.
- **Error wins** over active and filled.
  A focused field in error keeps its red
  border and gets the focus ring on top.
- **Focus uses the global focus ring**,
  not just a border change. Never
  `focus:outline-none` on a control.
- **Disabled vs. read-only:** disable a
  field only when it can't apply right
  now. If the person should see a value
  they can't change (a verified email),
  use `readonly` — it stays focusable,
  copyable, and is read by screen
  readers.
- Disabled text is exempt from contrast
  rules, but we keep it `darker` (5.0:1
  on `light`) so the value stays
  readable.

`FormRenderer` implements this with an
`inputClass(value, error)` helper that
picks exactly one border color, so
states never fight over specificity.

### Select

- **Always a native `<select>`**, styled
  with `appearance: none` so it matches
  text inputs. Never rebuild it from
  `<div>`s — native gives us keyboard
  support, the phone's own picker, and
  screen-reader support for free.
- **Arrow:** ↓ (U+2193) in a
  `<span aria-hidden="true">`, placed
  `absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none`
  inside a `relative` wrapper. Color
  `dark`; `darker` when disabled.
- **Right padding `pr-xl` (48px)** so
  long option text never runs under the
  arrow.
- **Placeholder option:**
  `<option value="" disabled selected>Choose…</option>`
  with `required` on the select. It
  renders in `darker` (not `muted`,
  which fails text contrast) until a
  real option is picked.
- States, height, and focus are
  identical to text inputs.

**Select or radio?**

- **2–5 options:** radio group. Every
  choice is visible without a click.
- **6 or more:** select.
- **Several answers allowed:** checkbox
  group. Never `<select multiple>`.

### Checkbox and radio

Both are 32 × 32px, `appearance: none`,
2px `dark` border, transparent
background. The only difference is
shape, because shape is how people tell
them apart:

| Control  | Shape                            | Checked mark                                              |
| -------- | -------------------------------- | --------------------------------------------------------- |
| Checkbox | Square (`rounded-none`)          | ✕ (U+2715) via `::after`, 18px, `dark`, centred           |
| Radio    | Circle (`rounded-full`)          | 16px `dark` dot via `::after` (a CSS shape, not a glyph)  |

The radio is the one form control that
isn't rectangular. The circle is the
universal signal for "pick one", and
losing it would cost more than the
consistency gains.

The radio dot is drawn with CSS, not a
● glyph, because glyph size and position
vary with the fallback font. The
checkbox ✕ is set at weight 400 like
everything else — never bold.

#### Layout

- The control and its text are wrapped
  in **one `<label>`**:
  `flex items-start gap-xs cursor-pointer`.
  The whole row is clickable.
- Option text: `text-base text-dark`.
  Long labels wrap next to the control,
  never under it; the control lines up
  with the first line.
- **Groups** use `<fieldset>` +
  `<legend>`. The legend is styled
  exactly like a field label
  (`text-sm text-darker`). Remove the
  fieldset's default border and padding.
- Stack options vertically with
  `space-y-xs`. Only a two-option
  Yes / No may sit on one row (`gap-md`).

#### States

| State    | Border    | Fill                   | Mark            | Label           |
| -------- | --------- | ---------------------- | --------------- | --------------- |
| Default  | `dark`    | transparent            | —               | `dark`          |
| Hover    | `dark`    | `light`                | —               | `dark`          |
| Checked  | `dark`    | transparent            | ✕ / dot, `dark` | `dark`          |
| Focus    | `dark`    | unchanged              | unchanged       | unchanged       |
| Error    | `red`     | transparent            | unchanged       | `dark`          |
| Disabled | `lighter` | `light`                | `muted`         | `darker`        |

- **Focus:** the global focus ring on
  the control (not around the whole
  label).
- **Error in a group:** every control in
  the group gets a red border, and one
  error message sits below the group.
  The fieldset points to it with
  `aria-describedby`; each input gets
  `aria-invalid="true"`.
- **Disabled:** `cursor-not-allowed` on
  the label.

### Validation

- **When:** validate on submit. Once a
  field has shown an error, re-check it
  as the person types so the error
  disappears the moment it's fixed.
  Don't flag fields while someone is
  typing for the first time.
- **Focus:** on a failed submit, move
  focus to the first invalid field.
- **ARIA:** `aria-invalid="true"` on the
  control and its error message's `id`
  in `aria-describedby` (after the help
  text's `id`, if there is one).
- **Wording:** say what's wrong and how
  to fix it. "Enter an email address,
  like name@example.com", not "Invalid
  input". Never blame the person.
- Errors use the project `red` token
  (6.7:1 on `white`), never Tailwind's
  `red-600`.

Form-level messages (server errors,
success) are covered in Error, Empty,
and Loading States.

### Submit button

`button-primary-lg-dark` (via
`buttonClass({ size: "lg" })`), always
full-width within the form context. No
border.

- **Disabled until required fields are
  filled.** Submit stays disabled (50%
  opacity, `not-allowed` cursor) until
  every visible required field has a
  value. A hint below the button points
  at the `*` fields so the disabled state
  explains itself. Format checks (email,
  URL) still run on submit and show
  per-field errors.
- **While a submission is in flight,**
  it is also disabled and the label
  changes (see Loading states) so it
  can't be sent twice.

## Components

Flat, borderless buttons in three sizes;
a fixed header with two modes; and a
rich-text wrapper for CMS content. The
visual language is minimal — color fills
and typography do the work.

### Buttons — Primary

Three sizes, six color themes, no
border/outline. Rounded corners always
match the size token. Text color is
whichever of `dark` or `white` meets
WCAG AA contrast on that background.
Use `buttonClass()` from
`~/lib/buttonClass` to apply these
(works on `<button>` and `<a>` alike)
rather than hand-writing the classes.

**`dark` is the default primary
button.** Use it for all standard
actions (submit, confirm, navigate,
CTA). The five colored variants — red,
blue, green, orange, blush — are accent
buttons for rare, intentional use: a
featured section card, a unique landing
page, a special-event CTA, or anywhere a
page already commits to a specific hue.
If in doubt, use `dark`.

#### Sizes

| Size | Font | Padding (v / h) | Rounded     | Height (approx) |
| ---- | ---- | --------------- | ----------- | --------------- |
| `sm` | 14px | 8px / 16px      | `sm` (4px)  | 30px            |
| `md` | 16px | 10px / 24px     | `md` (8px)  | 36px            |
| `lg` | 18px | 14px / 32px     | `lg` (12px) | 46px            |

#### Color themes

| Theme    | Background       | Text    | Hover background      | Hover text | Usage                                     |
| -------- | ---------------- | ------- | --------------------- | ---------- | ----------------------------------------- |
| `dark`   | `dark` #22223e   | `white` | `darker` #5f5f79      | `white`    | **Default.** All standard actions.        |
| `red`    | `red` #ac1d24    | `white` | `red-tint` #d16b6b    | `dark`     | Accent only. Alerts, destructive actions. |
| `blue`   | `blue` #6ba1cc   | `dark`  | `blue-tint` #8fb5d9   | `dark`     | Accent only. Info-themed sections.        |
| `green`  | `green` #669e67  | `dark`  | `green-tint` #73b088  | `dark`     | Accent only. Success, completion.         |
| `orange` | `orange` #bf6e36 | `dark`  | `orange-tint` #d4a77a | `dark`     | Accent only. Warmth, featured content.    |
| `blush`  | `blush` #e1aeb0  | `dark`  | `blush-tint` #e8cdcd  | `dark`     | Accent only. Soft, editorial pages.       |

**Contrast ratios (verified):**

| Background            | Text    | Ratio  | WCAG AA                                                       |
| --------------------- | ------- | ------ | ------------------------------------------------------------- |
| `dark`                | `white` | 14.5:1 | Pass                                                          |
| `darker` (hover)      | `white` | 5.8:1  | Pass                                                          |
| `red`                 | `white` | 6.7:1  | Pass                                                          |
| `red-tint` (hover)    | `dark`  | 4.4:1  | Pass for lg; borderline sm/md — acceptable as transient hover |
| `blue`                | `dark`  | 5.6:1  | Pass                                                          |
| `blue-tint` (hover)   | `dark`  | 7.2:1  | Pass                                                          |
| `green`               | `dark`  | 4.9:1  | Pass                                                          |
| `green-tint` (hover)  | `dark`  | 6.1:1  | Pass                                                          |
| `orange`              | `dark`  | 4.0:1  | Pass for lg; borderline sm/md — acceptable as accent use only |
| `orange-tint` (hover) | `dark`  | 7.0:1  | Pass                                                          |
| `blush`               | `dark`  | 8.0:1  | Pass                                                          |
| `blush-tint` (hover)  | `dark`  | 10.3:1 | Pass                                                          |

### Buttons — Secondary

Single color scheme, same three sizes as
primary. No border/outline. Rounded
corners match the size token.

| State   | Background        | Text   |
| ------- | ----------------- | ------ |
| Default | `lighter` #d9d9e0 | `dark` |
| Hover   | `light` #e8e8e8   | `dark` |

Contrast: `lighter` → `dark` is 10.9:1,
`light` → `dark` is 12.5:1. Both pass
comfortably.

### Badges

Small labels identifying categories or
types. Always `rounded-full` with a
solid background color and contrasting
text.

#### Sizes

| Size | Font               | Padding (v / h) |
| ---- | ------------------ | --------------- |
| `sm` | `text-xs` (12px)   | 4px / 8px       |
| `md` | `text-sm` (14px)   | 6px / 12px      |
| `lg` | `text-base` (16px) | 8px / 16px      |

#### Color variants

Available in all brand colors plus
neutrals. Text is always `dark`
(`#22223e`) — the tint variants provide
enough contrast.

| Variant   | Background    | Use                                                         |
| --------- | ------------- | ----------------------------------------------------------- |
| `red`     | `red-tint`    | Alerts, categories (Bundled, Forum, Microblogging)          |
| `blue`    | `blue-tint`   | Info categories (Community, Creator platform, Messaging)    |
| `green`   | `green-tint`  | Success, categories (Groups, Location)                      |
| `orange`  | `orange-tint` | Warning, categories (Events, Social marketplace)            |
| `blush`   | `blush-tint`  | Soft categories (Dating, Photo sharing)                     |
| `blonde`  | `blonde-tint` | Neutral categories (Resource sharing, Video sharing, Other) |
| `dark`    | `dark`        | Dark variant — `white` text                                 |
| `lighter` | `lighter`     | Muted/neutral labels                                        |

#### Current usage

Directory cards use the `Badge`
component (`~/components/Badge.tsx`) at
size `md`, with per-category color
mapping defined in `CATEGORY_COLORS`.
Country labels use the `lighter`
variant.

Insights posts should use the `lighter`
variant for topic tags when tag data is
added to the data model.

The progress board uses size `md` for
status: `green` "Shipped", `orange` "In
progress" and `lighter` "Planned".

### Chips / Pills

Interactive toggle elements for
filtering and selection. Always
`rounded-full`. The original pattern
comes from the directory/programme
filter buttons.

#### Sizes

| Size | Font               | Padding (v / h) |
| ---- | ------------------ | --------------- |
| `sm` | `text-xs` (12px)   | 4px / 12px      |
| `md` | `text-sm` (14px)   | 6px / 16px      |
| `lg` | `text-base` (16px) | 8px / 24px      |

#### Variants

**Outlined (default for filters):**

- Default: `white` background, 2px
  `dark` border, `dark` text.
- Active: colored `--light` background,
  2px `dark` border, `dark` text,
  dismiss ✕ (U+2715) appended.
- Hover (inactive): `lighter`
  background.
- This is the one button type that
  keeps a visible border.

**Filled:**

- Default: `--light` variant of the
  brand color, no border, `dark` text.
- Hover: `--tint` variant of the brand
  color.
- Active/selected: `--base` (default)
  variant of the brand color, `dark` or
  `white` text for contrast, dismiss ✕
  appended.

#### Filter pill color mapping

Directory filters use the **filled**
variant at size `lg` (`<Chip
variant="filled" size="lg">`). Each
category keeps the hue from
`CATEGORY_COLORS` in `directory.tsx`
(the same hue as its card badge):
`--light` background by default,
`--tint` on hover, `--base` when
selected. Selected text is `white` on
red and `dark` on every other hue (see
the contrast table under Buttons).

### Card Component

Cards are content containers. Every card
is built on the shared `Card` component
(`src/components/Card.tsx`). **Don't
hand-roll card surfaces with utility
classes.** Use `Card` and add a prop or
variant if something is missing.

```tsx
import Card, { CardMedia } from "~/components/Card";

<Card padding="responsive" rounded class="space-y-md">…</Card> // directory
<Card variant="filled" class="flex flex-col h-full">           // tool
  <CardMedia src={thumb} alt="" fallback={…} />
  <div class="p-md">…</div>
</Card>
<Card as="a" variant="plain" href={url} class="group block">   // insight
  <CardMedia src={image} alt={title} class="mb-md" />
</Card>
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `outlined` (`bg-white border-2 border-dark`), `filled` (`bg-lighter`), `plain` (no surface) | `outlined` |
| `padding` | `none`, `md` (`p-md`), `responsive` (`p-5 lg:p-md`) | `none` |
| `rounded` | `true` adds the soft 4px corner (`rounded-sm`) | `false` |
| `as` | `div`, `article`, `li`, `a` | `div` |

`CardMedia` is the card image slot. It
has a fixed aspect ratio (`aspect`:
`video` | `square`), cover-crops the
image, and lazy-loads it by default. It
adds a `srcset` automatically for images
that have web-sized `-2400`/`-1200`
variants; pass `sizes` to match the
card's grid width. It shows a
`placeholder` background (`lighter` |
`muted`), and renders `fallback` in the
same box when there is no `src`.
Children such as `<ImageCredit>` are
layered on top of the image.

#### Principles

- **Surface:** `bg-white` with
  `border-2 border-dark` (the default
  `outlined` variant).
- **Radius:** rectangular
  (`rounded-none`) by default. Cards
  *may* have a soft 4px corner
  (`rounded-sm`) via `<Card rounded>`.
  The directory card uses it. Never go
  above `sm` on a card.
- **Padding:** `p-md` (24px) on desktop,
  `p-5` (20px) as a compact alternative.
- **Internal spacing:** `space-y-md`
  (24px vertical rhythm).
- **No shadows.** Depth comes from the
  border.

#### Card variants

**Directory card** (the canonical
reference):

- Masonry layout
  (`columns-1 md:columns-2 lg:columns-3`).
- Contains: name/link, description
  (max-width `55ch`), category badges,
  and country pill.
- Outer: `break-inside-avoid mb-xs`.
- Inner:
  `<Card padding="responsive" rounded class="space-y-md">`
  (outlined, soft 4px corner).

**Tool card** (`ToolCard.tsx`):

- `<Card variant="filled">`, with no
  border and no rounded corners.
- `<CardMedia>` (video) at the top, and
  content in `p-md`.
- Action buttons use
  `border-2 border-dark`.

**Insight post card**
(`InsightsPreview.tsx`,
`routes/insights/index.tsx`):

- `<Card variant="plain">`: image and
  title only, with no surface. The home
  preview makes the whole card a link
  (`as="a"`); the listing uses
  `as="article"` with a linked image and
  title.
- `<CardMedia>` (video), with the title
  below it.

**Gathering card**
(`GatheringsPreview.tsx`):

- `<Card variant="plain">`: an image
  with a colored overlay label.
- A fixed-height image (`h-125`, custom
  because of the grayscale and overlay
  treatment for past gatherings), a
  location/date row, and optional CTA
  buttons.

**Person card** (`PersonCard.tsx`):

- `<Card variant="plain">` with
  `<CardMedia aspect="square" placeholder="muted">`,
  followed by the name, specialty and
  bio.

### Accordion

`AccordionItem` (`src/components/Accordion.tsx`)
is one expandable row, built on native
`<details>`/`<summary>`. It works
without JS, and the browser handles
keyboard toggling and the expanded
state. Used by `FaqAccordion` and the
progress board's phone rows.

```tsx
import AccordionItem from "~/components/Accordion";

<div class="divide-y-2 divide-dark border-2 border-dark">
  <AccordionItem summaryClass="gap-sm px-lg py-md" summary={<span>…</span>}>
    <div class="px-lg pb-md">…</div>
  </AccordionItem>
</div>
```

| Prop | Values | Default |
| --- | --- | --- |
| `summary` | The always-visible row content | required |
| `marker` | `start` or `end`: where the +/− sits | `start` |
| `summaryClass` | Padding, gap and alignment for the row | none |

- **Marker:** + (U+002B) when closed,
  − (U+2212) when open, `text-3xl`,
  `aria-hidden`.
- **Frame:** rows sit in a
  `border-2 border-dark` list with
  `divide-y-2 divide-dark`.
- **Focus:** the summary gets the
  standard focus ring (2px
  `blue-shade`, 2px offset).
- **Summary content:** keep it to text
  and badges. Don't put links or
  buttons in the summary, since they
  would nest inside its button role.

### Progress board

A grid of outcomes, each marked done, in
progress or planned. It's a block
(`src/components/blocks/ProgressBoard.tsx`,
registered as `ProgressBoard`), so any
page can place it. Its first use is
"What We Are Shipping"
(`src/data/shipping.ts`).

```tsx
import { shipping } from "~/data/shipping";

{ type: "ProgressBoard", props: shipping }
```

| Prop | Values | Required |
| --- | --- | --- |
| `title` | Section heading (`h2`) | yes |
| `intro` | One or two sentences under the heading | no |
| `items` | `ProgressItem[]`, rendered in the given order | yes |

Each `ProgressItem` has a `title` and a
`status` (`done`, `in-progress` or
`planned`), plus optional `note`,
`href`, `image`, `imageAlt` and `color`
(a brand hue: `red`, `blue`, `green`,
`blush`, `blonde` or `orange`). Content
lives in JSON and goes through
`parseProgressItems`
(`src/lib/progressItems.ts`). It
rejects unknown fields, statuses and
colors, so
a typo fails the tests instead of
rendering. There are no percentages and
no grouping, by design.

**Tile anatomy:**

- A `Card` (`variant="plain"`, `bg-white`)
  with `CardMedia` (video aspect) on
  top and a `p-md` body directly below
  it, with no rule in between.
- **Media:** the image when there is
  one. Otherwise the item's number
  (`01`, `02`…, `text-5xl`, `p-md`) on
  the light stop of the item's `color`
  (`bg-blue-light` by default).
- **Checkbox:** a 2px `dark` square in
  the top-right corner of the media
  (`top-md right-md`),
  holding ✓ when done. It's a visual
  marker, not a form control, and is
  `aria-hidden`.
- **Title:** `h3`, `text-xl`.
- **Status:** a `Badge` (see Badges),
  then the `note` in `text-sm
  text-darker` when set.
- **Links:** with `href` the whole card
  becomes the link (`Card as="a"`). The
  title underlines on hover, and → sits
  after it. Tiles without `href` don't
  react to hover at all.

**Layout:** an `<ol>`, since the order
means something.

- **Phone (below `md`):** a compact
  list in a `border-2 border-dark`
  frame with `divide-y-2 divide-dark`
  rows. Each row shows the checkbox,
  the title (`text-lg`) and the status
  badge. A row with a `note`, `href` or
  `image` is an `AccordionItem` (marker
  at the end) that opens to show the
  image, the note and a "View
  {title} →" link, indented to line up
  with the title. Rows with nothing to
  reveal are plain and have no marker.
- **Tablet and up:** the tile grid,
  `md:grid-cols-3` and `xl:grid-cols-5`
  (five columns are too narrow at
  `lg`), with **no gap**. Tiles share
  single 2px borders: the `<ol>` draws
  the top and left edges
  (`border-t-2 border-l-2`) and each
  tile its right and bottom
  (`border-r-2 border-b-2`). A short
  last row stays left-aligned and its
  outline steps in. A focused tile is
  lifted (`focus-visible:relative
  focus-visible:z-10`) so its
  neighbours don't paint over the focus
  ring.

Both lists render on the server, and CSS
(`md:hidden` / `hidden md:grid`) shows
one. `display: none` also hides the
other from assistive tech.

**Accessibility:** status is always
text in the badge. Color, the tint and
the checkbox are extras. The number,
checkbox and arrow are `aria-hidden`,
so a linked tile reads as its title and
status. On phone, the row's summary
reads the same way and announces
whether it's expanded.

### Header

Fixed top navigation with two visual
modes:

- **Default:** `white` background,
  `dark` text/links, dark logo.
- **Transparent:** transparent
  background, `light` text/links,
  inverted (white) logo. Used when hero
  splash is directly behind.
- **Transition:** 300ms ease on
  background-color, text color,
  border-color, and filter.

### Hero Splash

Full-viewport (90vh) image slideshow
with text overlay and CTA buttons.

**Image overlay:** two layers —

1. Full-bleed `bg-dark/40` with
   `mix-blend-multiply` (tints without
   washing out the image).
2. Bottom-third gradient
   (`rgba(34,34,62,0.6)` → transparent)
   for extra CTA text contrast.

**Splash CTA buttons:** overlaid on the
hero image, outside the standard button
size system.

- **Default:** transparent background
  (25% `dark`), 2px `light` border,
  `light` text, no border-radius.
- **Hover:** `light` background, `dark`
  text.
- **Layout:** flex-wrap row, scrollable
  on mobile.

**Slideshow:** auto-advances every 4s.
Respects `prefers-reduced-motion` —
stops on the first image when the user
prefers reduced motion.

### Rich Text

Wrapper class (`.rich-text`) for
CMS-authored markdown/HTML content with
comprehensive typography, list,
blockquote, table, code, and callout
styling. See the Typography and Colors
sections for specific values.

### Beta Banner

Scrolling marquee strip, typically below
the header.

- **Default mode:** `light` background,
  `dark` text, `dark` top border.
- **Transparent header mode:**
  transparent background, `light` text,
  `light` border.
- Animation: horizontal scroll, 60s
  cycle, pauses on hover.
- Desktop-only subtle opacity pulse (5s
  cycle).

## Navigation Patterns

### Header modes

The header operates in two visual modes
based on scroll position:

1. **Transparent mode** (home page,
   above hero fold): transparent
   background, `light` text, inverted
   logo. Triggered by
   `isHome() && !scrolledPastHero()`.
2. **Default mode** (scrolled past hero,
   or any non-home page): `white`
   background, `dark` text, standard
   logo.

The transition between modes uses 300ms
ease on background-color, color,
border-color, and filter. An anti-FOUC
measure suppresses the initial
transition on mount.

### Desktop navigation

- Horizontal `<nav>` with `flex gap-md`,
  hidden below `lg` breakpoint.
- Links:
  `no-underline hover:underline px-sm py-xs transition-rebuild`.
- Active page: `aria-current="page"`.
- Dropdown: parent `<li>` gets Tailwind
  `group` class. Submenu is
  `absolute top-full` with
  `hidden group-hover:block focus-within:block`
  for mouse users. Keyboard users get a
  parallel signal-based open state:
  ArrowDown/Enter on the trigger opens
  the submenu and focuses the first
  `menuitem`, ArrowUp/ArrowDown cycles
  items, Escape closes and returns focus
  to the trigger. Submenu items without
  a URL show as non-linked text styled
  by status (`line-through` for past,
  `text-muted` for future).

### Mobile navigation

- Full-screen overlay:
  `fixed inset-0 bg-white z-50`.
- Toggled by signal; body scroll is
  locked when open.
- Links use `text-4xl` — deliberately
  oversized for touch targets and visual
  impact. This is an intentional
  stylistic choice, not a bug.
- Secondary navigation appears below
  with `text-xl`, separated by a
  `border-b-2 border-dark`.
- Close button uses "Close" text + ✕
  (U+2715).

### Improvements needed

- Dropdown should support keyboard
  navigation (arrow keys, Escape).
- Mobile menu close should trap focus
  within the overlay.

## Motion

### Custom easing

The Rebuild identity easing curve:

```
--ease-rebuild: cubic-bezier(0.33, 0, 0.1, 1)
```

A smooth, confident curve — quick off
the mark, then settling gently into
place. No bounce, no overshoot. Like
turning a page.

### Duration tokens

| Token               | Value | Use                              |
| ------------------- | ----- | -------------------------------- |
| `--duration-fast`   | 150ms | Hover states, micro-interactions |
| `--duration-base`   | 250ms | General transitions              |
| `--duration-slow`   | 350ms | Carousel crossfades              |
| `--duration-slower` | 500ms | Entrance animations              |

### The `transition-rebuild` utility

Combines the custom easing with a 220ms
duration:

```css
@utility transition-rebuild {
	transition-duration: 220ms;
	transition-timing-function: var(
		--ease-rebuild
	);
}
```

Use `transition-rebuild` for most
interactive transitions (buttons, links,
state changes). The 220ms duration sits
between `fast` and `base` — quick enough
to feel responsive, slow enough to be
perceptible.

### What animates

- **Hover states:** color shifts on
  buttons and links
  (`transition-rebuild`).
- **Header mode switch:**
  background-color, text color,
  border-color, filter (300ms ease).
- **Carousel slides:** opacity and
  visibility (`--duration-slow` with
  ease-in-out).
- **Hero splash images:** crossfade
  (1500ms ease-in-out).
- **Marquee banner:** continuous
  horizontal scroll (60s linear).
- **Loader:** three dots stepping in
  turn (900ms, `steps(1, end)`). Static
  under reduced motion.
- **Loading skeletons:** background
  pulse `lighter` ↔ `light` (1500ms
  ease-in-out, alternating). Static
  under reduced motion.
- **Form controls:** border color only
  (`transition-rebuild`).
- **Programme items:** slide-in entrance
  (translateX + opacity,
  `--duration-slower` with
  `--ease-rebuild`).
- **Page transitions:** on internal link
  clicks the content fades out to the
  background color, then the next page
  fades in from it (220ms each,
  `--ease-rebuild`). Between non-home
  pages the header is held in place and
  only `main` and the footer fade; to/from
  the home page (transparent header) the
  whole page fades. Images that aren't
  decoded when a page reveals fade in on
  their own. Implemented in
  `src/lib/pageTransition.ts` (inline
  head script) and the "Page transitions"
  block in `app.css`. Skipped entirely
  for `prefers-reduced-motion: reduce`.

### What does not animate

- Layout shifts (no animated
  width/height changes).
- Scroll position.

### Reduced motion

All animations must respect
`prefers-reduced-motion: reduce`. See
the Accessibility section for
implementation details.

## Error, Empty, and Loading States

Three states, three rules. Things still
**loading** hold their place quietly.
**Empty** means there is genuinely
nothing there and says so in the
editorial voice. An **error** means
something failed; it says what happened
and what to do next. Never let one pass
for another: an empty list caused by a
failed fetch is an error, not an empty
state.

### Loading states

Most pages are server-rendered, so their
content arrives with the HTML and needs
no loading state. Loading states appear
only in two places:

1. **Client-side data inside
   `<Suspense>`** — a skeleton when the
   shape of the content is known, the
   loader when it isn't.
2. **An action the person started**
   (submitting a form, saving) — the
   loader inside the button.

**No full-page loaders and no progress
bars.** If a real, measurable progress
bar is ever needed (e.g. a file upload
to Bunny), define it here first.

#### Loader

The system's only "spinner": three
small circles that light up one after
another, in three steps — like an
ellipsis being typed.

| Property  | Value                                                            |
| --------- | ---------------------------------------------------------------- |
| Shape     | Three circles, `0.375em` each, `rounded-full`, `gap-xxs` (4px)   |
| Color     | `currentColor` — inherits the text color of whatever holds it    |
| Animation | Each dot at full opacity for one step, 25% otherwise; 900ms cycle (300ms per step), `steps(1, end)` — it jumps, never fades |
| Reduced motion | Static: all three dots at full opacity                      |
| Component | `~/components/Loader.tsx`; CSS `.loader-dot` in `app.css`        |

- Sized in `em`, so it scales with the
  text next to it.
- Standalone, it's a `role="status"`
  region with an `sr-only` label
  ("Loading platforms…"). Inside a
  control whose visible label already
  says what's happening, pass
  `decorative` so it's hidden from
  screen readers.
- Never spin anything. No rotating
  circles, no arcs.

#### Skeletons

Placeholder blocks in the shape of the
content that's coming, pulsing gently.

| Property  | Value                                                                  |
| --------- | ---------------------------------------------------------------------- |
| Fill      | `bg-lighter`                                                           |
| Animation | Background pulses `lighter` ↔ `light`, 1500ms, `ease-in-out`, infinite, alternating |
| Shape     | Rectangular (`rounded-none`); `rounded-full` only where the real content is a badge or pill |
| Text      | One bar per expected line, `1em` tall, last bar ~60% width             |
| Images    | Same aspect-ratio class as the real image (`aspect-video` etc.)        |
| Size      | Exactly the space the content will take, so nothing jumps when it arrives |

- **Pulse, not shimmer sweep.** A
  sweep is a moving gradient, and
  gradients are reserved for the hero
  splash. A background-color pulse gives
  the same "something is happening"
  signal and stays flat.
- **Reduced motion:** a static
  `bg-lighter` block with no animation.
- **Accessibility:** the skeleton blocks
  are `aria-hidden="true"`. The fallback
  wraps them in a `role="status"`
  element holding one `sr-only` sentence
  — "Loading platforms…" — so screen
  reader users hear what's happening
  once. The region being replaced gets
  `aria-busy="true"` until the content
  arrives.

**Current state:** every `<Suspense>`
boundary renders nothing while loading.
Skeletons still need to be built.

#### Action loading

When someone starts an action (submit,
save, send):

- The button label switches to the
  present participle followed by the
  loader: "Submit" → "Submitting ●●●",
  "Save" → "Saving ●●●". The loader
  takes the place of the ellipsis.
- The button is `disabled` until the
  request settles, so it can't be sent
  twice.
- The button keeps its width. Full-width
  form buttons already do; inline
  buttons get a `min-w-*` that fits the
  longer label.
- Announce the **outcome**, not the wait
  (see Form-level messages below).

`FormRenderer` already does this.

### Empty states

When data is genuinely empty (not
loading, not errored — just nothing
there), display a descriptive message in
the editorial voice.

**Tone:** write like an editor's note,
not a system message. Be as descriptive,
detailed, and plain-language as
possible. The reader is an adult who
deserves a clear explanation.

**Format:** use an em-dash (—) to
separate the state from its explanation
when appropriate. Style:
`text-lg text-darker py-xl`, in the slot
where the content would have been.

| Pattern          | Example                                                                  |
| ---------------- | ------------------------------------------------------------------------ |
| No results       | "No platforms match the selected filters — try removing one."            |
| Empty collection | "No gatherings are scheduled at the moment."                             |

An empty result that shouldn't be
possible is an error, not an empty
state. The directory used to say "No
platforms available. This is definitely
an error." — it now uses the section
error pattern below.

### Error states

Errors come in four levels. Pick the
smallest one that covers what failed.

| Level   | When                                           | Looks like                                                                 |
| ------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| Field   | One input is invalid                           | Red border + `text-sm text-red` message below the field (see Form Input Styles) |
| Form    | The server rejected or couldn't take a submission | Message block above the submit button                                   |
| Section | One part of a page failed to load              | Message in the content's slot + "Try again"                               |
| Page    | The whole page can't be shown (404, 500)       | Full page, standard page-title pattern                                     |

**Red is for things the person can
fix** — field and form errors. Section
and page errors use normal `dark` /
`darker` typography. A page-sized red
wall alarms more than it helps.

#### Form-level messages

- **Server error:**
  `text-sm text-red bg-red-light px-sm py-xs`
  (5.5:1), directly above the submit
  button, `role="alert"`. Say what
  happened, whether the input was kept,
  and what to do: "We couldn't send your
  message — our server didn't respond.
  Your answers are still here; try
  again, or email us at …"
- **Success:** replace the form with the
  message in the same spot, in `dark`
  body text. Give the container
  `tabindex="-1"` and move focus to it,
  so keyboard and screen reader users
  land on the confirmation. Say what
  happens next. No exclamation marks —
  the current default "Thank you for
  your submission!" should become "Thank
  you — we've received your submission."

#### Section errors

For a client-side fetch that fails
inside an otherwise working page:

- In the slot where the content would
  be: `text-lg text-darker py-xl`, then
  a secondary `md` button "Try again"
  that retries the fetch.
- Wording: say it's on our side, what to
  do, and where to go if it persists.
  The directory: "We couldn't load the
  directory just now — the problem is on
  our side, not yours. Try again in a
  moment, or get in touch if it keeps
  happening."
- Wrap the section in its own
  `<ErrorBoundary>` so one failed block
  doesn't take down the page.

#### Page errors

- **404 — not found:**
  `src/routes/[...404].tsx` returns HTTP
  404 via `<HttpStatusCode code={404} />`
  (`NotFound` in `ErrorPage.tsx`).
  Content: page-title h1 "Page not
  found", one paragraph ("This page
  doesn't exist, or it has moved."),
  and a `dark` primary button "Go to the
  homepage". Pages that look up content
  by slug (e.g. `insights/[slug]`) reuse
  the same layout and status code.
- **500 — unexpected error:**
  `SafeErrorBoundary` in `app.tsx`
  (`ServerError` in `ErrorPage.tsx`). h1
  "Something went wrong", one paragraph
  saying it's on our side, a "Try again"
  button that reloads the page, and a
  contact link. Error pages are
  `noindex`.
- Both use the standard page-title
  pattern (`text-4xl md:text-5xl lg:text-6xl`)
  and page padding, inside the normal
  header and footer, so the person can
  still navigate away.

**Never show** stack traces,
`error.message`, database errors, or
internal ids to the reader. Log them on
the server with the user id — never the
email. Solid serializes thrown errors to
the browser, so every `"use server"`
query runs inside `guardServer()` (see
AGENTS.md, hard rule 8).

## Badge, Tag, and Chip Styles

See the **Badges** and **Chips / Pills**
subsections under Components for the
full specification. Summary of the
distinction:

| Element     | Shape          | Interactive?         | Border                                 |
| ----------- | -------------- | -------------------- | -------------------------------------- |
| Badge       | `rounded-full` | No (label only)      | None — solid fill                      |
| Chip / Pill | `rounded-full` | Yes (toggle/dismiss) | 2px `dark` (outlined) or none (filled) |

Both use the same size scale (sm / md /
lg) and are available in all brand
colors. Badges are static labels. Chips
are interactive filters with hover,
active, and dismiss states.

## Footer Component

### Structure

Two-region layout inside a
`flex-col lg:flex-row` container:

1. **Left column:** logo and site
   description.
2. **Right column:** `<nav>` with two
   `<ul>` lists side by side
   (`flex-row gap-xl`):
   - First list: main navigation links
     (`text-sm`, `hover:underline`).
   - Second list: secondary navigation
     (`text-xs`). Non-clickable items
     render as `<span>` with
     `cursor-not-allowed` and
     `aria-disabled`.

A copyright line sits below both
columns.

### Responsive

- Below `lg`: columns stack vertically
  (`flex-col`), constrained to
  `max-w-200`.
- At `lg` and above: horizontal layout,
  `max-w-max-width`.

### Styling

- No background color (inherits page
  background).
- No top border or divider — separation
  comes from spacing.
- Links follow the standard `dark` text,
  `hover:underline` pattern.

## Content Voice and Tone

### Core principles

**Plain language, at eye level.** Write
as if explaining something to a
thoughtful peer over coffee. No jargon,
no corporate speak, no hedging. The
reader is a grown-up — give them clear,
direct information and trust them to
understand it.

**Be an editor, not a marketer.** Every
piece of text should read like an
editor's note: informed, precise, and
genuinely useful. Never sell. Never
hype. State what something is, what it
does, and why it matters.

**Concise but complete.** Say everything
that needs saying, nothing more. A
single well-constructed sentence beats
three that circle the point. Cut filler
words. Cut throat-clearing
introductions. Start with the substance.

### Voice characteristics

- **Direct:** "We are mapping all the
  social platforms in Europe." Not
  "We're excited to announce our
  initiative to comprehensively
  catalogue..."
- **Honest:** acknowledge limitations
  and uncertainties. "This is definitely
  an error" is better than pretending
  nothing happened.
- **Inclusive:** write for an
  international audience. Avoid idioms,
  cultural references, or humor that
  assumes a specific background.
- **Warm but not casual:** friendly
  without being flip. No exclamation
  marks in UI text. No emoji (unless
  explicitly documented as part of a
  component).

### Editorial reference

The Rebuild Letter sets the tone for
long-form and inspirational prose:
confident, rooted, culturally aware, and
written from a place of genuine
conviction. It uses simple sentence
structures, concrete imagery, and speaks
to the reader as a collaborator, not an
audience.

When writing longer content (about
pages, manifestos, programme
descriptions), channel this voice:
grounded, specific, and human. Avoid
abstraction. Name real places, real
challenges, real aspirations.

### UI text guidelines

- **Labels and buttons:** imperative
  mood. "Join the directory", not "Click
  here to join."
- **Descriptions:** present tense,
  active voice. "We are mapping..." not
  "The platforms are being mapped..."
- **Empty states:** write like an
  editor's note. Descriptive, detailed,
  plain language.
- **Error messages:** explain what
  happened and what to do. Never blame
  the user. "Something went wrong" is
  acceptable as a last resort, but
  prefer specificity.
- **Tooltips and help text:** answer the
  question the reader is asking. "What
  is this?" deserves a real, complete
  answer.

## Do's and Don'ts

Ground rules for staying within the
system and avoiding common drift.

### Do

- **Start from this document.** Check it
  before building any feature, and
  follow what it specifies.
- **Reuse existing components and
  patterns.** Use as is, compose, or
  extend with a variant before creating
  anything new. Document any genuinely
  new component in
  [Components](#components) in the same
  PR.
- **Write DRY, accessible, performant,
  idiomatic SolidJS.** See `AGENTS.md`
  §Building features.
- **Use a single font weight.** ABC
  Social Mono Book (400) only. Create
  hierarchy with size and spacing.
- **Keep it flat.** No shadows anywhere.
  Use borders and color fills to define
  interactive elements and create visual
  hierarchy.
- **Use the shade/tint system.** Hover
  states should use the shade variant;
  background fills should use the tint
  variant.
- **Respect the container.** Content
  sits inside a 1400px max-width
  container with 24px side padding. Only
  the hero splash breaks out full-bleed.
- **Use semantic spacing tokens** (`xs`,
  `sm`, `md`, `lg`, `xl`) rather than
  arbitrary pixel values.
- **Default to the `dark` button.** It
  is the primary button for all standard
  actions. Colored variants are accent
  buttons — use them only when a
  section, card, or page already commits
  to a specific hue.
- **Match button radius to size.** `sm`
  → `rounded-sm`, `md` → `rounded-md`,
  `lg` → `rounded-lg`. Only pills and
  badges use `rounded-full`.
- **No borders on standard buttons.**
  Primary and secondary buttons have no
  border or outline — color alone
  distinguishes them. Only filter pills
  and splash CTAs keep a border.
- **Pick button text color for
  contrast.** Use `white` on
  dark/saturated backgrounds (dark,
  red), `dark` on light/medium
  backgrounds (blue, green, lighter,
  light). See the verified contrast
  table.
- **Set focus rings.** All interactive
  elements need a visible 2px
  `blue-shade` outline with 2px offset
  on `:focus-visible` (`blue` on dark
  surfaces).
- **Use the z-index token scale.** Never
  introduce ad-hoc z-index values.
- **Use the `transition-rebuild`
  utility** for interactive transitions.
- **Respect reduced motion.** Every
  animation needs a
  `prefers-reduced-motion` guard.
- **Design for WCAG 2.1 AA** from the
  start. Contrast, focus, keyboard
  access, and ARIA are not optional.
- **Use the dark or white logo** —
  whichever contrasts more with the
  background.
- **Keep form borders 2px in every
  state** and change only their color.
- **Hold the space while loading.**
  Skeletons match the size of the
  content they stand in for.

### Don't

- **Don't invent new components or
  patterns because they look on
  brand.** If an existing component can
  be used, composed, or extended, do
  that. Near-duplicates (a second card,
  button, badge, or section wrapper)
  bloat the codebase.
- **Don't copy-paste markup or logic**
  between routes or components. Extract
  and share it.
- **Don't use bold or italic** on ABC
  Social Mono (except in `.rich-text`
  for CMS content where semantic markup
  matters).
- **Don't introduce new colors.** The
  30-value palette (6 chromatic × 4
  stops + 6 neutrals) is the complete
  set.
- **Don't use shadows.** Not for
  elevation, not for hover, not for
  depth. This is a shadowless design
  system by deliberate choice.
- **Don't use gradients** outside the
  hero splash overlay.
- **Don't use large radii on cards, or
  any radius on containers or inputs.**
  Containers and inputs stay
  rectangular. Cards may use the soft
  4px corner (`<Card rounded>`) but
  nothing larger. Beyond that, only
  buttons, badges, pills, and radio
  buttons get radii.
- **Don't put borders on standard
  buttons.** Primary and secondary
  buttons are borderless. Don't add
  outlines to "make them look more
  clickable."
- **Don't use colored buttons for
  routine actions.** A form's "Submit"
  is `dark`, not `blue`. Colored
  variants are for pages that have an
  intentional color identity.
- **Don't add a dark mode.** The system
  is single-theme (light).
- **Don't load additional font weights
  or font files.** The single .woff2 is
  intentional for performance.
- **Don't use icon libraries.** Use
  Unicode characters or simple inline
  SVGs.
- **Don't use Tailwind's built-in
  colors** (e.g., `red-600`,
  `gray-200`). Always use the project's
  color tokens.
- **Don't recolor the logo.** Only the
  dark and white variants exist.
- **Don't use `lighter` or `muted` to
  outline a control.** They fail 3:1
  non-text contrast. The one exception
  is `muted` on empty inputs.
- **Don't remove focus outlines** on
  form controls (`outline-none`) without
  the global focus ring in their place.
- **Don't use rotating spinners or
  full-page loaders.** Use the
  three-dot loader or a skeleton.
- **Don't show raw error messages** or
  stack traces to readers.
- **Don't skip reduced-motion checks.**
  Animations without a
  `prefers-reduced-motion` guard are
  a11y violations.

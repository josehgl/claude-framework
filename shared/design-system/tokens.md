# Material Design 3 — Design Tokens

All values follow M3's token system. Projects generate their specific tokens from a seed color
using the [Material Theme Builder](https://m3.material.io/theme-builder).

---

## Color System

M3 uses **color roles** (semantic tokens) mapped from a generated **tonal palette**.
A single seed color generates 5 key colors, each with 13 tonal values.

### Key Colors (from seed)

| Key Color | Source | Purpose |
|-----------|--------|---------|
| **Primary** | Seed color | Main actions, FAB, active states |
| **Secondary** | Derived | Supporting elements, filters, chips |
| **Tertiary** | Derived | Accent, contrast, complementary areas |
| **Neutral** | Derived | Backgrounds, surfaces, text |
| **Error** | Fixed | Error states, destructive actions |

### Color Roles (Light Scheme)

Use these tokens in code — never use tonal values directly.

#### Primary

| Token | Role | Typical Value |
|-------|------|---------------|
| `--md-sys-color-primary` | Main CTA buttons, FAB, active indicators | Primary40 |
| `--md-sys-color-on-primary` | Text/icons on primary | Primary100 |
| `--md-sys-color-primary-container` | Tonal cards, selected states | Primary90 |
| `--md-sys-color-on-primary-container` | Text on primary container | Primary10 |

#### Secondary

| Token | Role | Typical Value |
|-------|------|---------------|
| `--md-sys-color-secondary` | Secondary buttons, filters | Secondary40 |
| `--md-sys-color-on-secondary` | Text/icons on secondary | Secondary100 |
| `--md-sys-color-secondary-container` | Chips, pills, subtle highlights | Secondary90 |
| `--md-sys-color-on-secondary-container` | Text on secondary container | Secondary10 |

#### Tertiary

| Token | Role | Typical Value |
|-------|------|---------------|
| `--md-sys-color-tertiary` | Complementary accents | Tertiary40 |
| `--md-sys-color-on-tertiary` | Text/icons on tertiary | Tertiary100 |
| `--md-sys-color-tertiary-container` | Complementary containers | Tertiary90 |
| `--md-sys-color-on-tertiary-container` | Text on tertiary container | Tertiary10 |

#### Surface & Background

| Token | Role | Typical Value |
|-------|------|---------------|
| `--md-sys-color-surface` | Page background | Neutral99 |
| `--md-sys-color-on-surface` | Primary text | Neutral10 |
| `--md-sys-color-surface-variant` | Cards, inputs, dividers bg | NeutralVariant90 |
| `--md-sys-color-on-surface-variant` | Secondary text, icons | NeutralVariant30 |
| `--md-sys-color-surface-container-lowest` | Lowest surface level | Neutral100 |
| `--md-sys-color-surface-container-low` | Low surface level | Neutral96 |
| `--md-sys-color-surface-container` | Default container | Neutral94 |
| `--md-sys-color-surface-container-high` | Elevated container | Neutral92 |
| `--md-sys-color-surface-container-highest` | Most elevated surface | Neutral90 |

#### Outline & Dividers

| Token | Role | Typical Value |
|-------|------|---------------|
| `--md-sys-color-outline` | Borders, dividers | NeutralVariant50 |
| `--md-sys-color-outline-variant` | Subtle dividers | NeutralVariant80 |

#### Status

| Token | Role |
|-------|------|
| `--md-sys-color-error` | Error text, icons |
| `--md-sys-color-on-error` | Text on error |
| `--md-sys-color-error-container` | Error background |
| `--md-sys-color-on-error-container` | Text on error background |

### Dark Scheme

Same tokens, different tonal mappings. M3 Theme Builder generates both automatically.
Key difference: containers use lower tonal values, on-colors use higher.

### Custom Colors

For status beyond error (success, warning, info), M3 recommends custom color roles:

| Custom Role | Suggested Seed | Purpose |
|-------------|---------------|---------|
| Success | `#386A20` (green) | Confirmations, positive states |
| Warning | `#7D5700` (amber) | Caution states |
| Info | `#00658E` (teal) | Informational states |

Generate tonal palettes for each using Theme Builder and create matching role tokens.

---

## Typography

M3 uses a **type scale** with 5 roles, each in 3 sizes.

### Font

```
--md-sys-typescale-font: "Roboto Flex", "Roboto", system-ui, sans-serif
--md-sys-typescale-font-mono: "Roboto Mono", ui-monospace, monospace
```

Roboto Flex is M3's recommended variable font. Falls back to Roboto, then system.

### Type Scale

| Role | Size | Line Height | Weight | Tracking | Use |
|------|------|-------------|--------|----------|-----|
| **Display Large** | 57px | 64px | 400 | -0.25px | Hero headlines |
| **Display Medium** | 45px | 52px | 400 | 0 | Section heroes |
| **Display Small** | 36px | 44px | 400 | 0 | Large page titles |
| **Headline Large** | 32px | 40px | 400 | 0 | Page titles |
| **Headline Medium** | 28px | 36px | 400 | 0 | Section titles |
| **Headline Small** | 24px | 32px | 400 | 0 | Card titles |
| **Title Large** | 22px | 28px | 400 | 0 | Top app bar, dialog titles |
| **Title Medium** | 16px | 24px | 500 | 0.15px | Tabs, nav items, list headers |
| **Title Small** | 14px | 20px | 500 | 0.1px | Subheadings |
| **Body Large** | 16px | 24px | 400 | 0.5px | Default body text |
| **Body Medium** | 14px | 20px | 400 | 0.25px | Secondary text |
| **Body Small** | 12px | 16px | 400 | 0.4px | Captions |
| **Label Large** | 14px | 20px | 500 | 0.1px | Buttons, links |
| **Label Medium** | 12px | 16px | 500 | 0.5px | Chips, badges |
| **Label Small** | 11px | 16px | 500 | 0.5px | Tiny labels |

---

## Elevation

M3 uses **tonal elevation** (surface tint) instead of drop shadows alone.
Higher elevation = slightly more tinted surface + optional shadow.

| Level | Shadow | Surface Tint Opacity | Use |
|-------|--------|---------------------|-----|
| **Level 0** | none | 0% | Flat surfaces |
| **Level 1** | `0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)` | 5% | Cards, navigation |
| **Level 2** | `0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)` | 8% | Elevated cards, buttons |
| **Level 3** | `0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)` | 11% | FAB, navigation drawer |
| **Level 4** | `0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)` | 12% | Reserved |
| **Level 5** | `0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)` | 14% | Modals, dialogs |

---

## Shape

M3 defines shape categories by size.

| Token | Value | Use |
|-------|-------|-----|
| `--md-sys-shape-none` | 0px | Full-bleed elements |
| `--md-sys-shape-extra-small` | 4px | Chips, small buttons |
| `--md-sys-shape-small` | 8px | Buttons, text fields, menus |
| `--md-sys-shape-medium` | 12px | Cards, dialogs |
| `--md-sys-shape-large` | 16px | Large cards, sheets |
| `--md-sys-shape-extra-large` | 28px | FAB, navigation bar items |
| `--md-sys-shape-full` | 9999px | Badges, pills, search bars |

---

## Spacing

M3 doesn't prescribe a spacing scale explicitly but uses a **4px grid**.
This framework defines a spacing scale consistent with the 4px grid:

| Token | Value | Use |
|-------|-------|-----|
| `--space-0` | 0px | Reset |
| `--space-1` | 4px | Tight: icon gaps, chip padding |
| `--space-2` | 8px | Compact: inline gaps, small padding |
| `--space-3` | 12px | Default: input padding, list item gaps |
| `--space-4` | 16px | Standard: card padding, component gaps |
| `--space-6` | 24px | Comfortable: section padding |
| `--space-8` | 32px | Large: between sections |
| `--space-10` | 40px | Extra large: page margins |
| `--space-12` | 48px | Page sections |
| `--space-16` | 64px | Major section breaks |
| `--space-24` | 96px | Hero spacing |

---

## Motion

M3 defines easing and duration tokens for consistent animations.

### Duration

| Token | Value | Use |
|-------|-------|-----|
| `--md-sys-motion-duration-short1` | 50ms | Micro-interactions (ripple) |
| `--md-sys-motion-duration-short2` | 100ms | Simple state changes |
| `--md-sys-motion-duration-short3` | 150ms | Hovers, focus rings |
| `--md-sys-motion-duration-short4` | 200ms | Most transitions |
| `--md-sys-motion-duration-medium1` | 250ms | Expanding, collapsing |
| `--md-sys-motion-duration-medium2` | 300ms | Page transitions |
| `--md-sys-motion-duration-medium3` | 350ms | Complex transitions |
| `--md-sys-motion-duration-medium4` | 400ms | Large layout shifts |
| `--md-sys-motion-duration-long1` | 450ms | Route transitions |
| `--md-sys-motion-duration-long2` | 500ms | Full-screen transitions |

### Easing

| Token | Value | Use |
|-------|-------|-----|
| `--md-sys-motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most animations |
| `--md-sys-motion-easing-standard-decelerate` | `cubic-bezier(0, 0, 0, 1)` | Elements entering |
| `--md-sys-motion-easing-standard-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` | Elements leaving |
| `--md-sys-motion-easing-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Important transitions |
| `--md-sys-motion-easing-emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Entering emphasis |
| `--md-sys-motion-easing-emphasized-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Leaving emphasis |

---

## Z-Index

| Token | Value | Use |
|-------|-------|-----|
| `--z-base` | 0 | Default content |
| `--z-navigation` | 10 | Bottom nav, rail, drawer |
| `--z-top-app-bar` | 20 | Top app bar (sticky) |
| `--z-fab` | 30 | Floating action button |
| `--z-snackbar` | 40 | Snackbar notifications |
| `--z-overlay` | 50 | Scrim / backdrop |
| `--z-modal` | 60 | Dialogs, bottom sheets |
| `--z-tooltip` | 70 | Tooltips (always on top) |

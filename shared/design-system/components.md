# Material Design 3 — Component Catalog

Reference catalog of M3 components with behavior specs for AC writing and design review.
This defines WHAT each component does — implementation details depend on the tech stack.

Full reference: [M3 Component Guidelines](https://m3.material.io/components)

---

## Actions

### Common Button (Filled, Outlined, Text, Elevated, Tonal)

| Variant | Use | Emphasis |
|---------|-----|----------|
| **Filled** | Primary CTA, most important action | Highest |
| **Filled Tonal** | Secondary action, medium emphasis | High |
| **Outlined** | Alternative actions, not primary | Medium |
| **Text** | Tertiary actions, less prominent | Low |
| **Elevated** | Actions needing separation from surface | Medium |

**Behavior:**
- Minimum touch target: 48x48dp
- Minimum width: 64dp
- Icon (optional) always left of label
- Disabled state: 38% opacity, no interaction
- Loading state: show progress indicator, disable clicks
- Ripple effect on press

### Floating Action Button (FAB)

| Variant | Size | Use |
|---------|------|-----|
| **FAB** | 56x56dp | Primary creation action on page |
| **Small FAB** | 40x40dp | Secondary creation action |
| **Large FAB** | 96x96dp | Hero action (rare) |
| **Extended FAB** | auto width | FAB with label text |

**Behavior:**
- One FAB per screen (maximum)
- Positioned bottom-right (default) or bottom-center
- Can collapse from Extended to regular on scroll
- Always uses tertiary container color (default)

### Icon Button

Standard (40dp), Filled, Filled Tonal, Outlined.
Toggle variants for on/off states (bookmark, favorite, etc.)

### Segmented Button

Group of 2-5 options. Single-select or multi-select.
Replaces toggle groups and filter chips when options are symmetric.

---

## Communication

### Badge

| Variant | Use |
|---------|-----|
| **Small** (6dp dot) | Boolean indicator (has notifications) |
| **Large** (with number) | Count indicator (3 new messages) |

Shows on icons (navigation, app bar). Max display: 999+.

### Progress Indicator

| Variant | Use |
|---------|-----|
| **Linear determinate** | Known progress (upload 45%) |
| **Linear indeterminate** | Unknown duration (loading...) |
| **Circular determinate** | Compact known progress |
| **Circular indeterminate** | Compact unknown duration |

### Snackbar

Brief message at bottom of screen. 4-10 seconds auto-dismiss.
Optional single action button. Never more than one visible.

### Tooltip

| Variant | Use |
|---------|-----|
| **Plain** | Short text (icon label) |
| **Rich** | Longer text with optional action |

Show on hover (desktop) or long-press (mobile). Delay: 500ms.

---

## Containment

### Card

| Variant | Elevation | Use |
|---------|-----------|-----|
| **Filled** | Level 0 + container color | Default card |
| **Elevated** | Level 1 | Cards needing separation |
| **Outlined** | Level 0 + border | Lists, grids |

**Behavior:**
- Can be clickable (entire card as tap target)
- Content: header, media, supporting text, actions
- No nested scrolling inside cards

### Dialog

| Variant | Use |
|---------|-----|
| **Basic** | Simple confirmation or info |
| **Full-screen** | Complex content on mobile |

**Behavior:**
- Blocks interaction with page (modal)
- Scrim overlay behind dialog
- Dismiss: action button, scrim tap (optional), Escape key
- Minimum 280dp width, maximum 560dp

### Bottom Sheet

| Variant | Use |
|---------|-----|
| **Standard** | Supplementary content (coexists with page) |
| **Modal** | Blocks page, requires dismissal |

### Divider

Full-width or inset. Purely visual separation — no semantic meaning.

---

## Navigation

### Navigation Bar (bottom)

3-5 destinations. Primary navigation on mobile.
Active item shows indicator pill. Icon + label (labels always visible).

### Navigation Rail (side)

3-7 destinations. Primary navigation on tablet/narrow desktop.
Icons with optional labels. Can include FAB at top.

### Navigation Drawer

| Variant | Use |
|---------|-----|
| **Standard** | Persistent sidebar (wide screens) |
| **Modal** | Overlay sidebar (narrow screens) |

Full destination list with optional sections and badges.

### Top App Bar

| Variant | Behavior |
|---------|----------|
| **Center-aligned** | Title centered, 1 trailing icon |
| **Small** | Title left-aligned |
| **Medium** | Larger title, collapses on scroll |
| **Large** | Largest title, collapses on scroll |

Contains: navigation icon (left), title, action icons (right, max 3).

### Tabs

| Variant | Use |
|---------|-----|
| **Primary** | Top-level content tabs |
| **Secondary** | Nested content tabs |

Swipeable between tabs. Indicator animates to active tab.
Scrollable if > 4-5 tabs.

---

## Selection

### Checkbox

Binary on/off. Supports indeterminate state for parent-child relationships.
Minimum touch target: 48x48dp.

### Radio Button

Single selection from a group (2+). Always visible options.
Use dropdown/select for 6+ options.

### Switch

Toggle binary setting. Shows immediate effect (no save needed).
Optional icon inside thumb.

### Chip

| Variant | Use |
|---------|-----|
| **Assist** | Smart suggestions (contextual actions) |
| **Filter** | Multi-select filtering (tags, categories) |
| **Input** | User-created tokens (tags in form) |
| **Suggestion** | Quick reply, predicted actions |

### Date Picker

| Variant | Use |
|---------|-----|
| **Docked** | Inline calendar in page |
| **Modal** | Dialog calendar overlay |
| **Input** | Manual date text entry |

### Time Picker

Dial or input. 12h/24h format based on locale.

### Slider

Continuous or discrete (with steps). Optional value label on drag.
Range slider for min-max selection.

---

## Text Input

### Text Field

| Variant | Use |
|---------|-----|
| **Filled** | Default text input (subtle background) |
| **Outlined** | Text input with visible border |

**Anatomy:**
- Label (required — animates to top on focus)
- Supporting text (below field — helper or error)
- Leading icon (optional)
- Trailing icon (optional — clear, visibility toggle, error icon)
- Character counter (optional)
- Prefix/suffix text (optional)

**States:** Default, Focused, Error, Disabled.
Error state: red outline + error icon + error supporting text.

### Search Bar

| Variant | Use |
|---------|-----|
| **Search bar** | Persistent search (top of page) |
| **Search view** | Full-screen search overlay |

Supports suggestions, recent searches, voice input icon.

---

## Data Display

### List

Single-line, two-line, or three-line items.
Leading element: icon, avatar, image, checkbox.
Trailing element: icon, text, switch, checkbox.
Supports swipe actions (archive, delete).

### Data Table (extended component)

M3 defines basic table patterns:
- Sortable column headers
- Row selection (checkbox)
- Pagination or infinite scroll
- Inline editing (optional)
- Fixed header on scroll

---

## Component Selection Guide

| User Need | Use This Component |
|-----------|-------------------|
| Primary page action | Filled Button or FAB |
| Confirm destructive action | Dialog with explicit buttons |
| Navigate between sections | Tabs or Navigation |
| Select one from few options | Radio Button or Segmented Button |
| Select one from many options | Dropdown Menu or Search |
| Select multiple options | Checkbox group or Filter Chips |
| Enter text | Text Field (Filled or Outlined) |
| Show brief feedback | Snackbar |
| Show loading state | Progress Indicator |
| Display content item | Card |
| Display list of items | List |

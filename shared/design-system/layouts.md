# Material Design 3 — Layouts

Page layouts, grid system, and navigation patterns.

---

## Grid System

M3 uses a responsive column grid that adapts across window size classes.

### Grid Configuration

| Window Class | Columns | Margin | Gutter | Content Max Width |
|-------------|:-------:|:------:|:------:|:-----------------:|
| Compact (< 600dp) | 4 | 16dp | 8dp | 100% |
| Medium (600-839dp) | 8 | 24dp | 16dp | 100% |
| Expanded (840-1199dp) | 12 | 24dp | 16dp | 100% |
| Large (1200-1599dp) | 12 | 24dp | 16dp | 1200dp |
| Extra-large (>= 1600dp) | 12 | 24dp | 16dp | 1400dp |

### Column Spanning

Content areas span columns:

```
| 4-col mobile  | 8-col tablet      | 12-col desktop           |
|  [  full  ]   | [ half ][ half ]   | [ third ][ third ][ third ] |
|  [  full  ]   | [ 5 cols ][ 3c ]   | [ 8 cols  ]  [ 4 cols ]    |
```

---

## Canonical Layouts

### 1. List-Detail

Master list on left, detail view on right. The most common business app layout.

```
Compact:        Full-screen list → Full-screen detail (push navigation)
Medium:         List (40%) | Detail (60%)  — or still push navigation
Expanded+:      List (380dp fixed) | Detail (remaining)
```

**Use for:** email, contacts, orders, inventory, settings, any entity list.

**Behavior:**
- List is scrollable independently
- Selecting an item updates detail panel
- On compact: back arrow returns to list
- Detail panel shows empty state when nothing selected

### 2. Feed

Scrolling content stream with cards or items.

```
Compact:        Single column, full-width cards
Medium:         Single column, centered cards (max 600dp)
Expanded+:      Grid of cards (2-3 columns) or centered single column
```

**Use for:** dashboards, activity feeds, product catalogs, search results.

### 3. Supporting Panel

Main content with a supplementary side panel.

```
Compact:        Main content only — panel as bottom sheet or dialog
Medium:         Main content only — panel as slide-over
Expanded+:      Main (60-70%) | Panel (30-40%)
```

**Use for:** documentation with TOC, editors with properties, maps with details.

---

## Navigation Patterns

### Which Navigation to Use

| Window Class | Primary Nav | Secondary Nav |
|-------------|------------|---------------|
| **Compact** | Bottom navigation bar (3-5 items) | Top app bar + menus |
| **Medium** | Navigation rail (3-7 items) | Top app bar |
| **Expanded** | Navigation rail or drawer | Top app bar |
| **Large+** | Navigation drawer (persistent) | Top app bar (optional) |

### Navigation Hierarchy

```
Level 1: Navigation bar / rail / drawer      (switch major sections)
Level 2: Tabs                                 (switch content within section)
Level 3: In-page navigation                   (scroll, links, breadcrumbs)
```

### Navigation Transitions

| Transition | Animation |
|-----------|-----------|
| Forward (deeper) | New content slides in from right |
| Backward (shallower) | Content slides out to right |
| Lateral (same level) | Crossfade or shared axis |
| Top-level switch | Crossfade (no sliding) |

---

## Page Templates

### Template: Dashboard

```
┌──────────────────────────────────────────┐
│  Top App Bar: title + actions            │
├─────┬────────────────────────────────────┤
│     │  Summary cards (2-4, grid)         │
│ Nav │────────────────────────────────────│
│ Rail│  Primary chart / data viz          │
│  or │────────────────────────────────────│
│Drawer│  Table or list (main content)     │
│     │────────────────────────────────────│
│     │  Secondary info / recent activity  │
└─────┴────────────────────────────────────┘
```

### Template: Entity List (CRUD)

```
┌──────────────────────────────────────────┐
│  Top App Bar: title + search + filters   │
├─────┬────────────────────────────────────┤
│     │  Filter chips (active filters)     │
│ Nav │────────────────────────────────────│
│     │  Data table / card list            │
│     │  (sort, select, paginate)          │
│     │                                    │
│     │                            [ FAB ] │
└─────┴────────────────────────────────────┘

FAB = primary creation action (e.g., "New Contact")
```

### Template: Entity Detail

```
┌──────────────────────────────────────────┐
│  Top App Bar: ← back + title + actions   │
├──────────────────────────────────────────┤
│  Header: entity name, status, key info   │
│──────────────────────────────────────────│
│  Tabs: Overview | Details | Activity     │
│──────────────────────────────────────────│
│  Tab content (scrollable)                │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

### Template: Form / Editor

```
┌──────────────────────────────────────────┐
│  Top App Bar: ← close + title + Save     │
├──────────────────────────────────────────┤
│  Form sections (max 600dp centered)      │
│                                          │
│  Section 1: Basic Info                   │
│  ┌─ Text field ──────────────────────┐   │
│  ├─ Text field ──────────────────────┤   │
│  ├─ Dropdown ────────────────────────┤   │
│                                          │
│  Section 2: Details                      │
│  ┌─ Text area ───────────────────────┐   │
│  ├─ Checkbox group ──────────────────┤   │
│                                          │
│  [ Cancel ]  [ Save — Filled Button ]    │
└──────────────────────────────────────────┘

Buttons: right-aligned. Primary action last (rightmost).
```

### Template: Auth (Login / Register)

```
┌──────────────────────────────────────────┐
│                                          │
│           [ Logo / Brand ]               │
│                                          │
│      ┌─ Card (max 400dp) ──────────┐    │
│      │  Title: "Sign In"           │    │
│      │                             │    │
│      │  Email field                │    │
│      │  Password field             │    │
│      │                             │    │
│      │  [ Sign In — Filled ]       │    │
│      │                             │    │
│      │  Forgot password? (link)    │    │
│      │  Don't have account? (link) │    │
│      └─────────────────────────────┘    │
│                                          │
└──────────────────────────────────────────┘

Centered, no navigation. Minimal distractions.
```

---

## Spacing Guidelines

### Page-Level

| Area | Compact | Medium | Expanded+ |
|------|---------|--------|-----------|
| Page margin | 16dp | 24dp | 24dp |
| Between sections | 24dp | 32dp | 32dp |
| Section title to content | 16dp | 16dp | 16dp |

### Component-Level

| Area | Value |
|------|-------|
| Card internal padding | 16dp |
| List item padding | 16dp horizontal, 8dp vertical |
| Button padding | 24dp horizontal, 10dp vertical |
| Text field padding | 16dp horizontal, 8dp vertical |
| Between form fields | 16dp |
| Between buttons | 8dp |

### Consistent Rhythm

Maintain vertical rhythm using multiples of 8dp for major spacing
and 4dp for fine-tuning within components.

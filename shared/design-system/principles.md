# Design Principles & Accessibility

---

## M3 Design Principles

### 1. Personal

Design adapts to the user through dynamic color, flexible layouts, and user-driven customization.
Products feel unique to each user while maintaining brand coherence.

### 2. Adaptive

Layouts, components, and interactions adapt to different screen sizes, input methods, and contexts.
A single design system serves mobile, tablet, desktop, and embedded.

### 3. Expressive

Typography, color, and motion create personality. The product communicates hierarchy and importance
through visual weight, not decoration.

---

## Accessibility Requirements

WCAG 2.1 Level AA is the minimum. Non-negotiable for every project.

### Color & Contrast

| Requirement | Minimum Ratio | Applies To |
|-------------|:------------:|-----------|
| Normal text (< 18px) | 4.5:1 | All body text, labels |
| Large text (>= 18px bold or >= 24px) | 3:1 | Headlines, titles |
| UI components | 3:1 | Borders, icons, form controls |
| Non-text content | 3:1 | Charts, graphs, indicators |

Rules:
- M3's color system maintains these ratios when used correctly (on-X on X)
- Never use color alone to convey information (add icon, text, or pattern)
- Test both light and dark schemes for contrast compliance
- Custom colors must be verified with a contrast checker

### Touch Targets

| Requirement | Minimum Size |
|-------------|:----------:|
| All interactive elements | 48 x 48dp |
| Spacing between targets | 8dp minimum |
| Small controls (checkbox, radio) | 48dp tap area (visual can be smaller) |

### Keyboard Navigation

| Requirement | Implementation |
|-------------|---------------|
| All interactive elements focusable | `tabindex`, semantic HTML |
| Visible focus indicator | M3 focus ring (3dp outline, primary color) |
| Logical tab order | Follows visual layout, left-to-right, top-to-bottom |
| Escape closes overlays | Dialogs, menus, sheets, popovers |
| Enter/Space activates | Buttons, links, checkboxes, radio |
| Arrow keys navigate | Tabs, menus, radio groups, lists |

### Screen Readers

| Requirement | How |
|-------------|-----|
| All images have alt text | `alt` attribute (decorative: `alt=""`) |
| Form fields have labels | `<label>` or `aria-label` |
| Dynamic content announced | `aria-live` regions |
| Page landmarks defined | `<header>`, `<main>`, `<nav>`, `<footer>` |
| Error messages associated | `aria-describedby` on the field |
| Loading states communicated | `aria-busy`, `role="status"` |

### Motion & Animation

| Requirement | Implementation |
|-------------|---------------|
| Respect `prefers-reduced-motion` | Disable non-essential animations |
| No flashing > 3Hz | Avoid strobing, rapid flashing |
| Animations serve purpose | Motion communicates relationships, not decoration |
| Users can pause/stop | Auto-playing carousels, videos need controls |

---

## Responsive Design

### Breakpoints

M3 defines window size classes:

| Class | Width | Columns | Margin | Gutter | Navigation |
|-------|-------|:-------:|:------:|:------:|-----------|
| **Compact** | < 600dp | 4 | 16dp | 8dp | Bottom nav bar |
| **Medium** | 600-839dp | 8 | 24dp | 16dp | Navigation rail |
| **Expanded** | 840-1199dp | 12 | 24dp | 16dp | Navigation rail or drawer |
| **Large** | 1200-1599dp | 12 | 24dp | 16dp | Navigation drawer |
| **Extra-large** | >= 1600dp | 12 | 24dp | 16dp | Navigation drawer |

### Canonical Layouts

M3 defines standard page patterns:

| Layout | Use | Example |
|--------|-----|---------|
| **List-Detail** | Master list + detail view | Email, contacts |
| **Feed** | Scrolling content stream | Social, news |
| **Supporting Panel** | Main content + side panel | Documentation |

### Responsive Rules

1. **Content first**: never sacrifice content for layout aesthetics
2. **Progressive disclosure**: show less on small screens, more on large
3. **Adapt, don't shrink**: redesign for the screen, don't just scale down
4. **Touch AND click**: support both input methods on all sizes
5. **Test at breakpoint boundaries**: especially 599dp and 839dp

---

## Dark Theme

M3's color system generates dark scheme automatically from the same seed color.

### Dark Scheme Rules

1. **Surface colors are dark, not black**: use `surface` tokens, not pure #000
2. **Tonal elevation replaces shadows**: higher surfaces are lighter, not shadowed
3. **Primary colors are desaturated**: lighter tones for legibility on dark backgrounds
4. **White text on dark backgrounds**: ensure 4.5:1 contrast
5. **Avoid large bright areas**: prefer subtle tonal differences
6. **Honor `prefers-color-scheme`**: match system preference by default

### Implementation

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Override with dark scheme tokens from Theme Builder */
  }
}
```

---

## Iconography

### Style

Use **Material Symbols** (variable font icon set):
- Style: **Outlined** (default) or Rounded
- Size: 24dp default, 20dp compact, 40dp prominent
- Optical size: matches text size for visual consistency

### Rules

1. Icons supplement text — never replace it for critical actions (except universally understood: X, search, menu)
2. Maintain consistent style throughout the app (don't mix outlined and filled)
3. Touch target is always 48dp regardless of icon visual size
4. Icons in buttons always precede the label (left side in LTR)

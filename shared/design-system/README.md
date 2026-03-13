# Default Design System — Material Design 3

Based on [Material Design 3](https://m3.material.io/) (Material You) by Google.
Projects inherit these defaults and override through M3's theming system.

## Why M3

1. **Comprehensive** — covers every component, pattern, and interaction
2. **Dynamic color** — automatic palette generation from a single seed color
3. **Accessible** — built-in contrast ratios, touch targets, and motion
4. **Cross-platform** — works on web (CSS/Tailwind), Android, iOS, Flutter
5. **Figma-ready** — official M3 Design Kit available

## Structure

```
shared/design-system/
├── README.md              ← this file
├── tokens.md              ← M3 color roles, typography, spacing, elevation
├── tokens.json            ← machine-readable tokens (for Tailwind/CSS generation)
├── components.md          ← M3 component catalog with behavior specs
├── principles.md          ← design principles, accessibility, motion
└── layouts.md             ← M3 layouts, navigation patterns, responsive breakpoints
```

## How Projects Use This

1. **Pick a seed color**: one brand color → M3 generates the full palette
2. **Generate tokens**: use [Material Theme Builder](https://m3.material.io/theme-builder) to export
3. **Override selectively**: modify only what your brand requires
4. **Map to implementation**: Tailwind config, CSS custom properties, or framework tokens

## Technology Mapping

| M3 Concept | Tailwind CSS | Plain CSS | Figma |
|------------|-------------|-----------|-------|
| Color scheme | Extended colors in config | CSS custom properties | M3 Design Kit color styles |
| Typography | Font/text config | CSS custom properties | M3 type scale styles |
| Elevation | Shadow utilities | CSS custom properties | M3 elevation styles |
| Shape | Border radius config | CSS custom properties | M3 shape styles |
| Motion | Transition utilities | CSS custom properties | Prototype animations |

## Default Seed Color

The framework uses **blue (#6750A4 — M3 default primary)** as the seed.
Projects MUST override this with their brand color during setup.

## References

- [M3 Guidelines](https://m3.material.io/)
- [Material Theme Builder](https://m3.material.io/theme-builder)
- [M3 Figma Design Kit](https://www.figma.com/community/file/1035203688168086460)
- [Material Web Components](https://github.com/nickvdyck/material-web)

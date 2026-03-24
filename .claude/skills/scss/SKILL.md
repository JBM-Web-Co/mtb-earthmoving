---
name: scss
description: Apply when writing or reviewing SCSS, CSS Modules, or styling architecture. Enforces token usage, mobile-first layout, breakpoints, dark mode patterns, module import conventions, and class nesting rules.
---

# SCSS — Styling System

## Module Import Convention

Always import CSS Modules as `s`:

```ts
import s from './Component.module.scss'
```

Use as `s.className` in JSX. Never use string literals for class names.

## Design Tokens

- All colours, spacing, typography, radii, and shadows must come from tokens defined in `_variables.scss`
- Never hardcode colour values outside the token system
- Never introduce arbitrary one-off design tokens
- Border radius scale is fixed — use existing scale values only
- Container max width: 1200px

## Mobile-First Layout

- Write base styles for mobile first
- Use `@media (min-width: 768px)` for tablet/desktop breakpoints
- 768px is the primary breakpoint

## Dark Mode

- Dark mode is applied via `[data-theme='dark']` on the root element
- Theme is persisted in `localStorage`
- Use a flash-free inline theme script to apply the theme before paint
- Write dark mode overrides using the attribute selector:

```scss
[data-theme='dark'] .myClass {
  color: var(--color-text-inverted);
}
```

## Class Nesting Rules

- Nest element selectors inside their parent block — one level deep is usually sufficient
- Don't nest more than 3 levels; flatten when structure becomes unclear
- Use BEM-style naming within modules: `.card`, `.card__title`, `.card--featured`
- Modifiers (state, variants) go at the same level as the base class

## Colour Rules

- Never hardcode hex, rgb, or hsl values in component stylesheets
- Always use CSS custom properties (`var(--token-name)`) or SCSS variables from `_variables.scss`
- Dark mode colour swaps must go through the token system, not one-off overrides

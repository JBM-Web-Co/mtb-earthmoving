---
name: code-style
description: Apply when writing or reviewing React/TypeScript code. Enforces TypeScript strict rules, naming conventions, export conventions, type usage, component architecture, CSS Modules, accessibility, and reduced motion handling.
---

# Code Style — React + TypeScript

## TypeScript Rules

- Strict mode always — no exceptions
- Never use `any`
- Never use `interface` — always use `type`
- Enforce exhaustive unions
- No non-null assertions (`!`)
- No unsafe assignments, returns, or member access
- All data types must use `Readonly<T>` or `readonly T[]`

## Naming Conventions

| Target             | Convention     |
| ------------------ | -------------- |
| Components         | PascalCase     |
| Types              | PascalCase     |
| Constants          | SCREAMING_CASE |
| Exported variables | camelCase      |
| Local variables    | snake_case     |

## Export Rules

- Named exports only
- Exception: `App.tsx` may default export
- Template/page sub-components may default export

## Type Organisation

- Shared types in a central `types.ts`
- Local types declared above the component that uses them
- No inline type definitions mixed into JSX props

## Component Architecture

- Pages are flat section composition — no deep nesting
- CSS Modules only — no styled-components, no Tailwind, no inline styles (unless unavoidable)
- Import CSS Modules as `s`: `import s from './Component.module.scss'`
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, etc.) as much as possible.
- Use ARIA attributes correctly — don't add redundant or incorrect roles
- Call `useReducedMotion()` consistently wherever animation is used; respect the preference
- No `console.log` in client code

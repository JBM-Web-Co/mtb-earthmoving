---
name: brand-guidelines
description: Apply when writing copy, generating UI, or making styling decisions — enforces MTB Earthmoving's brand identity, tone, colours, and typography
---

# Brand Guidelines — MTB Earthmoving

Apply these guidelines whenever writing copy, choosing colours, selecting fonts,
or designing UI components for this client. Tokens live in
`src/styles/_variables.scss` and `src/styles/global.scss`; business facts live in
`src/data.ts`.

---

## Business Overview

- **Business name:** MTB Earthmoving
- **Industry / trade:** Rural earthmoving, road construction & civil works
  (land clearing, site prep, drainage, dam construction, road maintenance,
  welding & fabrication)
- **Location:** Gunnedah, NSW — serving Gunnedah, Narrabri, Tamworth, Quirindi,
  Boggabri, Coonabarabran, Manilla and the wider North West / New England NSW
- **Target audience:** Rural property owners, farmers, and station managers, plus
  residential and commercial clients across North West NSW
- **Unique selling point:** Owner-operated and locally based — over a decade of
  on-the-ground experience, the owner on every job, and free no-obligation quotes.
  "The land is our office."

---

## Tone of Voice

- **Overall tone:** No-nonsense, down-to-earth, and trustworthy — speaks like a
  capable local contractor, not a corporate brand. Confident and practical.
- **Do:** Use plain, direct language; lead with local knowledge and reliability;
  emphasise free quotes, owner-operator attention, and getting the job done right
  the first time; lean into rural/land vocabulary ("the bush", "the terrain").
- **Don't:** Use corporate jargon or buzzwords, make unverifiable claims, or
  oversell. Avoid city-slick marketing language that won't land with rural clients.

Copy should be conversion-focused and speak to the practical needs of North West
NSW property owners and businesses.

---

## Colours

Defined in `src/styles/_variables.scss` (brand/status) and
`src/styles/global.scss` `:root` (neutrals). There is a single light palette — no
dark mode.

| Token              | Hex       | Usage                                |
| ------------------ | --------- | ------------------------------------ |
| `$primary`         | `#3775be` | CTAs, links, key accents (work-blue) |
| `$primary-hover`   | `#2d64a8` | Hover state for primary              |
| `$accent`          | `#eab308` | Highlight / "high-vis" gold accent   |
| `$accent-hover`    | `#ca8a04` | Hover state for accent               |
| `$success`         | `#16a34a` | Success / confirmation states        |
| `$danger`          | `#dc2626` | Errors / validation                  |
| `--text` / `$text` | `#1a1a1a` | Body and heading text                |
| `--text-muted`     | `#4a4a4a` | Secondary text                       |
| `--bg`             | `#ffffff` | Page background                      |
| `--surface`        | `#f5f4f1` | Alternating section / card surfaces  |
| `--footer-bg`      | `#1a1a1a` | Footer + dark CTA bands              |

> Update `src/styles/_variables.scss` and `src/styles/global.scss` together to
> re-skin. Never hardcode brand colours in component modules — use the tokens.

---

## Typography

- **Heading font:** Oswald (condensed, uppercase-friendly — strong, industrial feel)
- **Body font:** Source Sans 3 (clean, highly legible)
- **Font source:** Google Fonts — already imported in `src/root.tsx` with
  `display=swap`. Headings are often uppercase with slight letter-spacing.

---

## Logo

- **Files:** `public/logo.png` (dark, for light backgrounds) and
  `public/logo-white.png` (reverse, for dark backgrounds — header over hero, footer)
- **Usage:** Use the white variant on the dark hero and footer; the dark variant
  on white/`--surface` backgrounds (e.g. the scrolled header)
- **Minimum clear space:** Keep at least the height of the "M" of clear space on
  all sides

---

## Imagery

- **Style:** Real job-site photography — machinery, earthworks, roads, dams, and
  rural NSW landscapes. No stock imagery.
- **Hero image:** `public/hero.png` (full-bleed background; also the 1200×630
  social-share / OG image)
- **Gallery:** `public/work1.webp`–`work6.webp` — recent projects
- **Alt text tone:** Descriptive and keyword-rich for SEO (e.g. "MTB Earthmoving
  on the job"), never "image of" / "photo of". Decorative images use `alt=""`.
- **Optimisation:** Compress before committing — WebP for photos, optimised PNG
  for the hero and logos. Size to rendered dimensions to protect Core Web Vitals.

---
name: seo
description: Apply when building or auditing pages, templates, or components that need SEO. Enforces heading hierarchy, JSON-LD schema, meta tags, alt text, semantic markup, and the SEO.tsx component convention.
---

# SEO — React Pages & Templates

## Requirements Checklist

Every page or template must include:

- Correct heading hierarchy (`h1` → `h2` → `h3`, never skipped)
- JSON-LD `LocalBusiness` schema (see below)
- Meta tags: `title`, `description`, `og:title`, `og:description`, `og:image` at minimum
- Accessible `alt` text on all images — descriptive, not filename-based
- Semantic HTML throughout (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`)

## SEO.tsx Component Convention

Each page or template gets a dedicated `SEO.tsx` component that:

- Renders into `<head>` via a portal or framework-native mechanism (e.g. React Helmet, Vite plugin, or `<head>` injection)
- Contains all meta tags for that page
- Contains the full JSON-LD `<script type="application/ld+json">` block
- Is the single source of truth for that page's SEO — no scattered meta tags elsewhere

## JSON-LD LocalBusiness Schema

Minimum required fields:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "url": "https://example.com",
  "telephone": "+61-XXX-XXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Example St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "XXXX",
    "addressCountry": "AU"
  },
  "description": "...",
  "areaServed": "...",
  "priceRange": "$$"
}
```

Extend with `openingHours`, `hasOfferCatalog`, `aggregateRating`, or `sameAs` (social links) where data is available.

## Alt Text Rules

- All `<img>` elements must have `alt`
- Decorative images: `alt=""`
- Meaningful images: describe the content, not the filename
- Never use "image of" or "photo of" — describe what it shows

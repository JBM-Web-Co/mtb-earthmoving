# MTB Earthmoving

Marketing site for **MTB Earthmoving** — a rural earthmoving, road construction,
and civil works contractor based in Gunnedah, NSW. Single-page landing site with
a contact form that emails enquiries to the business.

Built and maintained by **JBM Web Co**.

---

## Tech stack

| Concern     | Choice                                                           |
| ----------- | ---------------------------------------------------------------- |
| Framework   | [React Router v8](https://reactrouter.com) (framework mode, SPA) |
| Build tool  | Vite 8                                                           |
| Language    | TypeScript (strict)                                              |
| Styling     | SCSS Modules + design tokens                                     |
| Animation   | framer-motion (reduced-motion aware)                             |
| Icons       | lucide-react                                                     |
| Contact API | Vercel Serverless Functions (`/api`)                             |
| Email       | [Resend](https://resend.com) + react-email                       |
| Validation  | Zod                                                              |
| Analytics   | `@vercel/analytics`                                              |
| Hosting     | Vercel                                                           |

Rendering is **client-side with prerendering** (`ssr: false`, `prerender: ['/']`
in `react-router.config.ts`), so the home page ships as static HTML for SEO and
hydrates on the client.

---

## Getting started

```bash
npm install
npm run vercel-dev   # runs `vercel dev` — serves the app + /api functions locally
```

> The app needs the Vercel CLI for `vercel dev` so the `/api` routes work. To run
> just the front end without the API, use `npx vite`.

### Environment variables

The contact API needs these set (locally via `.env` / `vercel env`, and in the
Vercel project settings for deploys):

| Variable         | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `RESEND_API_KEY` | Resend API key used to send the enquiry email |
| `FROM_EMAIL`     | Verified Resend sender address                |
| `TO_EMAIL`       | Where contact-form enquiries are delivered    |

If `FROM_EMAIL` / `TO_EMAIL` are missing the API logs an error and skips sending
(it does not crash).

---

## Scripts

| Script                | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `npm run vercel-dev`  | Local dev server (app + API) via `vercel dev`          |
| `npm run build`       | Typecheck → build emails → `react-router build`        |
| `npm run typecheck`   | `tsc --noEmit` for both the app and the `api/` project |
| `npm run lint`        | ESLint over the whole repo                             |
| `npm run style`       | Prettier `--write` across the repo                     |
| `npm run buildEmails` | Compile `api/_src/emails/*.tsx` to `.js` for the API   |

CI (`.github/workflows/checks.yml`) runs **Prettier**, **typecheck**, **lint**,
and a **lockfile-sync** check on every PR to `main`. Deploys are manual via the
`Deploy` workflow (`workflow_dispatch`).

---

## Project structure

```
src/
├── components/        # Section components (PascalCase) + their SCSS modules
│   ├── Hero.tsx       # Header, Hero, Benefits, Services, Gallery, Contact,
│   ├── ...            #   Footer, StickyCTA, and shared UI (Button/FormField/…)
│   └── *.module.scss
├── pages/
│   └── HomePage.tsx   # The route: SEO meta + JSON-LD, composes the sections
├── styles/
│   ├── _variables.scss   # Brand tokens + layout mixins
│   ├── _breakpoints.scss  # `bp` breakpoint mixins
│   └── global.scss        # :root custom properties + base styles
├── data.ts            # Single source of truth for business data (NAP, services…)
├── hooks.ts           # useScrollReveal
├── root.tsx           # Document shell, <head>, skip link, layout
└── routes.ts          # Route config

api/                   # Vercel serverless functions
├── contact.ts         # POST /api/contact — validate, rate-limit, email
├── ping.ts            # GET /api/ping — health check
└── _src/
    ├── notification-email.ts
    ├── emails/NotificationEmail.tsx
    └── utils/         # http-error, send-email, contact-schema, rate-limit, logger

public/                # Static assets (logos, hero, gallery photos)
```

All business content (name, phone, email, address, hours, services, service
areas, social links) lives in [`src/data.ts`](src/data.ts). Update it there and
it flows through the UI, the SEO meta, and the JSON-LD.

---

## Conventions

This repo follows the JBM landing-page template conventions:

- **Components**: PascalCase files, SCSS Modules imported as `s`, semantic HTML.
- **Local variables / parameters**: `snake_case`; exported functions/components
  stay `camelCase` / `PascalCase`.
- **Styling**: design tokens from `_variables.scss`, breakpoints via the `bp`
  mixins — no raw width `@media`, no hardcoded brand colours.
- **Motion**: every animation respects `prefers-reduced-motion`.
- **No `any`, no type assertions, no non-null assertions** (enforced by ESLint).

---

## Images

Source photography in `public/` is compressed before commit. Gallery and about
photos are WebP; the hero (also the social-share image) and logos are optimised
PNG. Keep new images sized to their rendered dimensions and re-compress before
committing — large originals will hurt Core Web Vitals.

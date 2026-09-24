# Personal Cybersecurity Portfolio

A production-quality, data-driven personal portfolio for a cybersecurity architect — built with Astro,
strict TypeScript, Tailwind CSS, and Astro content collections. Static output, deployable to Cloudflare
Pages, GitHub Pages, or Netlify with no server runtime required.

## Identity customization — read this first

**No real personal identity, employer, dates, or public URLs are baked into this codebase.** Every
placeholder lives in one file: [`src/config/site.ts`](./src/config/site.ts). Before deploying, update:

| Field                 | Purpose                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`, `role`        | Displayed in the nav, footer, résumé, and JSON-LD. Nav/footer initials are derived from `name` automatically (`getInitials()`) — there's no separate `initials` field to keep in sync                                                                                                                                                        |
| `url`                 | Canonical production URL. Single-sourced: `astro.config.mjs` imports it directly, and `src/pages/robots.txt.ts` generates its `Sitemap:` line from it at build time. `public/.well-known/security.txt` is a static file and can't import it — see the comment in that file                                                                   |
| `email`               | Contact email, used in `mailto:` links. Also update it by hand in `public/.well-known/security.txt`                                                                                                                                                                                                                                          |
| `social`              | GitHub/LinkedIn/email links — set `href: "#"` to hide a link safely. Every page that renders social links uses `getVisibleSocialLinks()`, which filters those out, so a "#" entry never renders a dead control                                                                                                                               |
| `resumePdfPath`       | Path to a résumé PDF under `public/`. Leave `null` until a real file exists — the `/resume` page gracefully shows "PDF not yet available"                                                                                                                                                                                                    |
| `contactFormEndpoint` | A same-origin absolute path (e.g. `"/api/contact"`), never a third-party URL — the deployed CSP sets `form-action 'self'`, so anything else would be blocked by the browser at submit time. `contact.astro` throws a build-time error if this is set to a non-same-origin value, and renders no form (direct-contact links only) when `null` |

Also review `public/.well-known/security.txt` (contact email, canonical URL, expiry date) before going live —
it's a static file per RFC 9116 and can't import `siteConfig`, so it isn't single-sourced like the rest of the
site's URLs; the file has a comment explaining why.

## Stack

- **[Astro 7](https://astro.build/)** — static site generation, islands architecture, content collections (Content Layer API)
- **TypeScript** in strict mode (`astro/tsconfigs/strict` + `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config, no `tailwind.config.js`)
- **`@lucide/astro`** for icons (GitHub/LinkedIn marks are small local inline SVGs — Lucide dropped brand icons)
- **MDX** support for content authoring, `@astrojs/sitemap` for sitemap generation

## Architecture

```
src/
  components/     Reusable Astro components (Nav, Footer, cards, Icon map, art panels, ...)
  config/         site.ts — the single source of truth for identity/placeholder values
  content/
    projects/     Markdown case studies — one file per project (Content Layer API, src/content.config.ts)
    writing/      Markdown articles
  content.config.ts   Zod schemas for the projects and writing collections
  data/           Typed data files: technologies, certifications, metrics, lab stats, life categories, about copy
  layouts/        BaseLayout (global shell) and DocLayout (project case-study layout with sticky TOC)
  lib/            Small utilities (reading time calculation, date formatting)
  pages/          File-based routes, including dynamic [...id].astro routes for projects/writing
                  robots.txt.ts — generated endpoint (not a static file) so it reads siteConfig.url directly
  styles/         global.css — Tailwind entry point, theme tokens, base/component layers
public/           Static assets: favicon, security.txt, _headers, theme-init.js
```

### Content collections vs. data files

- **Projects and writing** are Markdown content collections (`src/content/projects`, `src/content/writing`).
  Adding a new `.md` file automatically creates a new route — no code changes needed.
- **Technologies, certifications, metrics, lab stats, and life categories** are typed TypeScript data files
  under `src/data/`, not content collections, per the original spec — they're structured configuration data
  rather than long-form content.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build & verification

```bash
npm run lint        # ESLint (flat config, typescript-eslint + eslint-plugin-astro)
npm run format:check # Prettier check (prettier-plugin-astro)
npm run typecheck   # astro check — validates .astro files, TS, and content collection schemas
npm run build       # astro build — static output to dist/
npm run preview     # Preview the production build locally
```

## Deployment

The build output (`dist/`) is a plain static site — any static host works. Configs are included for:

- **Cloudflare Pages** — `public/_headers` is copied to `dist/_headers` automatically by the build and
  applies the CSP/security headers Cloudflare Pages reads natively. Build command: `npm run build`,
  output directory: `dist`.
- **Netlify** — `netlify.toml` at the repo root defines the build command, publish directory, and the
  same security headers via Netlify's `[[headers]]` config.
- **GitHub Pages** — `.github/workflows/deploy-pages.yml` builds and deploys via the official
  `actions/deploy-pages` action. It's gated on CI, not on push directly: it triggers on `workflow_run` after
  the `CI` workflow (lint, format check, typecheck, build, `npm audit`, Trivy fs scan, secret scanning)
  finishes on `main`, and only proceeds if that run succeeded — plus it independently re-runs lint/typecheck/
  build itself before publishing, so a manual `workflow_dispatch` run can't silently skip the gates either.
  **Enable GitHub Pages with source "GitHub Actions"** in repo Settings → Pages before this workflow will
  successfully publish; until then it will still run after every CI pass on `main` and fail at the deploy
  step, which is expected for a repo that hasn't opted in to Pages hosting yet — disable or delete the
  workflow if you don't plan to use Pages.
  **Important limitation:** GitHub Pages cannot serve custom HTTP response headers at all — there is no
  GitHub Pages equivalent of `_headers` or `netlify.toml`. None of the CSP/security headers described below
  apply to a GitHub Pages deployment. If those headers matter for your threat model, deploy via Cloudflare
  Pages or Netlify instead (or put GitHub Pages behind a CDN/proxy that can inject them).

The canonical production URL is single-sourced in `siteConfig.url` (`src/config/site.ts`) — update it there
only. `astro.config.mjs` imports it directly for `site` (sitemap, canonical/OG tag base), and
`src/pages/robots.txt.ts` generates its `Sitemap:` line from the same value at build time. The one exception
is `public/.well-known/security.txt`, a static file per RFC 9116 that can't import TypeScript — update its
`Canonical:` and `Contact:` fields by hand (see the comment in that file).

## Content management

### Adding a project

Create a new Markdown file in `src/content/projects/`. The frontmatter schema is enforced by
`src/content.config.ts`:

```md
---
title: "Project Title"
description: "One- or two-sentence summary used on cards and in meta tags."
date: 2025-01-01
status: completed # "completed" | "in-progress" | "concept"
featured: true # shows on the homepage
visual: generic # "azure-policy" | "devsecops-pipeline" | "ai-assistant" | "homelab" | "generic"
tags: ["Cloud", "Automation"]
technologies: ["Azure", "PowerShell"]
sourceUrl: "https://example.com" # optional — omit entirely if there's no public source
demoUrl: "https://example.com" # optional
order: 5 # sort order among featured/listed projects
---

## Overview

...

## Problem

...

## Objectives

...

## Architecture

...

## Technology Stack

...

## Implementation

...

## Security Considerations

...

## Challenges

...

## Results

...

## What I Learned

...

## Future Improvements

...

## Source Code

Source available on request.
```

The case-study page (`src/pages/projects/[...id].astro`) renders these `##` headings into a sticky
left-hand table of contents on desktop — keep the section headings above (or a relevant subset) so the
TOC stays meaningful. If a project has no public source, write "Source available on request" in the
Source Code section and omit `sourceUrl` from the frontmatter — never invent a repository URL.

### Adding a writing article

Create a Markdown file in `src/content/writing/`. Reading time is calculated automatically from word
count (`src/lib/reading-time.ts`) unless you set `readingTimeMinutes` explicitly in frontmatter. Set
`draft: true` to keep an article out of listings and static generation until it's ready.

### Changing proficiency levels

Technology proficiency lives in `src/data/technologies.ts`. Levels are a closed union —
`"Expert" | "Advanced" | "Proficient" | "Working Knowledge" | "Learning"` — mapped to a 1–5 segment count
in `LEVEL_SEGMENTS`. The UI only ever renders the label and filled/unfilled segments, never a percentage,
by design.

### Lab stats, certifications, and life categories

Each is a small typed array in `src/data/`. Add an entry to the array; the corresponding page picks it up
automatically. Certification cards support a `placeholder: true` flag for "add your next credential here"
slots (see the last entry in `src/data/certifications.ts`).

## Security

- **CSP** — `public/_headers` (Cloudflare/Netlify) and `netlify.toml` set a strict `default-src 'self'`
  policy. Scripts are either bundled by Astro (served from `/_astro/`, same-origin) or the one hand-written
  inline script needed before first paint (`public/theme-init.js`, theme flash prevention) — loaded as an
  external same-origin file specifically so no `script-src 'unsafe-inline'` is needed. `style-src` keeps
  `'unsafe-inline'` as a practical concession, since static site generators can emit inline styles that
  aren't worth hash-pinning for a personal site; tighten it further if you introduce a nonce-capable host.
  **This CSP only applies on Cloudflare Pages and Netlify** — GitHub Pages cannot serve custom headers at
  all, so a GitHub Pages deployment ships with none of these protections at the HTTP layer.
- **`form-action 'self'` is enforced, not just documented.** `contactFormEndpoint` must be a same-origin
  absolute path; `src/pages/contact.astro` throws a build error if it's set to anything else (a third-party
  URL, a protocol-relative URL, etc.), so a misconfiguration fails the build instead of shipping a form the
  CSP would silently block at submit time.
- **Caching is scoped to what's actually immutable.** `/_astro/*` assets have content-hashed filenames, so
  `Cache-Control: immutable` is safe there. `theme-init.js` has a fixed filename and can change between
  deploys, so it uses a short `max-age=300, must-revalidate` instead — an immutable cache on a non-hashed
  file would let a stale, broken version stick around in visitors' caches for a year.
- **No third-party trackers or inline third-party scripts** — there is no analytics script wired up. If you
  add one, update the CSP accordingly rather than loosening it broadly.
- **No secrets in the repo.** `contactFormEndpoint` and `resumePdfPath` are the only "external resource"
  config points, and both default to `null`/disabled.
- **`.well-known/security.txt`** is included per RFC 9116 — update the contact and expiry date for your
  deployment (see "Deployment" above for why this one file can't be generated from `siteConfig`).
- **`/404` is `noindex, nofollow`** and omits the canonical link (`SEO.astro`'s `noindex` prop) — the same
  content is intentionally reachable at any bad URL, so it shouldn't get its own indexed/canonical identity.
- **Twitter card is `summary`, not `summary_large_image`** — the latter without a real 1200×630 social image
  renders as a broken/empty card in link previews. Switch to `summary_large_image` only after adding an
  actual OG image (and wire up `og:image`/`twitter:image` in `SEO.astro` at the same time).
- **CI security gates** (`.github/workflows/ci.yml`): `npm audit`, a Trivy filesystem scan, Gitleaks secret
  scanning, and a non-blocking Semgrep SAST pass (non-blocking because Semgrep's rule registry can be
  flaky to fetch in CI; treat its findings as advisory, not a merge gate). The GitHub Pages deploy workflow
  is gated on this CI workflow succeeding (see "Deployment"), so a broken or insecure build can't publish.

## Accessibility

Semantic landmarks (`header`, `nav`, `main`, `footer`), a skip-to-content link, visible focus rings via
`:focus-visible`, `prefers-reduced-motion` support in `src/styles/global.css`, and alt text / `aria-hidden`
applied deliberately on every icon and decorative SVG.

- **Card "stretched link" pattern** (`ProjectCard`, `WritingCard`) keeps a single focusable/clickable target
  per card — the title link, expanded to fill the whole card via `after:absolute after:inset-0` — instead of
  a redundant second tab stop on the card's image. Focus rings are never suppressed (`focus-visible:outline-none`
  was removed from both); the visible ring sits on the title text, which is standard for this pattern.
- **Mobile nav** (`Nav.astro`) toggles between a menu/close icon and an accurate `aria-label`
  ("Open navigation menu" / "Close navigation menu") as it opens and closes, closes on `Escape` (returning
  focus to the toggle button), and closes on an outside click.
- **Fonts are honest system stacks** (`ui-sans-serif`/`ui-monospace`, no `"Inter"`/`"JetBrains Mono"` family
  names) since no font files are shipped — naming a family that isn't loaded just falls back silently, which
  is misleading to read in the CSS later. Swap in a real self-hosted variable font if you want a custom
  typeface; keep the font stack honest either way.

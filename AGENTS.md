# AGENTS.md

Guidance for AI coding agents working on this repository.

## Project Overview

Personal portfolio of Sebastián Idrobo Avirama (https://sidrobo.com). Static site,
bilingual (English + Spanish), no backend. Showcases projects, experience, and a
contact page.

## Tech Stack

- **Astro 6** (static output, file-based routing, content collections)
- **Tailwind CSS 4** via `@tailwindcss/vite` (CSS-first config in `src/styles/global.css`)
- **TypeScript** (strict, `astro/tsconfigs/strict`)
- **ClientRouter** (Astro View Transitions) — all pages are client-navigated
- **`@astrojs/sitemap`** with i18n hreflang alternates
- **No UI framework** — plain `.astro` components with inline `<script>` blocks
- Node >= 22.12.0

## Commands

| Command                           | Purpose                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`                     | Dev server                                                                           |
| `npm run build`                   | Typecheck (`astro check`) + production build → `dist/`                               |
| `npm run preview`                 | Serve the production build locally                                                   |
| `npm run check`                   | Typecheck only                                                                       |
| `npm run lint`                    | ESLint (with `eslint-plugin-astro`)                                                  |
| `npm run format` / `format:check` | Prettier write / check (has `prettier-plugin-astro` + `prettier-plugin-tailwindcss`) |

Pre-commit hook (husky + lint-staged) runs `prettier --write` and `eslint --fix`
on staged files; pre-push runs `npm run check`. **Always verify changes with
`npm run lint && npm run check && npm run build`** before considering work done.

> **Husky setup (manual, once per clone):** `.npmrc` sets `ignore-scripts=true`,
> so `npm install` never runs the `prepare` script and git hooks stay unwired
> (`core.hooksPath` unset, `.husky/_` missing). After cloning, run
> `npm run prepare` to enable them, then confirm with
> `git config core.hooksPath` (should print `.husky/_`).

## Directory Structure

```
src/
  pages/               # Route files — THIN WRAPPERS ONLY (≤5 lines)
    es/                # Spanish routes (mirror of root)
  components/
    pages/             # Shared page bodies (HomePage, ProjectsPage, …)
    *.astro            # Reusable components
  content/
    experience/{en,es} # Experience entries per locale (Markdown frontmatter)
    projects/{en,es}   # Project entries per locale
  i18n/                # ui.ts (string dictionary), utils.ts (useTranslations)
  layouts/Layout.astro # Single layout: <html>, meta, header row, main
  styles/global.css    # Tailwind import + theme palettes + [data-theme] vars
  types/index.ts       # Theme, BlobType, CardPosition, PathType unions
  assets/              # Icons, images (processed by astro:assets), vectors
public/                # Static files served as-is (e.g. videos/)
```

Path alias: `@/*` → `./src/*` (use it for imports).

## Key Conventions

### 1. No external JS dependencies

Interactivity lives in inline `<script>` blocks inside components. Do not add
client-side libraries.

### 2. View Transitions–safe scripts (required)

The ClientRouter swaps pages without reloads, so every component script must:

- Init on `astro:page-load` (fires on first load AND every navigation).
- Guard against double-init with a flag (e.g. `root.dataset.fooInit = "true"`).
- Register cleanup on `astro:before-swap` (disconnect observers, clear
  intervals) via a `cleanupFns` array. See `Carousel.astro` / `ProjectCard.astro`.

### 3. Styling: Tailwind first, scoped CSS for coupled values

- Prefer Tailwind utilities. Use a component `<style>` block only when values
  are mathematically coupled (e.g. Carousel's peek margin derived from
  `--peek-x`/`--peek-scale`) or for JS-toggled state classes (`.is-active`).
- **Theme colors always come from `--theme-*` variables** (`--theme-darkest`,
  `--theme-default`, `--theme-light`, `--theme-lightest`), set by `data-theme`
  on `<html>` (green/purple/amber, defined in `global.css`). Use Tailwind's
  arbitrary-value syntax: `bg-(--theme-default)`. Never hardcode raw colors
  (e.g. `text-gray-600`) — they break per-page theming.

### 4. i18n architecture (do not bypass)

- Config: `astro.config.mjs` → `i18n: { locales: ["en","es"], defaultLocale:
"en", routing: { prefixDefaultLocale: false } }` — English at root, Spanish
  at `/es/`. The **sitemap integration has its own separate `i18n` option**;
  both must be updated when adding a locale.
- **UI strings**: all hardcoded text lives in `src/i18n/ui.ts` (flat
  dot-notation keys, `{placeholder}` tokens for interpolation). Components get
  a `t()` function from `useTranslations(lang)` (`src/i18n/utils.ts`). Never
  hardcode user-facing text in components.
- **Pages**: markup exists exactly once in `src/components/pages/*.astro`,
  which takes a `lang: Lang` prop. Route files are 3-line wrappers:
  `<HomePage lang="en" />` (root) / `<HomePage lang="es" />` (`es/`). This is
  deliberate — duplicated markup across locales is not acceptable.
- **Content collections**: entries live in `en/` and `es/` subfolders; entry
  ids carry the locale (`en/adagia`). Pages filter with
  `getCollection("projects", ({ id }) => id.startsWith(`${lang}/`))`. Every
  content change must be mirrored in both locales.
- **Localized URLs**: use `getRelativeLocaleUrl(lang, path)` from `astro:i18n`.
  Note it emits **trailing slashes** — normalize (`.replace(/\/$/, "")`) when
  comparing against `Astro.url.pathname` (see `Navbar.astro`'s `localizePath`).
- `Astro.currentLocale` → coerce with `toLang()` before use.

### 5. `transition:name` uniqueness

Elements with `transition:name` must be unique per page. If a component renders
more than once (e.g. `LanguageSwitcher` appears in header AND footer), accept
an `instance` prop and suffix the names (`lang-indicator-header/footer`).

### 6. Accessibility is a hard requirement

- Screen-reader announcements for dynamic content (see Carousel's visually-
  hidden `aria-live` announcer — driven by a localized template passed to the
  client script via `data-announce-template`).
- Keyboard navigation + visible focus styles (`focus-visible:outline-2 …`) on
  all interactive elements.
- Honor `prefers-reduced-motion` (Carousel autoplay disables itself).
- Respect contrast against theme backgrounds; translate ALL aria-labels via
  the ui dictionary.

### 7. Assets

- Content images: referenced from Markdown frontmatter with **relative paths**
  and validated via the schema's `image()` helper (processed/optimized by
  `astro:assets`). If you move a Markdown file a level deeper, add one `../`.
- Videos and other large media: `public/` (predictable URLs, no hashing) with
  `preload="none"` + JS-triggered `.play()` for lazy loading.
- SVGs imported as raw strings: `import icon from "@/assets/icons/x.svg?raw"`.

## Known Gotchas (do not regress)

- **Firefox flexbox bug** (`ProjectCard.astro`): both flex children need
  `min-w-0`, otherwise the `aspect-video` child breaks the layout. Comment in
  file; do not remove.
- **Navbar renders two root divs** (desktop + mobile). Any grid/flex parent
  must wrap `<Navbar />` in a single div or placement breaks (see header row in
  `Layout.astro`).
- **Header row grid** (`Layout.astro`): `grid-cols-[1fr_minmax(0,20rem)_1fr]
md:grid-cols-[1fr_minmax(0,36rem)_1fr]` — the definite center track is what
  lets the Navbar's internal `w-full max-w-*` resolve. An `auto` track
  shrink-wraps and crams the links.
- **Layout title**: omit the `title` prop on the home page (bare site name);
  other pages pass the localized nav label.
- **Contact form** posts to formsubmit.co; keep the `action` URL as-is.

## Adding Things

**New project/experience entry**: create BOTH `en/name.md` and `es/name.md`
(same filename), mirror the frontmatter schema (`src/content.config.ts`),
translate `title`/`description`/`imageAlt`, keep `icons`/`url`/`demoVideo`/
`date` identical. Verify `npm run build`.

**New page**: create `src/components/pages/FooPage.astro` (markup + `lang`
prop, strings via `t()`), wrappers `src/pages/foo.astro` + `src/pages/es/foo.astro`,
add nav keys to `ui.ts`, register the route in `Navbar.astro`'s `navLinks`.

**New locale**: add to `i18n.locales` AND `sitemap({ i18n.locales })` in
`astro.config.mjs`; add dictionary to `ui.ts`; create `src/pages/<locale>/`
wrappers; create `src/content/*/< locale>/` entries; bump LanguageSwitcher's
`w-24` width if labels grow.

## Commit Style

Conventional commits as seen in history: `feat(scope): …`, `fix(scope): …`,
`refactor(scope): …`, `chore(scope): …`. English messages.

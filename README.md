# Pamela Basnillo — portfolio

Portfolio site for Pamela Basnillo, a creative marketing and virtual support
strategist based in Davao City. Built as a Next.js replacement for the original
Canva site.

## Stack

Next.js 16 (App Router, static export of a single route) · Tailwind CSS v4 ·
TypeScript. No UI dependencies — the components here are the whole system.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## How it's put together

```
src/
  app/
    globals.css     design tokens + the base/component layers
    layout.tsx      fonts, metadata, skip link
    page.tsx        section order + Person structured data
  components/       one file per section, plus Lightbox and Reveal
  lib/content.ts    every string, image path and alt text on the site
public/             optimised WebP assets, grouped by role
Assets/             the original exports pulled from the Canva site
```

**Editing content.** Copy, service lists, tool logos and work collections all
live in `src/lib/content.ts`. Adding an image to a collection means dropping the
file in `public/work/` and adding one entry with its real pixel dimensions and a
written alt description — the galleries and the lightbox both read from there.

**Design tokens** are CSS custom properties in the `@theme` block at the top of
`globals.css`: six colours, three type roles, two easing curves and a z-index
scale. Nothing in the components hardcodes a hex value.

## Design notes

- **Palette** comes from Pamela's own material — the cherry blossoms behind her
  hero portrait, the coral sweater she's wearing in it, and the ink her Canva
  headings were already set in. Pastel fields carry the page; coral is the only
  saturated colour and stays scarce. Every text/background pair clears WCAG AA.
- **Type** is Fraunces for display (with its `SOFT` and `WONK` axes turned up,
  which is what gives it a hand), Hanken Grotesk for body, Caveat for the
  annotation layer.
- **Surfaces are drawn, not floated** — 1px ink outlines, no shadows, no glass.
- **Motion** is one orchestrated hero entrance plus a staggered reveal on the
  gallery grids. Reveals are additive: server output carries no hidden state, so
  the page renders complete without JavaScript, and `prefers-reduced-motion`
  turns all of it off.

## Assets

`public/` holds WebP conversions of the original Canva exports (28 MB → 2.6 MB),
with transparent padding trimmed so logos and icons sit at consistent optical
size. `Assets/` keeps the untouched originals.

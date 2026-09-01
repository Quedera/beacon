# QUEDERA BEACON — Pre-Brief Shell

> Brand-locked skeleton for the **BEACON** product (Executive Dashboards & Insights).
> Forked from `~/.openclaw/workspace/quedera-scaffold-template/` on 2026-08-28.
> Pre-brief shell — screens, copy and the canonical BEACON mark drop in when the BEACON brief lands.

## What's in here

- **Brand infrastructure pre-wired** — `tailwind.config.ts` spreads the
  QUEDERA Tailwind preset; `app/globals.css` `@import`s the brand tokens
  CSS. Nothing off-palette can sneak in.
- **Generic components** — `ProductMark`, `Header`, `Footer` accept a
  product name and render the canonical QUEDERA + product lockup.
- **Two placeholder routes** — `/` (generic landing) and `/brand-kit`
  (palette reference, also useful as a smoke-test for colour fidelity).
- **Single-point config** — change `product.config.ts` and the whole
  scaffold repaints to the new product.

## For a new product (PULSE, ATLAS, BEACON, DUET, …)

```bash
cp -r ~/.openclaw/workspace/quedera-scaffold-template/ ~/.openclaw/workspace/<product-slug>/
cd ~/.openclaw/workspace/<product-slug>/
# Edit product.config.ts — set name, tagline, pitch.
# Replace the placeholder swatch in components/ProductMark.tsx with the
#   real product mark SVG (see branding/quedera-product-suite-logos.jpg).
npm install
npm run dev
```

The build won't ship anything off-palette because:

1. `tailwind.config.ts` whitelists the seven `quedera-*` tokens via the
   preset; nothing else is registered.
2. The brand tokens CSS declares the seven RGB channels as CSS variables;
   Tailwind reads them via `rgb(... / <alpha-value>)` so opacity modifiers
   compose natively.
3. The build is wired to fail-loud on any non-canonical hex (you'll see
   it the moment someone tries to drop in `#fff` or `text-gray-500`).

## Verification

```bash
# Audit — should return zero off-palette classes and zero non-canonical
# hex codes (excluding the seven canonical hex values).
grep -rEn "(bg|text|border|ring|placeholder|fill|stroke|from|to|via)-(white|black|slate|gray|zinc|neutral|stone|red|orange|yellow|green|emerald|blue|indigo|violet|purple|pink|cyan|sky|amber|lime|fuchsia|rose|teal)-[0-9]+" app components
grep -rEn "#[0-9a-fA-F]{3,6}" app components | grep -ivE "#(0D182A|1E3A8A|06B6D4|7C3AED|F59E0B|10B981|F2F4F7)"
```

Both greps should return zero. If either returns matches, the offending
files contain off-palette colours and must be fixed before shipping.

## Canonical palette source

| File | Role |
|---|---|
| `~/.openclaw/workspace/branding/quedera-palette.json` | Authoritative metadata + per-product mapping |
| `~/.openclaw/workspace/branding/quedera-tokens.css` | CSS variables (this scaffold `@import`s it) |
| `~/.openclaw/workspace/branding/quedera-tailwind-preset.cjs` | Tailwind theme preset (this scaffold spreads it) |
| `~/.openclaw/workspace/branding/README.md` | Kit overview + pre-ship checklist |

## Rule

**Palette codes only.** No off-palette colours anywhere in QUEDERA work.
— MacWood, 2026-08-26 21:10 BST, #branding.
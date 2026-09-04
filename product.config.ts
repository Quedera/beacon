/**
 * QUEDERA product configuration.
 *
 * Single file a product fork needs to edit when initialising from the
 * template. Change `name` to the product you're building and update
 * `tagline` + `pitch` to match.
 *
 * BEACON — v1.0 brief reframes this from "Executive Dashboards & Insights"
 * to "QUEDERA Control Centre" — the central customer-facing hub for the
 * complete QUEDERA portfolio. See DESIGN.md and architecture/brand-hierarchy.md.
 *
 * See ~/.openclaw/workspace/branding/quedera-palette.json for the canonical
 * palette and per-product colour assignments.
 */

import type { ProductName } from "./lib/brand";

export const PRODUCT_CONFIG = {
  name: "BEACON" as ProductName,
  tagline: "QUEDERA Control Centre",
  pitch:
    "Central customer-facing hub for the QUEDERA portfolio. Discover products, manage subscriptions, access reporting — one place.",
} as const;

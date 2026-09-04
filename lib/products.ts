/**
 * BEACON — product catalogue.
 *
 * Source-of-truth for the four QUEDERA products surfaced by Beacon
 * (per PRD §1). In production this comes from the QUEDERA platform
 * service; here it's a static catalogue so Beacon can render before
 * that service exists (PRD §13, Risk #2 / Risk #6).
 *
 * Adding a fifth product is a one-row addition here plus a new entry
 * in QUEDERA_PRODUCTS palette in lib/brand.ts. SENTINEL is a separate
 * QUEDERA product family and is NOT part of the BEACON hub.
 */

import type { HubProductSlug, Product, ProductCapability } from "./types";

const PULSE_CAPS: ProductCapability[] = [
  { name: "Maturity Assessment", description: "CMMI-based scoring across ITSM process areas." },
  { name: "Continual Improvement", description: "Track improvement actions and outcomes over time." },
  { name: "Benchmarking", description: "Compare maturity against sector peers (anonymised)." },
];

const DUET_CAPS: ProductCapability[] = [
  { name: "Service Transition Plans", description: "Structured plans for new and changed services." },
  { name: "RACI & Handover", description: "Roles, responsibilities, and acceptance gates." },
  { name: "Transition Reporting", description: "Status, risks, and milestones across the transition lifecycle." },
];

const ATLAS_CAPS: ProductCapability[] = [
  { name: "CMDB Discovery", description: "Automated discovery of configuration items across estates." },
  { name: "Data Quality Scoring", description: "Confidence and freshness ratings on CMDB records." },
  { name: "SaCM Validation", description: "Service Asset & Configuration Management audit support." },
];

const BEACON_CAPS: ProductCapability[] = [
  { name: "Executive Dashboards", description: "Cross-product KPIs, trends, and risks in one view." },
  { name: "Portfolio Reporting", description: "Central library of reports, dashboards, and scorecards." },
  { name: "Subscription Centre", description: "Plan, entitlement, and renewal management per customer." },
  { name: "Access Management", description: "User and role administration across the QUEDERA portfolio." },
];

export const PRODUCTS: Record<HubProductSlug, Product> = {
  PULSE: {
    slug: "PULSE",
    name: "QUEDERA Pulse",
    tagline: "ITSM Maturity Assessment",
    description:
      "Assess, score, and improve ITSM maturity across process areas with continual benchmarking.",
    capabilities: PULSE_CAPS,
    deepLink: "/products/PULSE",
  },
  DUET: {
    slug: "DUET",
    name: "QUEDERA Duet",
    tagline: "Service Transition",
    description:
      "Structured plans, RACI, and handover gates for new and changed services.",
    capabilities: DUET_CAPS,
    deepLink: "/products/DUET",
  },
  ATLAS: {
    slug: "ATLAS",
    name: "QUEDERA Atlas",
    tagline: "SaCM Discovery & CMDB Validation",
    description:
      "Discover configuration items, score data quality, and validate against SaCM standards.",
    capabilities: ATLAS_CAPS,
    deepLink: "/products/ATLAS",
  },
  BEACON: {
    slug: "BEACON",
    name: "QUEDERA Beacon",
    tagline: "Executive Dashboards & Insights",
    description:
      "Cross-product executive view — KPIs, trends, risks, and recommended actions across the QUEDERA portfolio.",
    capabilities: BEACON_CAPS,
    deepLink: "/products/BEACON",
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS) as HubProductSlug[];

export function getProduct(slug: string): Product | undefined {
  return (PRODUCTS as Record<string, Product>)[slug];
}

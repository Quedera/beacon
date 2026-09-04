/**
 * BEACON — seed data.
 *
 * Mock data for the Phase 1 Foundation build. Every entity here will
 * eventually come from an authoritative service per PRD §13. Until those
 * services exist (see risks/register.md Tier 1 risks), this seed data
 * drives the entire UI.
 *
 * What's covered:
 * - 2 customers (Acme Corp active, BlueArc Insurance secondary)
 * - 5 users across both customers, all 5 roles represented
 * - Subscriptions across all 5 status enum values
 * - 10 reports / dashboards / scorecards (3 per product)
 * - 8 audit events spanning access, subscription, and content actions
 * - 4 favourites, 6 recently-viewed items, 3 notifications
 *
 * See DESIGN.md "Mock data spec" for the design rationale.
 */

import type {
  AuditEvent,
  Customer,
  Favourite,
  Notification,
  ProductStatusView,
  RecentlyViewed,
  ReportItem,
  Subscription,
  User,
} from "./types";
import { PRODUCTS } from "./products";

// ============================================================================
// Customers
// ============================================================================

export const CUSTOMERS: Customer[] = [
  {
    id: "cust_acme",
    name: "Acme Corporation",
    industry: "Manufacturing",
    region: "UK & Ireland",
    accent: "navy",
  },
  {
    id: "cust_bluearc",
    name: "BlueArc Insurance",
    industry: "Insurance",
    region: "UK",
    accent: "deep-blue",
  },
];

// ============================================================================
// Users
// ============================================================================

export const USERS: User[] = [
  // Acme
  {
    id: "user_craig",
    customerId: "cust_acme",
    name: "Craig Norton",
    email: "craig.norton@acme.example",
    role: "customer_admin",
  },
  {
    id: "user_exec_acme",
    customerId: "cust_acme",
    name: "Helena Marsh",
    email: "helena.marsh@acme.example",
    role: "executive",
  },
  {
    id: "user_svc_acme",
    customerId: "cust_acme",
    name: "Devon Park",
    email: "devon.park@acme.example",
    role: "service_manager",
  },
  {
    id: "user_pulse_acme",
    customerId: "cust_acme",
    name: "Priya Shah",
    email: "priya.shah@acme.example",
    role: "platform_owner",
    productScope: "PULSE",
  },
  // BlueArc
  {
    id: "user_bluearc_admin",
    customerId: "cust_bluearc",
    name: "Marcus Webb",
    email: "marcus.webb@bluearc.example",
    role: "customer_admin",
  },
];

// ============================================================================
// Subscriptions
// ============================================================================

export const SUBSCRIPTIONS: Subscription[] = [
  // Acme — Pulse (Active, growth)
  {
    id: "sub_acme_pulse",
    customerId: "cust_acme",
    productSlug: "PULSE",
    plan: "Pulse Growth",
    tier: "growth",
    status: "active",
    startDate: "2025-11-01",
    endDate: "2026-10-31",
    renewalDate: "2026-10-31",
    accountOwner: "Craig Norton",
    entitlements: [
      { type: "modules", label: "Maturity modules", used: 6, limit: 8 },
      { type: "seats", label: "Assessment seats", used: 14, limit: 25 },
      { type: "usage", label: "Assessments / quarter", used: 3, limit: 6 },
    ],
  },
  // Acme — Duet (Trial)
  {
    id: "sub_acme_duet",
    customerId: "cust_acme",
    productSlug: "DUET",
    plan: "Duet Trial",
    tier: "starter",
    status: "trial",
    startDate: "2026-08-15",
    endDate: "2026-10-15",
    accountOwner: "Devon Park",
    entitlements: [
      { type: "modules", label: "Transition plans", used: 2, limit: 5 },
      { type: "seats", label: "Editor seats", used: 4, limit: 5 },
    ],
  },
  // Acme — Beacon (Active, enterprise — they own the hub)
  {
    id: "sub_acme_beacon",
    customerId: "cust_acme",
    productSlug: "BEACON",
    plan: "Beacon Enterprise",
    tier: "enterprise",
    status: "active",
    startDate: "2026-01-12",
    endDate: "2027-01-11",
    renewalDate: "2027-01-11",
    accountOwner: "Craig Norton",
    entitlements: [
      { type: "modules", label: "Hub modules", used: 4, limit: 6 },
      { type: "seats", label: "Customer admin seats", used: 1, limit: 3 },
      { type: "usage", label: "Audit retention (months)", used: 12, limit: 24 },
    ],
  },
  // Acme — Atlas (Not subscribed)
  // (no subscription record — render as not_subscribed in UI)

  // BlueArc — Atlas (Expiring within 30 days)
  {
    id: "sub_bluearc_atlas",
    customerId: "cust_bluearc",
    productSlug: "ATLAS",
    plan: "Atlas Growth",
    tier: "growth",
    status: "expiring",
    startDate: "2025-09-30",
    endDate: "2025-09-30",
    renewalDate: "2026-09-28",
    accountOwner: "Marcus Webb",
    entitlements: [
      { type: "environments", label: "Discovery environments", used: 3, limit: 3 },
      { type: "seats", label: "Reviewer seats", used: 9, limit: 10 },
    ],
  },
  // BlueArc — Pulse (Suspended — billing dispute)
  {
    id: "sub_bluearc_pulse",
    customerId: "cust_bluearc",
    productSlug: "PULSE",
    plan: "Pulse Starter",
    tier: "starter",
    status: "suspended",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    accountOwner: "Marcus Webb",
    entitlements: [
      { type: "modules", label: "Maturity modules", used: 2, limit: 4 },
      { type: "seats", label: "Assessment seats", used: 5, limit: 8 },
    ],
  },
  // BlueArc — Beacon (Active, just rolled out)
  {
    id: "sub_bluearc_beacon",
    customerId: "cust_bluearc",
    productSlug: "BEACON",
    plan: "Beacon Starter",
    tier: "starter",
    status: "active",
    startDate: "2026-08-01",
    endDate: "2027-07-31",
    renewalDate: "2027-07-31",
    accountOwner: "Marcus Webb",
    entitlements: [
      { type: "modules", label: "Hub modules", used: 3, limit: 4 },
      { type: "seats", label: "Customer admin seats", used: 1, limit: 1 },
    ],
  },
];

// ============================================================================
// Reports / Dashboards / Scorecards
// ============================================================================

export const REPORTS: ReportItem[] = [
  // Pulse
  {
    id: "rpt_pulse_maturity",
    title: "ITSM Maturity Scorecard",
    description: "Current maturity scores across 8 ITSM process areas, with quarter-over-quarter trend.",
    type: "scorecard",
    productSlug: "PULSE",
    owner: "Priya Shah",
    lastUpdated: "2026-08-30",
    tags: ["ITSM", "Maturity", "Quarterly"],
  },
  {
    id: "rpt_pulse_improvement",
    title: "Improvement Action Tracker",
    description: "Open improvement actions, owners, and target dates across all process areas.",
    type: "report",
    productSlug: "PULSE",
    owner: "Priya Shah",
    lastUpdated: "2026-09-01",
    tags: ["Improvement", "Actions"],
  },
  {
    id: "rpt_pulse_benchmark",
    title: "Sector Benchmark — Manufacturing",
    description: "Anonymised comparison against 47 manufacturing-sector peers.",
    type: "report",
    productSlug: "PULSE",
    owner: "Priya Shah",
    lastUpdated: "2026-08-12",
    tags: ["Benchmark"],
  },

  // Duet
  {
    id: "rpt_duet_status",
    title: "Service Transition Status",
    description: "Active transitions, milestones, and risk flags across the portfolio.",
    type: "dashboard",
    productSlug: "DUET",
    owner: "Devon Park",
    lastUpdated: "2026-09-03",
    tags: ["Transition", "Status"],
  },
  {
    id: "rpt_duet_raci",
    title: "RACI & Handover Audit",
    description: "Audit of role coverage and handover gates for in-flight transitions.",
    type: "report",
    productSlug: "DUET",
    owner: "Devon Park",
    lastUpdated: "2026-08-25",
    tags: ["RACI", "Audit"],
  },

  // Atlas
  {
    id: "rpt_atlas_discovery",
    title: "CMDB Discovery Coverage",
    description: "Discovered vs. expected CI coverage across connected environments.",
    type: "dashboard",
    productSlug: "ATLAS",
    owner: "Helena Marsh",
    lastUpdated: "2026-09-02",
    tags: ["CMDB", "Coverage"],
  },
  {
    id: "rpt_atlas_quality",
    title: "Data Quality Scorecard",
    description: "Confidence, completeness, and freshness ratings on CMDB records.",
    type: "scorecard",
    productSlug: "ATLAS",
    owner: "Helena Marsh",
    lastUpdated: "2026-08-28",
    tags: ["Data Quality"],
  },

  // Beacon (cross-product)
  {
    id: "rpt_beacon_portfolio",
    title: "QUEDERA Portfolio Health",
    description: "Cross-product KPIs, renewal pipeline, and action centre roll-up.",
    type: "insight",
    productSlug: "BEACON",
    owner: "Craig Norton",
    lastUpdated: "2026-09-04",
    tags: ["Portfolio", "Executive"],
  },
  {
    id: "rpt_beacon_subs",
    title: "Subscription Renewal Pipeline",
    description: "All subscriptions in the next 90 days, by status and product.",
    type: "report",
    productSlug: "BEACON",
    owner: "Craig Norton",
    lastUpdated: "2026-09-04",
    tags: ["Subscriptions", "Renewal"],
  },
  {
    id: "rpt_beacon_audit",
    title: "Audit Activity (last 30 days)",
    description: "Material access and administration actions across the customer.",
    type: "report",
    productSlug: "BEACON",
    owner: "Craig Norton",
    lastUpdated: "2026-09-04",
    tags: ["Audit"],
  },
];

// ============================================================================
// Audit events
// ============================================================================

export const AUDIT_EVENTS: AuditEvent[] = [
  {
    id: "evt_001",
    customerId: "cust_acme",
    actorId: "user_craig",
    actorName: "Craig Norton",
    kind: "subscription_changed",
    summary: "Acme — Duet moved to Trial (from Not Subscribed).",
    context: { product: "DUET", from: "not_subscribed", to: "trial" },
    occurredAt: "2026-08-15T09:23:00Z",
  },
  {
    id: "evt_002",
    customerId: "cust_acme",
    actorId: "user_craig",
    actorName: "Craig Norton",
    kind: "user_access_granted",
    summary: "Devon Park granted Service Manager access to Duet.",
    context: { user: "Devon Park", product: "DUET" },
    occurredAt: "2026-08-16T11:05:00Z",
  },
  {
    id: "evt_003",
    customerId: "cust_acme",
    actorId: "user_pulse_acme",
    actorName: "Priya Shah",
    kind: "report_viewed",
    summary: "Viewed \"ITSM Maturity Scorecard\".",
    context: { report: "ITSM Maturity Scorecard" },
    occurredAt: "2026-08-30T14:12:00Z",
  },
  {
    id: "evt_004",
    customerId: "cust_acme",
    actorId: "user_craig",
    actorName: "Craig Norton",
    kind: "favourite_added",
    summary: "Added \"QUEDERA Portfolio Health\" to favourites.",
    context: { report: "QUEDERA Portfolio Health" },
    occurredAt: "2026-09-01T08:42:00Z",
  },
  {
    id: "evt_005",
    customerId: "cust_acme",
    actorId: "user_craig",
    actorName: "Craig Norton",
    kind: "product_launched",
    summary: "Launched Beacon from Overview.",
    context: { product: "BEACON" },
    occurredAt: "2026-09-02T10:15:00Z",
  },
  {
    id: "evt_006",
    customerId: "cust_acme",
    actorId: "user_craig",
    actorName: "Craig Norton",
    kind: "user_access_revoked",
    summary: "Legacy contractor access to Pulse removed.",
    context: { product: "PULSE" },
    occurredAt: "2026-09-03T16:30:00Z",
  },
  {
    id: "evt_007",
    customerId: "cust_bluearc",
    actorId: "user_bluearc_admin",
    actorName: "Marcus Webb",
    kind: "subscription_changed",
    summary: "BlueArc — Atlas renewal confirmed for 28 Sep 2026.",
    context: { product: "ATLAS", renewal: "2026-09-28" },
    occurredAt: "2026-09-01T09:00:00Z",
  },
  {
    id: "evt_008",
    customerId: "cust_bluearc",
    actorId: "user_bluearc_admin",
    actorName: "Marcus Webb",
    kind: "user_access_granted",
    summary: "Granted Beacon read-only access to 4 service leads.",
    context: { product: "BEACON", count: "4" },
    occurredAt: "2026-09-03T13:22:00Z",
  },
];

// ============================================================================
// Favourites (per user)
// ============================================================================

export const FAVOURITES: Favourite[] = [
  { id: "fav_001", userId: "user_craig", kind: "report", ref: "rpt_beacon_portfolio", addedAt: "2026-09-01" },
  { id: "fav_002", userId: "user_craig", kind: "report", ref: "rpt_beacon_subs", addedAt: "2026-09-02" },
  { id: "fav_003", userId: "user_craig", kind: "product", ref: "BEACON", addedAt: "2026-08-20" },
  { id: "fav_004", userId: "user_craig", kind: "report", ref: "rpt_pulse_maturity", addedAt: "2026-08-22" },
];

// ============================================================================
// Recently viewed (per user)
// ============================================================================

export const RECENTLY_VIEWED: RecentlyViewed[] = [
  { id: "rv_001", userId: "user_craig", kind: "report", ref: "rpt_beacon_portfolio", label: "QUEDERA Portfolio Health", viewedAt: "2026-09-04T08:30:00Z" },
  { id: "rv_002", userId: "user_craig", kind: "page", ref: "/subscriptions", label: "Subscriptions", viewedAt: "2026-09-04T08:15:00Z" },
  { id: "rv_003", userId: "user_craig", kind: "report", ref: "rpt_atlas_quality", label: "Data Quality Scorecard", viewedAt: "2026-09-03T17:42:00Z" },
  { id: "rv_004", userId: "user_craig", kind: "product", ref: "BEACON", label: "QUEDERA Beacon", viewedAt: "2026-09-03T11:00:00Z" },
  { id: "rv_005", userId: "user_craig", kind: "page", ref: "/products", label: "Products", viewedAt: "2026-09-03T10:45:00Z" },
  { id: "rv_006", userId: "user_craig", kind: "report", ref: "rpt_duet_status", label: "Service Transition Status", viewedAt: "2026-09-02T16:20:00Z" },
];

// ============================================================================
// Notifications (per user, action-required)
// ============================================================================

export const NOTIFICATIONS: Notification[] = [
  {
    id: "notif_001",
    customerId: "cust_acme",
    userId: "user_craig",
    kind: "renewal_approaching",
    title: "Pulse renewal in 57 days",
    body: "Your Pulse Growth subscription renews on 31 Oct 2026. Review entitlements and seat usage before then.",
    href: "/subscriptions",
    createdAt: "2026-09-03T08:00:00Z",
    read: false,
  },
  {
    id: "notif_002",
    customerId: "cust_acme",
    userId: "user_craig",
    kind: "access_request",
    title: "Atlas access requested",
    body: "Helena Marsh requested Atlas read-only access. Approve or decline in Administration.",
    href: "/admin",
    createdAt: "2026-09-04T07:30:00Z",
    read: false,
  },
  {
    id: "notif_003",
    customerId: "cust_acme",
    userId: "user_craig",
    kind: "report_available",
    title: "New sector benchmark available",
    body: "Pulse — Sector Benchmark (Manufacturing, Q3 2026) is now available in the Reports library.",
    href: "/reports",
    createdAt: "2026-09-04T06:00:00Z",
    read: false,
  },
];

// ============================================================================
// Computed view helpers
// ============================================================================

/** Resolve a customer's product statuses (4 products, one row each). */
export function productStatusesFor(customerId: string): ProductStatusView[] {
  return Object.values(PRODUCTS).map((product) => {
    const subscription =
      SUBSCRIPTIONS.find(
        (s) => s.customerId === customerId && s.productSlug === product.slug,
      ) ?? null;

    const status = subscription?.status ?? "not_subscribed";
    const reportCount = REPORTS.filter(
      (r) => r.productSlug === product.slug,
    ).length;

    // Mock health — Beacon always operational; others vary by status.
    const health: ProductStatusView["health"] =
      product.slug === "BEACON"
        ? "operational"
        : status === "active"
          ? "operational"
          : status === "trial"
            ? "operational"
            : status === "expiring"
              ? "degraded"
              : status === "suspended"
                ? "incident"
                : null;

    const customerUsers = USERS.filter((u) => u.customerId === customerId);
    const userCount = customerUsers.length;

    return {
      product,
      subscription,
      status,
      health,
      reportCount,
      userCount,
    };
  });
}

export function daysBetween(fromIso: string, toIso: string): number {
  const from = new Date(fromIso).getTime();
  const to = new Date(toIso).getTime();
  return Math.round((to - from) / (1000 * 60 * 60 * 24));
}

export function todayIso(): string {
  return "2026-09-04";
}

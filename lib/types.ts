/**
 * BEACON — domain types.
 *
 * Concrete TS shape for every entity Beacon reads from authoritative
 * services or owns itself. See DESIGN.md "Data model" for the entity
 * diagram, and architecture/data-model.md for the system-of-record split.
 *
 * Owner-of-record notes:
 * - Customer / User / Subscription / Entitlement / Product catalogue
 *   → READ from authoritative services (mocked here)
 * - Favourite / RecentlyViewed / Notification / AuditEvent
 *   → OWNED by Beacon (writes will land in later phases)
 */

import type { ProductName } from "./brand";

// Re-export so consumers can import all domain types from one place.
export type { ProductName };

/**
 * The four products BEACON hosts in its catalogue (per PRD §1).
 * SENTINEL is a separate QUEDERA product family — it isn't part of
 * the BEACON hub. Adding a fifth hub product is a one-line type
 * extension + one row in PRODUCTS.
 */
export type HubProductSlug = "PULSE" | "DUET" | "ATLAS" | "BEACON";

// ============================================================================
// Identity & tenancy
// ============================================================================

export type Role =
  | "executive"
  | "service_manager"
  | "platform_owner"
  | "customer_admin"
  | "quedera_consultant";

export const ROLE_LABEL: Record<Role, string> = {
  executive: "Executive",
  service_manager: "Service Manager",
  platform_owner: "Product / Platform Owner",
  customer_admin: "Customer Administrator",
  quedera_consultant: "QUEDERA Consultant",
};

export interface Customer {
  id: string;
  name: string;
  industry?: string;
  region?: string;
  /** Hex token used only for visual differentiation in the customer selector. */
  accent?: "navy" | "deep-blue" | "cyan" | "violet" | "amber" | "emerald";
}

export interface User {
  id: string;
  customerId: string;
  name: string;
  email: string;
  role: Role;
  /** Optional product scope (for Platform Owner role). */
  productScope?: ProductName;
}

// ============================================================================
// Product catalogue (READ from QUEDERA platform service)
// ============================================================================

export interface ProductCapability {
  name: string;
  description: string;
}

export interface Product {
  slug: ProductName;
  name: string;
  tagline: string;
  description: string;
  capabilities: ProductCapability[];
  /** Where this product lives when launched — mock deep-link in this build. */
  deepLink: string;
}

// ============================================================================
// Subscriptions (READ from subscription / commercial service)
// ============================================================================

export type SubscriptionStatus =
  | "active"
  | "trial"
  | "expiring"
  | "suspended"
  | "not_subscribed";

export const SUBSCRIPTION_STATUS_LABEL: Record<SubscriptionStatus, string> = {
  active: "Active",
  trial: "Trial",
  expiring: "Expiring",
  suspended: "Suspended",
  not_subscribed: "Not Subscribed",
};

export interface Entitlement {
  /** Modules, environments, seats, or usage allowances. */
  type: "modules" | "environments" | "seats" | "usage";
  label: string;
  used?: number;
  limit?: number;
}

export interface Subscription {
  id: string;
  customerId: string;
  productSlug: ProductName;
  plan: string;
  tier: "starter" | "growth" | "enterprise";
  status: SubscriptionStatus;
  startDate: string; // ISO date
  endDate: string; // ISO date
  renewalDate?: string; // ISO date — when applicable
  accountOwner: string;
  entitlements: Entitlement[];
  /** Days until renewal — derived for the UI, not stored. */
  daysUntilRenewal?: number;
}

// ============================================================================
// Reports / Dashboards / Scorecards (READ from each product, indexed by Beacon)
// ============================================================================

export type ReportType = "dashboard" | "report" | "scorecard" | "insight";

export const REPORT_TYPE_LABEL: Record<ReportType, string> = {
  dashboard: "Dashboard",
  report: "Report",
  scorecard: "Scorecard",
  insight: "Executive Insight",
};

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  productSlug: ProductName;
  owner: string;
  lastUpdated: string; // ISO date
  tags?: string[];
}

// ============================================================================
// Beacon-owned entities
// ============================================================================

export interface Favourite {
  id: string;
  userId: string;
  kind: "product" | "report";
  /** Reference: product slug OR report id. */
  ref: string;
  addedAt: string; // ISO date
}

export interface RecentlyViewed {
  id: string;
  userId: string;
  kind: "product" | "report" | "page";
  ref: string;
  label: string;
  viewedAt: string; // ISO date
}

export type NotificationKind =
  | "renewal_approaching"
  | "access_request"
  | "report_available"
  | "data_quality_issue"
  | "transition_milestone";

export interface Notification {
  id: string;
  customerId: string;
  userId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href: string;
  createdAt: string; // ISO date
  read: boolean;
}

export type AuditEventKind =
  | "subscription_changed"
  | "user_access_granted"
  | "user_access_revoked"
  | "report_viewed"
  | "product_launched"
  | "favourite_added";

export interface AuditEvent {
  id: string;
  customerId: string;
  actorId: string;
  actorName: string;
  kind: AuditEventKind;
  summary: string;
  context?: Record<string, string>;
  occurredAt: string; // ISO datetime
}

// ============================================================================
// Composite view types (computed from above for UI surfaces)
// ============================================================================

export interface ProductStatusView {
  product: Product;
  /** Subscription for this customer + product, or null if not subscribed. */
  subscription: Subscription | null;
  status: SubscriptionStatus;
  /** Health signal when product exposes it; null if no data. */
  health: "operational" | "degraded" | "incident" | null;
  /** Report count surfaced for this product. */
  reportCount: number;
  /** Active user count for this product. */
  userCount: number;
}

export interface PortfolioSummary {
  customerId: string;
  activeProductCount: number;
  expiringCount: number;
  trialCount: number;
  suspendedCount: number;
  notSubscribedCount: number;
  totalReports: number;
}

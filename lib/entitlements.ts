/**
 * BEACON — entitlement helpers.
 *
 * Maps a user's role + subscription status to what they can see and do
 * across the 7 nav areas. Mirrors PRD §5 (users & roles) and PRD §11
 * (UX principles — "role-based visibility").
 *
 * NFR-001 says server-side enforcement is required. These helpers are
 * the *display* layer used by RoleGate; the real check happens when
 * the access-control service (Risk #3) is wired. For now they produce
 * the correct behaviour with mock data.
 */

import type { Role } from "./types";

export type NavAreaId =
  | "overview"
  | "products"
  | "reports"
  | "subscriptions"
  | "insights"
  | "admin"
  | "settings";

export const NAV_AREAS: { id: NavAreaId; label: string; href: string; phase: number }[] = [
  { id: "overview", label: "Overview", href: "/overview", phase: 1 },
  { id: "products", label: "Products", href: "/products", phase: 1 },
  { id: "reports", label: "Reports & Dashboards", href: "/reports", phase: 2 },
  { id: "subscriptions", label: "Subscriptions", href: "/subscriptions", phase: 3 },
  { id: "insights", label: "Insights", href: "/insights", phase: 4 },
  { id: "admin", label: "Administration", href: "/admin", phase: 1 },
  { id: "settings", label: "Settings", href: "/settings", phase: 1 },
];

/**
 * Which nav areas each role can see in the left navigation.
 *
 * - Executive: portfolio views + insights + read-only settings. No admin.
 * - Service Manager: operational areas. No admin / settings (other than own profile).
 * - Platform Owner: products + reports + their own product's settings. No admin.
 * - Customer Admin: everything for their customer.
 * - QUEDERA Consultant: read-only across operational areas; no admin.
 */
const ROLE_VISIBILITY: Record<Role, Set<NavAreaId>> = {
  executive: new Set(["overview", "products", "reports", "insights", "settings"]),
  service_manager: new Set([
    "overview",
    "products",
    "reports",
    "subscriptions",
    "insights",
  ]),
  platform_owner: new Set([
    "overview",
    "products",
    "reports",
    "subscriptions",
    "settings",
  ]),
  customer_admin: new Set([
    "overview",
    "products",
    "reports",
    "subscriptions",
    "insights",
    "admin",
    "settings",
  ]),
  quedera_consultant: new Set([
    "overview",
    "products",
    "reports",
    "insights",
  ]),
};

export function visibleNavAreas(role: Role) {
  return NAV_AREAS.filter((a) => ROLE_VISIBILITY[role].has(a.id));
}

/** Can this role administer users / access for their customer? */
export function canAdminister(role: Role): boolean {
  return role === "customer_admin";
}

/** Can this role see commercial (pricing, renewal) info? */
export function canSeeCommercial(role: Role): boolean {
  return role === "customer_admin" || role === "platform_owner";
}

/** Can this role launch a product (i.e. is the customer entitled to it)? */
export function canLaunchProduct(
  role: Role,
  subscriptionStatus: string,
): boolean {
  if (subscriptionStatus === "not_subscribed" || subscriptionStatus === "suspended") {
    return false;
  }
  // All authenticated roles can launch a product they're entitled to.
  // Customer Admin can always see the "Request access" CTA on a non-subscribed product.
  return true;
}

/**
 * BEACON — Role gate.
 *
 * Renders children only if the active user's role matches the allowed
 * set. Server-side enforcement will land when the access-control service
 * (Risk #3) is wired; this is the display-layer companion.
 */

"use client";

import type { ReactNode } from "react";
import { useCustomer } from "@/lib/customer-context";
import type { Role } from "@/lib/types";

interface RoleGateProps {
  allow: Role[];
  children: ReactNode;
  /** Rendered when the role check fails. */
  fallback?: ReactNode;
}

export function RoleGate({ allow, children, fallback = null }: RoleGateProps) {
  const { user, hydrated } = useCustomer();
  if (!hydrated) return null; // avoid flicker during hydration
  if (!allow.includes(user.role)) return <>{fallback}</>;
  return <>{children}</>;
}

/**
 * BEACON — Status badge.
 *
 * 5-state enum across the entire hub:
 *   Active | Trial | Expiring | Suspended | Not Subscribed
 *
 * Brand-locked colour mapping (per PRD §11 — "consistent status
 * patterns across the hub"). All colours come from the canonical
 * QUEDERA palette tokens; no new tokens introduced.
 */

import type { SubscriptionStatus } from "@/lib/types";
import { SUBSCRIPTION_STATUS_LABEL } from "@/lib/types";

interface StatusBadgeProps {
  status: SubscriptionStatus;
  size?: "sm" | "md";
  className?: string;
}

const STATUS_STYLES: Record<
  SubscriptionStatus,
  { dot: string; badge: string; label: string }
> = {
  // Active = emerald (the positive semantic colour in our palette)
  active: {
    dot: "bg-quedera-emerald",
    badge: "bg-quedera-emerald/10 text-quedera-emerald",
    label: SUBSCRIPTION_STATUS_LABEL.active,
  },
  // Trial = cyan (informational)
  trial: {
    dot: "bg-quedera-cyan",
    badge: "bg-quedera-cyan/10 text-quedera-deep-blue",
    label: SUBSCRIPTION_STATUS_LABEL.trial,
  },
  // Expiring = amber (warning)
  expiring: {
    dot: "bg-quedera-amber",
    badge: "bg-quedera-amber/15 text-quedera-amber",
    label: SUBSCRIPTION_STATUS_LABEL.expiring,
  },
  // Suspended = deep-blue muted (deprioritised, not "alert red" — palette is brand-locked)
  suspended: {
    dot: "bg-quedera-deep-blue",
    badge: "bg-quedera-deep-blue/10 text-quedera-deep-blue",
    label: SUBSCRIPTION_STATUS_LABEL.suspended,
  },
  // Not Subscribed = navy muted
  not_subscribed: {
    dot: "bg-quedera-navy/40",
    badge: "bg-quedera-navy/5 text-quedera-navy/60",
    label: SUBSCRIPTION_STATUS_LABEL.not_subscribed,
  },
};

export function StatusBadge({ status, size = "md", className = "" }: StatusBadgeProps) {
  const s = STATUS_STYLES[status];
  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${padding} ${s.badge} ${className}`}
      aria-label={`Status: ${s.label}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

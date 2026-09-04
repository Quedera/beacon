/**
 * BEACON — Left navigation.
 *
 * 7 primary nav areas per PRD §3. Role-gated (which areas are visible)
 * via visibleNavAreas(). Active state via usePathname().
 *
 * Per PRD §11 the left nav is invariant — it does NOT re-theme per
 * product. Once a user deep-links into Pulse, Pulse takes over its own
 * chrome.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCustomer } from "@/lib/customer-context";
import { visibleNavAreas } from "@/lib/entitlements";

interface LeftNavProps {
  /** Optional callback used when the nav is rendered inside a mobile drawer. */
  onNavigate?: () => void;
}

export function LeftNav({ onNavigate }: LeftNavProps) {
  const pathname = usePathname();
  const { user, hydrated } = useCustomer();

  // Avoid flicker before hydration.
  const areas = hydrated ? visibleNavAreas(user.role) : [];

  return (
    <nav aria-label="Primary" className="space-y-1">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/40 mb-2">
        Navigation
      </p>
      <ul className="space-y-1">
        {areas.map((area) => {
          const isActive =
            pathname === area.href ||
            (area.href !== "/overview" && pathname?.startsWith(area.href));

          return (
            <li key={area.id}>
              <Link
                href={area.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-quedera-emerald/10 text-quedera-emerald"
                    : "text-quedera-navy hover:bg-quedera-navy/5"
                }`}
              >
                <span>{area.label}</span>
                {area.phase > 1 && (
                  <span className="text-[9px] font-normal uppercase tracking-wider text-quedera-navy/40">
                    P{area.phase}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

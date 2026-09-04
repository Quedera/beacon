"use client";

/**
 * Customer context panel (FR-001 — "active customer prominently").
 * Renders the active customer + user inline at the top of Overview.
 */

import { useCustomer } from "@/lib/customer-context";
import { ROLE_LABEL } from "@/lib/types";

export function CustomerPanel() {
  const { customer, user, hydrated } = useCustomer();
  if (!hydrated) {
    return <div className="h-20 rounded-lg bg-quedera-surface border border-quedera-navy/10 mb-6" />;
  }
  return (
    <div className="rounded-lg border border-quedera-emerald/20 bg-quedera-emerald/5 p-4 md:p-5 mb-6 flex items-center justify-between gap-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-quedera-emerald mb-1">
          Active customer
        </p>
        <p className="text-xl md:text-2xl font-bold text-quedera-navy">{customer.name}</p>
        <p className="text-xs text-quedera-navy/60 mt-0.5">
          {customer.industry}
          {customer.region ? ` · ${customer.region}` : ""}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-quedera-navy/60 mb-1">
          Signed in as
        </p>
        <p className="text-sm font-semibold text-quedera-navy">{user.name}</p>
        <p className="text-[10px] uppercase tracking-wider text-quedera-amber">
          {ROLE_LABEL[user.role]}
        </p>
      </div>
    </div>
  );
}

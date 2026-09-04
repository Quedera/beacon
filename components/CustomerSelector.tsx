/**
 * BEACON — Customer selector.
 *
 * Dropdown in the header to switch the active customer. PRD §11 says
 * "always show the active customer context" — this is how the user
 * changes it.
 *
 * In production this would be a server-side operation against the
 * identity service; here it updates the CustomerProvider state and
 * persists to localStorage.
 */

"use client";

import { useState } from "react";
import { useCustomer } from "@/lib/customer-context";

export function CustomerSelector() {
  const { customer, customers, setActiveCustomer, hydrated } = useCustomer();
  const [open, setOpen] = useState(false);

  // Avoid hydration mismatch — render placeholder until hydrated.
  if (!hydrated) {
    return (
      <div className="hidden md:flex items-center gap-2 rounded-md border border-quedera-navy/10 bg-quedera-surface px-3 py-1.5 text-sm">
        <span className="font-semibold text-quedera-navy/40">Customer</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-quedera-navy/10 bg-quedera-surface px-3 py-1.5 text-sm font-semibold text-quedera-navy hover:border-quedera-navy/30 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-[10px] font-normal uppercase tracking-wider text-quedera-navy/60">
          Customer
        </span>
        <span>{customer.name}</span>
        <span aria-hidden="true" className="text-quedera-navy/40 text-xs">▾</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 z-20 min-w-[260px] rounded-md border border-quedera-navy/10 bg-quedera-surface shadow-lg overflow-hidden"
        >
          {customers.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                role="option"
                aria-selected={c.id === customer.id}
                onClick={() => {
                  setActiveCustomer(c.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-quedera-navy/5 ${
                  c.id === customer.id ? "bg-quedera-emerald/10" : ""
                }`}
              >
                <p className="text-sm font-semibold text-quedera-navy">{c.name}</p>
                {c.industry && (
                  <p className="text-xs text-quedera-navy/60">
                    {c.industry}
                    {c.region ? ` · ${c.region}` : ""}
                  </p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

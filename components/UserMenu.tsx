/**
 * BEACON — User menu.
 *
 * Shows the active user's name + role. The role is critical info because
 * it shapes what they see across the IA (RoleGate + LeftNav).
 */

"use client";

import { useState } from "react";
import { useCustomer } from "@/lib/customer-context";
import { ROLE_LABEL } from "@/lib/types";

export function UserMenu() {
  const { user, hydrated } = useCustomer();
  const [open, setOpen] = useState(false);

  if (!hydrated) {
    return (
      <div className="hidden sm:flex items-center gap-2 rounded-md border border-quedera-navy/10 bg-quedera-surface px-3 py-1.5 text-sm">
        <span className="font-semibold text-quedera-navy/40">—</span>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-quedera-navy/10 bg-quedera-surface pl-1.5 pr-3 py-1 hover:border-quedera-navy/30 transition-colors"
        aria-label="User menu"
        aria-expanded={open}
      >
        <span className="h-7 w-7 rounded-full bg-quedera-emerald/15 text-quedera-emerald flex items-center justify-center text-xs font-bold">
          {initials}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-sm font-semibold text-quedera-navy">{user.name}</span>
          <span className="text-[10px] uppercase tracking-wider text-quedera-navy/60">
            {ROLE_LABEL[user.role]}
          </span>
        </span>
        <span aria-hidden="true" className="text-quedera-navy/40 text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 w-64 rounded-md border border-quedera-navy/10 bg-quedera-surface shadow-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-quedera-navy/10">
            <p className="text-sm font-semibold text-quedera-navy">{user.name}</p>
            <p className="text-xs text-quedera-navy/60">{user.email}</p>
            <p className="text-[10px] uppercase tracking-wider text-quedera-amber mt-1">
              {ROLE_LABEL[user.role]}
            </p>
          </div>
          <ul className="py-1 text-sm">
            <li>
              <a
                href="/settings"
                className="block px-3 py-2 hover:bg-quedera-navy/5 text-quedera-navy"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="/sign-in"
                className="block px-3 py-2 hover:bg-quedera-navy/5 text-quedera-navy"
              >
                Switch user
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

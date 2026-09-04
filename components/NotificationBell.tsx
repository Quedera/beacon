/**
 * BEACON — Notification bell.
 *
 * Shows unread count and a list of the user's notifications. Renders
 * client-side because it depends on the active customer + user.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCustomer } from "@/lib/customer-context";
import { NOTIFICATIONS } from "@/lib/mock-data";

export function NotificationBell() {
  const { customer, user, hydrated } = useCustomer();
  const [open, setOpen] = useState(false);

  const items = NOTIFICATIONS.filter(
    (n) => n.customerId === customer.id && n.userId === user.id,
  );
  const unread = items.filter((n) => !n.read).length;

  // Avoid hydration mismatch.
  if (!hydrated) {
    return (
      <button
        type="button"
        aria-label="Notifications"
        className="relative h-9 w-9 rounded-md border border-quedera-navy/10 bg-quedera-surface text-quedera-navy/40"
      >
        <span aria-hidden="true" className="block text-base leading-9 text-center">🔔</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications (${unread} unread)`}
        className="relative h-9 w-9 rounded-md border border-quedera-navy/10 bg-quedera-surface text-quedera-navy hover:border-quedera-navy/30 transition-colors"
      >
        <span aria-hidden="true" className="block text-base leading-9 text-center">🔔</span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-quedera-amber text-[10px] font-bold text-quedera-navy">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 w-[360px] rounded-md border border-quedera-navy/10 bg-quedera-surface shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-quedera-navy/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-quedera-navy/60">
              Notifications
            </p>
            {unread > 0 && (
              <span className="text-[10px] font-semibold text-quedera-amber">
                {unread} unread
              </span>
            )}
          </div>
          {items.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-quedera-navy/60">
              No notifications.
            </p>
          ) : (
            <ul className="max-h-[360px] overflow-y-auto">
              {items.map((n) => (
                <li key={n.id}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 border-b border-quedera-navy/5 hover:bg-quedera-navy/5 ${
                      !n.read ? "bg-quedera-amber/5" : ""
                    }`}
                  >
                    <p className="text-sm font-semibold text-quedera-navy">{n.title}</p>
                    <p className="text-xs text-quedera-navy/70 mt-0.5 line-clamp-2">
                      {n.body}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

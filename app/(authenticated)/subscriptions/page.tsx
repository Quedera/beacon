/**
 * BEACON — Subscription Centre.
 *
 * PRD §9 — consolidated commercial + entitlement view per customer.
 *
 * Phase 3 work. This build delivers the table UI with all subscriptions
 * across products for the active customer.
 *
 * Risk #2 (subscription source) is mocked. Real commercial service
 * contract pending.
 */

"use client";

import { useMemo } from "react";
import { useCustomer } from "@/lib/customer-context";
import { SUBSCRIPTIONS } from "@/lib/mock-data";
import { SUBSCRIPTION_STATUS_LABEL, type Subscription } from "@/lib/types";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { RoleGate } from "@/components/RoleGate";
import { EmptyState } from "@/components/EmptyState";
import { canSeeCommercial } from "@/lib/entitlements";
import { QUEDERA_PRODUCTS } from "@/lib/brand";

const PRODUCT_ACCENT: Record<Subscription["productSlug"], string> = {
  PULSE: "text-quedera-cyan",
  DUET: "text-quedera-violet",
  ATLAS: "text-quedera-deep-blue",
  BEACON: "text-quedera-amber",
  SENTINEL: "text-quedera-emerald",
};

export default function SubscriptionsPage() {
  const { customer, user, hydrated } = useCustomer();
  const canSeePricing = hydrated ? canSeeCommercial(user.role) : false;

  const rows = useMemo(
    () =>
      SUBSCRIPTIONS.filter((s) => s.customerId === customer.id).sort((a, b) =>
        a.productSlug.localeCompare(b.productSlug),
      ),
    [customer.id],
  );

  const expiringSoon = rows.filter(
    (s) => s.status === "expiring" || s.status === "trial",
  );

  return (
    <RoleGate
      allow={["customer_admin", "platform_owner", "executive", "service_manager", "quedera_consultant"]}
      fallback={
        <EmptyState
          title="You don't have access to the Subscription Centre"
          body="Ask your Customer Administrator for access."
          phase="Restricted"
          ctaHref="/overview"
          ctaLabel="Back to Overview"
        />
      }
    >
      <PageHeader
        crumbs={[{ label: "Subscriptions" }]}
        title="Subscription Centre"
        description="One commercial + entitlement view across the QUEDERA portfolio — no need to visit each product."
        eyebrow="Phase 3 — Subscriptions"
      />

      {expiringSoon.length > 0 && (
        <div className="rounded-lg border border-quedera-amber/30 bg-quedera-amber/5 p-4 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-quedera-amber mb-1">
            Attention required
          </p>
          <p className="text-sm text-quedera-navy">
            {expiringSoon.length} subscription
            {expiringSoon.length === 1 ? "" : "s"} need
            {expiringSoon.length === 1 ? "s" : ""} review — see rows below.
          </p>
        </div>
      )}

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-quedera-navy/60 border-b border-quedera-navy/10">
              <th className="py-2 font-semibold">Product</th>
              <th className="py-2 font-semibold">Plan</th>
              <th className="py-2 font-semibold">Status</th>
              <th className="py-2 font-semibold">Start</th>
              <th className="py-2 font-semibold">{canSeePricing ? "Renews" : "End"}</th>
              <th className="py-2 font-semibold">Owner</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-quedera-navy/60">
                  No subscriptions on record.
                </td>
              </tr>
            ) : (
              rows.map((s) => (
                <tr key={s.id} className="border-b border-quedera-navy/5 last:border-b-0">
                  <td className={`py-3 font-semibold uppercase tracking-wider text-xs ${PRODUCT_ACCENT[s.productSlug]}`}>
                    {s.productSlug}
                    <p className="text-[10px] font-normal normal-case text-quedera-navy/60 mt-0.5">
                      {QUEDERA_PRODUCTS[s.productSlug].tagline}
                    </p>
                  </td>
                  <td className="py-3 text-quedera-navy">
                    <p className="font-semibold">{s.plan}</p>
                    <p className="text-xs capitalize text-quedera-navy/60">{s.tier} tier</p>
                  </td>
                  <td className="py-3">
                    <StatusBadge status={s.status} size="sm" />
                  </td>
                  <td className="py-3 text-quedera-navy/70">{s.startDate}</td>
                  <td className="py-3 text-quedera-navy/70">
                    {s.renewalDate ? s.renewalDate : s.endDate}
                  </td>
                  <td className="py-3 text-quedera-navy/70">{s.accountOwner}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-quedera-navy/50">
        Pricing hidden from {user.role.replace("_", " ")}s per §18 Q4 default —{" "}
        <code className="font-mono">docs/open-questions.md</code>.
      </p>
      <p className="mt-2 text-xs text-quedera-navy/50">
        Subscription source service pending — see <code className="font-mono">risks/register.md</code> §16 #2.
      </p>
    </RoleGate>
  );
}

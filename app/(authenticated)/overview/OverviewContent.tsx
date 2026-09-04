"use client";

/**
 * Overview content body — the eight PRD §7 elements.
 *
 * Wrapped in client component so it re-renders when the active customer
 * or user changes via the header.
 */

import Link from "next/link";
import { useMemo } from "react";
import { useCustomer } from "@/lib/customer-context";
import {
  FAVOURITES,
  NOTIFICATIONS,
  REPORTS,
  RECENTLY_VIEWED,
  USERS,
  productStatusesFor,
} from "@/lib/mock-data";
import { MetricCard } from "@/components/MetricCard";
import { ProductCard } from "@/components/ProductCard";
import { ActionItem, type ActionKind } from "@/components/ActionItem";
import { PageHeader } from "@/components/PageHeader";
import { REPORT_TYPE_LABEL } from "@/lib/types";

export function OverviewContent() {
  const { customer, user, hydrated } = useCustomer();

  const data = useMemo(() => {
    if (!hydrated) return null;
    const views = productStatusesFor(customer.id);
    const activeCount = views.filter(
      (v) => v.status === "active",
    ).length;
    const trialCount = views.filter((v) => v.status === "trial").length;
    const expiringCount = views.filter(
      (v) => v.status === "expiring",
    ).length;
    const suspendedCount = views.filter(
      (v) => v.status === "suspended",
    ).length;
    const notSubscribedCount = views.filter(
      (v) => v.status === "not_subscribed",
    ).length;
    const totalReports = REPORTS.length;

    // Action centre — derive from subscriptions + notifications.
    const actions: { key: string; kind: ActionKind; title: string; body?: string; href: string }[] = [];

    views
      .filter((v) => v.status === "expiring" && v.subscription)
      .forEach((v) => {
        actions.push({
          key: `exp-${v.product.slug}`,
          kind: "renewal_approaching",
          title: `${v.product.name.replace("QUEDERA ", "")} renewal in ${
            v.subscription?.daysUntilRenewal ?? "<30"
          } days`,
          body: `${v.subscription?.plan} — renewal ${
            v.subscription?.renewalDate ?? "—"
          }`,
          href: "/subscriptions",
        });
      });

    views
      .filter((v) => v.status === "trial" && v.subscription)
      .forEach((v) => {
        actions.push({
          key: `trial-${v.product.slug}`,
          kind: "info",
          title: `${v.product.name.replace("QUEDERA ", "")} trial — ${
            v.subscription?.endDate
          }`,
          body: "Trial window ending — review before deciding to subscribe.",
          href: `/products/${v.product.slug.toLowerCase()}`,
        });
      });

    NOTIFICATIONS.filter(
      (n) => n.customerId === customer.id && n.userId === user.id && !n.read,
    ).forEach((n) => {
      actions.push({
        key: n.id,
        kind:
          n.kind === "renewal_approaching"
            ? "renewal_approaching"
            : n.kind === "access_request"
              ? "access_request"
              : "report_available",
        title: n.title,
        body: n.body,
        href: n.href,
      });
    });

    const favourites = FAVOURITES.filter((f) => f.userId === user.id).slice(0, 4);
    const recent = RECENTLY_VIEWED.filter((r) => r.userId === user.id).slice(0, 6);
    const users = USERS.filter((u) => u.customerId === customer.id).length;

    return {
      views,
      activeCount,
      trialCount,
      expiringCount,
      suspendedCount,
      notSubscribedCount,
      totalReports,
      actions: actions.slice(0, 6),
      favourites,
      recent,
      users,
    };
  }, [customer.id, user.id, hydrated]);

  if (!data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-quedera-navy/5 rounded-lg" />
        <div className="h-64 bg-quedera-navy/5 rounded-lg" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Overview" }]}
        title="Portfolio Overview"
        description="Your QUEDERA products at a glance — what's active, what needs attention, and where to go next."
      />

      {/* 2. Portfolio summary */}
      <section aria-label="Portfolio summary" className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <MetricCard
            label="Active products"
            value={data.activeCount}
            hint={`${data.trialCount} on trial`}
            accent="emerald"
          />
          <MetricCard
            label="Renewal pipeline"
            value={data.expiringCount}
            hint="Within 30 days"
            accent="amber"
          />
          <MetricCard
            label="Reports available"
            value={data.totalReports}
            accent="navy"
          />
          <MetricCard
            label="Users"
            value={data.users}
            accent="navy"
          />
          <MetricCard
            label="Action items"
            value={data.actions.length}
            hint="Need your attention"
            accent="violet"
          />
        </div>
      </section>

      {/* 3. Product cards */}
      <section aria-label="Product portfolio" className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-quedera-navy">Your products</h2>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-wider text-quedera-emerald hover:text-quedera-emerald/80"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.views.map((v) => (
            <ProductCard key={v.product.slug} view={v} compact />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* 4. Action centre */}
        <section aria-label="Action centre" className="lg:col-span-2">
          <h2 className="text-lg font-bold text-quedera-navy mb-3">Action Centre</h2>
          {data.actions.length === 0 ? (
            <div className="card text-center text-sm text-quedera-navy/60">
              No action items — you're all caught up.
            </div>
          ) : (
            <ul className="space-y-2">
              {data.actions.map((a) => (
                <ActionItem
                  key={a.key}
                  kind={a.kind}
                  title={a.title}
                  body={a.body}
                  href={a.href}
                />
              ))}
            </ul>
          )}
        </section>

        {/* 6. Recent content + 7. Favourites */}
        <aside className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-quedera-navy mb-3">Recent</h2>
            <ul className="space-y-2 text-sm">
              {data.recent.length === 0 ? (
                <li className="text-quedera-navy/60">No recent content.</li>
              ) : (
                data.recent.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-md border border-quedera-navy/10 bg-quedera-surface px-3 py-2"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-quedera-navy/50">
                      {r.kind}
                    </p>
                    <p className="font-semibold text-quedera-navy">{r.label}</p>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-quedera-navy mb-3">Favourites</h2>
            {data.favourites.length === 0 ? (
              <p className="text-sm text-quedera-navy/60">No favourites yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {data.favourites.map((f) => {
                  const label =
                    f.kind === "product"
                      ? f.ref
                      : REPORTS.find((r) => r.id === f.ref)?.title ?? f.ref;
                  return (
                    <li
                      key={f.id}
                      className="rounded-md border border-quedera-amber/30 bg-quedera-amber/5 px-3 py-2"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-quedera-amber">
                        ★ {f.kind}
                      </p>
                      <p className="font-semibold text-quedera-navy">{label}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {/* 5. Executive highlights */}
      <section aria-label="Executive highlights" className="mb-10">
        <h2 className="text-lg font-bold text-quedera-navy mb-3">
          Executive highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card border-l-4 border-l-quedera-emerald">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">
              Portfolio health
            </p>
            <p className="text-2xl font-bold text-quedera-emerald mt-1">Stable</p>
            <p className="text-xs text-quedera-navy/60 mt-1">
              {data.activeCount + data.trialCount} of 4 products active or in trial.
            </p>
          </div>
          <div className="card border-l-4 border-l-quedera-amber">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">
              Renewal exposure (90d)
            </p>
            <p className="text-2xl font-bold text-quedera-amber mt-1">
              {data.expiringCount}
            </p>
            <p className="text-xs text-quedera-navy/60 mt-1">
              Subscription renewals in the next quarter.
            </p>
          </div>
          <div className="card border-l-4 border-l-quedera-cyan">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">
              Reporting coverage
            </p>
            <p className="text-2xl font-bold text-quedera-cyan mt-1">
              {data.totalReports}
            </p>
            <p className="text-xs text-quedera-navy/60 mt-1">
              Reports, dashboards, scorecards, and insights.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Quick links */}
      <section aria-label="Quick links">
        <h2 className="text-lg font-bold text-quedera-navy mb-3">Quick links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/reports" className="card hover:shadow-md transition-shadow">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">
              Reports
            </p>
            <p className="font-semibold text-quedera-navy">Reports & Dashboards</p>
          </Link>
          <Link href="/products" className="card hover:shadow-md transition-shadow">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">
              Catalogue
            </p>
            <p className="font-semibold text-quedera-navy">Products</p>
          </Link>
          <Link href="/subscriptions" className="card hover:shadow-md transition-shadow">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">
              Commercial
            </p>
            <p className="font-semibold text-quedera-navy">Subscriptions</p>
          </Link>
          <Link href="/admin" className="card hover:shadow-md transition-shadow">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">
              Admin
            </p>
            <p className="font-semibold text-quedera-navy">Administration</p>
          </Link>
        </div>
      </section>
    </>
  );
}

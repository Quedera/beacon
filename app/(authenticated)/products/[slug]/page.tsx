/**
 * BEACON — Product detail.
 *
 * PRD §8 — 7 standard sections, identical across products:
 *   Identity · Status · Subscription · Capabilities · Users · Content · Health
 *
 * Plus a primary action that depends on subscription status.
 *
 * Slug is lowercased in the URL but mapped to the ProductName enum
 * (uppercase) for type-safe lookups.
 */

"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCustomer } from "@/lib/customer-context";
import { REPORTS, SUBSCRIPTIONS, USERS, productStatusesFor } from "@/lib/mock-data";
import { getProduct } from "@/lib/products";
import { QUEDERA_PRODUCTS } from "@/lib/brand";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import type { ProductName } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { customer, hydrated } = useCustomer();

  const slugUpper = (params.slug ?? "").toUpperCase() as ProductName;
  const product = getProduct(slugUpper);

  const data = useMemo(() => {
    if (!hydrated || !product) return null;
    const views = productStatusesFor(customer.id);
    const view = views.find((v) => v.product.slug === product.slug);
    const reports = REPORTS.filter((r) => r.productSlug === product.slug);
    const subscription =
      SUBSCRIPTIONS.find(
        (s) => s.customerId === customer.id && s.productSlug === product.slug,
      ) ?? null;
    const assignedUsers = USERS.filter(
      (u) =>
        u.customerId === customer.id &&
        (u.productScope === product.slug || u.role === "customer_admin"),
    );
    return { view, reports, subscription, assignedUsers };
  }, [customer.id, product, hydrated]);

  if (!product) {
    return (
      <>
        <PageHeader crumbs={[{ label: "Products", href: "/products" }, { label: "Not found" }]} title="Product not found" />
        <EmptyState
          title="Unknown product"
          body={`No QUEDERA product matches “${params.slug}”.`}
          ctaHref="/products"
          ctaLabel="Back to catalogue"
        />
      </>
    );
  }

  if (!data) {
    return <div className="h-96 rounded-lg bg-quedera-navy/5 animate-pulse" />;
  }

  const { view, reports, subscription, assignedUsers } = data;
  if (!view) return null;

  const accent = QUEDERA_PRODUCTS[product.slug];
  const accentText: Record<ProductName, string> = {
    PULSE: "text-quedera-cyan",
    DUET: "text-quedera-violet",
    ATLAS: "text-quedera-deep-blue",
    BEACON: "text-quedera-amber",
    SENTINEL: "text-quedera-emerald",
  };
  const accentBg: Record<ProductName, string> = {
    PULSE: "bg-quedera-cyan",
    DUET: "bg-quedera-violet",
    ATLAS: "bg-quedera-deep-blue",
    BEACON: "bg-quedera-amber",
    SENTINEL: "bg-quedera-emerald",
  };

  const isLaunchable = view.status === "active" || view.status === "trial" || view.status === "expiring";

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Products", href: "/products" },
          { label: product.name.replace("QUEDERA ", ""), layer: "product", productSlug: product.slug },
        ]}
        eyebrow={`QUEDERA · ${product.slug}`}
        title={product.name}
        description={product.tagline}
        actions={
          isLaunchable ? (
            <button
              type="button"
              onClick={() => alert(`Mock launch — would deep-link to ${product.deepLink} in production.`)}
              className="btn-primary"
            >
              Open {product.slug}
            </button>
          ) : view.status === "not_subscribed" ? (
            <button
              type="button"
              onClick={() => router.push(`/products/${product.slug.toLowerCase()}?action=request`)}
              className="btn-outline"
            >
              Request Access
            </button>
          ) : null
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity + Status */}
        <div className="lg:col-span-2 card">
          <div className="flex items-start gap-4 mb-4">
            <div className={`${accentBg[product.slug]} rounded-md w-14 h-16 shrink-0`} aria-hidden="true" />
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentText[product.slug]}`}>
                QUEDERA
              </p>
              <h2 className="text-xl font-bold text-quedera-navy">{product.name.replace("QUEDERA ", "")}</h2>
              <p className="text-sm text-quedera-navy/70 mt-1">{product.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">Status</p>
              <div className="mt-1">
                <StatusBadge status={view.status} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60">Health</p>
              <p className="text-sm font-semibold text-quedera-navy capitalize mt-1">
                {view.health ?? "No signal"}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="card">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60 mb-2">
            Subscription
          </p>
          {subscription ? (
            <>
              <p className="text-lg font-bold text-quedera-navy">{subscription.plan}</p>
              <p className="text-xs text-quedera-navy/60 capitalize">{subscription.tier} tier</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-quedera-navy/60">Start date</dt>
                  <dd className="font-semibold text-quedera-navy">{subscription.startDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-quedera-navy/60">End date</dt>
                  <dd className="font-semibold text-quedera-navy">{subscription.endDate}</dd>
                </div>
                {subscription.renewalDate && (
                  <div className="flex justify-between">
                    <dt className="text-quedera-navy/60">Renews</dt>
                    <dd className="font-semibold text-quedera-navy">{subscription.renewalDate}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-quedera-navy/60">Owner</dt>
                  <dd className="font-semibold text-quedera-navy">{subscription.accountOwner}</dd>
                </div>
              </dl>
              {subscription.entitlements.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-quedera-navy/60 mb-2">
                    Entitlements
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    {subscription.entitlements.map((e, i) => (
                      <li key={i} className="flex justify-between">
                        <span className="text-quedera-navy/70">{e.label}</span>
                        <span className="font-semibold text-quedera-navy">
                          {e.used ?? "—"}
                          {e.limit !== undefined ? ` / ${e.limit}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-quedera-navy/60">Not subscribed.</p>
          )}
        </div>

        {/* Capabilities */}
        <div className="card lg:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60 mb-2">
            Capabilities
          </p>
          <ul className="space-y-3">
            {product.capabilities.map((c) => (
              <li key={c.name}>
                <p className="font-semibold text-quedera-navy">{c.name}</p>
                <p className="text-sm text-quedera-navy/70">{c.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Users */}
        <div className="card">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60 mb-2">
            Assigned users
          </p>
          {assignedUsers.length === 0 ? (
            <p className="text-sm text-quedera-navy/60">No users assigned.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {assignedUsers.map((u) => (
                <li key={u.id}>
                  <p className="font-semibold text-quedera-navy">{u.name}</p>
                  <p className="text-xs text-quedera-navy/60 capitalize">{u.role.replace("_", " ")}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Content (Reports) */}
        <div className="card lg:col-span-3">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60">
              Content
            </p>
            <Link
              href={`/reports?product=${product.slug}`}
              className="text-xs font-semibold uppercase tracking-wider text-quedera-emerald hover:text-quedera-emerald/80"
            >
              See all in library →
            </Link>
          </div>
          {reports.length === 0 ? (
            <p className="text-sm text-quedera-navy/60">No reports available yet.</p>
          ) : (
            <ul className="divide-y divide-quedera-navy/10">
              {reports.slice(0, 5).map((r) => (
                <li key={r.id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-quedera-navy">{r.title}</p>
                    <p className="text-xs text-quedera-navy/60">
                      {r.type} · Updated {r.lastUpdated}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-quedera-navy/50">
                    {r.type}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

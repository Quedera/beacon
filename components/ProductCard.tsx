/**
 * BEACON — Product card.
 *
 * Branded per product using palette tokens. Used on /products (catalogue)
 * and /overview (portfolio summary). The card pattern is identical across
 * products — only the accent colour and metadata differ.
 *
 * Brand layer (per architecture/brand-hierarchy.md):
 * - Pulse = cyan accent
 * - Duet = violet accent
 * - Atlas = deep-blue accent
 * - Beacon = amber accent
 */

import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { QUEDERA_PRODUCTS } from "@/lib/brand";
import type { ProductStatusView } from "@/lib/types";

interface ProductCardProps {
  view: ProductStatusView;
  /** When true, render a compact variant for the Overview action area. */
  compact?: boolean;
}

const ACCENT_BORDER: Record<keyof typeof QUEDERA_PRODUCTS, string> = {
  PULSE: "border-l-quedera-cyan",
  DUET: "border-l-quedera-violet",
  ATLAS: "border-l-quedera-deep-blue",
  BEACON: "border-l-quedera-amber",
  SENTINEL: "border-l-quedera-emerald",
};

const ACCENT_TEXT: Record<keyof typeof QUEDERA_PRODUCTS, string> = {
  PULSE: "text-quedera-cyan",
  DUET: "text-quedera-violet",
  ATLAS: "text-quedera-deep-blue",
  BEACON: "text-quedera-amber",
  SENTINEL: "text-quedera-emerald",
};

export function ProductCard({ view, compact = false }: ProductCardProps) {
  const { product, status, subscription, health, reportCount, userCount } = view;
  const accentBorder = ACCENT_BORDER[product.slug];
  const accentText = ACCENT_TEXT[product.slug];

  const isLaunchable = status === "active" || status === "trial" || status === "expiring";

  return (
    <article
      className={`relative card border-l-4 ${accentBorder} hover:shadow-md transition-shadow`}
      aria-labelledby={`product-${product.slug}-title`}
    >
      <header className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentText}`}>
            QUEDERA
          </p>
          <h3
            id={`product-${product.slug}-title`}
            className={`text-xl font-bold text-quedera-navy`}
          >
            {product.name.replace("QUEDERA ", "")}
          </h3>
        </div>
        <StatusBadge status={status} size="sm" />
      </header>

      {!compact && (
        <p className="text-sm text-quedera-navy/70 mb-4 min-h-[2.5rem]">
          {product.tagline}
        </p>
      )}

      <dl className={`grid ${compact ? "grid-cols-2" : "grid-cols-3"} gap-3 mb-4 text-center`}>
        <div className="rounded-md bg-quedera-surface px-2 py-2">
          <dt className="text-[10px] uppercase tracking-wider text-quedera-navy/60">Reports</dt>
          <dd className="text-lg font-bold text-quedera-navy">{reportCount}</dd>
        </div>
        <div className="rounded-md bg-quedera-surface px-2 py-2">
          <dt className="text-[10px] uppercase tracking-wider text-quedera-navy/60">Users</dt>
          <dd className="text-lg font-bold text-quedera-navy">{userCount}</dd>
        </div>
        <div className="rounded-md bg-quedera-surface px-2 py-2">
          <dt className="text-[10px] uppercase tracking-wider text-quedera-navy/60">Health</dt>
          <dd className="text-sm font-semibold text-quedera-navy capitalize">
            {health ?? "—"}
          </dd>
        </div>
      </dl>

      {subscription?.renewalDate && status !== "not_subscribed" && status !== "suspended" && (
        <p className="text-xs text-quedera-navy/60 mb-4">
          Renews <span className="font-semibold text-quedera-navy">{subscription.renewalDate}</span>
        </p>
      )}

      <div className="flex items-center gap-2">
        {isLaunchable ? (
          <Link
            href={`/products/${product.slug.toLowerCase()}`}
            className="btn-primary text-sm"
          >
            Open Product
          </Link>
        ) : status === "not_subscribed" ? (
          <Link
            href={`/products/${product.slug.toLowerCase()}?action=request`}
            className="btn-outline text-sm"
          >
            Request Access
          </Link>
        ) : (
          <Link
            href={`/products/${product.slug.toLowerCase()}`}
            className="btn-outline text-sm"
          >
            View Details
          </Link>
        )}
        <Link
          href={`/products/${product.slug.toLowerCase()}`}
          className="text-xs font-semibold uppercase tracking-wider text-quedera-navy/60 hover:text-quedera-navy ml-auto"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}

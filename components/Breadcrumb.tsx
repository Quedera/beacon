/**
 * BEACON — Breadcrumb.
 *
 * Enforces the brand-hierarchy convention from architecture/brand-hierarchy.md:
 *   QUEDERA (navy) › BEACON (amber) › Products / Subscriptions / etc.
 *
 * The first two layers are always rendered; the rest are passed in via items.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import type { ProductName } from "@/lib/types";

export interface CrumbItem {
  label: string;
  href?: string;
  /** Optional brand-layer indicator — controls text colour. */
  layer?: "quedera" | "beacon" | "product" | "neutral";
  /** When layer === "product", the product slug drives the colour. */
  productSlug?: ProductName;
}

interface BreadcrumbProps {
  items: CrumbItem[];
}

function layerColour(item: CrumbItem): string {
  if (item.layer === "quedera" || (!item.layer && item.href === "/")) {
    return "text-quedera-navy hover:text-quedera-navy";
  }
  if (item.layer === "beacon" || (!item.layer && item.href === "/overview")) {
    return "text-quedera-amber hover:text-quedera-amber";
  }
  if (item.layer === "product" && item.productSlug) {
    switch (item.productSlug) {
      case "PULSE":
        return "text-quedera-cyan hover:text-quedera-cyan";
      case "DUET":
        return "text-quedera-violet hover:text-quedera-violet";
      case "ATLAS":
        return "text-quedera-deep-blue hover:text-quedera-deep-blue";
      case "BEACON":
        return "text-quedera-amber hover:text-quedera-amber";
    }
  }
  return "text-quedera-navy/60 hover:text-quedera-navy";
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const fixed: CrumbItem[] = [
    { label: "QUEDERA", href: "/overview", layer: "quedera" },
    { label: "BEACON", href: "/overview", layer: "beacon" },
    ...items,
  ];

  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5">
        {fixed.map((item, i) => {
          const isLast = i === fixed.length - 1;
          const colour = layerColour(item);
          const content: ReactNode = isLast ? (
            <span className={`font-semibold ${colour}`} aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <Link href={item.href} className={`font-medium ${colour}`}>
              {item.label}
            </Link>
          ) : (
            <span className={`font-medium ${colour}`}>{item.label}</span>
          );
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {content}
              {!isLast && <span className="text-quedera-navy/30">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * BEACON — Reports & Dashboards library.
 *
 * PRD §10 — central searchable library across all QUEDERA products.
 *
 * Phase 2 work. This build delivers:
 *   - Search by title / description / metadata
 *   - Product filter (Pulse / Duet / Atlas / Beacon)
 *   - Content-type filter (Dashboard / Report / Scorecard / Insight)
 *   - Sort by name / product / type / last updated
 *   - Per-item product context badge
 *
 * Real content metadata contract gated by Risk #5.
 */

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { REPORTS } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { REPORT_TYPE_LABEL, type ReportType } from "@/lib/types";
import { QUEDERA_PRODUCTS } from "@/lib/brand";
import type { ProductName } from "@/lib/types";

const PRODUCT_OPTIONS: { value: ProductName | "ALL"; label: string }[] = [
  { value: "ALL", label: "All products" },
  { value: "PULSE", label: QUEDERA_PRODUCTS.PULSE.tagline.split(" ")[0] + " — Pulse" },
  { value: "DUET", label: "Duet" },
  { value: "ATLAS", label: "Atlas" },
  { value: "BEACON", label: "Beacon" },
];

const TYPE_OPTIONS: { value: ReportType | "ALL"; label: string }[] = [
  { value: "ALL", label: "All types" },
  { value: "dashboard", label: "Dashboard" },
  { value: "report", label: "Report" },
  { value: "scorecard", label: "Scorecard" },
  { value: "insight", label: "Executive Insight" },
];

const PRODUCT_ACCENT: Record<ProductName, string> = {
  PULSE: "text-quedera-cyan",
  DUET: "text-quedera-violet",
  ATLAS: "text-quedera-deep-blue",
  BEACON: "text-quedera-amber",
  SENTINEL: "text-quedera-emerald",
};

type SortKey = "name" | "product" | "type" | "updated";

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState<ProductName | "ALL">("ALL");
  const [type, setType] = useState<ReportType | "ALL">("ALL");
  const [sort, setSort] = useState<SortKey>("updated");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = REPORTS.filter((r) => {
      if (product !== "ALL" && r.productSlug !== product) return false;
      if (type !== "ALL" && r.type !== type) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.owner.toLowerCase().includes(q) ||
        (r.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });

    rows = [...rows].sort((a, b) => {
      switch (sort) {
        case "name":
          return a.title.localeCompare(b.title);
        case "product":
          return a.productSlug.localeCompare(b.productSlug);
        case "type":
          return a.type.localeCompare(b.type);
        case "updated":
        default:
          return b.lastUpdated.localeCompare(a.lastUpdated);
      }
    });

    return rows;
  }, [query, product, type, sort]);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Reports & Dashboards" }]}
        title="Reports & Dashboards"
        description="Central library across the QUEDERA portfolio — search, filter, and open any entitled item."
        eyebrow="Phase 2 — Reports Hub"
      />

      {/* Filter bar */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6">
            <label htmlFor="q" className="label">
              Search
            </label>
            <input
              id="q"
              type="search"
              placeholder="Title, description, tag, owner…"
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="product" className="label">
              Product
            </label>
            <select
              id="product"
              className="input"
              value={product}
              onChange={(e) => setProduct(e.target.value as typeof product)}
            >
              {PRODUCT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <label htmlFor="type" className="label">
              Type
            </label>
            <select
              id="type"
              className="input"
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-quedera-navy/60">
          <span>
            {filtered.length} of {REPORTS.length} items
          </span>
          <label className="flex items-center gap-2">
            <span className="text-quedera-navy/60">Sort:</span>
            <select
              className="input !py-1 !text-xs"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="updated">Last updated</option>
              <option value="name">Name</option>
              <option value="product">Product</option>
              <option value="type">Type</option>
            </select>
          </label>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="card text-center text-sm text-quedera-navy/60">
          No items match these filters.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-quedera-navy/60 border-b border-quedera-navy/10">
                <th className="py-2 font-semibold">Title</th>
                <th className="py-2 font-semibold">Product</th>
                <th className="py-2 font-semibold">Type</th>
                <th className="py-2 font-semibold">Owner</th>
                <th className="py-2 font-semibold">Updated</th>
                <th className="py-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-quedera-navy/5 last:border-b-0">
                  <td className="py-3">
                    <p className="font-semibold text-quedera-navy">{r.title}</p>
                    <p className="text-xs text-quedera-navy/60 line-clamp-1">{r.description}</p>
                  </td>
                  <td className={`py-3 font-semibold uppercase tracking-wider text-xs ${PRODUCT_ACCENT[r.productSlug]}`}>
                    {r.productSlug}
                  </td>
                  <td className="py-3 text-xs uppercase tracking-wider text-quedera-navy/70">
                    {REPORT_TYPE_LABEL[r.type]}
                  </td>
                  <td className="py-3 text-quedera-navy">{r.owner}</td>
                  <td className="py-3 text-quedera-navy/70">{r.lastUpdated}</td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Mock open — would deep-link to ${r.productSlug} preserving customer context.`)}
                      className="text-xs font-semibold uppercase tracking-wider text-quedera-emerald hover:text-quedera-emerald/80"
                    >
                      Open →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-quedera-navy/50">
        Cross-product content metadata contract pending — see{" "}
        <code className="font-mono">risks/register.md</code> §16 #5.
      </p>
    </>
  );
}

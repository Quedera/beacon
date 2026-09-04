/**
 * BEACON — Insights.
 *
 * Phase 4 — Cross-product executive view (KPIs, trends, recommendations).
 * This build delivers an empty state with a clear reference to Risk #6
 * so the gap is visible in the UI.
 */

import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Insights" }]}
        title="Insights"
        description="Cross-product executive view — KPIs, trends, risks, and recommendations at the portfolio level."
        eyebrow="Phase 4 — Cross-product"
      />

      <EmptyState
        title="Cross-product insights land in Phase 4"
        body="Aggregated executive KPIs across Pulse, Duet, Atlas, and Beacon need a stable metric contract before they render here. The PRD treats this as a distinct phase for a reason — the aggregation surface is non-trivial."
        phase="Phase 4 — pending"
        risk="Risk #6 — Cross-product metrics"
        ctaHref="/overview"
        ctaLabel="Back to portfolio summary"
      />
    </>
  );
}

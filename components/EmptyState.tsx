/**
 * BEACON — Empty state.
 *
 * Used for phase-deferred surfaces and "no data yet" cases. Distinct
 * from a generic placeholder — communicates the *why* (which phase, which
 * §16 blocker) so the gap is visible in the UI, not just the docs.
 */

import Link from "next/link";

interface EmptyStateProps {
  title: string;
  body?: string;
  /** Phase reference — e.g. "Phase 4 — Insights". */
  phase?: string;
  /** §16 risk reference — e.g. "Risk #6 — Cross-product metrics". */
  risk?: string;
  /** Optional CTA back to a working area. */
  ctaHref?: string;
  ctaLabel?: string;
}

export function EmptyState({ title, body, phase, risk, ctaHref, ctaLabel }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-quedera-navy/20 bg-quedera-surface p-8 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-quedera-amber mb-2">
        {phase ?? "Coming soon"}
      </p>
      <h3 className="text-lg font-bold text-quedera-navy mb-2">{title}</h3>
      {body && (
        <p className="text-sm text-quedera-navy/70 max-w-md mx-auto mb-4">{body}</p>
      )}
      {risk && (
        <p className="text-xs text-quedera-navy/50 mb-4">
          Pending decision: <span className="font-mono">{risk}</span>
        </p>
      )}
      {ctaHref && ctaLabel && (
        <Link href={ctaHref} className="btn-outline text-sm">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

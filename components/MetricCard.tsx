/**
 * BEACON — Metric card.
 *
 * KPI tile for the portfolio summary on Overview. Brand-locked with
 * optional accent per metric category.
 */

interface MetricCardProps {
  label: string;
  value: string | number;
  /** Optional supporting text under the value. */
  hint?: string;
  /** Optional accent for the value text. */
  accent?: "navy" | "deep-blue" | "cyan" | "violet" | "amber" | "emerald" | "navy-muted";
  /** When true, render a more compact variant. */
  compact?: boolean;
}

const ACCENT_TEXT: Record<NonNullable<MetricCardProps["accent"]>, string> = {
  navy: "text-quedera-navy",
  "deep-blue": "text-quedera-deep-blue",
  cyan: "text-quedera-cyan",
  violet: "text-quedera-violet",
  amber: "text-quedera-amber",
  emerald: "text-quedera-emerald",
  "navy-muted": "text-quedera-navy/60",
};

export function MetricCard({ label, value, hint, accent = "navy", compact = false }: MetricCardProps) {
  return (
    <div className={`card ${compact ? "p-4" : ""}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60">
        {label}
      </p>
      <p className={`${compact ? "text-2xl" : "text-3xl"} font-bold ${ACCENT_TEXT[accent]} mt-1`}>
        {value}
      </p>
      {hint && <p className="text-xs text-quedera-navy/60 mt-1">{hint}</p>}
    </div>
  );
}

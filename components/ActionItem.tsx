/**
 * BEACON — Action item.
 *
 * Used in the Overview action centre and on subscription cards. Each item
 * has a kind that drives the icon and accent colour (brand-locked).
 */

import Link from "next/link";
import type { ReactNode } from "react";

export type ActionKind =
  | "renewal_approaching"
  | "access_request"
  | "report_available"
  | "data_quality_issue"
  | "transition_milestone"
  | "info";

const KIND_ACCENT: Record<ActionKind, { dot: string; label: string }> = {
  renewal_approaching: { dot: "bg-quedera-amber", label: "Renewal approaching" },
  access_request: { dot: "bg-quedera-violet", label: "Access request" },
  report_available: { dot: "bg-quedera-emerald", label: "Report available" },
  data_quality_issue: { dot: "bg-quedera-deep-blue", label: "Data quality issue" },
  transition_milestone: { dot: "bg-quedera-cyan", label: "Transition milestone" },
  info: { dot: "bg-quedera-navy/40", label: "Info" },
};

interface ActionItemProps {
  kind: ActionKind;
  title: string;
  body?: string;
  href?: string;
  cta?: string;
  meta?: ReactNode;
}

export function ActionItem({ kind, title, body, href, cta = "View", meta }: ActionItemProps) {
  const accent = KIND_ACCENT[kind];

  return (
    <li className="flex items-start gap-3 rounded-md border border-quedera-navy/10 bg-quedera-surface p-4 hover:border-quedera-navy/20 transition-colors">
      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${accent.dot}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60">
          {accent.label}
        </p>
        <p className="font-semibold text-quedera-navy">{title}</p>
        {body && <p className="text-sm text-quedera-navy/70 mt-1">{body}</p>}
        {meta && <div className="text-xs text-quedera-navy/60 mt-1">{meta}</div>}
      </div>
      {href && (
        <Link
          href={href}
          className="text-xs font-semibold uppercase tracking-wider text-quedera-emerald hover:text-quedera-emerald/80 shrink-0"
        >
          {cta} →
        </Link>
      )}
    </li>
  );
}

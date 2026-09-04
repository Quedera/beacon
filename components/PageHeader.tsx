/**
 * BEACON — Page header.
 *
 * Wraps breadcrumb + page title + optional actions. Used at the top of
 * every authenticated page so the IA hierarchy is consistent.
 */

import type { ReactNode } from "react";
import { Breadcrumb, type CrumbItem } from "./Breadcrumb";

interface PageHeaderProps {
  /** Page-level breadcrumb items (after the fixed QUEDERA › BEACON). */
  crumbs: CrumbItem[];
  title: string;
  description?: string;
  /** Optional right-side slot for primary actions. */
  actions?: ReactNode;
  /** Eyebrow label shown above the title (e.g., "Phase 2 — Reports Hub"). */
  eyebrow?: string;
}

export function PageHeader({ crumbs, title, description, actions, eyebrow }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <div className="mb-3">
        <Breadcrumb items={crumbs} />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-quedera-amber mb-1">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-quedera-navy tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-quedera-navy/70 mt-2 max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}

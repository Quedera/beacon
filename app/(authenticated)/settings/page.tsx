/**
 * BEACON — Settings.
 *
 * Phase 1 — customer preferences (notifications, profile, display).
 * Skeleton form. Real preference writes land when the underlying
 * services exist.
 */

import { PageHeader } from "@/components/PageHeader";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Settings" }]}
        title="Settings"
        description="Notifications, profile, display, and organisation preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60 mb-2">
            Notifications
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-quedera-navy">Renewal reminders (in-app)</span>
              <span className="badge bg-quedera-emerald/10 text-quedera-emerald">On</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-quedera-navy">Renewal reminders (email)</span>
              <span className="badge bg-quedera-navy/5 text-quedera-navy/60">Pending §18 Q7</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-quedera-navy">New reports available</span>
              <span className="badge bg-quedera-emerald/10 text-quedera-emerald">On</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-quedera-navy">Access requests</span>
              <span className="badge bg-quedera-emerald/10 text-quedera-emerald">On</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60 mb-2">
            Display
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-quedera-navy">Default landing page</span>
              <span className="text-quedera-navy/70">Overview</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-quedera-navy">Time zone</span>
              <span className="text-quedera-navy/70">Europe/London</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-quedera-navy">Date format</span>
              <span className="text-quedera-navy/70">ISO 8601</span>
            </li>
          </ul>
        </div>

        <div className="card md:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-quedera-navy/60 mb-2">
            Organisation
          </p>
          <p className="text-sm text-quedera-navy/70">
            Customer name, region, and industry are managed in the
            identity service. Edit requests flow through your QUEDERA
            account manager.
          </p>
        </div>
      </div>
    </>
  );
}

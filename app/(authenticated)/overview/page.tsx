/**
 * BEACON — Overview.
 *
 * PRD §7 — the eight required elements:
 *   1. Header (Shell)
 *   2. Portfolio summary
 *   3. Product cards
 *   4. Action centre
 *   5. Executive highlights
 *   6. Recent content
 *   7. Favourites
 *   8. Quick links
 *
 * Plus FR-001 — active customer context shown prominently.
 *
 * All data is from the same mock store; client components subscribe to
 * the active customer via CustomerProvider so switching org re-scopes
 * every panel.
 */

import { CustomerPanel } from "./CustomerPanel";
import { OverviewContent } from "./OverviewContent";

export default function OverviewPage() {
  return (
    <>
      <CustomerPanel />
      <OverviewContent />
    </>
  );
}

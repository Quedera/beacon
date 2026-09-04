/**
 * BEACON — Header.
 *
 * Hub chrome. Persistent across every authenticated route.
 * Brand layer (per architecture/brand-hierarchy.md):
 *   - QUEDERA wordmark (navy) — master brand, always present
 *   - BEACON sublabel (amber) — hub brand
 *   - Customer selector (PRD §11 — "always show active customer context")
 *   - Notifications + profile (FR-016 / PRD §7)
 */

import Link from "next/link";
import { CustomerSelector } from "./CustomerSelector";
import { NotificationBell } from "./NotificationBell";
import { UserMenu } from "./UserMenu";
import { ProductMark } from "./ProductMark";

export function Header() {
  return (
    <header className="border-b border-quedera-navy/10 bg-quedera-surface sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/overview" className="block shrink-0" aria-label="BEACON home">
          <ProductMark product="BEACON" />
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <CustomerSelector />
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import type { ProductName } from "@/lib/brand";
import { ProductMark } from "./ProductMark";

interface HeaderProps {
  product: ProductName | "QUEDERA";
}

/**
 * Brand-locked header. Pass `product` to render the lockup for that
 * product, or "QUEDERA" for the umbrella mark.
 */
export function Header({ product }: HeaderProps) {
  return (
    <header className="border-b border-quedera-navy/10 bg-quedera-surface">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="block">
          <ProductMark product={product} />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold tracking-wider">
          <Link href="/brand-kit" className="text-quedera-navy hover:text-quedera-emerald">
            BRAND KIT
          </Link>
        </nav>
      </div>
    </header>
  );
}
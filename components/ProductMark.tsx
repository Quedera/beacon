import type { ProductName } from "@/lib/brand";
import { QUEDERA_PRODUCTS, QUEDERA_BRAND } from "@/lib/brand";

interface ProductMarkProps {
  /** Product name. Use "QUEDERA" for the master umbrella mark only. */
  product: ProductName | "QUEDERA";
  /** Optional size multiplier. 1 = default (34x40 shield-equivalent). */
  size?: number;
}

/**
 * Renders the QUEDERA + product lockup.
 *
 * The product name (PULSE, ATLAS, etc.) renders in its assigned palette
 * colour; "QUEDERA" above it renders in navy. The lockup is the canonical
 * QUEDERA wordmark — see branding/quedera-product-suite-logos.jpg.
 */
export function ProductMark({ product, size = 1 }: ProductMarkProps) {
  const isMaster = product === "QUEDERA";
  const productInfo = isMaster ? QUEDERA_BRAND.master : QUEDERA_PRODUCTS[product];
  const colourClass = `bg-${productInfo.token}`;
  const textColourClass = `text-${productInfo.token}`;

  const w = 34 * size;
  const h = 40 * size;
  const stroke = isMaster ? QUEDERA_BRAND.master.hex : productInfo.hex;

  return (
    <div className="flex items-center gap-3">
      {/* Colour swatch as a stand-in for the product mark.
          Replace with the real product mark SVG when forking. */}
      <div
        className={`${colourClass} rounded-md`}
        style={{ width: w, height: h }}
        aria-hidden="true"
      />
      <div className="flex flex-col leading-none">
        <span className="text-sm font-semibold text-quedera-navy tracking-[0.2em]">
          QUEDERA
        </span>
        <span className={`text-lg font-bold ${textColourClass} tracking-[0.15em]`}>
          {isMaster ? "MASTER BRAND" : product}
        </span>
      </div>
    </div>
  );
}
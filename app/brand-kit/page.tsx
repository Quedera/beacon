import { QUEDERA_PRODUCTS, QUEDERA_BRAND, QUEDERA_SURFACE } from "@/lib/brand";

/**
 * Brand Kit page — visual reference for the canonical QUEDERA palette
 * and product suite. Anyone building inside the QUEDERA family should
 * read this before shipping UI.
 */

const PALETTE_TOKES = [
  { token: "quedera-navy",      hex: QUEDERA_BRAND.master.hex,         role: "Master wordmark" },
  { token: "quedera-deep-blue", hex: QUEDERA_PRODUCTS.ATLAS.hex,       role: "ATLAS product brand" },
  { token: "quedera-cyan",      hex: QUEDERA_PRODUCTS.PULSE.hex,       role: "PULSE product brand" },
  { token: "quedera-violet",    hex: QUEDERA_PRODUCTS.DUET.hex,        role: "DUET product brand" },
  { token: "quedera-amber",     hex: QUEDERA_PRODUCTS.BEACON.hex,      role: "BEACON product brand" },
  { token: "quedera-emerald",   hex: QUEDERA_PRODUCTS.SENTINEL.hex,    role: "SENTINEL product brand" },
  { token: "quedera-surface",   hex: QUEDERA_SURFACE.hex,              role: "Universal surface / background" },
];

const PRODUCT_CARDS = [
  { name: "PULSE",    product: "PULSE"    as const, blurb: "ITSM Maturity Assessment" },
  { name: "DUET",     product: "DUET"     as const, blurb: "Service Transition" },
  { name: "ATLAS",    product: "ATLAS"    as const, blurb: "SaCM Discovery & CMDB Validation" },
  { name: "BEACON",   product: "BEACON"   as const, blurb: "Executive Dashboards & Insights" },
  { name: "SENTINEL", product: "SENTINEL" as const, blurb: "Consulting Marketplace" },
];

export default function BrandKitPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-quedera-navy text-quedera-surface py-16">
        <div className="container mx-auto px-4">
          <p className="text-xs uppercase tracking-[0.2em] text-quedera-emerald mb-3">
            Reference
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            QUEDERA Brand Kit
          </h1>
          <p className="text-quedera-surface max-w-2xl">
            Seven palette tokens. No off-palette colours anywhere. Rule locked
            2026-08-26 in #branding.
          </p>
        </div>
      </section>

      {/* Palette swatches */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-quedera-navy mb-6 uppercase tracking-wider">
            Palette
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PALETTE_TOKES.map((t) => (
              <div key={t.token} className="card">
                <div
                  className="h-20 rounded-md mb-3 border border-quedera-navy/10"
                  style={{ backgroundColor: t.hex }}
                  aria-label={`${t.token} swatch`}
                />
                <p className="text-xs uppercase tracking-wider text-quedera-navy/60 mb-1">
                  {t.role}
                </p>
                <p className="font-mono text-sm font-bold text-quedera-navy">
                  {t.token}
                </p>
                <p className="font-mono text-xs text-quedera-navy/70">
                  {t.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product suite */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-quedera-navy mb-6 uppercase tracking-wider">
            Product Suite
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_CARDS.map((p) => {
              const info = QUEDERA_PRODUCTS[p.product];
              return (
                <div key={p.product} className="card">
                  <div
                    className="h-16 rounded-md mb-3 border border-quedera-navy/10 flex items-center justify-center"
                    style={{ backgroundColor: info.hex }}
                  >
                    <span className="text-quedera-navy font-bold tracking-[0.2em] text-lg">
                      {p.product}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-quedera-navy/60 mb-1">
                    {p.blurb}
                  </p>
                  <p className="font-mono text-xs text-quedera-navy/70">
                    {info.token} · {info.hex}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Usage rules */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-xl font-bold text-quedera-navy mb-6 uppercase tracking-wider">
            Rules
          </h2>
          <ul className="space-y-3 text-quedera-navy/80">
            <li>
              <strong className="text-quedera-navy">Palette codes only.</strong>{" "}
              No off-palette colours. If a shade isn't in the palette, pick the
              closest token and use an opacity modifier.
            </li>
            <li>
              <strong className="text-quedera-navy">Opacity modifiers compose.</strong>{" "}
              Tailwind preset uses <code className="bg-quedera-surface px-1 rounded">rgb(... / &lt;alpha-value&gt;)</code>,
              so <code className="bg-quedera-surface px-1 rounded">bg-quedera-emerald/10</code> works.
            </li>
            <li>
              <strong className="text-quedera-navy">Contrast over aesthetics.</strong>{" "}
              When a token-on-token combo fails WCAG, swap the text colour to{" "}
              <code className="bg-quedera-surface px-1 rounded">quedera-navy</code>,
              not introduce a new white or black.
            </li>
            <li>
              <strong className="text-quedera-navy">Pre-ship audit.</strong>{" "}
              Grep for any <code className="bg-quedera-surface px-1 rounded">(bg|text|border|...)-(white|black|gray|blue|red|...)</code>{" "}
              and <code className="bg-quedera-surface px-1 rounded">#X{"{3,6}"}</code>{" "}
              should return only the seven canonical hex values.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
import { PRODUCT_CONFIG } from "@/product.config";

export default function LandingPage() {
  const { name, tagline, pitch } = PRODUCT_CONFIG;

  return (
    <div>
      <section className="bg-gradient-to-br from-quedera-navy via-quedera-deep-blue to-quedera-navy text-quedera-surface py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="badge bg-quedera-emerald/10 text-quedera-emerald mb-6">
            {name}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {tagline.toUpperCase()}
          </h1>
          <p className="text-lg text-quedera-surface max-w-2xl mx-auto mb-10">
            {pitch}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-quedera-surface/80">
            Scaffold template — edit product.config.ts to specialise
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-quedera-navy mb-4">
            About this scaffold
          </h2>
          <p className="text-quedera-navy/70 mb-8">
            Brand-locked skeleton for any QUEDERA product. Every colour in this
            scaffold comes from the canonical palette at{" "}
            <code className="bg-quedera-surface px-1.5 py-0.5 rounded text-sm">
              ~/.openclaw/workspace/branding/quedera-palette.json
            </code>
            . No off-palette hex codes anywhere.
          </p>
          <a href="/brand-kit" className="btn-primary">
            View the Brand Kit
          </a>
        </div>
      </section>
    </div>
  );
}
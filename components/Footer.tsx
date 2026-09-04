/**
 * BEACON — Footer.
 *
 * Brand-locked. Adds a persistent "mock data" notice on authenticated
 * pages so the §16 risk mitigation is visible in the UI itself.
 */

interface FooterProps {
  /** When true, render the mock-data notice. */
  showMockNotice?: boolean;
}

export function Footer({ showMockNotice = false }: FooterProps) {
  return (
    <footer className="border-t border-quedera-navy/10 mt-12">
      {showMockNotice && (
        <div className="bg-quedera-amber/10 border-b border-quedera-amber/20">
          <div className="container mx-auto px-4 py-2 text-xs text-quedera-navy/80 text-center">
            ⚠ Mock data — not connected to live services. See §16 in{" "}
            <code className="font-mono">risks/register.md</code>.
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-6 text-sm text-quedera-navy/60">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p>
            <span className="font-semibold text-quedera-navy">QUEDERA BEACON</span>
            <span className="ml-3">— The QUEDERA Control Centre.</span>
          </p>
          <p className="text-xs">
            Brand palette:{" "}
            <a href="/brand-kit" className="underline hover:text-quedera-emerald">
              /brand-kit
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-quedera-navy/10 py-8 mt-16">
      <div className="container mx-auto px-4 text-sm text-quedera-navy/60">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            <span className="font-semibold text-quedera-navy">QUEDERA</span>
            <span className="ml-3">— Trusted expertise. Controlled engagement.</span>
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
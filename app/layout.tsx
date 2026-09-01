import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCT_CONFIG } from "@/product.config";

export const metadata: Metadata = {
  title: "QUEDERA Product — Brand-locked scaffold template",
  description:
    "Scaffold template for any QUEDERA product. Fork this repo and edit product.config.ts to specialise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header product={PRODUCT_CONFIG.name} />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
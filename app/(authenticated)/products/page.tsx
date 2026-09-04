/**
 * BEACON — Product catalogue.
 *
 * PRD §3 + FR-002: "display all products available to the customer,
 * including products not currently subscribed to where discovery is
 * permitted."
 *
 * 4 branded product cards (Pulse / Duet / Atlas / Beacon) with status
 * badges and primary actions.
 */

"use client";

import { useMemo } from "react";
import { useCustomer } from "@/lib/customer-context";
import { productStatusesFor } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";

export default function ProductsPage() {
  const { customer, hydrated } = useCustomer();
  const views = useMemo(
    () => (hydrated ? productStatusesFor(customer.id) : []),
    [customer.id, hydrated],
  );

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products" }]}
        title="Product Catalogue"
        description="Every QUEDERA product available to your organisation — subscribed, in trial, or available to request."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {views.map((v) => (
          <ProductCard key={v.product.slug} view={v} />
        ))}
      </div>
    </>
  );
}

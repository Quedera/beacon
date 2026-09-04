/**
 * BEACON — Administration.
 *
 * FR-017 — "Authorised customer administrators can manage user access to
 * products and content." This build shows the customer-side admin
 * surface: user list + role assignment, scoped to the active customer.
 *
 * Role-gated to customer_admin (FR-018). Other roles see a restricted
 * fallback.
 *
 * QUEDERA-side admin (cross-customer) is out of scope per PRD §2.2 and
 * Risk #7.
 */

"use client";

import { useCustomer } from "@/lib/customer-context";
import { USERS } from "@/lib/mock-data";
import { ROLE_LABEL } from "@/lib/types";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { RoleGate } from "@/components/RoleGate";

export default function AdminPage() {
  const { customer, hydrated } = useCustomer();
  const users = hydrated ? USERS.filter((u) => u.customerId === customer.id) : [];

  return (
    <RoleGate
      allow={["customer_admin"]}
      fallback={
        <EmptyState
          title="Administration is restricted to Customer Administrators"
          body="Switch to a Customer Administrator role to manage users and access."
          phase="Restricted"
          ctaHref="/overview"
          ctaLabel="Back to Overview"
        />
      }
    >
      <PageHeader
        crumbs={[{ label: "Administration" }]}
        title="Administration"
        description="Manage users, roles, and product access for your organisation."
        eyebrow="Customer-side admin"
      />

      <div className="card overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-quedera-navy/60 border-b border-quedera-navy/10">
              <th className="py-2 font-semibold">Name</th>
              <th className="py-2 font-semibold">Email</th>
              <th className="py-2 font-semibold">Role</th>
              <th className="py-2 font-semibold">Product scope</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-quedera-navy/5 last:border-b-0">
                <td className="py-3 font-semibold text-quedera-navy">{u.name}</td>
                <td className="py-3 text-quedera-navy/70">{u.email}</td>
                <td className="py-3 text-quedera-navy/70">{ROLE_LABEL[u.role]}</td>
                <td className="py-3 text-quedera-navy/70">{u.productScope ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-quedera-navy/10 bg-quedera-surface p-4 text-xs text-quedera-navy/60">
        <p className="font-semibold text-quedera-navy mb-1">Audit trail</p>
        <p>
          Writes (grant / revoke / role change) generate audit records per
          NFR-005. See <code className="font-mono">risks/register.md</code> §16 #3 — access-control service pending.
        </p>
      </div>
    </RoleGate>
  );
}

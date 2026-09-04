/**
 * BEACON — Sign-in (demo picker).
 *
 * Production auth lands with the identity service (Risk #3). Until then
 * this screen lets a reviewer pick:
 *   - Customer (drives tenancy / data scope)
 *   - User (drives role + visibility)
 *
 * The picker writes the active session to the CustomerProvider; the
 * authenticated shell then renders /overview with the chosen pair.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCustomer } from "@/lib/customer-context";
import { CUSTOMERS, USERS } from "@/lib/mock-data";
import { ROLE_LABEL, type Role } from "@/lib/types";
import { ProductMark } from "@/components/ProductMark";

export default function SignInPage() {
  const router = useRouter();
  const { setActiveCustomer, setActiveUser } = useCustomer();
  const [customerId, setCustomerId] = useState(CUSTOMERS[0].id);
  const customersUsers = USERS.filter((u) => u.customerId === customerId);
  const [userId, setUserId] = useState(customersUsers[0]?.id ?? "");

  function onCustomerChange(next: string) {
    setCustomerId(next);
    const firstUser = USERS.find((u) => u.customerId === next);
    if (firstUser) setUserId(firstUser.id);
  }

  function onContinue() {
    setActiveCustomer(customerId);
    if (userId) setActiveUser(userId);
    router.push("/overview");
  }

  return (
    <div className="min-h-screen flex flex-col bg-quedera-surface">
      <header className="border-b border-quedera-navy/10 bg-quedera-surface">
        <div className="container mx-auto px-4 py-4">
          <ProductMark product="BEACON" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-quedera-amber mb-2">
            Demo sign-in
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-quedera-navy mb-2">
            Choose your customer + role
          </h1>
          <p className="text-sm text-quedera-navy/70 mb-8">
            Identity service is mocked (Risk #3 — PRD §16). In production this is
            replaced by SSO against the enterprise IdP, with the same picker behaviour
            driven by tenant claims.
          </p>

          <div className="card space-y-5">
            <div>
              <label htmlFor="customer" className="label">
                Customer
              </label>
              <select
                id="customer"
                className="input"
                value={customerId}
                onChange={(e) => onCustomerChange(e.target.value)}
              >
                {CUSTOMERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.industry ? ` — ${c.industry}` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="user" className="label">
                Acting as
              </label>
              <select
                id="user"
                className="input"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                {customersUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} — {ROLE_LABEL[u.role as Role]}
                  </option>
                ))}
              </select>
              <p className="text-xs text-quedera-navy/60 mt-1.5">
                Different roles reveal different navigation areas — try Customer
                Administrator vs Executive.
              </p>
            </div>

            <button type="button" onClick={onContinue} className="btn-primary w-full">
              Continue to Beacon
            </button>
          </div>

          <p className="text-xs text-quedera-navy/50 text-center mt-6">
            <Link href="/brand-kit" className="underline hover:text-quedera-navy">
              View the brand kit
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

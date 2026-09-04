import type { Metadata } from "next";
import "./globals.css";
import { CustomerProvider } from "@/lib/customer-context";
import { CUSTOMERS, USERS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "QUEDERA Beacon — The QUEDERA Control Centre",
  description:
    "Central customer-facing hub for the QUEDERA portfolio. Discover products, manage subscriptions, access reporting.",
};

/**
 * Root layout — wraps every route in the CustomerProvider so both the
 * authenticated shell and the sign-in picker can read/write the active
 * session.
 *
 * The CustomerProvider hydrates from localStorage on the client, but the
 * initial render uses a sensible default (Acme + Craig) so SSR has data.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialCustomer = CUSTOMERS[0];
  const initialUser =
    USERS.find((u) => u.customerId === initialCustomer.id) ?? USERS[0];

  return (
    <html lang="en">
      <body>
        <CustomerProvider
          initial={{ customerId: initialCustomer.id, userId: initialUser.id }}
        >
          {children}
        </CustomerProvider>
      </body>
    </html>
  );
}

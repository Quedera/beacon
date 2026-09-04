/**
 * Root page — redirect straight into Beacon.
 *
 * For now we route to /sign-in so the demo always lands on the customer
 * picker (matches the "what is BEACON" expectation for a reviewer).
 * A signed-in user can always hit /overview directly via the header.
 */

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/sign-in");
}

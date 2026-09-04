/**
 * Authenticated layout — wraps every signed-in route with the Shell.
 *
 * The Shell provides the global header (customer context, notifications,
 * profile) and the left navigation (role-gated). All authenticated pages
 * live under this group.
 */

import type { ReactNode } from "react";
import { Shell } from "@/components/Shell";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}

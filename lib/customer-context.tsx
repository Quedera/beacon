/**
 * BEACON — customer context provider.
 *
 * Holds the active customer + user + role for the demo session. In
 * production this would come from the identity service (Risk #3) — here
 * it's set via the demo picker at /sign-in and stored in localStorage so
 * the choice survives page navigation.
 *
 * Why client-only:
 * - Customer switching happens mid-session via the header dropdown.
 * - All authenticated routes need to re-render based on the active pair.
 * - NFR-001 says entitlement enforcement is server-side; this client
 *   context is the *display* layer. Real enforcement lands when the
 *   identity service exists.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CUSTOMERS, USERS } from "./mock-data";
import type { Customer, User } from "./types";

const STORAGE_KEY = "beacon.active_session.v1";

interface ActiveSession {
  customerId: string;
  userId: string;
}

interface CustomerContextValue {
  customer: Customer;
  user: User;
  /** All available customers (for the selector). */
  customers: Customer[];
  /** All users belonging to the active customer. */
  customerUsers: User[];
  /** Switch to a different customer. Re-picks the first user in that org. */
  setActiveCustomer: (customerId: string) => void;
  /** Switch to a different user within the active customer. */
  setActiveUser: (userId: string) => void;
  /** Clear the session (used by the sign-out flow). */
  signOut: () => void;
  /** True once we've hydrated from localStorage. */
  hydrated: boolean;
}

const CustomerContext = createContext<CustomerContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
  /** Initial session used for SSR — defaults to Acme + Craig. */
  initial?: ActiveSession;
}

export function CustomerProvider({ children, initial }: ProviderProps) {
  const fallback: ActiveSession = initial ?? {
    customerId: "cust_acme",
    userId: "user_craig",
  };

  const [session, setSession] = useState<ActiveSession>(fallback);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ActiveSession;
        if (
          CUSTOMERS.some((c) => c.id === parsed.customerId) &&
          USERS.some((u) => u.id === parsed.userId && u.customerId === parsed.customerId)
        ) {
          setSession(parsed);
        }
      }
    } catch {
      // Ignore — fall back to defaults.
    }
    setHydrated(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Ignore quota errors.
    }
  }, [session, hydrated]);

  const customer = useMemo(
    () => CUSTOMERS.find((c) => c.id === session.customerId) ?? CUSTOMERS[0],
    [session.customerId],
  );
  const user = useMemo(
    () =>
      USERS.find(
        (u) => u.id === session.userId && u.customerId === customer.id,
      ) ??
      USERS.find((u) => u.customerId === customer.id) ??
      USERS[0],
    [session.userId, customer.id],
  );

  const customerUsers = useMemo(
    () => USERS.filter((u) => u.customerId === customer.id),
    [customer.id],
  );

  const setActiveCustomer = useCallback((customerId: string) => {
    const firstUserInOrg =
      USERS.find((u) => u.customerId === customerId) ?? USERS[0];
    setSession({ customerId, userId: firstUserInOrg.id });
  }, []);

  const setActiveUser = useCallback(
    (userId: string) => {
      // Only allow users in the active customer.
      const target = USERS.find(
        (u) => u.id === userId && u.customerId === customer.id,
      );
      if (target) setSession({ customerId: customer.id, userId });
    },
    [customer.id],
  );

  const signOut = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
    setSession(fallback);
  }, [fallback]);

  const value = useMemo<CustomerContextValue>(
    () => ({
      customer,
      user,
      customers: CUSTOMERS,
      customerUsers,
      setActiveCustomer,
      setActiveUser,
      signOut,
      hydrated,
    }),
    [customer, user, customerUsers, setActiveCustomer, setActiveUser, signOut, hydrated],
  );

  return (
    <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
  );
}

export function useCustomer(): CustomerContextValue {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    throw new Error("useCustomer must be used inside <CustomerProvider>");
  }
  return ctx;
}

/** Read the active customer without throwing if outside the provider. */
export function useOptionalCustomer(): CustomerContextValue | null {
  return useContext(CustomerContext);
}

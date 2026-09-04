/**
 * BEACON — Authenticated shell.
 *
 * Composes Header + LeftNav + content frame. Used as the layout wrapper
 * for every authenticated route.
 *
 * Layout:
 *   [ Header — sticky ]
 *   [ Left nav (md+)  |  Content           ]
 *   [ Footer                               ]
 *
 * Mobile: LeftNav collapses into a hamburger. (Not implemented in this
 * Phase 1 build — desktop + tablet only per PRD §20.)
 */

"use client";

import type { ReactNode } from "react";
import { Header } from "./Header";
import { LeftNav } from "./LeftNav";
import { Footer } from "./Footer";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-quedera-surface">
      <Header />
      <div className="container mx-auto px-4 flex-1 w-full">
        <div className="flex gap-6 py-6">
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-20">
              <LeftNav />
            </div>
          </aside>
          <main className="flex-1 min-w-0 pb-12">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

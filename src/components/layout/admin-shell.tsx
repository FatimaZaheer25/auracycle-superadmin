"use client";

import { useState, type ReactNode } from "react";
import { AdminHeader } from "./admin-header";
import { Sidebar } from "./sidebar";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main
          tabIndex={0}
          className="scroll-on-interact min-h-0 flex-1 overflow-y-auto p-4 md:p-6 outline-none"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

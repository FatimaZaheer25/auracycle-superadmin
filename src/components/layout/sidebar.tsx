"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, LogOut, X } from "lucide-react";
import { ADMIN_NAV_GROUPS, isNavActive } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";
import { NAV_ICONS } from "./nav-icons";

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        className={cn(
          "fixed inset-0 z-40 bg-foreground/30 transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-[var(--sidebar-width)] shrink-0 flex-col border-r border-border bg-surface transition-transform duration-200 md:sticky md:top-0 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Admin navigation"
      >
        <div className="flex items-start justify-between gap-2 border-b border-border px-4 py-4">
          <Link href="/dashboard" className="flex items-start gap-2.5" onClick={onClose}>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4 fill-current" aria-hidden />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">AuraCycle</p>
              <p className="text-xs text-muted">Super Admin Console</p>
            </div>
          </Link>
          <button
            type="button"
            className="rounded-[var(--radius-sm)] p-2 text-muted hover:bg-surface-muted md:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav
          tabIndex={0}
          className="scroll-on-interact flex-1 overflow-y-auto px-3 py-4 outline-none"
        >
          <div className="space-y-5">
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const active = isNavActive(pathname, item.href);
                    const Icon = NAV_ICONS[item.icon];

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 rounded-[var(--radius)] px-3 py-2 text-sm font-medium transition-colors",
                            active
                              ? "bg-primary-soft text-primary-deep"
                              : "text-muted hover:bg-surface-muted hover:text-foreground",
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0",
                              active ? "text-primary" : "text-muted-foreground",
                            )}
                            aria-hidden
                          />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="space-y-2 border-t border-border px-3 py-4">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-2 rounded-[var(--radius)] px-3 py-2 text-sm font-medium text-muted hover:bg-surface-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out
          </Link>
          <div className="flex items-center gap-3 rounded-[var(--radius)] bg-surface-muted px-3 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2426] text-xs font-semibold text-white">
              N
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                Super Admin
              </p>
              <p className="mt-0.5 inline-flex rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-medium text-success">
                MFA verified
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  KeyRound,
  LogOut,
  Monitor,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    href: "/profile",
    label: "My profile",
    icon: UserRound,
  },
  {
    href: "/profile#security",
    label: "Security & password",
    icon: KeyRound,
  },
  {
    href: "/profile#sessions",
    label: "Active sessions",
    icon: Monitor,
  },
  {
    href: "/profile#alerts",
    label: "Notification settings",
    icon: Bell,
  },
] as const;

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-[var(--radius)] px-2 py-1.5 hover:bg-surface-muted"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          SA
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium text-foreground">
            Super Admin
          </span>
          <span className="block text-xs text-muted">admin@auracycle.com</span>
        </span>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 text-muted transition-transform sm:block",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-[280px] overflow-hidden rounded-[16px] border border-[#d9cdcf] bg-white shadow-[0_16px_40px_rgba(34,28,30,0.12)]"
        >
          <div className="border-b border-[#ebe3e3] px-4 py-3.5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#efd5de] text-sm font-semibold text-[#7a2f48]">
                SA
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#221c1e]">
                  Super Admin
                </p>
                <p className="truncate text-xs text-[#8f8589]">
                  admin@auracycle.com
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="inline-flex rounded-full bg-[#f0d0d9] px-2 py-0.5 text-[10px] font-medium text-[#a33d52]">
                    Super Admin
                  </span>
                  <span className="inline-flex rounded-full bg-[#c5ebe6] px-2 py-0.5 text-[10px] font-medium text-[#0d6b64]">
                    MFA on
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm text-[#221c1e] transition-colors hover:bg-[#f7f1f0]"
                >
                  <Icon className="h-4 w-4 text-[#8f8589]" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-[#ebe3e3] p-1.5">
            <Link
              href="/login"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium text-[#a31f15] transition-colors hover:bg-[#f7d4d0]/50"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Log out
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

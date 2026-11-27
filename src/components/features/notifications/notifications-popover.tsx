"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, ChevronRight } from "lucide-react";
import type { AppNotification } from "./types";
import { cn } from "@/lib/utils";
import { NotificationIconBadge } from "./notification-icon";

type NotificationsPopoverProps = {
  items: AppNotification[];
};

type PopoverTab = "all" | "unread";

export function NotificationsPopover({ items }: NotificationsPopoverProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<PopoverTab>("all");
  const [list, setList] = useState(items);
  const rootRef = useRef<HTMLDivElement>(null);

  const unreadCount = list.filter((n) => n.unread).length;
  const visible =
    tab === "unread" ? list.filter((n) => n.unread) : list.slice(0, 5);
  const empty = unreadCount === 0 && tab === "unread";

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

  function markAllRead() {
    setList((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="relative rounded-[var(--radius)] p-2 text-muted hover:bg-surface-muted hover:text-foreground"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 ? (
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute top-full right-0 z-50 mt-2 w-[380px] overflow-hidden rounded-[16px] border border-[#d9cdcf] bg-white shadow-[0_16px_40px_rgba(34,28,30,0.14)]">
          <div className="flex items-center justify-between border-b border-[#ebe3e3] px-4 py-3">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Notifications
            </h2>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs font-medium text-primary hover:underline"
              >
                Mark all as read
              </button>
            ) : null}
          </div>

          <div className="flex gap-4 border-b border-[#ebe3e3] px-4">
            {(
              [
                { id: "all", label: "All" },
                { id: "unread", label: `Unread · ${unreadCount}` },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "-mb-px border-b-2 pb-2.5 pt-2 text-xs font-medium",
                  tab === item.id
                    ? "border-primary text-primary"
                    : "border-transparent text-[#6b6165]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {empty || (list.length === 0 && unreadCount === 0 && tab === "all") ? (
            <div className="px-6 py-10 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#efd5de] text-primary">
                <Bell className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-3 text-sm font-semibold text-[#221c1e]">
                You are all caught up
              </p>
              <p className="mt-1 text-xs text-[#8f8589]">
                New cases, requests and reviews will show up here.
              </p>
            </div>
          ) : (
            <ul className="max-h-[420px] overflow-y-auto">
              {visible.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-[#ebe3e3] px-4 py-3 last:border-0"
                >
                  <div className="flex gap-3">
                    <NotificationIconBadge kind={item.icon} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#221c1e]">
                          {item.title}
                        </p>
                        {item.unread ? (
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-xs text-[#8f8589]">
                        {item.meta}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-[#8f8589]">
                          {item.time}
                        </span>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
                        >
                          {item.actionLabel}
                          <ChevronRight className="h-3 w-3" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-[#ebe3e3] px-4 py-3 text-center">
            {empty || unreadCount === 0 ? (
              <Link
                href="/profile#alerts"
                onClick={() => setOpen(false)}
                className="text-xs font-medium text-primary hover:underline"
              >
                Notification settings
              </Link>
            ) : (
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="text-xs font-medium text-primary hover:underline"
              >
                View all notifications
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

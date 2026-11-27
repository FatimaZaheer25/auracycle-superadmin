"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Settings } from "lucide-react";
import type { AppNotification, NotificationCategory } from "./types";
import { Button, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import { NotificationIconBadge } from "./notification-icon";

type NotificationsViewProps = {
  subtitle: string;
  items: AppNotification[];
};

type FilterId = "all" | "unread" | NotificationCategory;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "recovery", label: "Recovery" },
  { id: "legal", label: "Legal and privacy" },
  { id: "content", label: "Content" },
  { id: "community", label: "Community" },
  { id: "billing", label: "Billing" },
];

export function NotificationsView({
  subtitle,
  items: initial,
}: NotificationsViewProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [list, setList] = useState(initial);

  const unreadCount = list.filter((n) => n.unread).length;

  const filtered = useMemo(() => {
    if (filter === "all") return list;
    if (filter === "unread") return list.filter((n) => n.unread);
    if (filter === "legal")
      return list.filter(
        (n) => n.category === "legal" || n.category === "privacy",
      );
    return list.filter((n) => n.category === filter);
  }, [filter, list]);

  function markAllRead() {
    setList((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Notifications"
        description={subtitle}
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full gap-1.5"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4" aria-hidden />
              Mark all as read
            </Button>
            <Link href="/profile#alerts">
              <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                <Settings className="h-4 w-4" aria-hidden />
                Settings
              </Button>
            </Link>
          </>
        }
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const label =
            item.id === "unread" ? `Unread · ${unreadCount}` : item.label;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium",
                filter === item.id
                  ? "bg-[#efd5de] text-primary"
                  : "bg-[#f0e8e6] text-[#6b6165] hover:bg-[#efd5de]/60",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-[16px] border border-[#d9cdcf] bg-white">
        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-semibold text-[#221c1e]">
              You are all caught up
            </p>
            <p className="mt-1 text-xs text-[#8f8589]">
              New cases, requests and reviews will show up here.
            </p>
          </div>
        ) : (
          <ul>
            {filtered.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
                  index < filtered.length - 1 && "border-b border-[#ebe3e3]",
                )}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <NotificationIconBadge kind={item.icon} />
                  <div className="min-w-0">
                    <div className="flex items-start gap-2">
                      <p className="text-sm font-semibold text-[#221c1e]">
                        {item.title}
                      </p>
                      {item.unread ? (
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-[#8f8589]">
                      {item.meta} · {item.time}
                    </p>
                  </div>
                </div>
                <Link href={item.href} className="shrink-0 sm:ml-4">
                  <Button size="sm" variant="outline" className="rounded-full">
                    {item.actionLabel}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

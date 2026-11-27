import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { UserDetail } from "../user-detail.types";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type UserDetailHeaderProps = {
  user: UserDetail;
};

const syncPill: Record<UserDetail["syncTone"], string> = {
  ok: "bg-[#e6f7f5] text-[#1f7a72]",
  warn: "bg-[#f8eedc] text-[#9a6b1f]",
  error: "bg-[#fde8e6] text-[#b42318]",
};

const syncDot: Record<UserDetail["syncTone"], string> = {
  ok: "bg-[#1f7a72]",
  warn: "bg-[#c4a035]",
  error: "bg-[#b42318]",
};

export function UserDetailHeader({ user }: UserDetailHeaderProps) {
  return (
    <div className="space-y-4">
      <nav className="flex items-center gap-1.5 text-sm text-[#9a9094]">
        <Link href="/users" className="hover:text-primary">
          Users
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className="font-medium text-[#2a2426]">{user.id}</span>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg font-semibold text-primary-deep">
            {user.initial}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2a2426]">
              {user.displayName}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="teal">
                {user.accountType === "Standard"
                  ? "Standard account"
                  : "Anonymous"}
              </Badge>
              <Badge variant="coral">{user.plan}</Badge>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                  syncPill[user.syncTone],
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    syncDot[user.syncTone],
                  )}
                  aria-hidden
                />
                {user.syncStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-full bg-white">
            Audit trail
          </Button>
          <Button size="sm" className="rounded-full">
            Recovery tools
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { AdminUser } from "@/types/users";
import { Badge } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type UsersTableProps = {
  users: AdminUser[];
};

function accountBadge(type: AdminUser["accountType"]) {
  return type === "Anonymous" ? "accent" : "teal";
}

function planBadge(plan: AdminUser["plan"]) {
  if (plan === "Premium - Annual" || plan === "Premium - Monthly") return "coral";
  return "peach";
}

const syncPill: Record<AdminUser["syncTone"], string> = {
  ok: "bg-[#e6f7f5] text-[#1f7a72]",
  warn: "bg-[#f8eedc] text-[#9a6b1f]",
  error: "bg-[#fde8e6] text-[#b42318]",
};

const syncDot: Record<AdminUser["syncTone"], string> = {
  ok: "bg-[#1f7a72]",
  warn: "bg-[#c4a035]",
  error: "bg-[#b42318]",
};

const headClass =
  "h-12 text-[11px] font-semibold tracking-[0.07em] text-[#8a7f83] uppercase";

export function UsersTable({ users }: UsersTableProps) {
  return (
    <Table>
      <TableHeader className="bg-[#faf4f2]">
        <TableRow className="border-b border-[#efe8e8] hover:bg-transparent">
          <TableHead className={headClass}>User</TableHead>
          <TableHead className={headClass}>Account type</TableHead>
          <TableHead className={headClass}>Life-stage focus</TableHead>
          <TableHead className={headClass}>Plan</TableHead>
          <TableHead className={headClass}>Sync status</TableHead>
          <TableHead className={cn(headClass, "text-right")}>Devices</TableHead>
          <TableHead className={cn(headClass, "text-right")}>
            Last active
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user, index) => {
          const isLast = index === users.length - 1;
          return (
            <TableRow
              key={user.id}
              className={cn(
                "bg-white hover:bg-[#fcfafa]",
                isLast ? "border-0" : "border-b border-[#efe8e8]",
              )}
            >
              <TableCell className="py-3.5">
                <Link
                  href={`/users/${user.id}`}
                  className="font-semibold text-[#2a2426] hover:text-primary"
                >
                  {user.displayName}
                </Link>
                <div className="mt-0.5 text-xs text-[#9a9094]">{user.id}</div>
              </TableCell>
              <TableCell className="py-3.5">
                <Badge variant={accountBadge(user.accountType)}>
                  {user.accountType}
                </Badge>
              </TableCell>
              <TableCell className="py-3.5 text-[#6b6165]">
                {user.lifeStage}
              </TableCell>
              <TableCell className="py-3.5">
                <Badge variant={planBadge(user.plan)}>{user.plan}</Badge>
              </TableCell>
              <TableCell className="py-3.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                    syncPill[user.syncTone],
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      syncDot[user.syncTone],
                    )}
                    aria-hidden
                  />
                  {user.syncStatus}
                </span>
              </TableCell>
              <TableCell className="py-3.5 text-right text-[#6b6165]">
                {user.devices}
              </TableCell>
              <TableCell className="py-3.5 text-right text-[#6b6165]">
                {user.lastActive}
              </TableCell>
            </TableRow>
          );
        })}
        {users.length === 0 ? (
          <TableRow className="border-0">
            <TableCell colSpan={7} className="py-10 text-center text-muted">
              No users match this filter.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}

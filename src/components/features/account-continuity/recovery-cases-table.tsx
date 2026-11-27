import Link from "next/link";
import type { RecoveryCase, RecoveryStatus } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type RecoveryCasesTableProps = {
  cases: RecoveryCase[];
};

const statusClass: Record<RecoveryStatus, string> = {
  Open: "bg-[#f8eedc] text-[#9a6b1f]",
  "Due in 2h": "bg-[#efd5de] text-primary",
  "In progress": "bg-[#efe7ff] text-[#6d28d9]",
  "Awaiting user": "bg-[#fde8e6] text-[#b42318]",
  Resolved: "bg-[#e6f7f5] text-[#1f7a72]",
};

const statusDot: Record<RecoveryStatus, string> = {
  Open: "bg-[#c4a035]",
  "Due in 2h": "bg-primary",
  "In progress": "bg-[#6d28d9]",
  "Awaiting user": "bg-[#b42318]",
  Resolved: "bg-[#1f7a72]",
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#8a7f83] uppercase";

export function RecoveryCasesTable({ cases }: RecoveryCasesTableProps) {
  const openCount = cases.filter((c) => c.status !== "Resolved").length;
  const resolvedToday = cases.filter((c) => c.status === "Resolved").length;

  return (
    <section className="rounded-[16px] border border-[#e8dfdf] bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#2a2426]">Recovery cases</h2>
          <p className="mt-0.5 text-xs text-[#9a9094]">
            Issue names match the user-side screens in Flows 02 and 03
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-[#f8eedc] px-2.5 py-1 text-xs font-medium text-[#9a6b1f]">
          {openCount} open · {resolvedToday} resolved today
        </span>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-[#e8dfdf]">
        <Table>
          <TableHeader className="bg-[#faf4f2]">
            <TableRow className="border-b border-[#efe8e8] hover:bg-transparent">
              <TableHead className={head}>Case</TableHead>
              <TableHead className={head}>User</TableHead>
              <TableHead className={head}>User-side screen</TableHead>
              <TableHead className={head}>Identifier used</TableHead>
              <TableHead className={head}>Status</TableHead>
              <TableHead className={head}>Age · SLA</TableHead>
              <TableHead className={head}>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((item, index) => (
              <TableRow
                key={item.id}
                className={cn(
                  "bg-white hover:bg-[#fcfafa]",
                  index === cases.length - 1
                    ? "border-0"
                    : "border-b border-[#efe8e8]",
                )}
              >
                <TableCell className="py-3.5 font-semibold text-[#2a2426]">
                  <Link
                    href={`/account-continuity/${item.id}`}
                    className="hover:text-primary"
                  >
                    {item.id}
                  </Link>
                </TableCell>
                <TableCell className="py-3.5">
                  <Link
                    href={`/users/${item.userId}`}
                    className="font-medium text-[#2a2426] hover:text-primary"
                  >
                    {item.userLabel ?? item.userId}
                  </Link>
                  {item.userLabel ? (
                    <div className="mt-0.5 text-xs text-[#9a9094]">
                      {item.userId}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell className="py-3.5 text-[#6b6165]">
                  {item.screen}
                </TableCell>
                <TableCell className="py-3.5 text-[#6b6165]">
                  {item.identifier}
                </TableCell>
                <TableCell className="py-3.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusClass[item.status],
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        statusDot[item.status],
                      )}
                      aria-hidden
                    />
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="py-3.5 text-[#6b6165]">
                  {item.ageSla}
                </TableCell>
                <TableCell className="py-3.5 text-[#6b6165]">
                  {item.assignee}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

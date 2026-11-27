import Link from "next/link";
import { Download, Plus } from "lucide-react";
import type {
  GrandfatheredPerson,
  ScheduledChange,
  ScheduledChangeStatus,
} from "./types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ScheduledChangesSectionProps = {
  changes: ScheduledChange[];
  people: GrandfatheredPerson[];
  selectedChangeId?: string;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

const statusClass: Record<ScheduledChangeStatus, string> = {
  "Awaiting approval": "bg-[#f8eedc] text-[#9a6b1f]",
  Completed: "bg-[#ebe3e3] text-[#6b6165]",
  Scheduled: "bg-[#c5ebe6] text-[#0d6b64]",
};

export function ScheduledChangesSection({
  changes,
  people,
  selectedChangeId = "PC-204",
}: ScheduledChangesSectionProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Scheduled changes
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              View, edit or cancel moves between plans · FR-MON-02
            </p>
          </div>
          <Link href="/subscriptions/schedule">
            <Button size="sm" className="rounded-full gap-1.5">
              <Plus className="h-4 w-4" aria-hidden />
              Schedule tier change
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>Change</TableHead>
                <TableHead className={head}>Feature</TableHead>
                <TableHead className={head}>Move</TableHead>
                <TableHead className={head}>Takes effect</TableHead>
                <TableHead className={head}>People kept free</TableHead>
                <TableHead className={head}>Status</TableHead>
                <TableHead className={head}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {changes.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "bg-white",
                    row.id === selectedChangeId && "bg-[#faf6f6]",
                    index < changes.length - 1 && "border-b border-[#ebe3e3]",
                  )}
                >
                  <TableCell className="py-3.5 font-semibold text-[#221c1e]">
                    {row.status === "Awaiting approval" ? (
                      <Link
                        href={`/subscriptions/changes/${row.id}/approve`}
                        className="hover:text-primary"
                      >
                        {row.id}
                      </Link>
                    ) : (
                      row.id
                    )}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.feature}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.move}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.takesEffect}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.peopleKeptFree}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium",
                        statusClass[row.status],
                      )}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                      {row.actions.map((action) =>
                        action === "View" &&
                        row.status === "Awaiting approval" ? (
                          <Link
                            key={action}
                            href={`/subscriptions/changes/${row.id}/approve`}
                            className="text-primary hover:underline"
                          >
                            {action}
                          </Link>
                        ) : action === "Edit" ? (
                          <Link
                            key={action}
                            href="/subscriptions/schedule"
                            className="text-primary hover:underline"
                          >
                            {action}
                          </Link>
                        ) : (
                          <button
                            key={action}
                            type="button"
                            className="text-primary hover:underline"
                          >
                            {action}
                          </button>
                        ),
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#221c1e]">
              {selectedChangeId} · people who keep free access
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Everyone using the feature when the change was scheduled
            </p>
          </div>
          <Button size="sm" variant="outline" className="rounded-full gap-1.5">
            <Download className="h-4 w-4" aria-hidden />
            Export list
          </Button>
        </div>

        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>Person</TableHead>
                <TableHead className={head}>Last used</TableHead>
                <TableHead className={head}>Notified</TableHead>
                <TableHead className={head}>Free access until</TableHead>
                <TableHead className={head}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "bg-white",
                    index < people.length - 1 && "border-b border-[#ebe3e3]",
                  )}
                >
                  <TableCell className="py-3.5">
                    <Link
                      href={`/users/${row.id}`}
                      className="font-medium text-[#221c1e] hover:text-primary"
                    >
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.lastUsed}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span className="rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                      {row.notified}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.freeAccessUntil}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

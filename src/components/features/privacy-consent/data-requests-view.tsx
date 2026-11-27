"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  Clock,
  Download,
  FileText,
  Trash2,
} from "lucide-react";
import type {
  DataRequestFilter,
  DataRequestQueueItem,
  DataRequestQueueStatus,
  DeletionProgressStep,
} from "./types";
import {
  Button,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type DataRequestsViewProps = {
  subtitle: string;
  kpis: {
    id: string;
    label: string;
    value: string;
    hint: string;
    icon: "file" | "trash" | "clock" | "check";
    hintTone?: "ok";
  }[];
  queue: DataRequestQueueItem[];
  progressById: Record<string, DeletionProgressStep[]>;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

const statusClass: Record<DataRequestQueueStatus, string> = {
  "In progress": "bg-[#f0e0b8] text-[#8a5f16]",
  "Confirm to person": "bg-[#ddd5f0] text-[#5c4d84]",
  "File ready": "bg-[#c5ebe6] text-[#0d6b64]",
  Generating: "bg-[#f0e0b8] text-[#8a5f16]",
  Complete: "bg-[#c5ebe6] text-[#0d6b64]",
};

const icons = {
  file: FileText,
  trash: Trash2,
  clock: Clock,
  check: Check,
} as const;

const filters: { id: DataRequestFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "exports", label: "Exports" },
  { id: "deletions", label: "Deletions" },
  { id: "needs-attention", label: "Needs attention" },
];

export function DataRequestsView({
  subtitle,
  kpis,
  queue,
  progressById,
}: DataRequestsViewProps) {
  const [filter, setFilter] = useState<DataRequestFilter>("all");
  const [selectedId, setSelectedId] = useState(
    queue.find((q) => q.type === "Deletion")?.id ?? queue[0]?.id,
  );

  const filtered = useMemo(() => {
    if (filter === "exports") return queue.filter((q) => q.type === "Export");
    if (filter === "deletions")
      return queue.filter((q) => q.type === "Deletion");
    if (filter === "needs-attention")
      return queue.filter(
        (q) =>
          q.status === "In progress" ||
          q.status === "Confirm to person" ||
          q.status === "Generating",
      );
    return queue;
  }, [filter, queue]);

  const selected = queue.find((q) => q.id === selectedId) ?? queue[0];
  const progress = selected ? progressById[selected.id] : undefined;

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/privacy-consent" className="hover:text-primary">
          Privacy & Consent
        </Link>{" "}
        <span>›</span> <span className="text-primary">Data requests</span>
      </p>

      <PageHeader
        title="Data requests"
        description={subtitle}
        actions={
          <Button size="sm" variant="outline" className="rounded-full gap-1.5">
            <Download className="h-4 w-4" aria-hidden />
            Export log
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = icons[kpi.icon];
          return (
            <div
              key={kpi.id}
              className="rounded-[16px] border border-[#d9cdcf] bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-[#6b6165]">{kpi.label}</p>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efd5de] text-primary">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#221c1e]">
                {kpi.value}
              </p>
              <p
                className={cn(
                  "mt-1 text-xs",
                  kpi.hintTone === "ok" ? "text-[#0d6b64]" : "text-[#8f8589]",
                )}
              >
                {kpi.hint}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
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
            {item.label}
          </button>
        ))}
      </div>

      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
          Request queue
        </h2>
        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>Request</TableHead>
                <TableHead className={head}>Person</TableHead>
                <TableHead className={head}>Type</TableHead>
                <TableHead className={head}>Received</TableHead>
                <TableHead className={head}>SLA</TableHead>
                <TableHead className={head}>Backups</TableHead>
                <TableHead className={head}>Third parties</TableHead>
                <TableHead className={head}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "cursor-pointer bg-white hover:bg-[#faf6f6]",
                    selectedId === row.id && "bg-[#faf0f3]",
                    index < filtered.length - 1 && "border-b border-[#ebe3e3]",
                  )}
                  onClick={() => setSelectedId(row.id)}
                >
                  <TableCell className="py-3.5 font-semibold text-[#221c1e]">
                    {row.id}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Link
                      href={`/users/${row.personId}`}
                      className="text-sm font-medium text-[#221c1e] hover:text-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {row.personId}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.type}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.received}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.sla}
                  </TableCell>
                  <TableCell className="py-3.5">
                    {row.backups === "—" ? (
                      <span className="text-sm text-[#8f8589]">—</span>
                    ) : (
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium",
                          row.backupsTone === "ok" &&
                            "bg-[#c5ebe6] text-[#0d6b64]",
                          row.backupsTone === "warn" &&
                            "bg-[#f0e0b8] text-[#8a5f16]",
                          row.backupsTone === "muted" &&
                            "bg-[#ebe3e3] text-[#6b6165]",
                        )}
                      >
                        {row.backups}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.thirdParties}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {selected && progress ? (
        <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#221c1e]">
                {selected.id} · Deletion progress
              </h2>
              <p className="mt-0.5 text-xs text-[#8f8589]">
                Confirmation goes to the person when every step is done.
              </p>
            </div>
            <Button size="sm" className="rounded-full">
              Send confirmation
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {progress.map((step) => (
              <div
                key={step.id}
                className="rounded-[12px] border border-[#ebe3e3] bg-[#faf6f6] px-3 py-3"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  {step.state === "done" ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c5ebe6] text-[#0d6b64]">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0e0b8] text-[#8a5f16]">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-[#221c1e]">
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-[#8f8589]">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

import type { ModerationReport, ModerationStatus } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ModerationQueueProps = {
  reports: ModerationReport[];
  pendingCount: number;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

const statusStyles: Record<
  ModerationStatus,
  { wrap: string; dot: string; label: string }
> = {
  pending: {
    wrap: "bg-[#f0e0b8] text-[#8a5f16]",
    dot: "bg-[#8a5f16]",
    label: "Pending",
  },
  "in-review": {
    wrap: "bg-[#ddd5f0] text-[#5c4d84]",
    dot: "bg-[#5c4d84]",
    label: "In review",
  },
  removed: {
    wrap: "bg-[#ebe1e1] text-[#6b6165]",
    dot: "bg-[#6b6165]",
    label: "Removed",
  },
  "warning-sent": {
    wrap: "bg-[#f0d0d9] text-[#a33d52]",
    dot: "bg-[#a33d52]",
    label: "Warning sent",
  },
};

function StatusBadge({ status }: { status: ModerationStatus }) {
  const style = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
        style.wrap,
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", style.dot)} aria-hidden />
      {style.label}
    </span>
  );
}

export function ModerationQueue({
  reports,
  pendingCount,
}: ModerationQueueProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">
            Moderation queue
          </h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">Newest first</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0e0b8] px-2.5 py-1 text-[11px] font-medium text-[#8a5f16]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8a5f16]" aria-hidden />
          {pendingCount} pending
        </span>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-[#d9cdcf]">
        <Table>
          <TableHeader className="bg-[#f0e8e6]">
            <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
              <TableHead className={head}>Report</TableHead>
              <TableHead className={head}>Posted by</TableHead>
              <TableHead className={head}>Topic</TableHead>
              <TableHead className={head}>Reason</TableHead>
              <TableHead className={head}>Reported</TableHead>
              <TableHead className={head}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow
                key={report.id}
                className={cn(
                  "bg-white hover:bg-[#faf6f5]",
                  index === reports.length - 1
                    ? "border-0"
                    : "border-b border-[#ebe3e3]",
                )}
              >
                <TableCell className="py-3.5 font-semibold text-[#221c1e]">
                  {report.id}
                </TableCell>
                <TableCell className="py-3.5 text-sm text-[#221c1e]">
                  {report.postedBy}
                </TableCell>
                <TableCell className="py-3.5 text-sm text-[#6b6165]">
                  {report.topic}
                </TableCell>
                <TableCell className="py-3.5 text-sm text-[#6b6165]">
                  {report.reason}
                </TableCell>
                <TableCell className="py-3.5 text-sm text-[#8f8589]">
                  {report.reported}
                </TableCell>
                <TableCell className="py-3.5">
                  <StatusBadge status={report.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

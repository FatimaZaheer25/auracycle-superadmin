import type { AuditEvent, AuditResultTone } from "@/types/audit-log";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type AuditEventsTableProps = {
  events: AuditEvent[];
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

const toneStyles: Record<AuditResultTone, string> = {
  lavender: "bg-[#ddd5f0] text-[#5c4d84]",
  peach: "bg-[#e8d5c8] text-[#7a554c]",
  coral: "bg-[#f0d0d9] text-[#a33d52]",
  warn: "bg-[#f0e0b8] text-[#8a5f16]",
  teal: "bg-[#c5ebe6] text-[#0d6b64]",
  muted: "bg-[#ebe1e1] text-[#6b6165]",
  danger: "bg-[#f7d4d0] text-[#a31f15]",
};

const toneDot: Record<AuditResultTone, string> = {
  lavender: "bg-[#5c4d84]",
  peach: "bg-[#7a554c]",
  coral: "bg-[#a33d52]",
  warn: "bg-[#8a5f16]",
  teal: "bg-[#0d6b64]",
  muted: "bg-[#6b6165]",
  danger: "bg-[#a31f15]",
};

function ResultBadge({ event }: { event: AuditEvent }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
        toneStyles[event.resultTone],
      )}
    >
      {event.resultDot ? (
        <span
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", toneDot[event.resultTone])}
          aria-hidden
        />
      ) : null}
      {event.result}
    </span>
  );
}

export function AuditEventsTable({ events }: AuditEventsTableProps) {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
      <Table>
        <TableHeader className="bg-[#f0e8e6]">
          <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
            <TableHead className={head}>Time</TableHead>
            <TableHead className={head}>Actor</TableHead>
            <TableHead className={head}>Action</TableHead>
            <TableHead className={head}>Target</TableHead>
            <TableHead className={head}>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <TableRow
              key={event.id}
              className={cn(
                "bg-white hover:bg-[#faf6f5]",
                index === events.length - 1
                  ? "border-0"
                  : "border-b border-[#ebe3e3]",
              )}
            >
              <TableCell className="py-3.5 text-sm tabular-nums text-[#6b6165]">
                {event.time}
              </TableCell>
              <TableCell className="py-3.5 text-sm font-semibold text-[#221c1e]">
                {event.actor}
              </TableCell>
              <TableCell className="py-3.5 text-sm text-[#6b6165]">
                {event.action}
              </TableCell>
              <TableCell className="py-3.5 text-sm text-[#221c1e]">
                {event.target}
              </TableCell>
              <TableCell className="py-3.5">
                <ResultBadge event={event} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

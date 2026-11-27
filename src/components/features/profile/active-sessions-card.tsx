import type { ActiveSession } from "@/types/profile";
import { Button } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ActiveSessionsCardProps = {
  sessions: ActiveSession[];
  onLogoutAll?: () => void;
};

const head =
  "h-10 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function ActiveSessionsCard({
  sessions,
  onLogoutAll,
}: ActiveSessionsCardProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">
            Active sessions
          </h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">
            Where you are signed in
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={onLogoutAll}
        >
          Log out of all
        </Button>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
        <Table>
          <TableHeader className="bg-[#f0e8e6]">
            <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
              <TableHead className={head}>Device</TableHead>
              <TableHead className={head}>Location</TableHead>
              <TableHead className={head}>Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session, index) => (
              <TableRow
                key={session.id}
                className={cn(
                  "bg-white hover:bg-[#faf6f5]",
                  index === sessions.length - 1
                    ? "border-0"
                    : "border-b border-[#ebe3e3]",
                )}
              >
                <TableCell className="py-3 text-sm font-medium text-[#221c1e]">
                  {session.device}
                </TableCell>
                <TableCell className="py-3 text-sm text-[#6b6165]">
                  {session.location}
                </TableCell>
                <TableCell className="py-3">
                  {session.current ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]"
                        aria-hidden
                      />
                      Active now
                    </span>
                  ) : (
                    <span className="text-sm text-[#8f8589]">
                      {session.lastActive}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

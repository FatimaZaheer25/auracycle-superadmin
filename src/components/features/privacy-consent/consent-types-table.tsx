import type {
  ConsentChangeNeed,
  ConsentDefault,
  ConsentType,
} from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ConsentTypesTableProps = {
  items: ConsentType[];
  subtitle: string;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

function DefaultBadge({ value }: { value: ConsentDefault }) {
  const map: Record<ConsentDefault, { label: string; className: string }> = {
    private: {
      label: "Private",
      className: "bg-[#ebe1e1] text-[#6b6165]",
    },
    on: {
      label: "On",
      className: "bg-[#c5ebe6] text-[#0d6b64]",
    },
    "opt-in": {
      label: "Opt-in",
      className: "bg-[#f0d0d9] text-[#a33d52]",
    },
    off: {
      label: "Off",
      className: "bg-[#ebe1e1] text-[#6b6165]",
    },
  };

  const style = map[value];
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
        style.className,
      )}
    >
      {style.label}
    </span>
  );
}

function ChangeNeedBadge({ value }: { value: ConsentChangeNeed }) {
  const map: Record<ConsentChangeNeed, { label: string; className: string }> = {
    "not-changeable": {
      label: "Not changeable",
      className: "bg-[#f0d0d9] text-[#a33d52]",
    },
    "security-review": {
      label: "Security review",
      className: "bg-[#ddd5f0] text-[#5c4d84]",
    },
    "compliance-review": {
      label: "Compliance review",
      className: "bg-[#f0e0b8] text-[#8a5f16]",
    },
    "user-only": {
      label: "User only",
      className: "bg-[#e8d5c8] text-[#7a554c]",
    },
  };

  const style = map[value];
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
        style.className,
      )}
    >
      {style.label}
    </span>
  );
}

export function ConsentTypesTable({ items, subtitle }: ConsentTypesTableProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-[#221c1e]">Consent types</h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
        <Table>
          <TableHeader className="bg-[#f0e8e6]">
            <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
              <TableHead className={head}>Consent</TableHead>
              <TableHead className={head}>What the user sees</TableHead>
              <TableHead className={head}>Default</TableHead>
              <TableHead className={head}>Opted in</TableHead>
              <TableHead className={head}>Changes need</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow
                key={item.id}
                className={cn(
                  "bg-white hover:bg-[#faf6f5]",
                  index === items.length - 1
                    ? "border-0"
                    : "border-b border-[#ebe3e3]",
                )}
              >
                <TableCell className="py-3.5 font-medium text-[#221c1e]">
                  {item.name}
                </TableCell>
                <TableCell className="py-3.5 text-sm text-[#6b6165]">
                  {item.userSees}
                </TableCell>
                <TableCell className="py-3.5">
                  <DefaultBadge value={item.defaultValue} />
                </TableCell>
                <TableCell className="py-3.5 text-sm tabular-nums text-[#6b6165]">
                  {item.optedIn}
                </TableCell>
                <TableCell className="py-3.5">
                  <ChangeNeedBadge value={item.changesNeed} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

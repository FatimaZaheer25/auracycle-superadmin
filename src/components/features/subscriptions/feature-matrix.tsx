import { Check, Minus } from "lucide-react";
import type { FeatureMatrixRow } from "@/types/subscriptions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type FeatureMatrixProps = {
  rows: FeatureMatrixRow[];
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#6b6165] uppercase";

function AccessCell({ value }: { value: "yes" | "no" }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c5ebe6] text-[#0d6b64]">
        <Check className="h-3.5 w-3.5" aria-label="Included" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e6dcda] text-[#8f8589]">
      <Minus className="h-3.5 w-3.5" aria-label="Not included" />
    </span>
  );
}

export function FeatureMatrix({ rows }: FeatureMatrixProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">
            Feature-tier matrix
          </h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">
            What Free vs Premium includes for AuraCycle
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-xs font-medium text-[#0d6b64]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" aria-hidden />
          Pregnancy baseline is protected
        </span>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-[#d9cdcf]">
        <Table>
          <TableHeader className="bg-[#ebe1e1]">
            <TableRow className="border-b border-[#e0d6d6] hover:bg-transparent">
              <TableHead className={head}>Feature</TableHead>
              <TableHead className={cn(head, "w-24 text-center")}>Free</TableHead>
              <TableHead className={cn(head, "w-28 text-center")}>
                Premium
              </TableHead>
              <TableHead className={head}>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.feature}
                className={cn(
                  "bg-white hover:bg-[#f7f1f0]",
                  index === rows.length - 1
                    ? "border-0"
                    : "border-b border-[#e0d6d6]",
                )}
              >
                <TableCell className="py-3.5 font-medium text-[#221c1e]">
                  {row.feature}
                </TableCell>
                <TableCell className="py-3.5 text-center">
                  <span className="inline-flex justify-center">
                    <AccessCell value={row.free} />
                  </span>
                </TableCell>
                <TableCell className="py-3.5 text-center">
                  <span className="inline-flex justify-center">
                    <AccessCell value={row.premium} />
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    "py-3.5 text-sm",
                    row.protected ? "text-[#0d6b64]" : "text-[#5c5457]",
                  )}
                >
                  {row.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

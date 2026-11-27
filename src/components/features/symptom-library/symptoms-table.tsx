import Link from "next/link";
import type { LibrarySymptom } from "./types";
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

type SymptomsTableProps = {
  symptoms: LibrarySymptom[];
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

export function SymptomsTable({ symptoms }: SymptomsTableProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#d9cdcf]">
      <Table>
        <TableHeader className="bg-[#f0e8e6]">
          <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
            <TableHead className={head}>Symptom</TableHead>
            <TableHead className={head}>Category</TableHead>
            <TableHead className={head}>Tag</TableHead>
            <TableHead className={cn(head, "text-right")}>Logged · 30d</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {symptoms.map((symptom, index) => (
            <TableRow
              key={symptom.id}
              className={cn(
                "bg-white hover:bg-[#faf6f5]",
                index === symptoms.length - 1
                  ? "border-0"
                  : "border-b border-[#ebe3e3]",
              )}
            >
              <TableCell className="py-3.5">
                <Link
                  href={`/symptom-library/${symptom.id}/edit`}
                  className="font-medium text-[#221c1e] hover:text-primary"
                >
                  {symptom.name}
                </Link>
              </TableCell>
              <TableCell className="py-3.5 text-sm text-[#6b6165]">
                {symptom.category}
              </TableCell>
              <TableCell className="py-3.5">
                {symptom.tag ? (
                  <Badge variant="lavender">{symptom.tag}</Badge>
                ) : null}
              </TableCell>
              <TableCell className="py-3.5 text-right text-sm tabular-nums text-[#221c1e]">
                {formatCount(symptom.logged30d)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { Check } from "lucide-react";
import type {
  AdminRole,
  PermissionCell,
  PermissionRow,
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

type PermissionsMatrixProps = {
  roles: AdminRole[];
  rows: PermissionRow[];
  subtitle: string;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

function AccessCell({ value }: { value: PermissionCell | number }) {
  if (typeof value === "number") {
    return (
      <span className="text-sm font-semibold tabular-nums text-[#221c1e]">
        {value}
      </span>
    );
  }

  if (value === "yes") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c5ebe6] text-[#0d6b64]">
        <Check className="h-3.5 w-3.5" aria-label="Allowed" />
      </span>
    );
  }

  if (value === "limited") {
    return (
      <span className="inline-flex whitespace-nowrap rounded-full bg-[#f0e0b8] px-2.5 py-1 text-[11px] font-medium text-[#8a5f16]">
        Limited
      </span>
    );
  }

  return <span className="text-sm text-[#8f8589]">—</span>;
}

export function PermissionsMatrix({
  roles,
  rows,
  subtitle,
}: PermissionsMatrixProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-[#221c1e]">
          Permissions by role
        </h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
        <Table>
          <TableHeader className="bg-[#f0e8e6]">
            <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
              <TableHead className={cn(head, "min-w-[220px]")}>
                Permission
              </TableHead>
              {roles.map((role) => (
                <TableHead
                  key={role.id}
                  className={cn(head, "min-w-[110px] text-center")}
                >
                  {role.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={cn(
                  "bg-white hover:bg-[#faf6f5]",
                  index === rows.length - 1
                    ? "border-0"
                    : "border-b border-[#ebe3e3]",
                )}
              >
                <TableCell
                  className={cn(
                    "py-3.5 text-sm",
                    row.kind === "members"
                      ? "font-semibold text-[#221c1e]"
                      : "font-medium text-[#221c1e]",
                  )}
                >
                  {row.label}
                </TableCell>
                {roles.map((role) => (
                  <TableCell key={role.id} className="py-3.5 text-center">
                    <span className="inline-flex justify-center">
                      <AccessCell value={row.cells[role.id]} />
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

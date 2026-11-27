import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type TableProps = TableHTMLAttributes<HTMLTableElement>;
type DivProps = HTMLAttributes<HTMLDivElement>;
type RowProps = HTMLAttributes<HTMLTableRowElement>;
type CellProps = ThHTMLAttributes<HTMLTableCellElement>;
type TdProps = TdHTMLAttributes<HTMLTableCellElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("border-b border-border bg-surface-muted/60", className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn(className)} {...props} />;
}

export function TableFooter({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn("border-t border-border bg-surface", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: RowProps) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-surface-muted/50",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: CellProps) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TdProps) {
  return (
    <td
      className={cn("px-4 py-3 align-middle text-foreground", className)}
      {...props}
    />
  );
}

export function TableToolbar({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    />
  );
}

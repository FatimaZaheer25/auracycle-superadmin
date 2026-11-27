import type { CheckerRow } from "./types";
import { cn } from "@/lib/utils";

type SymptomCheckerPanelProps = {
  rows: CheckerRow[];
  subtitle: string;
  onManageRegions?: () => void;
};

function CheckerStatus({ status }: { status: CheckerRow["status"] }) {
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-0.5 text-xs font-medium text-[#0d6b64]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" aria-hidden />
        Available
      </span>
    );
  }

  if (status === "not-available") {
    return (
      <span className="inline-flex rounded-full bg-[#f0d0d9] px-2.5 py-0.5 text-xs font-medium text-[#a33d52]">
        Not available
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className="inline-flex rounded-full bg-[#f0e0b8] px-2.5 py-0.5 text-xs font-medium text-[#8a5f16]">
        Pending sign-off
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-[#c5ebe6] px-2.5 py-0.5 text-xs font-medium text-[#0d6b64]">
      Live
    </span>
  );
}

export function SymptomCheckerPanel({
  rows,
  subtitle,
  onManageRegions,
}: SymptomCheckerPanelProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">
            Symptom Checker
          </h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
        </div>
        {onManageRegions ? (
          <button
            type="button"
            onClick={onManageRegions}
            className="text-[11px] font-medium text-primary hover:underline"
          >
            Manage
          </button>
        ) : null}
      </div>

      <ul className="mt-4">
        {rows.map((row, index) => (
          <li
            key={row.id}
            className={cn(
              "flex items-center justify-between gap-3 py-2.5",
              index < rows.length - 1 && "border-b border-[#ebe3e3]",
            )}
          >
            <p className="text-sm text-[#221c1e]">{row.label}</p>
            <CheckerStatus status={row.status} />
          </li>
        ))}
      </ul>
    </section>
  );
}

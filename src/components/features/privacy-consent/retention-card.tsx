import type { RetentionRow } from "./types";
import { cn } from "@/lib/utils";

type RetentionCardProps = {
  subtitle: string;
  rows: RetentionRow[];
};

export function RetentionCard({ subtitle, rows }: RetentionCardProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">
          Retention and data egress
        </h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
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
            <p className="text-sm text-[#6b6165]">{row.label}</p>
            {row.status ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]"
                  aria-hidden
                />
                {row.value}
              </span>
            ) : (
              <p className="text-right text-sm font-medium text-[#221c1e]">
                {row.value}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

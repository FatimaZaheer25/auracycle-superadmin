import { Clock, KeyRound, RefreshCw, Shield } from "lucide-react";
import type { ContinuityKpi } from "@/types/account-continuity";
import { cn } from "@/lib/utils";

type ContinuityKpisProps = {
  items: ContinuityKpi[];
};

const icons = {
  refresh: RefreshCw,
  clock: Clock,
  shield: Shield,
  key: KeyRound,
} as const;

export function ContinuityKpis({ items }: ContinuityKpisProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi) => {
        const Icon = icons[kpi.icon];
        return (
          <div
            key={kpi.id}
            className="rounded-[12px] border border-[#e8dfdf] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-[#7a7074]">{kpi.label}</p>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#2a2426]">
              {kpi.value}
            </p>
            <p
              className={cn(
                "mt-1 text-xs",
                kpi.hintTone === "ok" ? "text-[#1f7a72]" : "text-[#9a6b1f]",
              )}
            >
              {kpi.hint}
            </p>
          </div>
        );
      })}
    </div>
  );
}

import {
  CreditCard,
  FileText,
  KeyRound,
  RefreshCw,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import type { DashboardKpi } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type KpiGridProps = {
  items: DashboardKpi[];
};

const icons = {
  users: Users,
  card: CreditCard,
  refresh: RefreshCw,
  shield: Shield,
  file: FileText,
  scale: Scale,
  key: KeyRound,
} as const;

const detailTone: Record<NonNullable<DashboardKpi["detailTone"]>, string> = {
  teal: "text-[#0d6b64]",
  warn: "text-[#8a5f16]",
  lavender: "text-[#5c4d84]",
  muted: "text-[#8f8589]",
};

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi) => {
        const Icon = icons[kpi.icon];
        return (
          <div
            key={kpi.id}
            className="rounded-[16px] border border-[#d9cdcf] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-[#6b6165]">{kpi.label}</p>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efd5de] text-primary">
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-[#221c1e]">
              {kpi.value}
            </p>
            <p
              className={cn(
                "mt-1 text-xs",
                detailTone[kpi.detailTone ?? "muted"],
              )}
            >
              {kpi.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}

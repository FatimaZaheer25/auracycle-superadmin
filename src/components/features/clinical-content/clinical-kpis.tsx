import { Clock, FileText, Smartphone, Shield } from "lucide-react";
import type { ClinicalKpi } from "./types";
import { cn } from "@/lib/utils";

type ClinicalKpisProps = {
  items: ClinicalKpi[];
};

const icons = {
  phone: Smartphone,
  clock: Clock,
  shield: Shield,
  file: FileText,
} as const;

const hintTone: Record<ClinicalKpi["hintTone"], string> = {
  ok: "text-[#0d6b64]",
  warn: "text-[#8a5f16]",
  danger: "text-[#a33d52]",
  muted: "text-[#8f8589]",
};

export function ClinicalKpis({ items }: ClinicalKpisProps) {
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
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#221c1e]">
              {kpi.value}
            </p>
            <p className={cn("mt-1 text-xs", hintTone[kpi.hintTone])}>
              {kpi.hint}
            </p>
          </div>
        );
      })}
    </div>
  );
}

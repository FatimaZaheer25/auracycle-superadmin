"use client";

import { List } from "lucide-react";
import type { SymptomCategoryFilter, SymptomKpi } from "@/types/symptom-library";
import { cn } from "@/lib/utils";

type SymptomKpisProps = {
  items: SymptomKpi[];
  active: SymptomCategoryFilter;
  onSelect: (filter: SymptomCategoryFilter) => void;
};

export function SymptomKpis({ items, active, onSelect }: SymptomKpisProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((kpi) => {
        const selected = active === kpi.filter;
        return (
          <button
            key={kpi.id}
            type="button"
            onClick={() => onSelect(kpi.filter)}
            className={cn(
              "rounded-[16px] border bg-white p-4 text-left transition-colors",
              selected
                ? "border-primary shadow-[0_0_0_1px_var(--primary)]"
                : "border-[#d9cdcf] hover:border-[#c9bbbe]",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-[#6b6165]">{kpi.label}</p>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efd5de] text-primary">
                <List className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#221c1e]">
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-[#8f8589]">{kpi.hint}</p>
          </button>
        );
      })}
    </div>
  );
}

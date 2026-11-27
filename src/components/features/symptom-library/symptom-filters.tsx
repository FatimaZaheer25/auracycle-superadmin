"use client";

import type { SymptomCategoryFilter, SymptomKpi } from "./types";
import { cn } from "@/lib/utils";

type SymptomFiltersProps = {
  items: SymptomKpi[];
  active: SymptomCategoryFilter;
  onSelect: (filter: SymptomCategoryFilter) => void;
};

export function SymptomFilters({
  items,
  active,
  onSelect,
}: SymptomFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const selected = active === item.filter;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.filter)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              selected
                ? "border border-transparent bg-[#efd5de] text-[#7a2f48]"
                : "border border-[#d9cdcf] bg-white text-[#5c5457] hover:border-[#c9bbbe] hover:bg-[#f7f1f0]",
            )}
          >
            {item.label === "All symptoms"
              ? `All (${item.value})`
              : `${item.label} (${item.value})`}
          </button>
        );
      })}
    </div>
  );
}

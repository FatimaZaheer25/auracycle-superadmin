"use client";

import type { TopicFilter } from "@/types/clinical-content";
import { cn } from "@/lib/utils";

type TopicFiltersProps = {
  items: { id: TopicFilter; label: string }[];
  active: TopicFilter;
  onSelect: (filter: TopicFilter) => void;
};

export function TopicFilters({ items, active, onSelect }: TopicFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const selected = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              selected
                ? "border border-transparent bg-[#efd5de] text-[#7a2f48]"
                : "border border-[#d9cdcf] bg-white text-[#5c5457] hover:border-[#c9bbbe] hover:bg-[#f7f1f0]",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

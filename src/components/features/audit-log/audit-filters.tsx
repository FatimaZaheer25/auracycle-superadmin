"use client";

import type { AuditCategory } from "./types";
import { cn } from "@/lib/utils";

type AuditFiltersProps = {
  items: { id: AuditCategory; label: string }[];
  active: AuditCategory;
  onSelect: (filter: AuditCategory) => void;
};

export function AuditFilters({ items, active, onSelect }: AuditFiltersProps) {
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

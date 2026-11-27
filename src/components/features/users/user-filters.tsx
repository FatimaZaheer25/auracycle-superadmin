"use client";

import type { UserFilter } from "@/types/users";
import { USER_FILTERS } from "@/mock/users";
import { cn } from "@/lib/utils";

type UserFiltersProps = {
  value: UserFilter;
  onChange: (filter: UserFilter) => void;
};

export function UserFilters({ value, onChange }: UserFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="User filters"
    >
      {USER_FILTERS.map((filter) => {
        const active = value === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(filter.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "border-transparent bg-primary-soft text-primary-deep"
                : "border-border bg-surface text-muted shadow-sm hover:bg-surface-muted hover:text-foreground",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

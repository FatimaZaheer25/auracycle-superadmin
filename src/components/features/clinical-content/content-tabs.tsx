"use client";

import { cn } from "@/lib/utils";

export type ContentTab = "articles" | "checker" | "assistant";

type ContentTabsProps = {
  active: ContentTab;
  onChange: (tab: ContentTab) => void;
};

const tabs: { id: ContentTab; label: string }[] = [
  { id: "articles", label: "Articles" },
  { id: "checker", label: "Symptom Checker" },
  { id: "assistant", label: "Health Assistant" },
];

export function ContentTabs({ active, onChange }: ContentTabsProps) {
  return (
    <div className="flex gap-6 border-b border-[#d9cdcf]">
      {tabs.map((tab) => {
        const selected = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "-mb-px border-b-2 pb-2.5 text-sm font-medium transition-colors",
              selected
                ? "border-primary text-primary"
                : "border-transparent text-[#6b6165] hover:text-[#221c1e]",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

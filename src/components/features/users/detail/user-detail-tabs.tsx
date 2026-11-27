"use client";

import type { UserDetailTab } from "../user-detail.types";
import { cn } from "@/lib/utils";

const TABS: { id: UserDetailTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "cycle-logs", label: "Cycle & Logs" },
  { id: "pregnancy", label: "Pregnancy" },
  { id: "perimenopause", label: "Perimenopause" },
  { id: "privacy", label: "Privacy & Consent" },
  { id: "subscription", label: "Subscription" },
  { id: "devices", label: "Devices & Sync" },
  { id: "partner", label: "Partner Sharing" },
];

type UserDetailTabsProps = {
  value: UserDetailTab;
  onChange: (tab: UserDetailTab) => void;
};

export function UserDetailTabs({ value, onChange }: UserDetailTabsProps) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <div
        className="flex min-w-max gap-1 border-b border-[#efe8e8] px-1"
        role="tablist"
        aria-label="User detail sections"
      >
        {TABS.map((tab) => {
          const active = value === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(tab.id)}
              className={cn(
                "border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary text-primary-deep"
                  : "border-transparent text-[#7a7074] hover:text-[#2a2426]",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

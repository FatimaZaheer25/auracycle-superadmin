"use client";

import { useState } from "react";
import type { PricingTier } from "./types";
import { cn } from "@/lib/utils";

type TierCardsProps = {
  tiers: PricingTier[];
};

export function TierCards({ tiers }: TierCardsProps) {
  const defaultId = tiers.find((t) => t.selected)?.id ?? tiers[0]?.id;
  const [selected, setSelected] = useState(defaultId);

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {tiers.map((tier) => {
        const active = selected === tier.id;
        return (
          <button
            key={tier.id}
            type="button"
            onClick={() => setSelected(tier.id)}
            className={cn(
              "rounded-[16px] border bg-white p-4 text-left transition-colors",
              active
                ? "border-primary shadow-[0_0_0_1px_var(--primary)]"
                : "border-[#d9cdcf] hover:border-[#c9bbbe]",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-[#221c1e]">{tier.name}</p>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                  active
                    ? "bg-[#efd5de] text-[#7a2f48]"
                    : "bg-[#e6dcda] text-[#6b6165]",
                )}
              >
                {tier.badge}
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-[#221c1e]">
              {tier.price}
            </p>
            <p className="mt-1 text-xs text-[#8f8589]">{tier.usersLabel}</p>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { AlertPreference } from "@/types/profile";
import { cn } from "@/lib/utils";

type AlertPreferencesCardProps = {
  items: AlertPreference[];
};

export function AlertPreferencesCard({ items }: AlertPreferencesCardProps) {
  const [prefs, setPrefs] = useState(items);

  function toggle(id: string) {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    );
  }

  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">
          Alert preferences
        </h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">
          What reaches your notifications
        </p>
      </div>

      <ul className="mt-4">
        {prefs.map((pref, index) => (
          <li
            key={pref.id}
            className={cn(
              "flex items-center justify-between gap-3 py-2.5",
              index < prefs.length - 1 && "border-b border-[#ebe3e3]",
            )}
          >
            <p className="text-sm text-[#221c1e]">{pref.label}</p>
            <button
              type="button"
              role="switch"
              aria-checked={pref.enabled}
              aria-label={pref.label}
              onClick={() => toggle(pref.id)}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                pref.enabled ? "bg-primary" : "bg-[#d9cdcf]",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                  pref.enabled && "translate-x-5",
                )}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

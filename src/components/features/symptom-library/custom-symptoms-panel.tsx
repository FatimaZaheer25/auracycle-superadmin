"use client";

import type {
  CustomSymptomsMeta,
  SuggestedCustomSymptom,
} from "./types";
import { Button } from "@/components/ui";

type CustomSymptomsPanelProps = {
  meta: CustomSymptomsMeta;
  suggestions: SuggestedCustomSymptom[];
  onReview: (suggestion: SuggestedCustomSymptom) => void;
};

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

export function CustomSymptomsPanel({
  meta,
  suggestions,
  onReview,
}: CustomSymptomsPanelProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">Custom symptoms</h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">
          Added by people in &quot;Add custom symptom&quot;
        </p>
      </div>

      <div className="mt-4 rounded-[12px] bg-[#ebe1e1] px-4 py-3">
        <p className="text-xs font-medium text-[#6b6165]">Custom entries · 30d</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-[#221c1e]">
          {formatCount(meta.entries30d)}
        </p>
        <p className="mt-1 text-xs text-[#8f8589]">{meta.privacyNote}</p>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-[#221c1e]">
          Suggested for the library
        </h3>
        <ul className="mt-3 space-y-3">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 border-b border-[#e0d6d6] pb-3 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-[#221c1e]">{item.name}</p>
                <p className="mt-0.5 text-xs text-[#8f8589]">
                  {formatCount(item.users)} users
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-primary/40 text-primary hover:bg-[#efd5de]"
                onClick={() => onReview(item)}
              >
                Review
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[#8f8589]">
        {meta.thresholdNote}
      </p>
    </section>
  );
}

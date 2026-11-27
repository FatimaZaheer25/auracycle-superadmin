import { Lock } from "lucide-react";

export function PrivacyBanner() {
  return (
    <div
      role="note"
      className="flex gap-3 rounded-[var(--radius)] border border-[#e8d7b0] bg-[#fbf6e9] px-4 py-3 text-sm text-[#8a6a2b]"
    >
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#9a6b1f]" aria-hidden />
      <p>
        <span className="font-semibold text-[#7a5a1f]">
          Health data is masked in this list.
        </span>{" "}
        Cycle, symptom and pregnancy details open only inside a user record,
        need a role with data access, and every view is written to the Audit
        Log.
      </p>
    </div>
  );
}

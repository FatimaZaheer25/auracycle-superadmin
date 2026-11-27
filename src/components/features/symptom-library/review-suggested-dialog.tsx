"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Shield, X } from "lucide-react";
import type { SuggestedCustomSymptom } from "./types";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type ReviewSuggestedDialogProps = {
  open: boolean;
  suggestion: SuggestedCustomSymptom | null;
  onClose: () => void;
};

type Decision = "approve" | "reject";
type RejectReason = "duplicate" | "not-health" | "other";

export function ReviewSuggestedDialog({
  open,
  suggestion,
  onClose,
}: ReviewSuggestedDialogProps) {
  const router = useRouter();
  const [decision, setDecision] = useState<Decision>("approve");
  const [reasons, setReasons] = useState<RejectReason[]>([]);

  useEffect(() => {
    if (!open) {
      setDecision("approve");
      setReasons([]);
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open || !suggestion) return null;

  const usersLabel = suggestion.users.toLocaleString("en-US");

  function toggleReason(reason: RejectReason) {
    setReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  }

  function handleContinue() {
    if (!suggestion) return;
    if (decision === "approve") {
      const name = suggestion.name;
      onClose();
      router.push(`/symptom-library/new?name=${encodeURIComponent(name)}`);
      return;
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-[#221c1e]/45"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-suggested-title"
        className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] px-5 py-4">
          <div>
            <h2
              id="review-suggested-title"
              className="text-base font-semibold text-[#221c1e]"
            >
              Review suggested symptom
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              {usersLabel} people added &apos;{suggestion.name}&apos; on their
              own in the last 30 days.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] p-1.5 text-[#8f8589] hover:bg-[#f7f1f0]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#c9b8e0] bg-[#ebe4f5] px-3 py-3">
            <div>
              <p className="text-sm font-semibold text-[#221c1e]">
                {suggestion.name}
              </p>
              <p className="mt-0.5 text-xs text-[#5a4a7a]">
                Closest existing: {suggestion.closestExisting}
              </p>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#5a4a7a]">
              {usersLabel} people
            </span>
          </div>

          <div className="space-y-2">
            <label
              className={cn(
                "block cursor-pointer rounded-[12px] border px-3 py-3",
                decision === "approve"
                  ? "border-primary bg-[#efd5de]"
                  : "border-[#d9cdcf] bg-white",
              )}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  name="review-decision"
                  checked={decision === "approve"}
                  onChange={() => setDecision("approve")}
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="text-sm font-medium text-[#221c1e]">
                    Approve and add to the library
                  </p>
                  <p className="mt-0.5 text-xs text-[#8f8589]">
                    Opens Add symptom with the name filled in.
                  </p>
                </div>
              </div>
            </label>

            <label
              className={cn(
                "block cursor-pointer rounded-[12px] border px-3 py-3",
                decision === "reject"
                  ? "border-primary bg-[#efd5de]"
                  : "border-[#d9cdcf] bg-white",
              )}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  name="review-decision"
                  checked={decision === "reject"}
                  onChange={() => setDecision("reject")}
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="text-sm font-medium text-[#221c1e]">Reject</p>
                  <p className="mt-0.5 text-xs text-[#8f8589]">
                    Stays private to each person who added it.
                  </p>
                </div>
              </div>
            </label>
          </div>

          {decision === "reject" ? (
            <div className="rounded-[12px] border border-[#e8d7b0] bg-[#fbf6e9] px-3 py-3">
              <p className="mb-2 text-xs font-medium text-[#7a5a12]">
                If you reject, choose a reason
              </p>
              <ul className="space-y-2">
                {(
                  [
                    { id: "duplicate", label: "Duplicate of an existing symptom" },
                    { id: "not-health", label: "Not health-related" },
                    { id: "other", label: "Other" },
                  ] as const
                ).map((item) => (
                  <li key={item.id}>
                    <label className="flex items-center gap-2 text-sm text-[#221c1e]">
                      <input
                        type="checkbox"
                        checked={reasons.includes(item.id)}
                        onChange={() => toggleReason(item.id)}
                        className="h-4 w-4 rounded accent-primary"
                      />
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex items-start gap-2 rounded-[12px] border border-[#c9b8e0] bg-[#ebe4f5] px-3 py-2.5 text-xs text-[#4a3d6b]">
            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <p>
              Counts are grouped, so no individual can be identified. The
              decision is logged.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            className="gap-1.5"
            onClick={handleContinue}
            disabled={decision === "reject" && reasons.length === 0}
          >
            <Check className="h-4 w-4" aria-hidden />
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

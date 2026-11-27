"use client";

import { useEffect, useState } from "react";
import { Eye, Lock, X } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";

type RevealMaskedValueDialogProps = {
  open: boolean;
  onClose: () => void;
  fieldLabel: string;
  accountId: string;
  maskedValue: string;
  onReveal: (payload: {
    reason: string;
    referenceId: string;
    why: string;
  }) => void;
};

const REASONS = [
  "Support case",
  "Legal request",
  "Safety investigation",
  "Data quality check",
] as const;

export function RevealMaskedValueDialog({
  open,
  onClose,
  fieldLabel,
  accountId,
  maskedValue,
  onReveal,
}: RevealMaskedValueDialogProps) {
  const [reason, setReason] = useState<string>(REASONS[0]);
  const [referenceId, setReferenceId] = useState("RC-1042");
  const [why, setWhy] = useState(
    "Confirming the temperature entry was restored after a device change.",
  );
  const [confirmed, setConfirmed] = useState(true);

  useEffect(() => {
    if (!open) return;

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

  if (!open) return null;

  function handleReveal() {
    if (!confirmed || !why.trim()) return;
    onReveal({ reason, referenceId, why: why.trim() });
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
        aria-labelledby="reveal-dialog-title"
        className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] px-5 py-4">
          <div>
            <h2
              id="reveal-dialog-title"
              className="text-base font-semibold text-[#221c1e]"
            >
              Reveal masked value
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Recorded in the Audit Log with your name, time and reason.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] p-1.5 text-[#8f8589] hover:bg-[#f7f1f0] hover:text-[#221c1e]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="flex items-center gap-3 rounded-[12px] border border-[#d9cdcf] bg-[#f7f0f1] px-3 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#efd5de] text-primary">
              <Lock className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#221c1e]">
                {fieldLabel}{" "}
                <span className="font-normal text-[#8f8589]">({accountId})</span>
              </p>
              <p className="text-sm text-[#8f8589]">{maskedValue}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[10px] border border-[#9ed4ce] bg-[#e6f6f4] px-3 py-2.5 text-sm text-[#0d6b64]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0d6b64] text-[10px] font-bold text-white">
              ✓
            </span>
            Your role: Data Protection Officer — allowed to reveal
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reveal-reason">Reason</Label>
            <select
              id="reveal-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm text-[#221c1e] outline-none focus:border-primary"
            >
              {REASONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reveal-ref">Reference ID</Label>
            <Input
              id="reveal-ref"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reveal-why">Why do you need this value?</Label>
            <textarea
              id="reveal-why"
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-[10px] border border-[#d9cdcf] bg-white px-3 py-2 text-sm text-[#221c1e] outline-none focus:border-primary"
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-[#6b6165]">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[#d9cdcf] accent-primary"
            />
            I will use this value only for the reason above.
          </label>

          <div className="rounded-[10px] border border-[#c9b8e0] bg-[#ebe4f5] px-3 py-2.5 text-xs text-[#4a3d6b]">
            The value hides again after 5 minutes. Reveals cannot be edited or
            deleted.
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!confirmed || !why.trim()}
            onClick={handleReveal}
            className="gap-1.5"
          >
            <Eye className="h-4 w-4" aria-hidden />
            Reveal value
          </Button>
        </div>
      </div>
    </div>
  );
}

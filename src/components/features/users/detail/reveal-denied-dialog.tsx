"use client";

import { useEffect } from "react";
import { Lock, Send, X } from "lucide-react";
import { Button } from "@/components/ui";

type RevealDeniedDialogProps = {
  open: boolean;
  onClose: () => void;
  currentRole?: string;
  onAskDpo?: () => void;
};

export function RevealDeniedDialog({
  open,
  onClose,
  currentRole = "Support Agent",
  onAskDpo,
}: RevealDeniedDialogProps) {
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
        aria-labelledby="reveal-denied-title"
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white text-center shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] p-1.5 text-[#8f8589] hover:bg-[#f7f1f0] hover:text-[#221c1e]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 px-6 pb-2">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#efd5de] text-primary">
            <Lock className="h-6 w-6" aria-hidden />
          </span>
          <h2
            id="reveal-denied-title"
            className="text-base font-semibold text-[#221c1e]"
          >
            Only a Data Protection Officer can reveal this value
          </h2>
          <p className="text-sm text-[#6b6165]">
            Your role is {currentRole}. You can see that the value exists and
            whether it synced, which is enough for most cases.
          </p>
        </div>

        <div className="mx-6 mb-4 rounded-[12px] border border-[#ebe3e3] bg-[#f7f0f1] px-4 py-3 text-left text-sm">
          <div className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2">
            <span className="text-[#6b6165]">Your role</span>
            <span className="font-medium text-[#221c1e]">{currentRole}</span>
          </div>
          <div className="flex justify-between gap-3 py-2">
            <span className="text-[#6b6165]">Reveal allowed for</span>
            <span className="font-medium text-[#221c1e]">
              Data Protection Officer
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="button"
            className="w-full gap-1.5 sm:w-auto"
            onClick={() => {
              onAskDpo?.();
              onClose();
            }}
          >
            <Send className="h-4 w-4" aria-hidden />
            Ask a DPO to reveal
          </Button>
        </div>

        <p className="px-5 pb-4 text-center text-xs text-[#8f8589]">
          Your request is logged. No value is shown to you.
        </p>
      </div>
    </div>
  );
}

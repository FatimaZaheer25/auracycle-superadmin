"use client";

import { useEffect } from "react";
import { AlertTriangle, Download, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export type RecoveryCode = {
  code: string;
  used?: boolean;
};

type RecoveryCodesDialogProps = {
  open: boolean;
  codes: RecoveryCode[];
  unusedCount: number;
  totalCount: number;
  onClose: () => void;
};

export function RecoveryCodesDialog({
  open,
  codes,
  unusedCount,
  totalCount,
  onClose,
}: RecoveryCodesDialogProps) {
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
        aria-labelledby="recovery-codes-title"
        className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] px-5 py-4">
          <div>
            <h2
              id="recovery-codes-title"
              className="text-base font-semibold text-[#221c1e]"
            >
              Your recovery codes
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              {unusedCount} of {totalCount} codes are unused. Each works once.
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
          <div className="grid grid-cols-2 gap-2">
            {codes.map((item) => (
              <div
                key={item.code}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-[10px] border px-3 py-2.5 font-mono text-sm",
                  item.used
                    ? "border-[#efd5de] bg-[#faf0f3] text-[#8f8589]"
                    : "border-[#d9cdcf] bg-[#faf6f6] text-[#221c1e]",
                )}
              >
                <span>{item.code}</span>
                {item.used ? (
                  <span className="rounded-full bg-[#efd5de] px-2 py-0.5 text-[10px] font-sans font-medium text-primary">
                    Used
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 rounded-[12px] border border-[#e8c98a] bg-[#fbf3dc] px-3 py-2.5 text-xs text-[#7a5a12]">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <p>
              Generating new codes makes all of these stop working. This is
              recorded in the Audit Log.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4">
          <Button type="button" variant="outline" className="gap-1.5">
            <Download className="h-4 w-4" aria-hidden />
            Download
          </Button>
          <Button type="button" variant="outline" className="gap-1.5">
            <RefreshCw className="h-4 w-4" aria-hidden />
            Generate new codes
          </Button>
          <Button type="button" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

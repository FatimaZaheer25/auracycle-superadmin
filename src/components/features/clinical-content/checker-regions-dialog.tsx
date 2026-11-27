"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import type { CheckerRegion } from "./types";
import { Button, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

type CheckerRegionsDialogProps = {
  open: boolean;
  regions: CheckerRegion[];
  onClose: () => void;
};

export function CheckerRegionsDialog({
  open,
  regions: initial,
  onClose,
}: CheckerRegionsDialogProps) {
  const [regions, setRegions] = useState(initial);
  const [reason, setReason] = useState(
    "Regulatory review for Australia is not finished yet.",
  );

  useEffect(() => {
    if (!open) return;
    setRegions(initial);
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
  }, [open, onClose, initial]);

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
        className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-[#221c1e]">
              Symptom Checker regions
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Turn the feature on or off per region · FR-CHK-04
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

        <div className="space-y-3 px-5 py-4">
          {regions.map((region) => (
            <div
              key={region.id}
              className="flex items-center justify-between gap-3 rounded-[12px] border border-[#ebe3e3] px-3 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[#221c1e]">
                  {region.label}
                </p>
                <p className="text-xs text-[#8f8589]">
                  {region.on ? "Available" : "Not available"}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={region.on}
                onClick={() =>
                  setRegions((prev) =>
                    prev.map((r) =>
                      r.id === region.id
                        ? {
                            ...r,
                            on: !r.on,
                            status: !r.on ? "Available" : "Not available",
                          }
                        : r,
                    ),
                  )
                }
                className={cn(
                  "relative h-6 w-11 rounded-full",
                  region.on ? "bg-primary" : "bg-[#d9cdcf]",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                    region.on && "translate-x-5",
                  )}
                />
              </button>
            </div>
          ))}

          <div className="space-y-1.5">
            <Label htmlFor="region-reason">Reason for this change (required)</Label>
            <input
              id="region-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] px-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="rounded-[12px] border border-[#efd5de] bg-[#faf0f3] px-3 py-3 text-xs text-[#6b6165]">
            <p className="font-semibold text-[#221c1e]">This will be logged</p>
            <ul className="mt-2 space-y-1">
              <li>
                <span className="text-[#8f8589]">Who:</span> Super Admin · you
              </li>
              <li>
                <span className="text-[#8f8589]">What:</span> Region list
                reviewed · no change
              </li>
              <li>
                <span className="text-[#8f8589]">Takes effect:</span> Immediately,
                no app update
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="gap-1.5"
            disabled={!reason.trim()}
            onClick={onClose}
          >
            <Check className="h-4 w-4" aria-hidden />
            Save regions
          </Button>
        </div>
      </div>
    </div>
  );
}

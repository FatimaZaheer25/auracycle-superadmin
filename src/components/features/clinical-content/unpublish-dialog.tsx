"use client";

import { useEffect, useState } from "react";
import { FileMinus, X } from "lucide-react";
import { Button, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

type UnpublishDialogProps = {
  open: boolean;
  title: string;
  seenBy: string;
  savedBy: string;
  linkedFrom: string;
  defaultReason: string;
  onClose: () => void;
  onConfirm?: () => void;
};

type Mode = "unpublish" | "archive";

export function UnpublishDialog({
  open,
  title,
  seenBy,
  savedBy,
  linkedFrom,
  defaultReason,
  onClose,
  onConfirm,
}: UnpublishDialogProps) {
  const [mode, setMode] = useState<Mode>("unpublish");
  const [reason, setReason] = useState(defaultReason);

  useEffect(() => {
    if (!open) {
      setMode("unpublish");
      setReason(defaultReason);
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
  }, [open, onClose, defaultReason]);

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
        className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-[#221c1e]">
              Unpublish &apos;{title}&apos;
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              It disappears from the app within a few minutes.
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
          {(
            [
              {
                id: "unpublish",
                label: "Unpublish",
                hint: "Hidden from the app. You can publish it again.",
              },
              {
                id: "archive",
                label: "Archive",
                hint: "Hidden and moved out of the active list.",
              },
            ] as const
          ).map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer gap-2 rounded-[12px] border px-3 py-3",
                mode === option.id
                  ? "border-primary bg-[#efd5de]"
                  : "border-[#d9cdcf]",
              )}
            >
              <input
                type="radio"
                name="unpublish-mode"
                checked={mode === option.id}
                onChange={() => setMode(option.id)}
                className="mt-1 accent-primary"
              />
              <div>
                <p className="text-sm font-medium text-[#221c1e]">
                  {option.label}
                </p>
                <p className="text-xs text-[#8f8589]">{option.hint}</p>
              </div>
            </label>
          ))}

          <ul className="space-y-2 text-sm">
            <li className="flex justify-between gap-3">
              <span className="text-[#6b6165]">Seen by</span>
              <span className="font-medium text-[#221c1e]">{seenBy}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span className="text-[#6b6165]">Saved by people</span>
              <span className="font-medium text-[#221c1e]">{savedBy}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span className="text-[#6b6165]">Linked from</span>
              <span className="font-medium text-primary">{linkedFrom}</span>
            </li>
          </ul>

          <div className="space-y-1.5">
            <Label htmlFor="unpublish-reason">Reason (required)</Label>
            <InputLike
              id="unpublish-reason"
              value={reason}
              onChange={setReason}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="gap-1.5"
            disabled={!reason.trim()}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            <FileMinus className="h-4 w-4" aria-hidden />
            Unpublish
          </Button>
        </div>
      </div>
    </div>
  );
}

function InputLike({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm outline-none focus:border-primary"
    />
  );
}

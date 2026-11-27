"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui";

type LogoutAllDialogProps = {
  open: boolean;
  sessionsSummary: string;
  onClose: () => void;
};

export function LogoutAllDialog({
  open,
  sessionsSummary,
  onClose,
}: LogoutAllDialogProps) {
  const router = useRouter();

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
        aria-labelledby="logout-all-title"
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white text-center shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] p-1.5 text-[#8f8589] hover:bg-[#f7f1f0]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 px-6 pb-2">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#efd5de] text-primary">
            <LogOut className="h-6 w-6" aria-hidden />
          </span>
          <h2
            id="logout-all-title"
            className="text-base font-semibold text-[#221c1e]"
          >
            Log out of all devices?
          </h2>
          <p className="text-sm text-[#6b6165]">
            You will be signed out everywhere, including this device, and will
            need your password and a two-step code to sign in again.
          </p>
        </div>

        <div className="mx-6 mb-4 rounded-[12px] border border-[#ebe3e3] bg-[#f7f0f1] px-4 py-3 text-left text-sm">
          <div className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2">
            <span className="text-[#6b6165]">Sessions that will end</span>
            <span className="text-right font-medium text-[#221c1e]">
              {sessionsSummary}
            </span>
          </div>
          <div className="flex justify-between gap-3 py-2">
            <span className="text-[#6b6165]">Recorded in</span>
            <Link
              href="/audit-log"
              className="font-medium text-primary hover:underline"
            >
              Audit Log
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-full gap-1.5 sm:w-auto"
            onClick={() => {
              onClose();
              router.push("/login");
            }}
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out of all
          </Button>
        </div>
      </div>
    </div>
  );
}

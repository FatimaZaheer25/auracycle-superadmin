"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, KeyRound, Lock, X } from "lucide-react";
import { Button, Label } from "@/components/ui";

type ConfirmIdentityDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirmed: () => void;
};

export function ConfirmIdentityDialog({
  open,
  onClose,
  onConfirmed,
}: ConfirmIdentityDialogProps) {
  const [password, setPassword] = useState("••••••••••••");
  const [code, setCode] = useState("481 902");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!open) {
      setPassword("••••••••••••");
      setCode("481 902");
      setShowPassword(false);
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

  if (!open) return null;

  const canSubmit = password.trim().length > 0 && code.replace(/\s/g, "").length >= 6;

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
        aria-labelledby="confirm-identity-title"
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] px-5 py-4">
          <div>
            <h2
              id="confirm-identity-title"
              className="text-base font-semibold text-[#221c1e]"
            >
              Confirm it is you
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Recovery codes are sensitive. Re-enter your password and a current
              code.
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
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white py-2 pr-10 pl-9 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8f8589] hover:text-[#221c1e]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm-code">Authenticator code</Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
              <input
                id="confirm-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex h-10 w-full rounded-[10px] border border-primary bg-white py-2 pr-3 pl-9 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            className="gap-1.5"
            disabled={!canSubmit}
            onClick={() => {
              onConfirmed();
              onClose();
            }}
          >
            <Eye className="h-4 w-4" aria-hidden />
            Show recovery codes
          </Button>
        </div>
      </div>
    </div>
  );
}

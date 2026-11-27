"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, Lock } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { AuthCard } from "./auth-card";

export function SetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rules = useMemo(
    () => [
      {
        id: "length",
        label: "At least 12 characters",
        ok: password.length >= 12,
      },
      {
        id: "complex",
        label: "A number and a symbol",
        ok: /\d/.test(password) && /[^A-Za-z0-9]/.test(password),
      },
      {
        id: "history",
        label: "Different from your last 5 passwords",
        ok: password.length >= 12,
      },
      {
        id: "match",
        label: "Matches the confirmation",
        ok: password.length > 0 && password === confirm,
      },
    ],
    [password, confirm],
  );

  const allOk = rules.every((r) => r.ok);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!allOk) {
      setError("Meet all password requirements before continuing.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      router.push("/password-updated");
    }, 400);
  }

  return (
    <AuthCard>
      <h1 className="text-2xl font-semibold tracking-tight text-[#221c1e]">
        Set a new password
      </h1>
      <p className="mt-1 text-sm text-[#8f8589]">
        Choose a strong password you have not used before.
      </p>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-danger/20 bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          {error}
        </p>
      ) : null}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="new-password" className="text-xs text-[#6b6165]">
            New password
          </Label>
          <div className="relative mt-1.5">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]"
              aria-hidden
            />
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="border-primary pr-10 pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8f8589] hover:text-[#221c1e]"
              onClick={() => setShowPassword((v) => !v)}
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

        <div>
          <Label htmlFor="confirm-password" className="text-xs text-[#6b6165]">
            Confirm new password
          </Label>
          <div className="relative mt-1.5">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]"
              aria-hidden
            />
            <Input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              className="pr-10 pl-9"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8f8589] hover:text-[#221c1e]"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="rounded-[12px] bg-[#f0e8e6] px-4 py-3">
          <p className="text-xs font-medium text-[#6b6165]">Your password needs</p>
          <ul className="mt-2.5 space-y-2">
            {rules.map((rule) => (
              <li
                key={rule.id}
                className={cn(
                  "flex items-center gap-2 text-xs",
                  rule.ok ? "text-[#0d6b64]" : "text-[#8f8589]",
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full",
                    rule.ok ? "bg-[#c5ebe6] text-[#0d6b64]" : "bg-[#ebe1e1] text-[#8f8589]",
                  )}
                >
                  <Check className="h-2.5 w-2.5" aria-hidden />
                </span>
                {rule.label}
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="submit"
          className="w-full rounded-full"
          size="lg"
          disabled={loading}
        >
          <Check className="h-4 w-4" aria-hidden />
          {loading ? "Updating…" : "Update password"}
        </Button>
      </form>
    </AuthCard>
  );
}

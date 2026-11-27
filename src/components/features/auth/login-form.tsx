"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { AuthCard } from "./auth-card";

type Step = "credentials" | "mfa";

const MFA_LENGTH = 6;

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("name@auracycle.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [code, setCode] = useState<string[]>(Array(MFA_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (step === "mfa") {
      codeRefs.current[0]?.focus();
    }
  }, [step]);

  function handleCredentials(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter your work email and password.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep("mfa");
    }, 450);
  }

  function updateCodeDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    setError("");

    if (digit && index < MFA_LENGTH - 1) {
      codeRefs.current[index + 1]?.focus();
    }
  }

  function handleCodeKeyDown(index: number, key: string) {
    if (key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  }

  function handleCodePaste(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, MFA_LENGTH).split("");
    if (!digits.length) return;
    const next = Array(MFA_LENGTH).fill("");
    digits.forEach((d, i) => {
      next[i] = d;
    });
    setCode(next);
    codeRefs.current[Math.min(digits.length, MFA_LENGTH) - 1]?.focus();
  }

  function handleMfa(e: FormEvent) {
    e.preventDefault();
    setError("");
    const otp = code.join("");

    if (otp.length !== MFA_LENGTH) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 450);
  }

  if (step === "mfa") {
    return (
      <AuthCard>
        <button
          type="button"
          onClick={() => {
            setStep("credentials");
            setCode(Array(MFA_LENGTH).fill(""));
            setError("");
          }}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to sign in
        </button>

        <h1 className="text-2xl font-semibold tracking-tight text-[#221c1e]">
          Two-step verification
        </h1>
        <p className="mt-1 text-sm text-[#8f8589]">
          Enter the 6-digit code from your authenticator app.
        </p>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-[12px] border border-danger/20 bg-danger-bg px-3 py-2 text-sm text-danger"
          >
            {error}
          </p>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={handleMfa}>
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  codeRefs.current[index] = el;
                }}
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                aria-label={`Digit ${index + 1}`}
                onChange={(e) => updateCodeDigit(index, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(index, e.key)}
                onPaste={(e) => {
                  e.preventDefault();
                  handleCodePaste(e.clipboardData.getData("text"));
                }}
                className={cn(
                  "h-12 w-10 rounded-[12px] border bg-white text-center text-lg font-semibold text-[#221c1e] sm:w-11",
                  "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                  digit ? "border-primary" : "border-[#d9cdcf]",
                )}
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full"
            size="lg"
            disabled={loading}
          >
            <Lock className="h-4 w-4" aria-hidden />
            {loading ? "Verifying…" : "Verify and sign in"}
          </Button>

          <p className="text-center text-sm text-[#8f8589]">
            Lost your device?{" "}
            <button
              type="button"
              className="font-medium text-primary hover:text-primary-hover"
            >
              Use a recovery code
            </button>
          </p>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <h1 className="text-2xl font-semibold tracking-tight text-[#221c1e]">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-[#8f8589]">
        Sign in to the AuraCycle Super Admin Console.
      </p>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-[12px] border border-danger/20 bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          {error}
        </p>
      ) : null}

      <form className="mt-6 space-y-4" onSubmit={handleCredentials}>
        <div>
          <Label htmlFor="email" className="text-xs text-[#6b6165]">
            Work email
          </Label>
          <div className="relative mt-1.5">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-primary"
              aria-hidden
            />
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="name@auracycle.com"
              className="border-primary pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="text-xs text-[#6b6165]">
            Password
          </Label>
          <div className="relative mt-1.5">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]"
              aria-hidden
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="pr-10 pl-9"
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

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#5c5457]">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              className="h-4 w-4 rounded border-[#d9cdcf] text-primary accent-[var(--primary)]"
            />
            Keep me signed in on this device
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full rounded-full"
          size="lg"
          disabled={loading}
        >
          {loading ? "Checking…" : "Continue"}
        </Button>

        <div className="flex gap-3 rounded-[12px] border border-[#c9bde8] bg-[#ddd5f0]/70 px-3 py-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5c4d84]/12 text-[#5c4d84]">
            <Shield className="h-3.5 w-3.5" aria-hidden />
          </span>
          <p className="text-xs leading-relaxed text-[#5c4d84]">
            Two-step verification is required for every sign-in.
          </p>
        </div>

        <p className="text-center text-xs text-[#8f8589]">
          Need access? Ask a Super Admin to send you an invite.
        </p>
      </form>
    </AuthCard>
  );
}

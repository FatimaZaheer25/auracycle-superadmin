"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Send } from "lucide-react";
import { Button, Input, Label } from "@/components/ui";
import { AuthCard } from "./auth-card";
import { BackToSignIn } from "./back-to-sign-in";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("name@auracycle.com");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Enter your work email.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      router.push(
        `/check-email?email=${encodeURIComponent(email.trim())}`,
      );
    }, 400);
  }

  return (
    <AuthCard>
      <BackToSignIn />

      <h1 className="text-2xl font-semibold tracking-tight text-[#221c1e]">
        Reset your password
      </h1>
      <p className="mt-1 text-sm text-[#8f8589]">
        Enter your work email. If it belongs to an invited admin, we will send a
        reset link.
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
          <Label htmlFor="reset-email" className="text-xs text-[#6b6165]">
            Work email
          </Label>
          <div className="relative mt-1.5">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]"
              aria-hidden
            />
            <Input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="name@auracycle.com"
              className="border-primary pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-full"
          size="lg"
          disabled={loading}
        >
          <Send className="h-4 w-4" aria-hidden />
          {loading ? "Sending…" : "Send reset link"}
        </Button>

        <div className="flex gap-3 rounded-[12px] border border-[#b7ddd8] bg-[#c5ebe6]/55 px-3 py-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0d6b64]/12 text-[#0d6b64]">
            <Lock className="h-3.5 w-3.5" aria-hidden />
          </span>
          <p className="text-xs leading-relaxed text-[#0d6b64]">
            For security, the link works once and expires in 1 hour.
          </p>
        </div>
      </form>
    </AuthCard>
  );
}

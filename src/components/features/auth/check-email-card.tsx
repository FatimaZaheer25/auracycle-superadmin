"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CircleHelp, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui";
import { AuthCard } from "./auth-card";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "n•••@auracycle.com";
  return `${local[0]}•••@${domain}`;
}

export function CheckEmailCard() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "name@auracycle.com";
  const [resent, setResent] = useState(false);

  return (
    <AuthCard className="text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#efd5de] text-primary">
        <Mail className="h-5 w-5" aria-hidden />
      </span>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#221c1e]">
        Check your email
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#8f8589]">
        We sent a reset link to{" "}
        <span className="font-medium text-[#5c5457]">{maskEmail(email)}</span>.
        Open it on this device to choose a new password.
      </p>

      <div className="mt-5 space-y-2.5 rounded-[12px] bg-[#f0e8e6] px-4 py-3 text-left">
        <p className="flex items-center gap-2 text-xs text-[#6b6165]">
          <Clock className="h-3.5 w-3.5 text-primary" aria-hidden />
          {resent ? "Link resent just now" : "Link sent just now"}
        </p>
        <p className="flex items-center gap-2 text-xs text-[#6b6165]">
          <CircleHelp className="h-3.5 w-3.5 text-primary" aria-hidden />
          Not there? Check your spam folder
        </p>
      </div>

      <div className="mt-5 space-y-2.5">
        <Button
          type="button"
          className="w-full rounded-full"
          size="lg"
          onClick={() => {
            window.location.href = `mailto:${email}`;
          }}
        >
          <Mail className="h-4 w-4" aria-hidden />
          Open email app
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-full"
          size="lg"
          onClick={() => setResent(true)}
        >
          Resend link
        </Button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        <Link
          href="/reset-password"
          className="text-xs text-[#8f8589] underline-offset-2 hover:underline"
        >
          Continue with link (demo)
        </Link>
      </div>

      <Link
        href="/login"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to sign in
      </Link>
    </AuthCard>
  );
}

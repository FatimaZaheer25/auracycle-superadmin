import Link from "next/link";
import { Check, ScrollText } from "lucide-react";
import { Button } from "@/components/ui";
import { AuthCard } from "./auth-card";

export function PasswordUpdatedCard() {
  return (
    <AuthCard className="text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#c5ebe6] text-[#0d6b64]">
        <Check className="h-5 w-5" aria-hidden />
      </span>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#221c1e]">
        Password updated
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#8f8589]">
        You have been signed out of all other devices. Sign in again with your
        new password.
      </p>

      <div className="mt-5 flex gap-3 rounded-[12px] border border-[#c9bde8] bg-[#ddd5f0]/70 px-3 py-3 text-left">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5c4d84]/12 text-[#5c4d84]">
          <ScrollText className="h-3.5 w-3.5" aria-hidden />
        </span>
        <p className="text-xs leading-relaxed text-[#5c4d84]">
          This change was recorded in the audit log.
        </p>
      </div>

      <Link href="/login" className="mt-5 block">
        <Button className="w-full rounded-full" size="lg">
          Back to sign in
        </Button>
      </Link>
    </AuthCard>
  );
}

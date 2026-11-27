import { Suspense } from "react";
import { CheckEmailCard } from "@/components/features/auth";
import { AuthCard } from "@/components/features/auth/auth-card";

function CheckEmailFallback() {
  return (
    <AuthCard>
      <p className="text-sm text-[#8f8589]">Loading…</p>
    </AuthCard>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<CheckEmailFallback />}>
      <CheckEmailCard />
    </Suspense>
  );
}

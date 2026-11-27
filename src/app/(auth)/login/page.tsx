import { Suspense } from "react";
import { LoginForm } from "@/components/features/auth/login-form";

function LoginFallback() {
  return (
    <div className="rounded-[20px] border border-[#d9cdcf] bg-white p-8">
      <p className="text-sm text-[#8f8589]">Loading sign-in…</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}

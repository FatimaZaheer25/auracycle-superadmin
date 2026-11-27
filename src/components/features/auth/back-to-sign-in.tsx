import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToSignIn() {
  return (
    <Link
      href="/login"
      className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Back to sign in
    </Link>
  );
}

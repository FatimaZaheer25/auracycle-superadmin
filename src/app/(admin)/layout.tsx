import { Suspense } from "react";
import { AdminShell } from "@/components/layout";
import { AdminShellFallback } from "@/components/layout/admin-shell-fallback";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<AdminShellFallback>{children}</AdminShellFallback>}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

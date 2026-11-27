import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
};

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-[#d9cdcf] bg-white p-6 shadow-[0_12px_40px_rgba(34,28,30,0.08)] sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "teal"
  | "coral"
  | "lavender"
  | "peach";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-muted text-muted border-border",
  success: "bg-success-bg text-success border-transparent",
  warning: "bg-warning-bg text-warning border-transparent",
  danger: "bg-danger-bg text-danger border-transparent",
  info: "bg-info-bg text-info border-transparent",
  accent: "bg-accent-bg text-accent border-transparent",
  teal: "bg-teal-bg text-teal border-transparent",
  coral: "bg-coral-bg text-coral border-transparent",
  lavender: "bg-lavender-bg text-lavender border-transparent",
  peach: "border-transparent bg-[#f8eedc] text-[#9a6b1f]",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

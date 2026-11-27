import { Lock } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

type DetailRowProps = {
  label: string;
  value?: string;
  badge?: string;
  badgeVariant?: "teal" | "coral" | "accent" | "success" | "peach" | "default";
  masked?: boolean;
  status?: "on" | "off" | "private";
  revealedValue?: string;
  revealEndsIn?: string;
  onMaskedClick?: () => void;
};

const statusClass: Record<NonNullable<DetailRowProps["status"]>, string> = {
  on: "bg-[#e6f7f5] text-[#1f7a72]",
  off: "bg-[#fde8e6] text-[#b42318]",
  private: "bg-[#efe7ff] text-[#6d28d9]",
};

export function DetailRow({
  label,
  value,
  badge,
  badgeVariant = "default",
  masked,
  status,
  revealedValue,
  revealEndsIn,
  onMaskedClick,
}: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#f0eaea] py-3 last:border-0">
      <span className="text-sm text-[#7a7074]">{label}</span>
      <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 text-right">
        {revealedValue ? (
          <span className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={onMaskedClick}
              className="text-sm font-semibold text-[#a33d52]"
            >
              {revealedValue}
            </button>
            {revealEndsIn ? (
              <span className="rounded-full bg-[#f0e0b8] px-2 py-0.5 text-[11px] font-medium text-[#8a5f16]">
                Hides in {revealEndsIn}
              </span>
            ) : null}
          </span>
        ) : masked ? (
          <button
            type="button"
            onClick={onMaskedClick}
            className="inline-flex items-center gap-1.5 text-sm text-[#9a9094] hover:text-primary"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden />
            {value ?? "Hidden"}
          </button>
        ) : null}
        {badge ? <Badge variant={badgeVariant}>{badge}</Badge> : null}
        {status ? (
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              statusClass[status],
            )}
          >
            {value ?? status}
          </span>
        ) : null}
        {!masked && !badge && !status && value ? (
          <span className="text-sm font-medium text-[#2a2426]">{value}</span>
        ) : null}
      </div>
    </div>
  );
}

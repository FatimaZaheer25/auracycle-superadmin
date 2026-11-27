import {
  Clock,
  CreditCard,
  FileText,
  KeyRound,
  MessageSquare,
  Shield,
  Trash2,
} from "lucide-react";
import type { NotificationIcon as IconKind } from "@/types/notifications";
import { cn } from "@/lib/utils";

const config: Record<
  IconKind,
  { icon: typeof Clock; className: string }
> = {
  clock: { icon: Clock, className: "bg-[#f0e0b8] text-[#8a5f16]" },
  shield: { icon: Shield, className: "bg-[#ddd5f0] text-[#5c4d84]" },
  message: { icon: MessageSquare, className: "bg-[#efd5de] text-primary" },
  card: { icon: CreditCard, className: "bg-[#c5ebe6] text-[#0d6b64]" },
  file: { icon: FileText, className: "bg-[#e8d5c8] text-[#7a554c]" },
  key: { icon: KeyRound, className: "bg-[#ddd5f0] text-[#5c4d84]" },
  trash: { icon: Trash2, className: "bg-[#e8d5c8] text-[#7a554c]" },
};

export function NotificationIconBadge({
  kind,
  className,
}: {
  kind: IconKind;
  className?: string;
}) {
  const { icon: Icon, className: tone } = config[kind];
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]",
        tone,
        className,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </span>
  );
}

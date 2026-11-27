import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { AttentionItem } from "./types";
import { cn } from "@/lib/utils";

type NeedsAttentionProps = {
  items: AttentionItem[];
};

const toneDot: Record<AttentionItem["tone"], string> = {
  warn: "bg-[#8a5f16]",
  coral: "bg-[#a33d52]",
  lavender: "bg-[#5c4d84]",
};

const tonePill: Record<AttentionItem["tone"], string> = {
  warn: "bg-[#f0e0b8] text-[#8a5f16]",
  coral: "bg-[#f0d0d9] text-[#a33d52]",
  lavender: "bg-[#ddd5f0] text-[#5c4d84]",
};

export function NeedsAttention({ items }: NeedsAttentionProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-1">
        <h2 className="text-sm font-semibold text-[#221c1e]">Needs attention</h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">
          Items waiting on a team member
        </p>
      </div>

      <ul className="mt-3">
        {items.map((item, index) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 py-3 transition-colors hover:bg-[#faf6f5]",
                index < items.length - 1 && "border-b border-[#ebe3e3]",
              )}
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 shrink-0 rounded-full",
                  toneDot[item.tone],
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#221c1e]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-[#8f8589]">{item.detail}</p>
              </div>
              <span
                className={cn(
                  "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
                  tonePill[item.tone],
                )}
              >
                {item.category}
              </span>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-[#8f8589]"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

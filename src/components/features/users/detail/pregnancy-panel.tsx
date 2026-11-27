import { Check } from "lucide-react";
import type { UserDetail } from "@/types/user-detail";
import { SectionCard } from "./section-card";

type PregnancyPanelProps = {
  user: UserDetail;
};

export function PregnancyPanel({ user }: PregnancyPanelProps) {
  const { pregnancy } = user;

  return (
    <div className="space-y-4">
      <SectionCard
        title="Pregnancy tracking"
        subtitle="Not active for this person."
        badge={
          <span className="rounded-full bg-[#efd5de] px-2.5 py-1 text-[11px] font-medium text-primary">
            {pregnancy.statusBadge}
          </span>
        }
      >
        <ul>
          {pregnancy.rows.map((row) => (
            <li
              key={row.label}
              className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] py-3 last:border-0"
            >
              <span className="text-sm text-[#6b6165]">{row.label}</span>
              <span className="text-right text-sm font-medium text-[#221c1e]">
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Always free"
          subtitle="Permanent baseline · FR-PRG-03 · FR-MON-03"
          badge={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
              Protected
            </span>
          }
        >
          <ul className="space-y-2.5">
            {pregnancy.alwaysFree.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#221c1e]">
                <Check className="h-4 w-4 shrink-0 text-[#0d6b64]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Premium extras"
          subtitle={pregnancy.premiumNote}
          badge={
            <span className="rounded-full bg-[#efd5de] px-2.5 py-1 text-[11px] font-medium text-primary">
              Included
            </span>
          }
        >
          <ul className="space-y-2.5">
            {pregnancy.premiumExtras.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#221c1e]">
                <Check className="h-4 w-4 shrink-0 text-[#0d6b64]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="flex items-start gap-3 rounded-[12px] border border-[#c9b8e0] bg-[#ebe4f5] px-4 py-3 text-sm text-[#4a3d6b]">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9b8e0] text-xs font-semibold">
          i
        </span>
        <p>{pregnancy.footer}</p>
      </div>
    </div>
  );
}

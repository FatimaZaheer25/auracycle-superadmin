import { Eye, Lock } from "lucide-react";
import type { UserDetail } from "../user-detail.types";
import { SectionCard } from "./section-card";

type PartnerSharingPanelProps = {
  user: UserDetail;
};

export function PartnerSharingPanel({ user }: PartnerSharingPanelProps) {
  const { partnerTab } = user;

  return (
    <div className="space-y-4">
      <SectionCard
        title="Partner sharing"
        subtitle={partnerTab.subtitle}
        badge={
          <span className="rounded-full bg-[#efd5de] px-2.5 py-1 text-[11px] font-medium text-primary">
            {partnerTab.statusBadge}
          </span>
        }
      >
        <ul>
          {partnerTab.rows.map((row) => (
            <li
              key={row.label}
              className="flex justify-between gap-3 border-b border-[#ebe3e3] py-3 last:border-0 text-sm"
            >
              <span className="text-[#6b6165]">{row.label}</span>
              <span className="text-right font-medium text-[#221c1e]">
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="What a person can choose to share"
          subtitle="The person decides, support cannot."
        >
          <ul className="space-y-2.5">
            {partnerTab.canShare.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#221c1e]">
                <Eye className="h-4 w-4 shrink-0 text-[#8f8589]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Rules the system enforces"
          subtitle="FR-PTN-01 · FR-PTN-02"
        >
          <ul>
            {partnerTab.rules.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0 text-sm"
              >
                <span className="text-[#6b6165]">{row.label}</span>
                {row.badge ? (
                  <span className="rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                    {row.value}
                  </span>
                ) : (
                  <span className="font-medium text-[#221c1e]">{row.value}</span>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="flex items-start gap-3 rounded-[12px] border border-[#c9b8e0] bg-[#ebe4f5] px-4 py-3 text-sm text-[#4a3d6b]">
        <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <div>
          <p className="font-semibold">No admin action available</p>
          <p className="mt-0.5">
            Partner access is controlled only by the person. Admins can see
            whether sharing is on, never what is shared.
          </p>
        </div>
      </div>
    </div>
  );
}

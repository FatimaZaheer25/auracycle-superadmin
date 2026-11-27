import type { UserDetail } from "../user-detail.types";
import { SectionCard } from "./section-card";

type PerimenopausePanelProps = {
  user: UserDetail;
};

export function PerimenopausePanel({ user }: PerimenopausePanelProps) {
  const { perimenopause } = user;

  return (
    <div className="space-y-4">
      <SectionCard
        title="Perimenopause tracking"
        subtitle="Not active for this person."
        badge={
          <span className="rounded-full bg-[#e8d5c8] px-2.5 py-1 text-[11px] font-medium text-[#7a554c]">
            {perimenopause.statusBadge}
          </span>
        }
      >
        <ul>
          {perimenopause.rows.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-3 border-b border-[#ebe3e3] py-3 last:border-0"
            >
              <span className="text-sm text-[#6b6165]">{row.label}</span>
              {row.badgeTone === "warn" ? (
                <span className="rounded-full bg-[#e8d5c8] px-2.5 py-1 text-[11px] font-medium text-[#7a554c]">
                  {row.badge ?? row.value}
                </span>
              ) : row.badgeTone === "teal" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
                  {row.badge ?? row.value}
                </span>
              ) : (
                <span className="text-sm font-medium text-[#221c1e]">
                  {row.value}
                </span>
              )}
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Symptoms that count"
          subtitle="Tagged in the Symptom Library."
        >
          <ul>
            {perimenopause.symptoms.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0"
              >
                <span className="text-sm text-[#221c1e]">{item}</span>
                <span className="rounded-full bg-[#ebe4f5] px-2.5 py-1 text-[11px] font-medium text-[#5a4a7a]">
                  Perimenopause
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="How the score works" subtitle="FR-PMN-02">
          <p className="text-sm leading-relaxed text-[#6b6165]">
            {perimenopause.scoreNote}
          </p>
          <div className="mt-4">
            <span className="rounded-full bg-[#f0e0b8] px-2.5 py-1 text-[11px] font-medium text-[#8a5f16]">
              Educational · not a diagnosis.
            </span>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

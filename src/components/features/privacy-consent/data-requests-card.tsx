import type { DataRequestRule, DataRequestStat } from "@/types/privacy-consent";
import { cn } from "@/lib/utils";

type DataRequestsCardProps = {
  subtitle: string;
  stats: DataRequestStat[];
  rules: DataRequestRule[];
};

const valueTone: Record<DataRequestStat["valueTone"], string> = {
  teal: "text-[#0d6b64]",
  coral: "text-[#a33d52]",
  lavender: "text-[#5c4d84]",
};

export function DataRequestsCard({
  subtitle,
  stats,
  rules,
}: DataRequestsCardProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">
          Data requests · 30 days
        </h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-[12px] bg-[#f0e8e6] px-3 py-3"
          >
            <p className="text-xs font-medium text-[#6b6165]">{stat.label}</p>
            <p
              className={cn(
                "mt-1 text-xl font-semibold tracking-tight",
                valueTone[stat.valueTone],
              )}
            >
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs text-[#8f8589]">{stat.hint}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4">
        {rules.map((rule, index) => (
          <li
            key={rule.id}
            className={cn(
              "flex items-center justify-between gap-3 py-2.5",
              index < rules.length - 1 && "border-b border-[#ebe3e3]",
            )}
          >
            <p className="text-sm text-[#6b6165]">{rule.label}</p>
            {rule.tone === "text" ? (
              <p className="text-sm font-semibold text-[#221c1e]">{rule.value}</p>
            ) : (
              <span className="inline-flex rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                {rule.value}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

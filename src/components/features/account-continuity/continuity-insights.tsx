import type { IdentifierShare, OutcomeStat } from "./types";
import { cn } from "@/lib/utils";

type ContinuityInsightsProps = {
  outcomes: OutcomeStat[];
  outcomesMeta: {
    subtitle: string;
    selfServed: string;
    recovered: number;
    total: number;
  };
  identifiers: IdentifierShare[];
  identifiersMeta: { subtitle: string };
};

const toneValue: Record<OutcomeStat["tone"], string> = {
  teal: "text-[#1f7a72]",
  purple: "text-[#6d28d9]",
  danger: "text-[#8b3a54]",
};

export function ContinuityInsights({
  outcomes,
  outcomesMeta,
  identifiers,
  identifiersMeta,
}: ContinuityInsightsProps) {
  const rate = Math.round(
    (outcomesMeta.recovered / outcomesMeta.total) * 1000,
  ) / 10;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Real “Saved data not found” outcomes */}
      <section className="rounded-[16px] border border-[#e8dfdf] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#2a2426]">
              “Saved data not found” outcomes
            </h2>
            <p className="mt-0.5 text-xs text-[#9a9094]">
              {outcomesMeta.subtitle}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e6f7f5] px-2.5 py-1 text-xs font-medium text-[#1f7a72]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1f7a72]" aria-hidden />
            {outcomesMeta.selfServed}
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {outcomes.map((item) => (
            <div
              key={item.label}
              className="rounded-[12px] bg-[#faf4f2] px-3 py-3"
            >
              <p className="text-xs text-[#7a7074]">{item.label}</p>
              <p
                className={cn(
                  "mt-1 text-2xl font-semibold tracking-tight",
                  toneValue[item.tone],
                )}
              >
                {item.count}
              </p>
              <p className="mt-0.5 text-xs text-[#9a9094]">{item.percent}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-[#2a2426]">Recovered without support</span>
            <span className="font-medium text-[#2a2426]">
              {outcomesMeta.recovered} of {outcomesMeta.total}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[#f3eeee]">
            <div
              className="h-full rounded-full bg-[#1f7a72]"
              style={{ width: `${rate}%` }}
            />
          </div>
        </div>
      </section>

      {/* Real identifiers section */}
      <section className="rounded-[16px] border border-[#e8dfdf] bg-white p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-[#2a2426]">
          Identifiers used to locate accounts
        </h2>
        <p className="mt-0.5 text-xs text-[#9a9094]">
          {identifiersMeta.subtitle}
        </p>

        <div className="mt-4 space-y-4">
          {identifiers.map((item) => (
            <div key={item.label}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="text-[#2a2426]">{item.label}</span>
                <span className="text-[#7a7074]">{item.percent}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#f3eeee]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

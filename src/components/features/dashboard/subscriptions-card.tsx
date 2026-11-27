import type { SubscriptionStats } from "./types";

type SubscriptionsCardProps = {
  stats: SubscriptionStats;
};

export function SubscriptionsCard({ stats }: SubscriptionsCardProps) {
  return (
    <section className="h-full rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">Subscriptions</h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">
            Premium plans · FR-ADM-05
          </p>
        </div>
        <span className="inline-flex rounded-full bg-[#f0d0d9] px-2.5 py-1 text-[11px] font-medium text-[#a33d52]">
          MRR {stats.mrr}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[12px] bg-[#f0e8e6] px-3 py-3">
          <p className="text-xs text-[#6b6165]">Active Premium</p>
          <p className="mt-1 text-xl font-semibold text-[#221c1e]">
            {stats.activePremium}
          </p>
          <p className="mt-0.5 text-xs text-[#8f8589]">{stats.activeHint}</p>
        </div>
        <div className="rounded-[12px] bg-[#f0e8e6] px-3 py-3">
          <p className="text-xs text-[#6b6165]">Annual</p>
          <p className="mt-1 text-xl font-semibold text-[#a33d52]">
            {stats.annual}
          </p>
          <p className="mt-0.5 text-xs text-[#8f8589]">{stats.annualHint}</p>
        </div>
        <div className="rounded-[12px] bg-[#f0e8e6] px-3 py-3">
          <p className="text-xs text-[#6b6165]">Monthly</p>
          <p className="mt-1 text-xl font-semibold text-[#5c4d84]">
            {stats.monthly}
          </p>
          <p className="mt-0.5 text-xs text-[#8f8589]">{stats.monthlyHint}</p>
        </div>
      </div>

      <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-[#ebe1e1]">
        <div
          className="h-full bg-[#a33d52]"
          style={{ width: `${stats.annualShare}%` }}
        />
        <div
          className="h-full bg-[#5c4d84]"
          style={{ width: `${100 - stats.annualShare}%` }}
        />
      </div>
    </section>
  );
}

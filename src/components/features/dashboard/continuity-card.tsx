import type { ContinuityStats } from "@/types/dashboard";

type ContinuityCardProps = {
  stats: ContinuityStats;
};

export function ContinuityCard({ stats }: ContinuityCardProps) {
  return (
    <section className="h-full rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">
            Account continuity
          </h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">
            New-device sign-ins · FR-ADM-03
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" aria-hidden />
          Target: zero data-loss
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[12px] bg-[#f0e8e6] px-3 py-3">
          <p className="text-xs text-[#6b6165]">New-device sign-ins</p>
          <p className="mt-1 text-xl font-semibold text-[#221c1e]">
            {stats.newDeviceSignIns}
          </p>
          <p className="mt-0.5 text-xs text-[#8f8589]">{stats.newDeviceHint}</p>
        </div>
        <div className="rounded-[12px] bg-[#f0e8e6] px-3 py-3">
          <p className="text-xs text-[#6b6165]">Restored automatically</p>
          <p className="mt-1 text-xl font-semibold text-[#0d6b64]">
            {stats.restoredAutomatically}
          </p>
          <p className="mt-0.5 text-xs text-[#8f8589]">{stats.restoredHint}</p>
        </div>
        <div className="rounded-[12px] bg-[#f0e8e6] px-3 py-3">
          <p className="text-xs text-[#6b6165]">Manual recovery</p>
          <p className="mt-1 text-xl font-semibold text-[#a33d52]">
            {stats.manualRecovery}
          </p>
          <p className="mt-0.5 text-xs text-[#8f8589]">{stats.manualHint}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
          <span className="font-medium text-[#221c1e]">{stats.syncLagLabel}</span>
          <span className="text-[#8f8589]">{stats.syncLagTarget}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#ebe1e1]">
          <div
            className="h-full rounded-full bg-[#0d6b64]"
            style={{ width: `${stats.syncLagPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}

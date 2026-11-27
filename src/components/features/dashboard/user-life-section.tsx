import type { ActiveUsersPoint, NamedShare } from "./types";
import { ActiveUsersChart } from "./active-users-chart";
import { ShareBars } from "./share-bars";

type UserLifeSectionProps = {
  chart: ActiveUsersPoint[];
  lifeStages: NamedShare[];
  accountTypes: NamedShare[];
};

export function UserLifeSection({
  chart,
  lifeStages,
  accountTypes,
}: UserLifeSectionProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      <div className="xl:col-span-3">
        <ActiveUsersChart data={chart} />
      </div>
      <section className="space-y-5 rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5 xl:col-span-2">
        <ShareBars
          title="Life-stage focus"
          description="Chosen at onboarding · “Choose your focus”"
          items={lifeStages}
        />
        <div className="border-t border-[#ebe3e3] pt-5">
          <ShareBars title="Account type" items={accountTypes} />
        </div>
      </section>
    </div>
  );
}

import { DashboardView } from "@/components/features/dashboard";
import {
  accountTypeShares,
  activeUsersSeries,
  attentionItems,
  continuityStats,
  dashboardKpis,
  dashboardMeta,
  lifeStageShares,
  subscriptionStats,
} from "@/mock/dashboard";

export default function DashboardPage() {
  return (
    <DashboardView
      subtitle={dashboardMeta.subtitle}
      kpis={dashboardKpis}
      chart={activeUsersSeries}
      lifeStages={lifeStageShares}
      accountTypes={accountTypeShares}
      continuity={continuityStats}
      subscriptions={subscriptionStats}
      attention={attentionItems}
    />
  );
}

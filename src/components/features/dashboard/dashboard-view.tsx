"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type {
  ActiveUsersPoint,
  AttentionItem,
  ContinuityStats,
  DashboardKpi,
  NamedShare,
  SubscriptionStats,
} from "./types";
import { Button, PageHeader } from "@/components/ui";
import { ContinuityCard } from "./continuity-card";
import { ExportReportDialog } from "./export-report-dialog";
import { KpiGrid } from "./kpi-grid";
import { NeedsAttention } from "./needs-attention";
import { SubscriptionsCard } from "./subscriptions-card";
import { UserLifeSection } from "./user-life-section";

type DashboardViewProps = {
  subtitle: string;
  kpis: DashboardKpi[];
  chart: ActiveUsersPoint[];
  lifeStages: NamedShare[];
  accountTypes: NamedShare[];
  continuity: ContinuityStats;
  subscriptions: SubscriptionStats;
  attention: AttentionItem[];
};

export function DashboardView({
  subtitle,
  kpis,
  chart,
  lifeStages,
  accountTypes,
  continuity,
  subscriptions,
  attention,
}: DashboardViewProps) {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <>
      <div className="space-y-5">
        <PageHeader
          title="Dashboard"
          description={subtitle}
          actions={
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => setExportOpen(true)}
            >
              <Download className="h-4 w-4" aria-hidden />
              Export report
            </Button>
          }
        />

        <KpiGrid items={kpis} />

        <UserLifeSection
          chart={chart}
          lifeStages={lifeStages}
          accountTypes={accountTypes}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <ContinuityCard stats={continuity} />
          <SubscriptionsCard stats={subscriptions} />
        </div>

        <NeedsAttention items={attention} />
      </div>

      <ExportReportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
      />
    </>
  );
}

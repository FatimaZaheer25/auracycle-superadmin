import Link from "next/link";
import { Plus } from "lucide-react";
import {
  AnonymousWarning,
  ContinuityInsights,
  ContinuityKpis,
  RecoveryCasesTable,
  SlaAlertBanner,
} from "@/components/features/account-continuity";
import { Button, PageHeader } from "@/components/ui";
import {
  continuityKpis,
  continuitySlaAlert,
  identifierShares,
  identifiersMeta,
  outcomeStats,
  outcomesMeta,
  recoveryCases,
} from "@/mock/account-continuity";

export default function AccountContinuityPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Account Continuity"
        description="Cross-device sync health and recovery cases · FR-CNT · FR-ADM-03"
        actions={
          <Link href="/account-continuity/new">
            <Button size="sm" className="rounded-full">
              <Plus className="h-4 w-4" aria-hidden />
              New recovery case
            </Button>
          </Link>
        }
      />

      <SlaAlertBanner alert={continuitySlaAlert} />
      <ContinuityKpis items={continuityKpis} />
      <RecoveryCasesTable cases={recoveryCases} />
      <ContinuityInsights
        outcomes={outcomeStats}
        outcomesMeta={outcomesMeta}
        identifiers={identifierShares}
        identifiersMeta={identifiersMeta}
      />
      <AnonymousWarning />
    </div>
  );
}

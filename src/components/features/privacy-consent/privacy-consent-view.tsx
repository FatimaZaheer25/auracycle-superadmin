import Link from "next/link";
import { FileText, Scale, Upload } from "lucide-react";
import type {
  ConsentType,
  DataRequestRule,
  DataRequestStat,
  PrivacyMeta,
  RetentionRow,
} from "./types";
import { Button, PageHeader } from "@/components/ui";
import { ConsentTypesTable } from "./consent-types-table";
import { DataRequestsCard } from "./data-requests-card";
import { PrivacyBanner } from "./privacy-banner";
import { RetentionCard } from "./retention-card";

type PrivacyConsentViewProps = {
  meta: PrivacyMeta;
  consents: ConsentType[];
  requestStats: DataRequestStat[];
  requestRules: DataRequestRule[];
  retention: RetentionRow[];
};

export function PrivacyConsentView({
  meta,
  consents,
  requestStats,
  requestRules,
  retention,
}: PrivacyConsentViewProps) {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Privacy & Consent"
        description={meta.subtitle}
        actions={
          <>
            <Link href="/privacy-consent/data-requests">
              <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                <FileText className="h-4 w-4" aria-hidden />
                Data requests
              </Button>
            </Link>
            <Link href="/privacy-consent/legal/LR-2026-014">
              <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                <Scale className="h-4 w-4" aria-hidden />
                Legal request
              </Button>
            </Link>
            <Button size="sm" className="rounded-full gap-1.5">
              <Upload className="h-4 w-4" aria-hidden />
              Export audit
            </Button>
          </>
        }
      />

      <PrivacyBanner message={meta.banner} />

      <ConsentTypesTable items={consents} subtitle={meta.consentSubtitle} />

      <div className="grid gap-4 xl:grid-cols-2">
        <Link href="/privacy-consent/data-requests" className="block">
          <DataRequestsCard
            subtitle={meta.requestsSubtitle}
            stats={requestStats}
            rules={requestRules}
          />
        </Link>
        <RetentionCard
          subtitle={meta.retentionSubtitle}
          rows={retention}
        />
      </div>
    </div>
  );
}

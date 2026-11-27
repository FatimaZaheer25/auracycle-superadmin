import { FileText } from "lucide-react";
import type {
  CommunityKpi,
  CommunityMeta,
  CommunityTopic,
  ModerationReport,
  SecretChatRule,
} from "./types";
import { Button, PageHeader } from "@/components/ui";
import { CommunityKpis } from "./community-kpis";
import { ModerationQueue } from "./moderation-queue";
import { PrivacyBanner } from "./privacy-banner";
import { TopicsPanel } from "./topics-panel";

type CommunityViewProps = {
  meta: CommunityMeta;
  kpis: CommunityKpi[];
  reports: ModerationReport[];
  topics: CommunityTopic[];
  secretRules: SecretChatRule[];
};

export function CommunityView({
  meta,
  kpis,
  reports,
  topics,
  secretRules,
}: CommunityViewProps) {
  const pendingCount =
    Number(kpis.find((k) => k.id === "pending")?.value ?? 0) ||
    reports.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Community"
        description={meta.subtitle}
        actions={
          <Button size="sm" className="rounded-full">
            <FileText className="h-4 w-4" aria-hidden />
            Community rules
          </Button>
        }
      />

      <CommunityKpis items={kpis} />

      <PrivacyBanner title={meta.privacyTitle} body={meta.privacyBody} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <ModerationQueue reports={reports} pendingCount={pendingCount} />
        <TopicsPanel topics={topics} secretRules={secretRules} />
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Shield, Upload } from "lucide-react";
import type {
  AssistantSource,
  CheckerRegion,
  CheckerRow,
  CheckerTopic,
  ClinicalArticle,
  ClinicalContentMeta,
  ClinicalKpi,
  HealthAssistantRule,
  TopicFilter,
} from "@/types/clinical-content";
import { Button, PageHeader } from "@/components/ui";
import { ArticlesTable } from "./articles-table";
import { CheckerRegionsDialog } from "./checker-regions-dialog";
import { ClinicalKpis } from "./clinical-kpis";
import { ContentTabs, type ContentTab } from "./content-tabs";
import { HealthAssistantPanel } from "./health-assistant-panel";
import { HealthAssistantTab } from "./health-assistant-tab";
import { SymptomCheckerPanel } from "./symptom-checker-panel";
import { SymptomCheckerTab } from "./symptom-checker-tab";
import { TopicFilters } from "./topic-filters";
import { UnpublishDialog } from "./unpublish-dialog";

type ClinicalContentViewProps = {
  meta: ClinicalContentMeta;
  kpis: ClinicalKpi[];
  topicFilters: { id: TopicFilter; label: string }[];
  articles: ClinicalArticle[];
  checkerRows: CheckerRow[];
  assistantRules: HealthAssistantRule[];
  checkerTopics: CheckerTopic[];
  assistantSources: AssistantSource[];
  assistantSafetyRules: HealthAssistantRule[];
  checkerRegions: CheckerRegion[];
  unpublishDefaults: {
    articleId: string;
    title: string;
    seenBy: string;
    savedBy: string;
    linkedFrom: string;
    reason: string;
  };
};

export function ClinicalContentView({
  meta,
  kpis,
  topicFilters,
  articles,
  checkerRows,
  assistantRules,
  checkerTopics,
  assistantSources,
  assistantSafetyRules,
  checkerRegions,
  unpublishDefaults,
}: ClinicalContentViewProps) {
  const [tab, setTab] = useState<ContentTab>("articles");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [unpublishOpen, setUnpublishOpen] = useState(false);
  const [unpublishTitle, setUnpublishTitle] = useState(
    unpublishDefaults.title,
  );

  const filtered = useMemo(() => {
    if (topic === "all") return articles;
    return articles.filter((a) => a.topic === topic);
  }, [articles, topic]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Clinical Content"
        description={meta.subtitle}
        actions={
          <>
            <Link href="/global-content/rating-review">
              <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                <Shield className="h-4 w-4" aria-hidden />
                Rating review
              </Button>
            </Link>
            {tab === "assistant" ? (
              <Button size="sm" className="rounded-full gap-1.5">
                <Upload className="h-4 w-4" aria-hidden />
                Add source
              </Button>
            ) : tab === "checker" ? (
              <Button size="sm" className="rounded-full gap-1.5">
                <Plus className="h-4 w-4" aria-hidden />
                New topic
              </Button>
            ) : (
              <Link href="/global-content/new">
                <Button size="sm" className="rounded-full gap-1.5">
                  <Plus className="h-4 w-4" aria-hidden />
                  New article
                </Button>
              </Link>
            )}
          </>
        }
      />

      <ClinicalKpis items={kpis} />
      <ContentTabs active={tab} onChange={setTab} />

      {tab === "articles" ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#221c1e]">
                Learn library
              </h2>
              <p className="mt-0.5 text-xs text-[#8f8589]">
                {meta.librarySubtitle}
              </p>
            </div>
            <TopicFilters
              items={topicFilters}
              active={topic}
              onSelect={setTopic}
            />
            <div className="mt-4">
              <ArticlesTable
                articles={filtered}
                onUnpublish={(article) => {
                  setUnpublishTitle(article.title);
                  setUnpublishOpen(true);
                }}
              />
            </div>
          </section>

          <div className="space-y-4">
            <SymptomCheckerPanel
              rows={checkerRows}
              subtitle={meta.checkerSubtitle}
              onManageRegions={() => setRegionsOpen(true)}
            />
            <HealthAssistantPanel
              rules={assistantRules}
              subtitle={meta.assistantSubtitle}
            />
          </div>
        </div>
      ) : null}

      {tab === "checker" ? (
        <SymptomCheckerTab
          topics={checkerTopics}
          onManageRegions={() => setRegionsOpen(true)}
        />
      ) : null}

      {tab === "assistant" ? (
        <HealthAssistantTab
          sources={assistantSources}
          safetyRules={assistantSafetyRules}
          summaryRules={assistantRules}
        />
      ) : null}

      <CheckerRegionsDialog
        open={regionsOpen}
        regions={checkerRegions}
        onClose={() => setRegionsOpen(false)}
      />

      <UnpublishDialog
        open={unpublishOpen}
        title={unpublishTitle}
        seenBy={unpublishDefaults.seenBy}
        savedBy={unpublishDefaults.savedBy}
        linkedFrom={unpublishDefaults.linkedFrom}
        defaultReason={unpublishDefaults.reason}
        onClose={() => setUnpublishOpen(false)}
      />
    </div>
  );
}

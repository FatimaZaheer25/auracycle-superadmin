import { ClinicalContentView } from "@/components/features/clinical-content";
import {
  assistantSafetyRules,
  assistantSources,
  checkerRegions,
  checkerRows,
  checkerTopics,
  clinicalArticles,
  clinicalContentMeta,
  clinicalKpis,
  healthAssistantRules,
  topicFilters,
  unpublishDefaults,
} from "@/components/features/clinical-content/mock";

export default function GlobalContentPage() {
  return (
    <ClinicalContentView
      meta={clinicalContentMeta}
      kpis={clinicalKpis}
      topicFilters={topicFilters}
      articles={clinicalArticles}
      checkerRows={checkerRows}
      assistantRules={healthAssistantRules}
      checkerTopics={checkerTopics}
      assistantSources={assistantSources}
      assistantSafetyRules={assistantSafetyRules}
      checkerRegions={checkerRegions}
      unpublishDefaults={unpublishDefaults}
    />
  );
}

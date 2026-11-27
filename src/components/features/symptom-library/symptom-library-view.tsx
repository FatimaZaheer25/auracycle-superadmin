"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import type {
  CustomSymptomsMeta,
  LibrarySymptom,
  SuggestedCustomSymptom,
  SymptomCategoryFilter,
  SymptomKpi,
} from "@/types/symptom-library";
import { Button, PageHeader } from "@/components/ui";
import { CustomSymptomsPanel } from "./custom-symptoms-panel";
import { ReviewSuggestedDialog } from "./review-suggested-dialog";
import { SymptomFilters } from "./symptom-filters";
import { SymptomKpis } from "./symptom-kpis";
import { SymptomsTable } from "./symptoms-table";

type SymptomLibraryViewProps = {
  subtitle: string;
  kpis: SymptomKpi[];
  symptoms: LibrarySymptom[];
  customMeta: CustomSymptomsMeta;
  suggestions: SuggestedCustomSymptom[];
};

export function SymptomLibraryView({
  subtitle,
  kpis,
  symptoms,
  customMeta,
  suggestions,
}: SymptomLibraryViewProps) {
  const [filter, setFilter] = useState<SymptomCategoryFilter>("all");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] =
    useState<SuggestedCustomSymptom | null>(null);

  const filtered = useMemo(() => {
    const sorted = [...symptoms].sort((a, b) => b.logged30d - a.logged30d);
    if (filter === "all") return sorted.slice(0, 10);
    return sorted.filter((s) => s.category === filter);
  }, [filter, symptoms]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Symptom Library"
        description={subtitle}
        actions={
          <Link href="/symptom-library/new">
            <Button size="sm" className="rounded-full">
              <Plus className="h-4 w-4" aria-hidden />
              Add symptom
            </Button>
          </Link>
        }
      />

      <SymptomKpis items={kpis} active={filter} onSelect={setFilter} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-[#221c1e]">Symptoms</h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Top logged in the last 30 days
            </p>
          </div>
          <SymptomFilters
            items={kpis}
            active={filter}
            onSelect={setFilter}
          />
          <div className="mt-4">
            <SymptomsTable symptoms={filtered} />
          </div>
        </section>

        <CustomSymptomsPanel
          meta={customMeta}
          suggestions={suggestions}
          onReview={(item) => {
            setActiveSuggestion(item);
            setReviewOpen(true);
          }}
        />
      </div>

      <ReviewSuggestedDialog
        open={reviewOpen}
        suggestion={activeSuggestion}
        onClose={() => setReviewOpen(false)}
      />
    </div>
  );
}

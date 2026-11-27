import { Suspense } from "react";
import { AddSymptomView } from "@/components/features/symptom-library/add-symptom-view";
import {
  addSymptomDefaults,
  symptomCategories,
  symptomLifeStages,
  symptomTags,
} from "@/mock/symptom-library";

type NewSymptomPageProps = {
  searchParams: Promise<{ name?: string }>;
};

async function NewSymptomContent({ searchParams }: NewSymptomPageProps) {
  const params = await searchParams;

  return (
    <AddSymptomView
      defaults={addSymptomDefaults}
      categories={symptomCategories}
      tags={symptomTags}
      lifeStageOptions={symptomLifeStages}
      initialName={params.name}
    />
  );
}

export default function NewSymptomPage({ searchParams }: NewSymptomPageProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
          <p className="text-sm text-muted">Loading…</p>
        </div>
      }
    >
      <NewSymptomContent searchParams={searchParams} />
    </Suspense>
  );
}

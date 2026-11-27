import { Suspense } from "react";
import { notFound } from "next/navigation";
import { EditSymptomView } from "@/components/features/symptom-library/edit-symptom-view";
import {
  getLibrarySymptom,
  symptomCategories,
  symptomTags,
} from "@/mock/symptom-library";

type EditSymptomPageProps = {
  params: Promise<{ symptomId: string }>;
};

async function EditSymptomContent({ params }: EditSymptomPageProps) {
  const { symptomId } = await params;
  const symptom = getLibrarySymptom(decodeURIComponent(symptomId));

  if (!symptom) notFound();

  return (
    <EditSymptomView
      symptom={symptom}
      categories={symptomCategories}
      tags={symptomTags}
    />
  );
}

export default function EditSymptomPage({ params }: EditSymptomPageProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
          <p className="text-sm text-muted">Loading editor…</p>
        </div>
      }
    >
      <EditSymptomContent params={params} />
    </Suspense>
  );
}

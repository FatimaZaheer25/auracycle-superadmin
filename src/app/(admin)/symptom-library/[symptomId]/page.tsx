import { Suspense } from "react";
import { redirect } from "next/navigation";

type SymptomDetailPageProps = {
  params: Promise<{ symptomId: string }>;
};

async function SymptomDetailContent({ params }: SymptomDetailPageProps) {
  const { symptomId } = await params;
  redirect(`/symptom-library/${encodeURIComponent(symptomId)}/edit`);
  return null;
}

export default function SymptomDetailPage({ params }: SymptomDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
          <p className="text-sm text-muted">Loading…</p>
        </div>
      }
    >
      <SymptomDetailContent params={params} />
    </Suspense>
  );
}

import { redirect } from "next/navigation";

type SymptomDetailPageProps = {
  params: Promise<{ symptomId: string }>;
};

export default async function SymptomDetailPage({
  params,
}: SymptomDetailPageProps) {
  const { symptomId } = await params;
  redirect(`/symptom-library/${encodeURIComponent(symptomId)}/edit`);
}

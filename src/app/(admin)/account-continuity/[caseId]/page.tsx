import { Suspense } from "react";
import { notFound } from "next/navigation";
import { RecoveryCaseDetailView } from "@/components/features/account-continuity/recovery-case-detail-view";
import { getRecoveryCaseDetail } from "@/components/features/account-continuity/mock";

type CaseDetailPageProps = {
  params: Promise<{ caseId: string }>;
};

async function CaseDetailContent({ params }: CaseDetailPageProps) {
  const { caseId } = await params;
  const caseDetail = getRecoveryCaseDetail(decodeURIComponent(caseId));

  if (!caseDetail) notFound();

  return <RecoveryCaseDetailView caseDetail={caseDetail} />;
}

function CaseDetailFallback() {
  return (
    <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
      <p className="text-sm text-muted">Loading case…</p>
    </div>
  );
}

export default function RecoveryCaseDetailPage({
  params,
}: CaseDetailPageProps) {
  return (
    <Suspense fallback={<CaseDetailFallback />}>
      <CaseDetailContent params={params} />
    </Suspense>
  );
}

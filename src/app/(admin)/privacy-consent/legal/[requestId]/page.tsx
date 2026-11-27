import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LegalRequestView } from "@/components/features/privacy-consent/legal-request-view";
import { getLegalRequest } from "@/components/features/privacy-consent/mock";

type LegalRequestPageProps = {
  params: Promise<{ requestId: string }>;
};

async function LegalRequestContent({ params }: LegalRequestPageProps) {
  const { requestId } = await params;
  const request = getLegalRequest(decodeURIComponent(requestId));

  if (!request) notFound();

  return <LegalRequestView request={request} />;
}

export default function LegalRequestPage({ params }: LegalRequestPageProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
          <p className="text-sm text-muted">Loading request…</p>
        </div>
      }
    >
      <LegalRequestContent params={params} />
    </Suspense>
  );
}

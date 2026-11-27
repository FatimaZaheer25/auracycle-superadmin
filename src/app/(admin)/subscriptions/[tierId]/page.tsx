import { Suspense } from "react";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

type TierDetailPageProps = {
  params: Promise<{ tierId: string }>;
};

async function TierDetail({ params }: TierDetailPageProps) {
  const { tierId } = await params;

  return (
    <PagePlaceholder
      title={`Tier · ${tierId}`}
      description="Dynamic segment: [tierId]"
    />
  );
}

export default function TierDetailPage({ params }: TierDetailPageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading tier…</p>}>
      <TierDetail params={params} />
    </Suspense>
  );
}

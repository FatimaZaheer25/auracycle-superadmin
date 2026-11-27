import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ApproveTierChangeView } from "@/components/features/subscriptions/approve-tier-change-view";
import { getTierChangeApproval } from "@/components/features/subscriptions/mock";

type ApprovePageProps = {
  params: Promise<{ changeId: string }>;
};

async function ApproveContent({ params }: ApprovePageProps) {
  const { changeId } = await params;
  const change = getTierChangeApproval(decodeURIComponent(changeId));

  if (!change) notFound();

  return <ApproveTierChangeView change={change} />;
}

export default function ApproveTierChangePage({ params }: ApprovePageProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
          <p className="text-sm text-muted">Loading approval…</p>
        </div>
      }
    >
      <ApproveContent params={params} />
    </Suspense>
  );
}

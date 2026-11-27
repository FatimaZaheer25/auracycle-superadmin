import { Suspense } from "react";
import { notFound } from "next/navigation";
import { UserDetailView } from "@/components/features/users/detail";
import { getUserDetail } from "@/mock/user-detail";

type UserDetailPageProps = {
  params: Promise<{ userId: string }>;
};

async function UserDetailContent({ params }: UserDetailPageProps) {
  const { userId } = await params;
  const user = getUserDetail(decodeURIComponent(userId));

  if (!user) notFound();

  return <UserDetailView user={user} />;
}

function UserDetailFallback() {
  return (
    <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
      <p className="text-sm text-muted">Loading user…</p>
    </div>
  );
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  return (
    <Suspense fallback={<UserDetailFallback />}>
      <UserDetailContent params={params} />
    </Suspense>
  );
}

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getClinicalArticle } from "@/components/features/clinical-content/mock";

type ContentDetailPageProps = {
  params: Promise<{ contentId: string }>;
};

async function ContentDetailContent({ params }: ContentDetailPageProps) {
  const { contentId } = await params;
  const id = decodeURIComponent(contentId);
  const article = getClinicalArticle(id);

  if (article?.status === "needs-sign-off") {
    redirect(`/global-content/${encodeURIComponent(id)}/review`);
  }

  redirect("/global-content");
  return null;
}

export default function ContentDetailPage({ params }: ContentDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
          <p className="text-sm text-muted">Loading…</p>
        </div>
      }
    >
      <ContentDetailContent params={params} />
    </Suspense>
  );
}

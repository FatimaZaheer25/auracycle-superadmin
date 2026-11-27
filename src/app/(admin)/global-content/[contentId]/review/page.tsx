import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleReviewView } from "@/components/features/clinical-content/article-review-view";
import { getArticleReview } from "@/mock/clinical-content";

type ReviewPageProps = {
  params: Promise<{ contentId: string }>;
};

async function ReviewContent({ params }: ReviewPageProps) {
  const { contentId } = await params;
  const article = getArticleReview(decodeURIComponent(contentId));

  if (!article) notFound();

  return <ArticleReviewView article={article} />;
}

export default function ArticleReviewPage({ params }: ReviewPageProps) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[12px] border border-[#e8dfdf] bg-white p-6">
          <p className="text-sm text-muted">Loading review…</p>
        </div>
      }
    >
      <ReviewContent params={params} />
    </Suspense>
  );
}

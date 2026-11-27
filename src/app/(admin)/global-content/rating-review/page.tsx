import { ContentRatingReviewView } from "@/components/features/clinical-content/content-rating-review-view";
import { contentRatingReview } from "@/components/features/clinical-content/mock";

export default function ContentRatingReviewPage() {
  return <ContentRatingReviewView data={contentRatingReview} />;
}

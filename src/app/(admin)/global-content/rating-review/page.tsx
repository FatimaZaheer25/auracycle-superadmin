import { ContentRatingReviewView } from "@/components/features/clinical-content/content-rating-review-view";
import { contentRatingReview } from "@/mock/clinical-content";

export default function ContentRatingReviewPage() {
  return <ContentRatingReviewView data={contentRatingReview} />;
}

import { NewArticleView } from "@/components/features/clinical-content/new-article-view";
import { newArticleDefaults } from "@/mock/clinical-content";

export default function NewArticlePage() {
  return <NewArticleView defaults={newArticleDefaults} />;
}

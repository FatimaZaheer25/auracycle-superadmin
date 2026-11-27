import { NewArticleView } from "@/components/features/clinical-content/new-article-view";
import { newArticleDefaults } from "@/components/features/clinical-content/mock";

export default function NewArticlePage() {
  return <NewArticleView defaults={newArticleDefaults} />;
}

import { redirect } from "next/navigation";
import { getClinicalArticle } from "@/mock/clinical-content";

type ContentDetailPageProps = {
  params: Promise<{ contentId: string }>;
};

export default async function ContentDetailPage({
  params,
}: ContentDetailPageProps) {
  const { contentId } = await params;
  const id = decodeURIComponent(contentId);
  const article = getClinicalArticle(id);

  if (article?.status === "needs-sign-off") {
    redirect(`/global-content/${encodeURIComponent(id)}/review`);
  }

  redirect("/global-content");
}

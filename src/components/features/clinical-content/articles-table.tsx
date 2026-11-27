import Link from "next/link";
import type {
  ArticleStatus,
  AudienceTier,
  ClinicalArticle,
} from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ArticlesTableProps = {
  articles: ClinicalArticle[];
  onUnpublish?: (article: ClinicalArticle) => void;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

function AudienceBadge({ audience }: { audience: AudienceTier }) {
  if (audience === "Mature · gated") {
    return (
      <span className="inline-flex whitespace-nowrap rounded-full bg-[#ddd5f0] px-2.5 py-1 text-[11px] font-medium text-[#5c4d84]">
        Mature · gated
      </span>
    );
  }

  return (
    <span className="inline-flex whitespace-nowrap rounded-full bg-[#e8d5c8] px-2.5 py-1 text-[11px] font-medium text-[#7a554c]">
      General
    </span>
  );
}

function StatusBadge({ status }: { status: ArticleStatus }) {
  if (status === "published-premium") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#f0d0d9] px-2.5 py-1 text-[11px] font-medium text-[#a33d52]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#a33d52]" aria-hidden />
        Published · Premium
      </span>
    );
  }

  if (status === "needs-sign-off") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#f0e0b8] px-2.5 py-1 text-[11px] font-medium text-[#8a5f16]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8a5f16]" aria-hidden />
        Needs sign-off
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d6b64]" aria-hidden />
      Published
    </span>
  );
}

export function ArticlesTable({
  articles,
  onUnpublish,
}: ArticlesTableProps) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#d9cdcf]">
      <Table>
        <TableHeader className="bg-[#f0e8e6]">
          <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
            <TableHead className={head}>Title</TableHead>
            <TableHead className={head}>Topic</TableHead>
            <TableHead className={head}>Audience tier</TableHead>
            <TableHead className={head}>Status</TableHead>
            <TableHead className={head}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article, index) => (
            <TableRow
              key={article.id}
              className={cn(
                "bg-white hover:bg-[#faf6f5]",
                index === articles.length - 1
                  ? "border-0"
                  : "border-b border-[#ebe3e3]",
              )}
            >
              <TableCell className="py-3.5">
                <Link
                  href={
                    article.status === "needs-sign-off"
                      ? `/global-content/${article.id}/review`
                      : `/global-content/${article.id}`
                  }
                  className="font-medium text-[#221c1e] hover:text-primary"
                >
                  {article.title}
                </Link>
              </TableCell>
              <TableCell className="py-3.5 text-sm text-[#6b6165]">
                {article.topic}
              </TableCell>
              <TableCell className="py-3.5">
                <AudienceBadge audience={article.audience} />
              </TableCell>
              <TableCell className="py-3.5">
                <StatusBadge status={article.status} />
              </TableCell>
              <TableCell className="py-3.5">
                {article.status === "needs-sign-off" ? (
                  <Link
                    href={`/global-content/${article.id}/review`}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Review
                  </Link>
                ) : onUnpublish ? (
                  <button
                    type="button"
                    onClick={() => onUnpublish(article)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Unpublish
                  </button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

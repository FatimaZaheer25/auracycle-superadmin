"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Pencil } from "lucide-react";
import type { ArticleReviewDetail } from "./types";
import {
  Button,
  Label,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ArticleReviewViewProps = {
  article: ArticleReviewDetail;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function ArticleReviewView({ article }: ArticleReviewViewProps) {
  const router = useRouter();
  const [checklist, setChecklist] = useState(article.checklist);
  const [comment, setComment] = useState(article.commentDefault);

  function toggleCheck(id: string) {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/global-content" className="hover:text-primary">
          Clinical Content
        </Link>{" "}
        <span>›</span>{" "}
        <span className="text-primary">Sign-off: {article.title}</span>
      </p>

      <PageHeader
        title={`Review: ${article.title}`}
        description="Needs OB/GYN sign-off before it can go live · FR-ADM-02 · FR-CHK-03"
        actions={
          <>
            <Button size="sm" variant="outline" className="rounded-full gap-1.5">
              <Pencil className="h-4 w-4" aria-hidden />
              Request changes
            </Button>
            <Button
              size="sm"
              className="rounded-full gap-1.5"
              onClick={() => router.push("/global-content")}
            >
              <Check className="h-4 w-4" aria-hidden />
              Approve and publish
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-[#8f8589]">{article.versionLabel}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0e0b8] px-2.5 py-1 text-[11px] font-medium text-[#8a5f16]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8a5f16]" />
                Needs sign-off
              </span>
            </div>
            <h2 className="text-lg font-semibold text-[#221c1e]">
              {article.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#6b6165]">
              {article.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Version history
            </h2>
            <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
              <Table>
                <TableHeader className="bg-[#f0e8e6]">
                  <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                    <TableHead className={head}>Version</TableHead>
                    <TableHead className={head}>Date</TableHead>
                    <TableHead className={head}>By</TableHead>
                    <TableHead className={head}>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {article.versions.map((row, index) => (
                    <TableRow
                      key={row.version}
                      className={cn(
                        "bg-white",
                        index < article.versions.length - 1 &&
                          "border-b border-[#ebe3e3]",
                      )}
                    >
                      <TableCell className="py-3 font-medium text-[#221c1e]">
                        {row.version}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-[#6b6165]">
                        {row.date}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-[#6b6165]">
                        {row.by}
                      </TableCell>
                      <TableCell className="py-3 text-sm text-[#6b6165]">
                        {row.change}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Review checklist
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Every item needs a tick
            </p>
            <ul className="mt-3 space-y-2.5">
              {checklist.map((item) => (
                <li key={item.id}>
                  <label className="flex items-start gap-2 text-sm text-[#221c1e]">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheck(item.id)}
                      className="mt-0.5 h-4 w-4 rounded accent-primary"
                    />
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Your decision
            </h2>
            <ul className="mb-3 space-y-2 text-sm">
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Reviewer</span>
                <span className="font-medium text-[#221c1e]">
                  {article.reviewer}
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Date</span>
                <span className="font-medium text-[#221c1e]">
                  {article.reviewDate}
                </span>
              </li>
            </ul>
            <Label htmlFor="review-comment">
              Comment (required if you request changes)
            </Label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-[10px] border border-[#d9cdcf] px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </section>
        </aside>
      </div>
    </div>
  );
}

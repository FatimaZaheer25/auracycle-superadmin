"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  Lock,
  RefreshCw,
  Shield,
} from "lucide-react";
import type { ContentRatingReview } from "@/types/clinical-content";
import {
  Button,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type ContentRatingReviewViewProps = {
  data: ContentRatingReview;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function ContentRatingReviewView({
  data,
}: ContentRatingReviewViewProps) {
  const router = useRouter();
  const [fix, setFix] = useState<"retag" | "rating">("retag");

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/global-content" className="hover:text-primary">
          Clinical Content
        </Link>{" "}
        <span>›</span>{" "}
        <span className="text-primary">Content rating review</span>
      </p>

      <PageHeader
        title="Content rating review"
        description="Keep tags and the store rating honest · FR-AGE-01 · FR-AGE-02 · UC-05"
        actions={
          <Button size="sm" className="rounded-full gap-1.5">
            <RefreshCw className="h-4 w-4" aria-hidden />
            Run review now
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Store rating today"
          value={data.storeRating}
          hint="Review due every quarter."
          icon={<Shield className="h-3.5 w-3.5" />}
        />
        <MetricCard
          label="Tagged General"
          value={data.taggedGeneral}
          hint="Matches the rating."
          hintTone="ok"
          icon={<Check className="h-3.5 w-3.5" />}
        />
        <MetricCard
          label="Tagged Mature"
          value={data.taggedMature}
          hint="Behind a confirmation step."
          hintTone="pink"
          icon={<Lock className="h-3.5 w-3.5" />}
        />
        <MetricCard
          label="Drifted items"
          value={data.drifted}
          hint="More mature than their tag."
          hintTone="warn"
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
        />
      </div>

      <div className="flex items-start gap-3 rounded-[12px] border border-[#e8c98a] bg-[#fbf3dc] px-4 py-3 text-sm text-[#7a5a12]">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>{data.alert}</p>
      </div>

      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
          Flagged items
        </h2>
        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>Article</TableHead>
                <TableHead className={head}>Current tag</TableHead>
                <TableHead className={head}>Suggested</TableHead>
                <TableHead className={head}>Why</TableHead>
                <TableHead className={head}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.flagged.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "bg-white",
                    index < data.flagged.length - 1 &&
                      "border-b border-[#ebe3e3]",
                  )}
                >
                  <TableCell className="py-3.5 font-medium text-[#221c1e]">
                    {row.article}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span className="rounded-full bg-[#ebe3e3] px-2.5 py-1 text-[11px] font-medium text-[#6b6165]">
                      {row.currentTag}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span className="rounded-full bg-[#ddd5f0] px-2.5 py-1 text-[11px] font-medium text-[#5c4d84]">
                      {row.suggested}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.why}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Re-tag
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
          Choose how to fix it
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setFix("retag")}
            className={cn(
              "rounded-[12px] border px-4 py-3 text-left",
              fix === "retag"
                ? "border-primary bg-[#efd5de]"
                : "border-[#d9cdcf] bg-white",
            )}
          >
            <p className="text-sm font-semibold text-[#221c1e]">
              Re-tag and gate the 6 items
            </p>
            <p className="mt-1 text-xs text-[#6b6165]">
              Keeps the store rating. People under 18 must confirm before
              reading.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setFix("rating")}
            className={cn(
              "rounded-[12px] border px-4 py-3 text-left",
              fix === "rating"
                ? "border-primary bg-[#efd5de]"
                : "border-[#d9cdcf] bg-white",
            )}
          >
            <p className="text-sm font-semibold text-[#221c1e]">
              Update the store rating
            </p>
            <p className="mt-1 text-xs text-[#6b6165]">
              Changes the disclosed rating to match the content.
            </p>
          </button>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => router.push("/global-content")}
          >
            Cancel
          </Button>
          <Button
            className="rounded-full gap-1.5"
            onClick={() => router.push("/global-content")}
          >
            <Check className="h-4 w-4" aria-hidden />
            Apply and log decision
          </Button>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  hint,
  hintTone,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  hintTone?: "ok" | "warn" | "pink";
  icon: ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-[#d9cdcf] bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-[#6b6165]">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efd5de] text-primary">
          {icon}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-[#221c1e]">{value}</p>
      <p
        className={cn(
          "mt-1 text-xs",
          hintTone === "ok" && "text-[#0d6b64]",
          hintTone === "warn" && "text-[#8a5f16]",
          hintTone === "pink" && "text-primary",
          !hintTone && "text-[#8f8589]",
        )}
      >
        {hint}
      </p>
    </div>
  );
}

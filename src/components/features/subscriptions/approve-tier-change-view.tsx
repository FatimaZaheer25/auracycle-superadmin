"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Pencil } from "lucide-react";
import type { TierChangeApproval } from "./types";
import { Button, Label, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type ApproveTierChangeViewProps = {
  change: TierChangeApproval;
};

type ReviewChoice = "approve" | "request" | "reject";

export function ApproveTierChangeView({ change }: ApproveTierChangeViewProps) {
  const router = useRouter();
  const [choice, setChoice] = useState<ReviewChoice>("approve");
  const [comment, setComment] = useState("Looks fair. Notice period is clear.");

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/subscriptions" className="hover:text-primary">
          Subscriptions & Tiers
        </Link>{" "}
        <span>›</span>{" "}
        <span className="text-primary">Approve change {change.id}</span>
      </p>

      <PageHeader
        title="Approve tier change"
        description="A second Super Admin must approve · FR-MON-07 · FR-ADM-05"
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full gap-1.5"
              onClick={() => setChoice("request")}
            >
              <Pencil className="h-4 w-4" aria-hidden />
              Request changes
            </Button>
            <Button
              size="sm"
              className="rounded-full gap-1.5"
              onClick={() => router.push("/subscriptions")}
            >
              <Check className="h-4 w-4" aria-hidden />
              Approve change
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-[#f8eedc] px-2.5 py-1 text-[11px] font-medium text-[#9a6b1f]">
                Waiting for you
              </span>
              <p className="text-xs text-[#8f8589]">
                Requested by {change.requester} · {change.requestedOn}
              </p>
            </div>
            <ul>
              {[
                { label: "Feature", value: change.feature },
                { label: "Moves", value: change.moves },
                { label: "Takes effect", value: change.takesEffect },
                { label: "Grandfathering", value: change.grandfathering },
                { label: "People affected", value: change.peopleAffected },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0 text-sm"
                >
                  <span className="text-[#6b6165]">{row.label}</span>
                  <span className="text-right font-medium text-[#221c1e]">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              What people will see
            </h2>
            <div className="mt-3 rounded-[12px] border border-[#ebe3e3] bg-[#faf6f6] px-4 py-3 text-sm leading-relaxed text-[#6b6165]">
              {change.message}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Your review
            </h2>
            <div className="space-y-2">
              {(
                [
                  { id: "approve", label: "Approve" },
                  { id: "request", label: "Request changes" },
                  { id: "reject", label: "Reject" },
                ] as const
              ).map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-[10px] border px-3 py-2.5 text-sm",
                    choice === option.id
                      ? "border-primary bg-[#efd5de] text-primary"
                      : "border-[#d9cdcf] bg-white text-[#221c1e]",
                  )}
                >
                  <input
                    type="radio"
                    name="review"
                    checked={choice === option.id}
                    onChange={() => setChoice(option.id)}
                    className="accent-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <div className="mt-4 space-y-1.5">
              <Label htmlFor="review-comment">Comment (optional)</Label>
              <textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-[10px] border border-[#d9cdcf] bg-white px-3 py-2 text-sm text-[#221c1e] outline-none focus:border-primary"
              />
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Safety checks
            </h2>
            <ul className="space-y-2.5">
              {change.safetyChecks.map((check) => (
                <li key={check.id} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5ebe6] text-[#0d6b64]">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="text-[#221c1e]">{check.title}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

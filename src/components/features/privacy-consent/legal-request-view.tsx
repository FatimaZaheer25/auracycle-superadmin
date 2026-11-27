"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, Check, ExternalLink } from "lucide-react";
import type { LegalRequestDetail } from "@/types/privacy-consent";
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

type LegalRequestViewProps = {
  request: LegalRequestDetail;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function LegalRequestView({ request }: LegalRequestViewProps) {
  const router = useRouter();
  const [decision, setDecision] = useState(request.selectedDecision);
  const [reason, setReason] = useState(request.reasonDefault);
  const [notes, setNotes] = useState(request.notes);
  const [draftNote, setDraftNote] = useState(request.draftNote);

  function addNote() {
    if (!draftNote.trim()) return;
    setNotes((prev) => [
      ...prev,
      {
        id: `n-${Date.now()}`,
        author: "You",
        when: "Just now",
        body: draftNote.trim(),
      },
    ]);
    setDraftNote("");
  }

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/privacy-consent" className="hover:text-primary">
          Privacy & Consent
        </Link>{" "}
        <span>›</span> <span className="text-primary">{request.id}</span>
      </p>

      <PageHeader
        title={`${request.id} · ${request.title}`}
        description="Handled under the published response policy · FR-PRV-07 · FR-ADM-06"
        actions={
          <>
            <Button size="sm" variant="outline" className="rounded-full gap-1.5">
              <ExternalLink className="h-4 w-4" aria-hidden />
              Open published policy
            </Button>
            <Button
              size="sm"
              className="rounded-full gap-1.5"
              disabled={!reason.trim()}
              onClick={() => router.push("/privacy-consent")}
            >
              <BarChart3 className="h-4 w-4" aria-hidden />
              Record decision
            </Button>
          </>
        }
      />

      <ol className="flex flex-wrap items-center gap-2 rounded-[16px] border border-[#d9cdcf] bg-white px-4 py-3 sm:gap-0">
        {request.steps.map((step, index) => (
          <li key={step.id} className="flex items-center gap-2 sm:flex-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  step.state === "done" && "bg-[#0d6b64] text-white",
                  step.state === "current" && "bg-primary text-white",
                  step.state === "upcoming" && "bg-[#f0e8e6] text-[#8f8589]",
                )}
              >
                {step.state === "done" ? (
                  <Check className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  step.state === "current"
                    ? "text-primary"
                    : step.state === "done"
                      ? "text-[#0d6b64]"
                      : "text-[#8f8589]",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < request.steps.length - 1 ? (
              <span
                className={cn(
                  "mx-2 hidden h-px flex-1 sm:block",
                  step.state === "done" ? "bg-[#0d6b64]" : "bg-[#e5dbdb]",
                )}
              />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#221c1e]">
                Request details
              </h2>
              <span className="rounded-full bg-[#f0e0b8] px-2.5 py-1 text-[11px] font-medium text-[#8a5f16]">
                {request.statusBadge}
              </span>
            </div>
            <ul>
              {request.details.map((row) => (
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
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-[#221c1e]">
                  What exists to disclose
                </h2>
                <p className="mt-0.5 text-xs text-[#8f8589]">
                  Data minimisation limits this by design.
                </p>
              </div>
              <span className="rounded-full bg-[#c5e0eb] px-2.5 py-1 text-[11px] font-medium text-[#0d5a6b]">
                Fewer fields held
              </span>
            </div>
            <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
              <Table>
                <TableHeader className="bg-[#f0e8e6]">
                  <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                    <TableHead className={head}>Data</TableHead>
                    <TableHead className={head}>Held</TableHead>
                    <TableHead className={head}>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {request.discloseRows.map((row, index) => (
                    <TableRow
                      key={row.data}
                      className={cn(
                        "bg-white",
                        index < request.discloseRows.length - 1 &&
                          "border-b border-[#ebe3e3]",
                      )}
                    >
                      <TableCell className="py-3.5 font-medium text-[#221c1e]">
                        {row.data}
                      </TableCell>
                      <TableCell className="py-3.5 text-sm text-[#6b6165]">
                        {row.held}
                      </TableCell>
                      <TableCell className="py-3.5 text-sm text-[#6b6165]">
                        {row.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Legal review notes
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Visible to legal and the DPO
            </p>
            <ul className="mt-3 space-y-3">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="rounded-[12px] border border-[#ebe3e3] bg-[#faf6f6] px-3 py-3"
                >
                  <div className="flex justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#221c1e]">
                      {note.author}
                    </span>
                    <span className="text-[#8f8589]">{note.when}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#6b6165]">{note.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-2">
              <Label htmlFor="legal-note">Add a note</Label>
              <textarea
                id="legal-note"
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                rows={2}
                className="w-full resize-none rounded-[10px] border border-[#d9cdcf] px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  disabled={!draftNote.trim()}
                  onClick={addNote}
                >
                  Add note
                </Button>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">Decision</h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Record when review is complete.
            </p>
            <div className="mt-3 space-y-2">
              {request.decisionOptions.map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-[10px] border px-3 py-2.5 text-sm",
                    decision === option.id
                      ? "border-primary bg-[#efd5de] text-primary"
                      : "border-[#d9cdcf] text-[#221c1e]",
                  )}
                >
                  <input
                    type="radio"
                    name="legal-decision"
                    checked={decision === option.id}
                    onChange={() => setDecision(option.id)}
                    className="accent-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              <Label htmlFor="decision-reason">Reason (required)</Label>
              <textarea
                id="decision-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-[10px] border border-[#d9cdcf] px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Policy and timing
            </h2>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-[#6b6165]">Days used</span>
              <span className="font-medium text-[#221c1e]">
                {request.daysUsed}
              </span>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-[#f0e8e6]">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${request.daysPercent}%` }}
              />
            </div>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Published policy</span>
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                >
                  {request.policyVersion} · view
                </button>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Outcome is logged in</span>
                <Link
                  href="/audit-log"
                  className="font-medium text-primary hover:underline"
                >
                  {request.outcomeLog}
                </Link>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Person notified</span>
                <span className="rounded-full bg-[#ebe4f5] px-2.5 py-0.5 text-[11px] font-medium text-[#5a4a7a]">
                  {request.personNotified}
                </span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

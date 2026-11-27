"use client";

import { useState } from "react";
import type { AssistantSource, HealthAssistantRule } from "@/types/clinical-content";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type HealthAssistantTabProps = {
  sources: AssistantSource[];
  safetyRules: HealthAssistantRule[];
  summaryRules: HealthAssistantRule[];
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function HealthAssistantTab({
  sources,
  safetyRules,
}: HealthAssistantTabProps) {
  const [question, setQuestion] = useState(
    "I have very heavy bleeding and feel dizzy.",
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-[#221c1e]">
                Knowledge base
              </h2>
              <p className="mt-0.5 text-xs text-[#8f8589]">
                The assistant answers only from these reviewed sources · FR-AST-02
              </p>
            </div>
            <span className="rounded-full bg-[#ebe4f5] px-2.5 py-1 text-[11px] font-medium text-[#5a4a7a]">
              {sources.length} sources
            </span>
          </div>

          <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
            <Table>
              <TableHeader className="bg-[#f0e8e6]">
                <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                  <TableHead className={head}>Source</TableHead>
                  <TableHead className={head}>Topic</TableHead>
                  <TableHead className={head}>Reviewed by</TableHead>
                  <TableHead className={head}>Last reviewed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      "bg-white",
                      index < sources.length - 1 && "border-b border-[#ebe3e3]",
                    )}
                  >
                    <TableCell className="py-3.5 font-medium text-[#221c1e]">
                      {row.source}
                    </TableCell>
                    <TableCell className="py-3.5 text-sm text-[#6b6165]">
                      {row.topic}
                    </TableCell>
                    <TableCell className="py-3.5 text-sm text-[#6b6165]">
                      {row.reviewedBy}
                    </TableCell>
                    <TableCell className="py-3.5 text-sm text-[#6b6165]">
                      {row.lastReviewed}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-[#221c1e]">
            Try a question
          </h2>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="mt-3 w-full resize-none rounded-[10px] border border-[#d9cdcf] px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <div className="mt-3 rounded-[12px] border border-[#efd5de] bg-[#faf0f3] px-3 py-3 text-sm text-[#221c1e]">
            That sounds like it needs a healthcare provider now. I can&apos;t
            advise on this. Please contact a doctor or local emergency service.
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Declined and redirected
          </p>
        </section>
      </div>

      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-[#221c1e]">Safety rules</h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">
          Fixed by policy · FR-AST-02 to FR-AST-04
        </p>
        <ul className="mt-3">
          {safetyRules.map((rule, index) => (
            <li
              key={rule.id}
              className={cn(
                "flex justify-between gap-3 py-2.5 text-sm",
                index < safetyRules.length - 1 && "border-b border-[#ebe3e3]",
              )}
            >
              <span className="text-[#6b6165]">{rule.label}</span>
              <span className="text-right font-medium text-[#221c1e]">
                {rule.value}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

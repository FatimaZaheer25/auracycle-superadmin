"use client";

import { useState } from "react";
import { Lock, Send, X } from "lucide-react";
import type { CheckerTopic } from "./types";
import { Button, Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

type SymptomCheckerTabProps = {
  topics: CheckerTopic[];
  onManageRegions?: () => void;
};

export function SymptomCheckerTab({
  topics,
  onManageRegions,
}: SymptomCheckerTabProps) {
  const [selectedId, setSelectedId] = useState(
    topics.find((t) => t.status === "Live")?.id ?? topics[0]?.id,
  );
  const selected = topics.find((t) => t.id === selectedId) ?? topics[0];
  const [name, setName] = useState(selected?.name ?? "");
  const [patterns, setPatterns] = useState(selected?.patterns ?? []);
  const [resultText, setResultText] = useState(selected?.resultText ?? "");

  function selectTopic(topic: CheckerTopic) {
    setSelectedId(topic.id);
    setName(topic.name);
    setPatterns(topic.patterns);
    setResultText(topic.resultText);
  }

  function removePattern(pattern: string) {
    setPatterns((prev) => prev.filter((p) => p !== pattern));
  }

  if (!selected) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-[#221c1e]">Topics</h2>
            <p className="text-xs text-[#8f8589]">Educational only</p>
          </div>
          {onManageRegions ? (
            <button
              type="button"
              onClick={onManageRegions}
              className="text-[11px] font-medium text-primary hover:underline"
            >
              Regions
            </button>
          ) : null}
        </div>
        <ul className="space-y-1">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                onClick={() => selectTopic(topic)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 text-left text-sm",
                  selectedId === topic.id
                    ? "bg-[#efd5de] text-primary"
                    : "text-[#221c1e] hover:bg-[#faf6f6]",
                )}
              >
                <span className="font-medium">{topic.name}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    topic.status === "Live"
                      ? "bg-[#c5ebe6] text-[#0d6b64]"
                      : "bg-[#f0e0b8] text-[#8a5f16]",
                  )}
                >
                  {topic.status}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-[#221c1e]">
              {selected.name}
            </h2>
            <p className="text-xs text-[#8f8589]">{selected.versionLabel}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium",
              selected.status === "Live"
                ? "bg-[#c5ebe6] text-[#0d6b64]"
                : "bg-[#f0e0b8] text-[#8a5f16]",
            )}
          >
            {selected.status}
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="checker-topic-name">Topic name</Label>
            <Input
              id="checker-topic-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Logged patterns that trigger this topic</Label>
            <div className="flex flex-wrap gap-2">
              {patterns.map((pattern) => (
                <span
                  key={pattern}
                  className="inline-flex items-center gap-1 rounded-full bg-[#efd5de] px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {pattern}
                  <button
                    type="button"
                    onClick={() => removePattern(pattern)}
                    aria-label={`Remove ${pattern}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="result-text">Educational result text</Label>
            <textarea
              id="result-text"
              value={resultText}
              onChange={(e) => setResultText(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-[10px] border border-[#d9cdcf] px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-start gap-2 rounded-[12px] border border-[#9ed4ce] bg-[#e6f6f4] px-3 py-3 text-sm text-[#0d6b64]">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>
              Required on every result: educational information only, not a
              diagnosis. See a healthcare provider if you are worried. This text
              is locked.
            </p>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2">
              <span className="text-[#6b6165]">Regions</span>
              <span className="font-medium text-[#221c1e]">
                {selected.regions}
              </span>
            </li>
            <li className="flex justify-between gap-3 py-2">
              <span className="text-[#6b6165]">Reviewed by</span>
              <span className="font-medium text-[#221c1e]">
                {selected.reviewedBy}
              </span>
            </li>
          </ul>

          <div className="flex flex-wrap justify-end gap-2">
            <Button size="sm" variant="outline" className="rounded-full">
              Save draft
            </Button>
            <Button size="sm" className="rounded-full gap-1.5">
              <Send className="h-4 w-4" aria-hidden />
              Submit for sign-off
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

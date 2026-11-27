"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import type { SymptomLifeStage } from "./types";
import { Button, Input, Label, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type AddSymptomViewProps = {
  defaults: {
    name: string;
    category: string;
    tag: string;
    lifeStages: readonly SymptomLifeStage[];
    freePlan: boolean;
    previewNeighbors: string[];
    libraryAfter: {
      all: string;
      physical: string;
      suggestedBy: string;
      shownAfter: string;
    };
  };
  categories: readonly string[];
  tags: readonly string[];
  lifeStageOptions: readonly SymptomLifeStage[];
  initialName?: string;
};

export function AddSymptomView({
  defaults,
  categories,
  tags,
  lifeStageOptions,
  initialName,
}: AddSymptomViewProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName ?? defaults.name);
  const [category, setCategory] = useState(defaults.category);
  const [tag, setTag] = useState(defaults.tag);
  const [lifeStages, setLifeStages] = useState<SymptomLifeStage[]>([
    ...defaults.lifeStages,
  ]);
  const [freePlan, setFreePlan] = useState(defaults.freePlan);

  function toggleStage(stage: SymptomLifeStage) {
    setLifeStages((prev) =>
      prev.includes(stage)
        ? prev.filter((s) => s !== stage)
        : [...prev, stage],
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/symptom-library" className="hover:text-primary">
          Symptom Library
        </Link>{" "}
        <span>›</span> <span className="text-primary">Add symptom</span>
      </p>

      <PageHeader
        title="Add symptom"
        description="Appears in “Select symptoms” in the app · FR-SYM-01 · FR-SYM-04"
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => router.push("/symptom-library")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-full gap-1.5"
              onClick={() => router.push("/symptom-library")}
            >
              <Check className="h-4 w-4" aria-hidden />
              Save symptom
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="space-y-4 rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <div className="space-y-1.5">
            <Label htmlFor="symptom-name">Symptom name</Label>
            <Input
              id="symptom-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-primary"
            />
            <p className="text-xs text-[#8f8589]">
              Use plain words people already use.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="symptom-category">Category</Label>
            <select
              id="symptom-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm outline-none focus:border-primary"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="symptom-tag">Tag</Label>
            <select
              id="symptom-tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm outline-none focus:border-primary"
            >
              {tags.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p className="text-xs text-[#8f8589]">
              Use Perimenopause to also show it in the perimenopause view.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Show for life stages</Label>
            <ul className="space-y-2">
              {lifeStageOptions.map((stage) => (
                <li key={stage}>
                  <label className="flex items-center gap-2 text-sm text-[#221c1e]">
                    <input
                      type="checkbox"
                      checked={lifeStages.includes(stage)}
                      onChange={() => toggleStage(stage)}
                      className="h-4 w-4 rounded border-[#d9cdcf] accent-primary"
                    />
                    {stage}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#efd5de] bg-[#faf0f3] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-[#221c1e]">
                Available on the free plan
              </p>
              <p className="mt-0.5 text-xs text-[#8f8589]">
                Core symptom logging is always free.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={freePlan}
              onClick={() => setFreePlan((v) => !v)}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                freePlan ? "bg-primary" : "bg-[#d9cdcf]",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                  freePlan && "translate-x-5",
                )}
              />
            </button>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">Preview</h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              How it looks in the app
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {defaults.previewNeighbors.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#f0e8e6] px-3 py-1.5 text-xs font-medium text-[#6b6165]"
                >
                  {item}
                </span>
              ))}
              <span className="rounded-full border border-primary bg-[#efd5de] px-3 py-1.5 text-xs font-medium text-primary">
                {name || "New symptom"}
              </span>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Library after saving
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">All symptoms</span>
                <span className="font-medium text-[#221c1e]">
                  {defaults.libraryAfter.all}
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Physical</span>
                <span className="font-medium text-[#221c1e]">
                  {defaults.libraryAfter.physical}
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Suggested by users</span>
                <span className="text-right font-medium text-[#221c1e]">
                  {defaults.libraryAfter.suggestedBy}
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Shown in app after</span>
                <span className="font-medium text-[#221c1e]">
                  {defaults.libraryAfter.shownAfter}
                </span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

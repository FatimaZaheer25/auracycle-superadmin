"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, Check, Trash2 } from "lucide-react";
import type { SymptomDetail } from "./types";
import { Button, Input, Label, PageHeader } from "@/components/ui";

type EditSymptomViewProps = {
  symptom: SymptomDetail;
  categories: readonly string[];
  tags: readonly string[];
};

export function EditSymptomView({
  symptom,
  categories,
  tags,
}: EditSymptomViewProps) {
  const router = useRouter();
  const [name, setName] = useState(symptom.name);
  const [category, setCategory] = useState(symptom.category);
  const [tag, setTag] = useState(symptom.tag);
  const [retireReason, setRetireReason] = useState(
    'Merged into “Hot flashes and night sweats”.',
  );

  const peopleLabel = symptom.peopleLogged30d.toLocaleString("en-US");

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/symptom-library" className="hover:text-primary">
          Symptom Library
        </Link>{" "}
        <span>›</span>{" "}
        <span className="text-primary">Edit {symptom.name}</span>
      </p>

      <PageHeader
        title={`Edit ${symptom.name}`}
        description="Changes reach the app after you publish · FR-SYM-01"
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
              Save changes
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="space-y-4 rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Symptom name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-category">Category</Label>
            <select
              id="edit-category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as SymptomDetail["category"])
              }
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
            <Label htmlFor="edit-tag">Tag</Label>
            <select
              id="edit-tag"
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
          </div>

          <div className="flex items-start gap-3 rounded-[12px] border border-[#c9b8e0] bg-[#ebe4f5] px-3 py-3 text-sm text-[#4a3d6b]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9b8e0] text-xs font-semibold">
              i
            </span>
            <p>
              Renaming changes the label for everyone. People’s past entries
              keep their dates and stay linked.
            </p>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Where it is used
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">Last 30 days</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">People who logged it</span>
                <span className="font-medium text-[#221c1e]">{peopleLabel}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Shown in</span>
                <span className="text-right font-medium text-[#221c1e]">
                  {symptom.shownIn}
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-0.5 text-[11px] font-medium text-[#0d6b64]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
                  {symptom.status}
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Retire this symptom
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Stops it appearing for new entries
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Past entries</span>
                <span className="font-medium text-[#221c1e]">
                  Kept, visible to the person
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">In the picker</span>
                <span className="font-medium text-[#221c1e]">
                  Hidden for new entries
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Reports and trends</span>
                <span className="font-medium text-[#221c1e]">Still counted</span>
              </li>
            </ul>

            <div className="mt-3 flex items-start gap-2 rounded-[12px] border border-[#e8c98a] bg-[#fbf3dc] px-3 py-2.5 text-xs text-[#7a5a12]">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <p>
                {peopleLabel} people have logged this. Retiring cannot delete
                their history.
              </p>
            </div>

            <div className="mt-3 space-y-1.5">
              <Label htmlFor="retire-reason">Reason (required)</Label>
              <textarea
                id="retire-reason"
                value={retireReason}
                onChange={(e) => setRetireReason(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-[10px] border border-[#d9cdcf] bg-white px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <Button
              className="mt-3 w-full gap-1.5"
              disabled={!retireReason.trim()}
              onClick={() => router.push("/symptom-library")}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Retire symptom
            </Button>
          </section>
        </aside>
      </div>
    </div>
  );
}

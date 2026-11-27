"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bold,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  Quote,
  Send,
} from "lucide-react";
import { Button, Input, Label, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type NewArticleViewProps = {
  defaults: {
    title: string;
    body: string;
    topic: string;
    audience: string;
    premiumOnly: boolean;
  };
};

export function NewArticleView({ defaults }: NewArticleViewProps) {
  const router = useRouter();
  const [title, setTitle] = useState(defaults.title);
  const [body, setBody] = useState(defaults.body);
  const [topic, setTopic] = useState(defaults.topic);
  const [audience, setAudience] = useState(defaults.audience);
  const [premiumOnly, setPremiumOnly] = useState(defaults.premiumOnly);

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/global-content" className="hover:text-primary">
          Clinical Content
        </Link>{" "}
        <span>›</span> <span className="text-primary">New article</span>
      </p>

      <PageHeader
        title="New article"
        description="Needs OB/GYN sign-off before it goes live · FR-ADM-02 · FR-CHK-03"
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => router.push("/global-content")}
            >
              Save draft
            </Button>
            <Button
              size="sm"
              className="rounded-full gap-1.5"
              onClick={() => router.push("/global-content")}
            >
              <Send className="h-4 w-4" aria-hidden />
              Submit for sign-off
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <div className="space-y-1.5">
            <Label htmlFor="article-title">Title</Label>
            <Input
              id="article-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-primary"
            />
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[10px] border border-b-0 border-[#d9cdcf] bg-[#faf6f6] px-3 py-2">
              <div className="flex items-center gap-1 text-[#6b6165]">
                {[Bold, Italic, List, Quote, ImageIcon, Link2].map((Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="rounded-[6px] p-1.5 hover:bg-[#efd5de] hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-[#8f8589]">
                Draft · saved 1 min ago
              </span>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              className="w-full resize-none rounded-b-[10px] border border-[#d9cdcf] px-3 py-3 text-sm leading-relaxed text-[#221c1e] outline-none focus:border-primary"
            />
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#e8c98a] bg-[#fbf3dc] px-3 py-2.5 text-xs text-[#7a5a12]">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e8c98a] text-[10px] font-semibold">
              i
            </span>
            <p>
              The medical disclaimer is added automatically: educational only,
              not medical advice, not a method of birth control.
            </p>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Where it appears in the app
            </h2>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="article-topic">Topic</Label>
                <select
                  id="article-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm outline-none focus:border-primary"
                >
                  {["Cycle health", "Fertility", "Pregnancy", "Perimenopause"].map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="article-audience">Audience tier</Label>
                <select
                  id="article-audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm outline-none focus:border-primary"
                >
                  <option value="General audience">General audience</option>
                  <option value="Mature · gated">Mature · gated</option>
                </select>
                <p className="text-xs text-[#8f8589]">
                  Mature content sits behind a confirmation step · FR-AGE-01
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#ebe3e3] px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium text-[#221c1e]">
                    Premium only
                  </p>
                  <p className="text-xs text-[#8f8589]">
                    Off keeps it free for everyone
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={premiumOnly}
                  onClick={() => setPremiumOnly((v) => !v)}
                  className={cn(
                    "relative h-6 w-11 rounded-full",
                    premiumOnly ? "bg-primary" : "bg-[#d9cdcf]",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                      premiumOnly && "translate-x-5",
                    )}
                  />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Required before publishing
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Reviewer</span>
                <span className="font-medium text-[#221c1e]">
                  Clinical Content Officer
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Sign-off by</span>
                <span className="font-medium text-[#221c1e]">OB/GYN advisor</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Regions</span>
                <span className="font-medium text-[#221c1e]">All regions</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="text-[#6b6165]">Status</span>
                <span className="rounded-full bg-[#e8d5c8] px-2.5 py-0.5 text-[11px] font-medium text-[#7a554c]">
                  Draft
                </span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

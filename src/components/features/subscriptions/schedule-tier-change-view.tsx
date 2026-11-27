"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Ban,
  Calendar,
  Check,
  Lock,
  Shield,
} from "lucide-react";
import type {
  SafetyCheck,
  ScheduleFeatureOption,
  TimelineStep,
} from "./types";
import { Button, Input, Label, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type ScheduleTierChangeViewProps = {
  features: ScheduleFeatureOption[];
  safetyPass: SafetyCheck[];
  safetyBlocked: SafetyCheck[];
  timeline: TimelineStep[];
  defaultMessage: string;
};

export function ScheduleTierChangeView({
  features,
  safetyPass,
  safetyBlocked,
  timeline,
  defaultMessage,
}: ScheduleTierChangeViewProps) {
  const router = useRouter();
  const [featureId, setFeatureId] = useState(features[0]?.id ?? "");
  const [effectiveDate, setEffectiveDate] = useState("Feb 17, 2027");
  const [message, setMessage] = useState(defaultMessage);

  const selected = useMemo(
    () => features.find((f) => f.id === featureId) ?? features[0],
    [featureId, features],
  );
  const blocked = Boolean(selected?.blocked);
  const checks = blocked ? safetyBlocked : safetyPass;

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/subscriptions" className="hover:text-primary">
          Subscriptions & Tiers
        </Link>{" "}
        <span>›</span>{" "}
        <span className="text-primary">Schedule tier change</span>
      </p>

      <PageHeader
        title="Schedule tier change"
        description="Move a feature between plans fairly · FR-MON-02 · FR-MON-07"
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => router.push("/subscriptions")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-full gap-1.5"
              disabled={blocked}
              onClick={() =>
                router.push("/subscriptions/changes/PC-204/approve")
              }
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Schedule change
            </Button>
          </>
        }
      />

      {blocked ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-[12px] border border-[#efb4b4] bg-[#fde8e6] px-4 py-3 text-sm text-[#9b1c1c]"
        >
          <Ban className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">This feature cannot be moved</p>
            <p className="mt-0.5 text-[#b42318]">
              The current week, due date and weekly milestones are the permanent
              free pregnancy baseline. A new pregnancy must never leave someone
              with an unusable app. · FR-PRG-03 · FR-MON-03
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-4 rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <div className="space-y-1.5">
            <Label htmlFor="feature-to-move">Feature to move</Label>
            <select
              id="feature-to-move"
              value={featureId}
              onChange={(e) => setFeatureId(e.target.value)}
              className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm text-[#221c1e] outline-none focus:border-primary"
            >
              {features.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div className="space-y-1.5">
              <Label>From</Label>
              <div className="flex h-10 items-center rounded-[10px] border border-[#d9cdcf] bg-[#faf6f6] px-3 text-sm font-medium text-[#221c1e]">
                Free
              </div>
            </div>
            <ArrowRight className="mx-auto hidden h-4 w-4 text-[#8f8589] sm:mb-3 sm:block" />
            <div className="space-y-1.5">
              <Label>To</Label>
              <div
                className={cn(
                  "flex h-10 items-center rounded-[10px] border px-3 text-sm font-medium",
                  blocked
                    ? "border-[#efb4b4] bg-[#fde8e6] text-[#9b1c1c]"
                    : "border-[#d9cdcf] bg-[#faf6f6] text-[#221c1e]",
                )}
              >
                Premium
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="effective-date">Takes effect on</Label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
              <Input
                id="effective-date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-[#8f8589]">
              At least 90 days after notice goes out.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-[12px] border border-[#9ed4ce] bg-[#e6f6f4] px-3 py-3 text-sm text-[#0d6b64]">
            <Shield className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <div className="flex-1">
              <p className="font-semibold">90-day grandfathering is on</p>
              <p className="mt-0.5 text-xs text-[#3d7a74]">
                Current users keep free access until the effective date,
                enforced by the system.
              </p>
            </div>
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#0d6b64]" aria-hidden />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="user-message">Message people will see</Label>
            <textarea
              id="user-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-[10px] border border-[#d9cdcf] bg-white px-3 py-2 text-sm text-[#221c1e] outline-none focus:border-primary"
            />
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Safety checks
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">All must pass</p>
            <ul className="mt-3 space-y-3">
              {checks.map((check) => (
                <li key={check.id} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                      check.pass
                        ? "bg-[#c5ebe6] text-[#0d6b64]"
                        : "bg-[#efd5de] text-primary",
                    )}
                  >
                    {check.pass ? (
                      <Check className="h-3 w-3" aria-hidden />
                    ) : (
                      <span className="text-[10px] font-bold">×</span>
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#221c1e]">
                      {check.title}
                    </p>
                    {check.detail ? (
                      <p className="mt-0.5 text-xs text-[#8f8589]">
                        {check.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#221c1e]">
                What happens
              </h2>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium",
                  blocked
                    ? "bg-[#efd5de] text-primary"
                    : "bg-[#f8eedc] text-[#9a6b1f]",
                )}
              >
                {blocked ? "Blocked by rule" : "Needs second approval"}
              </span>
            </div>
            <ol className="space-y-3">
              {timeline.map((step, index) => (
                <li key={step.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold",
                        step.state === "done"
                          ? "bg-[#c5ebe6] text-[#0d6b64]"
                          : "bg-[#f0e8e6] text-[#8f8589]",
                      )}
                    >
                      {step.state === "done" ? (
                        <Check className="h-3 w-3" aria-hidden />
                      ) : (
                        index + 1
                      )}
                    </span>
                    {index < timeline.length - 1 ? (
                      <span className="mt-1 w-px flex-1 bg-[#e5dbdb]" />
                    ) : null}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium text-[#221c1e]">
                      {step.title}
                    </p>
                    <p className="text-xs text-[#8f8589]">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}

"use client";

import {
  Calendar,
  Check,
  Lock,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import type { UserDetail } from "@/types/user-detail";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { SectionCard } from "./section-card";

type CycleLogsPanelProps = {
  user: UserDetail;
  revealed: boolean;
  revealEndsIn?: string;
  onRevealRequest: () => void;
};

const icons = {
  refresh: RefreshCw,
  calendar: Calendar,
  trend: TrendingUp,
  check: Check,
} as const;

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function CycleLogsPanel({
  user,
  revealed,
  revealEndsIn,
  onRevealRequest,
}: CycleLogsPanelProps) {
  const { cycleLogs } = user;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cycleLogs.kpis.map((kpi) => {
          const Icon = icons[kpi.icon];
          return (
            <div
              key={kpi.id}
              className="rounded-[16px] border border-[#d9cdcf] bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-[#6b6165]">{kpi.label}</p>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efd5de] text-primary">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#221c1e]">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-[#8f8589]">{kpi.hint}</p>
            </div>
          );
        })}
      </div>

      <SectionCard
        title="Cycle history"
        subtitle="Dates and flow are hidden in this view · FR-CYC-04"
        badge={
          <span className="rounded-full bg-[#e8d5c8] px-2.5 py-1 text-[11px] font-medium text-[#7a554c]">
            Health data masked
          </span>
        }
      >
        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>Cycle</TableHead>
                <TableHead className={head}>Started</TableHead>
                <TableHead className={head}>Length</TableHead>
                <TableHead className={head}>Days logged</TableHead>
                <TableHead className={head}>Symptoms logged</TableHead>
                <TableHead className={head}>Sync</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cycleLogs.history.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "bg-white",
                    index < cycleLogs.history.length - 1 &&
                      "border-b border-[#ebe3e3]",
                  )}
                >
                  <TableCell className="py-3.5 font-medium text-[#221c1e]">
                    {row.cycle}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#8f8589]">
                      <Lock className="h-3.5 w-3.5" aria-hidden />
                      Hidden
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.length}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.daysLogged}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.symptomsLogged}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
                      {row.sync}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Temperature (BBT)"
          subtitle="Hidden values · FR-BBT-01"
        >
          <ul className="space-y-0">
            <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 text-sm">
              <span className="text-[#6b6165]">Unit</span>
              <span className="font-medium text-[#221c1e]">
                {cycleLogs.bbt.unit}
              </span>
            </li>
            <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 text-sm">
              <span className="text-[#6b6165]">Logged this cycle</span>
              <span className="font-medium text-[#221c1e]">
                {cycleLogs.bbt.loggedDays}
              </span>
            </li>
            <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 text-sm">
              <span className="text-[#6b6165]">Smart thermometer</span>
              <span className="font-medium text-[#221c1e]">
                {cycleLogs.bbt.thermometer}
              </span>
            </li>
            <li className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span className="text-[#6b6165]">Latest reading</span>
              {revealed ? (
                <span className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    className="font-semibold text-[#a33d52]"
                    onClick={onRevealRequest}
                  >
                    {cycleLogs.bbt.latestRevealed}
                  </button>
                  {revealEndsIn ? (
                    <span className="rounded-full bg-[#f0e0b8] px-2 py-0.5 text-[11px] font-medium text-[#8a5f16]">
                      Hides in {revealEndsIn}
                    </span>
                  ) : null}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={onRevealRequest}
                  className="inline-flex items-center gap-1.5 text-[#8f8589] hover:text-primary"
                >
                  <Lock className="h-3.5 w-3.5" aria-hidden />
                  {cycleLogs.bbt.latestMasked}
                </button>
              )}
            </li>
          </ul>
        </SectionCard>

        <SectionCard
          title="Notes and reminders"
          subtitle="FR-EXP-03 · FR-CYC-07"
        >
          <ul>
            <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 text-sm">
              <span className="text-[#6b6165]">Day notes</span>
              <span className="font-medium text-[#221c1e]">
                {cycleLogs.notes.dayNotes}
              </span>
            </li>
            {cycleLogs.notes.reminders.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0"
              >
                <span className="text-sm text-[#6b6165]">{item.label}</span>
                <span
                  className={cn(
                    "relative h-6 w-11 rounded-full",
                    item.on ? "bg-[#0d6b64]" : "bg-[#d9cdcf]",
                  )}
                  aria-label={`${item.label} ${item.on ? "On" : "Off"}`}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                      item.on && "translate-x-5",
                    )}
                  />
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

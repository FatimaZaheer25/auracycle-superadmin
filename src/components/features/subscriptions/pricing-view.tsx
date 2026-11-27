"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, CreditCard, Plus, Send, Shield } from "lucide-react";
import type { PricingRegionRow } from "@/types/subscriptions";
import {
  Button,
  Input,
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

type PricingViewProps = {
  defaults: {
    regionLabel: string;
    monthly: string;
    annual: string;
    takesEffect: string;
    previewPrice: string;
    previewPlan: string;
    previewFooter: string;
  };
  regions: PricingRegionRow[];
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function PricingView({ defaults, regions }: PricingViewProps) {
  const [monthly, setMonthly] = useState(defaults.monthly);
  const [annual, setAnnual] = useState(defaults.annual);
  const [takesEffect, setTakesEffect] = useState(defaults.takesEffect);
  const [focus, setFocus] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/subscriptions" className="hover:text-primary">
          Subscriptions & Tiers
        </Link>{" "}
        <span>›</span> <span className="text-primary">Pricing</span>
      </p>

      <PageHeader
        title="Pricing"
        description="Premium prices by region · FR-MON-01 · FR-MON-07"
        actions={
          <>
            <Button size="sm" variant="outline" className="rounded-full gap-1.5">
              <Plus className="h-4 w-4" aria-hidden />
              Add region
            </Button>
            <Button size="sm" className="rounded-full gap-1.5">
              <Send className="h-4 w-4" aria-hidden />
              Send for approval
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-[#221c1e]">Premium plans</h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">{defaults.regionLabel}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="monthly-price">Monthly</Label>
              <div className="relative">
                <CreditCard className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
                <Input
                  id="monthly-price"
                  value={monthly}
                  onChange={(e) => setMonthly(e.target.value)}
                  onFocus={() => setFocus("monthly")}
                  className={cn(
                    "pl-9",
                    focus === "monthly" && "border-primary",
                  )}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="annual-price">Annual</Label>
              <div className="relative">
                <CreditCard className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
                <Input
                  id="annual-price"
                  value={annual}
                  onChange={(e) => setAnnual(e.target.value)}
                  onFocus={() => setFocus("annual")}
                  className={cn(
                    "pl-9",
                    focus === "annual" && "border-primary",
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <Label htmlFor="takes-effect">Takes effect</Label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
              <Input
                id="takes-effect"
                value={takesEffect}
                onChange={(e) => setTakesEffect(e.target.value)}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-[#8f8589]">
              People already subscribed keep their price until they renew.
            </p>
          </div>

          <div className="mt-5 overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
            <Table>
              <TableHeader className="bg-[#f0e8e6]">
                <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                  <TableHead className={head}>Region</TableHead>
                  <TableHead className={head}>Currency</TableHead>
                  <TableHead className={head}>Monthly</TableHead>
                  <TableHead className={head}>Annual</TableHead>
                  <TableHead className={head}>Store</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regions.map((row, index) => (
                  <TableRow
                    key={row.region}
                    className={cn(
                      "bg-white",
                      index < regions.length - 1 && "border-b border-[#ebe3e3]",
                    )}
                  >
                    <TableCell className="py-3.5 font-medium text-[#221c1e]">
                      {row.region}
                    </TableCell>
                    <TableCell className="py-3.5 text-sm text-[#6b6165]">
                      {row.currency}
                    </TableCell>
                    <TableCell className="py-3.5 text-sm text-[#6b6165]">
                      {row.monthly}
                    </TableCell>
                    <TableCell className="py-3.5 text-sm text-[#6b6165]">
                      {row.annual}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                          row.storeTone === "ok"
                            ? "bg-[#c5ebe6] text-[#0d6b64]"
                            : "bg-[#f0e0b8] text-[#8a5f16]",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            row.storeTone === "ok"
                              ? "bg-[#0d6b64]"
                              : "bg-[#c4a035]",
                          )}
                        />
                        {row.store}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              What people see
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">FR-MON-04</p>
            <div className="mt-4 rounded-[12px] border border-[#efd5de] bg-[#faf0f3] px-4 py-4 text-center">
              <p className="text-2xl font-semibold text-[#221c1e]">
                {annual || defaults.previewPrice}
              </p>
              <p className="mt-1 text-xs font-medium text-primary">
                {defaults.previewPlan}
              </p>
              <p className="mt-2 text-xs text-[#8f8589]">
                {defaults.previewFooter}
              </p>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#c9b8e0] bg-[#ebe4f5] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c9b8e0] text-[#4a3d6b]">
                <Shield className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-[#4a3d6b]">
                  Changes need approval
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#5a4a7a]">
                  A second Super Admin approves price changes. Store prices
                  update only after approval.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

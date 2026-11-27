import { Check } from "lucide-react";
import type { UserDetail } from "../user-detail.types";
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

type SubscriptionTabPanelProps = {
  user: UserDetail;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function SubscriptionTabPanel({ user }: SubscriptionTabPanelProps) {
  const { subscriptionTab } = user;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title={subscriptionTab.planTitle}
          subtitle="Mirrors Premium active"
          badge={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
              {subscriptionTab.status}
            </span>
          }
        >
          <ul>
            {subscriptionTab.rows.map((row) => (
              <li
                key={row.label}
                className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0 text-sm"
              >
                <span className="text-[#6b6165]">{row.label}</span>
                <span className="font-medium text-[#221c1e]">{row.value}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="What is unlocked" subtitle="FR-MON-01">
          <ul className="space-y-2.5">
            {subscriptionTab.unlocked.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#221c1e]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5ebe6]">
                  <Check className="h-3 w-3 text-[#0d6b64]" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Billing history"
        subtitle="Card details never reach our servers · NFR-SEC-07"
      >
        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>Date</TableHead>
                <TableHead className={head}>Event</TableHead>
                <TableHead className={head}>Amount</TableHead>
                <TableHead className={head}>Channel</TableHead>
                <TableHead className={head}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionTab.billing.map((row, index) => (
                <TableRow
                  key={`${row.date}-${row.event}`}
                  className={cn(
                    "bg-white",
                    index < subscriptionTab.billing.length - 1 &&
                      "border-b border-[#ebe3e3]",
                  )}
                >
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.date}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm font-medium text-[#221c1e]">
                    {row.event}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.amount}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.channel}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium capitalize",
                        row.status === "paid"
                          ? "bg-[#c5ebe6] text-[#0d6b64]"
                          : "bg-[#c5e0eb] text-[#0d5a6b]",
                      )}
                    >
                      {row.status === "paid" ? "Paid" : "Restored"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      <div className="flex items-start gap-3 rounded-[12px] border border-[#c9b8e0] bg-[#ebe4f5] px-4 py-3 text-sm text-[#4a3d6b]">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9b8e0] text-xs font-semibold">
          i
        </span>
        <p>{subscriptionTab.footer}</p>
      </div>
    </div>
  );
}

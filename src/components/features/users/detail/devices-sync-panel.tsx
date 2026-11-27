import { Check, Clock, Shield, Smartphone } from "lucide-react";
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

type DevicesSyncPanelProps = {
  user: UserDetail;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

const iconMap = {
  check: Check,
  phone: Smartphone,
  clock: Clock,
  shield: Shield,
} as const;

export function DevicesSyncPanel({ user }: DevicesSyncPanelProps) {
  const { devicesTab } = user;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {devicesTab.kpis.map((kpi) => {
          const Icon = iconMap[kpi.icon];
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
              <p
                className={cn(
                  "mt-1 text-xs",
                  kpi.hintTone === "ok" ? "text-[#0d6b64]" : "text-[#8f8589]",
                )}
              >
                {kpi.hint}
              </p>
            </div>
          );
        })}
      </div>

      <SectionCard
        title="Signed-in devices"
        subtitle="New-device sign-ins restore everything automatically · FR-CNT-01"
      >
        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>Device</TableHead>
                <TableHead className={head}>Platform</TableHead>
                <TableHead className={head}>Last synced</TableHead>
                <TableHead className={head}>Status</TableHead>
                <TableHead className={head}>First signed in</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devicesTab.devices.map((row, index) => (
                <TableRow
                  key={`${row.device}-${row.firstSignedIn}`}
                  className={cn(
                    "bg-white",
                    index < devicesTab.devices.length - 1 &&
                      "border-b border-[#ebe3e3]",
                  )}
                >
                  <TableCell className="py-3.5 font-medium text-[#221c1e]">
                    {row.device}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.platform}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.lastSynced}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium",
                        row.statusTone === "ok"
                          ? "bg-[#c5ebe6] text-[#0d6b64]"
                          : "bg-[#efd5de] text-primary",
                      )}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.firstSignedIn}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Recovery options"
          subtitle="FR-CNT-03 · FR-CNT-04"
        >
          <ul>
            {devicesTab.recovery.map((row) => (
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
        </SectionCard>

        <SectionCard title="Last restore">
          <p className="text-sm leading-relaxed text-[#6b6165]">
            {devicesTab.lastRestore.text}
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
              {devicesTab.lastRestore.badge}
            </span>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

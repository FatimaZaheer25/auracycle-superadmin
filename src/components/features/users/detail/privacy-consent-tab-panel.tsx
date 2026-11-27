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

type PrivacyConsentTabPanelProps = {
  user: UserDetail;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

function consentTone(status?: "on" | "off" | "private") {
  if (status === "on") return "bg-[#c5ebe6] text-[#0d6b64]";
  return "bg-[#efd5de] text-primary";
}

export function PrivacyConsentTabPanel({ user }: PrivacyConsentTabPanelProps) {
  const { privacyTab } = user;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Consent settings"
          subtitle='Mirrors "Sharing & consent" in the app.'
        >
          <ul>
            {privacyTab.consents.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0"
              >
                <span className="text-sm text-[#6b6165]">{row.label}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                    consentTone(row.status),
                  )}
                >
                  {row.status === "on" &&
                  row.value.toLowerCase().includes("no") ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
                  ) : null}
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Data requests" subtitle="FR-PRV-04 · FR-EXP-02">
          <ul>
            {privacyTab.dataRequests.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0"
              >
                <span className="text-sm text-[#6b6165]">{row.label}</span>
                <span className="text-right text-sm font-medium text-[#221c1e]">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Consent history" subtitle="Immutable · FR-ADM-06">
        <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
          <Table>
            <TableHeader className="bg-[#f0e8e6]">
              <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                <TableHead className={head}>When</TableHead>
                <TableHead className={head}>Change</TableHead>
                <TableHead className={head}>By</TableHead>
                <TableHead className={head}>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {privacyTab.history.map((row, index) => (
                <TableRow
                  key={`${row.when}-${row.change}`}
                  className={cn(
                    "bg-white",
                    index < privacyTab.history.length - 1 &&
                      "border-b border-[#ebe3e3]",
                  )}
                >
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.when}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm font-medium text-[#221c1e]">
                    {row.change}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.by}
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-[#6b6165]">
                    {row.source}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}

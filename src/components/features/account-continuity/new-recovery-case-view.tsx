"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Clock, Lock, User } from "lucide-react";
import type { FoundAccountSummary, IdentifierKind } from "./types";
import { Button, Input, Label, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";

type NewRecoveryCaseViewProps = {
  defaults: {
    emailQuery: string;
    issueType: string;
    priority: "Normal" | "Urgent";
    details: string;
    assignee: string;
    issueTypes: string[];
    assignees: string[];
  };
  foundAccount: FoundAccountSummary;
};

const identifierChips: { id: IdentifierKind; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "accountId", label: "In-app account ID" },
  { id: "receipt", label: "Purchase receipt" },
  { id: "backup", label: "Device backup reference" },
];

export function NewRecoveryCaseView({
  defaults,
  foundAccount,
}: NewRecoveryCaseViewProps) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState<IdentifierKind>("email");
  const [query, setQuery] = useState(defaults.emailQuery);
  const [issueType, setIssueType] = useState(defaults.issueType);
  const [priority, setPriority] = useState<"Normal" | "Urgent">(
    defaults.priority,
  );
  const [details, setDetails] = useState(defaults.details);
  const [assignee, setAssignee] = useState(defaults.assignee);
  const accountFound = query.trim().length > 0;

  const inputLabel =
    identifierChips.find((c) => c.id === identifier)?.label ?? "Email";

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/account-continuity" className="hover:text-primary">
          Account Continuity
        </Link>{" "}
        <span>›</span>{" "}
        <span className="text-primary">New recovery case</span>
      </p>

      <PageHeader
        title="New recovery case"
        description="Find the account and start a restore · FR-CNT-04 · NFR-REL-05"
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => router.push("/account-continuity")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-full gap-1.5"
              onClick={() => router.push("/account-continuity/RC-1042")}
            >
              <Check className="h-4 w-4" aria-hidden />
              Create case
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Find the account
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              Search by any identifier
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {identifierChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setIdentifier(chip.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    identifier === chip.id
                      ? "bg-[#efd5de] text-primary"
                      : "bg-[#f7f0f1] text-[#6b6165] hover:bg-[#efd5de]/60",
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-1.5">
              <Label htmlFor="account-query">{inputLabel}</Label>
              <Input
                id="account-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-primary focus-visible:ring-primary/20"
              />
            </div>

            {accountFound ? (
              <div className="mt-3 rounded-[12px] border border-[#9ed4ce] bg-[#e6f6f4] px-3 py-3 text-sm text-[#0d6b64]">
                <p>
                  Account found ·{" "}
                  <span className="font-semibold">{foundAccount.id}</span>
                </p>
                <p className="mt-0.5 text-xs text-[#3d7a74]">
                  {foundAccount.accountType} account · {foundAccount.devices}{" "}
                  devices · last active {foundAccount.lastActive}
                </p>
              </div>
            ) : null}
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Describe the problem
            </h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="issue-type">Issue type</Label>
                <select
                  id="issue-type"
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm text-[#221c1e] outline-none focus:border-primary"
                >
                  {defaults.issueTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Priority</Label>
                <div className="flex gap-2">
                  {(["Normal", "Urgent"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPriority(item)}
                      className={cn(
                        "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                        priority === item
                          ? "bg-[#efd5de] text-primary"
                          : "border border-[#d9cdcf] bg-white text-[#6b6165]",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="case-details">Details</Label>
                <textarea
                  id="case-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-[10px] border border-[#d9cdcf] bg-white px-3 py-2 text-sm text-[#221c1e] outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="assign-to">Assign to</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
                  <select
                    id="assign-to"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="flex h-10 w-full appearance-none rounded-[10px] border border-[#d9cdcf] bg-white py-2 pr-3 pl-9 text-sm text-[#221c1e] outline-none focus:border-primary"
                  >
                    {defaults.assignees.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#221c1e]">
                Account found
              </h2>
              <span className="text-[11px] font-medium text-[#8f8589]">
                Health data stays masked
              </span>
            </div>
            <ul>
              <SidebarRow
                label="Account type"
                value={
                  <span className="rounded-full bg-[#c5ebe6] px-2.5 py-0.5 text-[11px] font-medium text-[#0d6b64]">
                    {foundAccount.accountType}
                  </span>
                }
              />
              <SidebarRow label="Sign-in method" value={foundAccount.signInMethod} />
              <SidebarRow label="Devices" value={String(foundAccount.devices)} />
              <SidebarRow label="Last sync" value={foundAccount.lastSync} />
              <SidebarRow label="Recovery key" value={foundAccount.recoveryKey} />
              <SidebarRow
                label="Cycle history"
                value={
                  <span className="inline-flex items-center gap-1.5 text-[#8f8589]">
                    <Lock className="h-3.5 w-3.5" aria-hidden />
                    Hidden
                  </span>
                }
              />
            </ul>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#221c1e]">
                Resolution target
              </h2>
              <span className="text-[11px] font-medium text-primary">
                Data-loss reports are urgent
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6b6165]">Time to resolve</span>
              <span className="font-medium text-[#221c1e]">24 hours</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f0e8e6]">
              <div className="h-full w-[6%] rounded-full bg-primary" />
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#e8c98a] bg-[#fbf3dc] px-3 py-2.5 text-xs text-[#7a5a12]">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <p>
                <span className="font-semibold">
                  Case opens as release-blocking if data is missing.{" "}
                </span>
                Normal operating conditions should never need manual recovery.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function SidebarRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-[#ebe3e3] py-2.5 last:border-0 text-sm">
      <span className="text-[#6b6165]">{label}</span>
      <span className="text-right font-medium text-[#221c1e]">{value}</span>
    </li>
  );
}

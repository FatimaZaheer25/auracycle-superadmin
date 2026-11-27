"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Lock,
  UserPlus,
} from "lucide-react";
import type { RecoveryCaseDetail } from "@/types/account-continuity";
import {
  Button,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type RecoveryCaseDetailViewProps = {
  caseDetail: RecoveryCaseDetail;
};

const head =
  "h-11 text-[11px] font-semibold tracking-[0.07em] text-[#7a7074] uppercase";

export function RecoveryCaseDetailView({
  caseDetail,
}: RecoveryCaseDetailViewProps) {
  const [status, setStatus] = useState(caseDetail.status);
  const [assignee, setAssignee] = useState(caseDetail.assignee);
  const [priority, setPriority] = useState(caseDetail.priority);
  const [releaseBlocking, setReleaseBlocking] = useState(
    caseDetail.releaseBlocking,
  );
  const [restorePoint, setRestorePoint] = useState(caseDetail.restorePoint);
  const [restoreOptions, setRestoreOptions] = useState(
    caseDetail.restoreOptions,
  );
  const [notes, setNotes] = useState(caseDetail.notes);
  const [draftNote, setDraftNote] = useState(caseDetail.draftNote);

  function toggleOption(id: string) {
    setRestoreOptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  function addNote() {
    if (!draftNote.trim()) return;
    setNotes((prev) => [
      ...prev,
      {
        id: `n-${Date.now()}`,
        author: "You",
        when: "Just now",
        body: draftNote.trim(),
      },
    ]);
    setDraftNote("");
  }

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-[#8f8589]">
        <Link href="/account-continuity" className="hover:text-primary">
          Account Continuity
        </Link>{" "}
        <span>›</span>{" "}
        <span className="text-primary">{caseDetail.id}</span>
      </p>

      <PageHeader
        title={`${caseDetail.id} · ${caseDetail.title}`}
        description={`${caseDetail.openedAgo} · ${caseDetail.slaLeft}`}
        actions={
          <>
            <Button size="sm" variant="outline" className="rounded-full gap-1.5">
              <UserPlus className="h-4 w-4" aria-hidden />
              Assign
            </Button>
            <Button size="sm" className="rounded-full gap-1.5">
              <Check className="h-4 w-4" aria-hidden />
              Resolve case
            </Button>
          </>
        }
      />

      <div className="-mt-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8eedc] px-2.5 py-1 text-[11px] font-medium text-[#9a6b1f]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c4a035]" />
          {status}
        </span>
        <span className="rounded-full bg-[#efd5de] px-2.5 py-1 text-[11px] font-medium text-primary">
          {priority}
        </span>
        <Link
          href={`/users/${caseDetail.userId}`}
          className="rounded-full bg-[#f0e8e6] px-2.5 py-1 text-[11px] font-medium text-[#6b6165] hover:text-primary"
        >
          {caseDetail.userId}
        </Link>
      </div>

      <WorkflowStepper steps={caseDetail.steps} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Identifiers tried
            </h2>
            <div className="overflow-x-auto rounded-[12px] border border-[#d9cdcf]">
              <Table>
                <TableHeader className="bg-[#f0e8e6]">
                  <TableRow className="border-b border-[#e5dbdb] hover:bg-transparent">
                    <TableHead className={head}>Identifier</TableHead>
                    <TableHead className={head}>Value</TableHead>
                    <TableHead className={head}>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseDetail.identifiersTried.map((row, index) => (
                    <TableRow
                      key={row.label}
                      className={cn(
                        "bg-white",
                        index < caseDetail.identifiersTried.length - 1 &&
                          "border-b border-[#ebe3e3]",
                      )}
                    >
                      <TableCell className="py-3.5 font-medium text-[#221c1e]">
                        {row.label}
                      </TableCell>
                      <TableCell className="py-3.5 text-sm text-[#6b6165]">
                        {row.value}
                      </TableCell>
                      <TableCell className="py-3.5">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[11px] font-medium",
                            row.resultTone === "ok"
                              ? "bg-[#c5ebe6] text-[#0d6b64]"
                              : "bg-[#f0e0b8] text-[#8a5f16]",
                          )}
                        >
                          {row.result}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Restore history
            </h2>
            <div className="mt-3 space-y-1.5">
              <label className="text-xs font-medium text-[#6b6165]">
                Backup point
              </label>
              <select
                value={restorePoint}
                onChange={(e) => setRestorePoint(e.target.value)}
                className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm text-[#221c1e] outline-none focus:border-primary"
              >
                <option value={caseDetail.restorePoint}>
                  {caseDetail.restorePoint}
                </option>
                <option value="Oct 5, 2026 · 9:00 AM · 2 cycles, 10 BBT days">
                  Oct 5, 2026 · 9:00 AM · 2 cycles, 10 BBT days
                </option>
              </select>
            </div>

            <p className="mt-4 text-xs font-medium text-[#6b6165]">
              What to restore
            </p>
            <ul className="mt-2 space-y-2">
              {restoreOptions.map((item) => (
                <li key={item.id}>
                  <label className="flex items-center gap-2 text-sm text-[#221c1e]">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleOption(item.id)}
                      className="h-4 w-4 rounded border-[#d9cdcf] accent-primary"
                    />
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="rounded-full">
                Preview restore
              </Button>
              <Button size="sm" className="rounded-full">
                Restore history
              </Button>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Case notes
            </h2>
            <ul className="space-y-3">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="rounded-[12px] border border-[#ebe3e3] bg-[#faf6f6] px-3 py-3"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#221c1e]">
                      {note.author}
                    </span>
                    <span className="text-[#8f8589]">{note.when}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#6b6165]">{note.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3 space-y-2">
              <textarea
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                rows={2}
                placeholder="Add a note"
                className="w-full resize-none rounded-[10px] border border-[#d9cdcf] bg-white px-3 py-2 text-sm text-[#221c1e] outline-none focus:border-primary"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={addNote}
                  disabled={!draftNote.trim()}
                >
                  Add note
                </Button>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Case details
            </h2>
            <div className="space-y-3">
              <FieldSelect
                label="Status"
                value={status}
                onChange={(v) => setStatus(v as typeof status)}
                options={["Open", "In progress", "Awaiting user", "Resolved"]}
              />
              <FieldSelect
                label="Assignee"
                value={assignee}
                onChange={setAssignee}
                options={[
                  "Marc Dubois · Support Agent",
                  "Support Agent · next available",
                  "Unassigned",
                ]}
              />
              <FieldSelect
                label="Priority"
                value={priority}
                onChange={(v) => setPriority(v as typeof priority)}
                options={["Normal", "Urgent"]}
              />
            </div>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-[#221c1e]">
                  Release-blocking
                </h2>
                <p className="mt-0.5 text-xs text-[#8f8589]">
                  Turns on automatically if data is truly missing.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={releaseBlocking}
                onClick={() => setReleaseBlocking((v) => !v)}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                  releaseBlocking ? "bg-primary" : "bg-[#d9cdcf]",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                    releaseBlocking && "translate-x-5",
                  )}
                />
              </button>
            </div>
            <p className="mt-3 text-xs text-[#6b6165]">
              {caseDetail.releaseBlockingToday}
            </p>
            <p className="mt-1 text-xs text-[#8f8589]">
              {caseDetail.releaseBlockingIfOn}
            </p>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-[#221c1e]">
              Resolution target
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              {caseDetail.resolution.target}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-[#6b6165]">
                {caseDetail.resolution.progressLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-0.5 text-[11px] font-medium text-[#0d6b64]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" />
                {caseDetail.resolution.state}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f0e8e6]">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${caseDetail.resolution.progressPercent}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-[#8f8589]">
              Due {caseDetail.resolution.due}
            </p>
          </section>

          <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-[#221c1e]">
              Account found
            </h2>
            <ul>
              <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 text-sm">
                <span className="text-[#6b6165]">Type</span>
                <span className="rounded-full bg-[#c5e0eb] px-2.5 py-0.5 text-[11px] font-medium text-[#0d5a6b]">
                  {caseDetail.account.accountType}
                </span>
              </li>
              <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 text-sm">
                <span className="text-[#6b6165]">Devices</span>
                <span className="font-medium text-[#221c1e]">
                  {caseDetail.account.devices}
                </span>
              </li>
              <li className="flex justify-between gap-3 border-b border-[#ebe3e3] py-2.5 text-sm">
                <span className="text-[#6b6165]">Last sync</span>
                <span className="font-medium text-[#221c1e]">
                  {caseDetail.account.lastSync}
                </span>
              </li>
              <li className="flex justify-between gap-3 py-2.5 text-sm">
                <span className="text-[#6b6165]">Cycle history</span>
                <span className="inline-flex items-center gap-1.5 text-[#8f8589]">
                  <Lock className="h-3.5 w-3.5" aria-hidden />
                  Hidden
                </span>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

function WorkflowStepper({
  steps,
}: {
  steps: RecoveryCaseDetail["steps"];
}) {
  return (
    <ol className="flex flex-wrap items-center gap-2 rounded-[16px] border border-[#d9cdcf] bg-white px-4 py-3 sm:gap-0">
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-center gap-2 sm:flex-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                step.state === "done" && "bg-[#0d6b64] text-white",
                step.state === "current" && "bg-primary text-white",
                step.state === "upcoming" && "bg-[#f0e8e6] text-[#8f8589]",
              )}
            >
              {step.state === "done" ? (
                <Check className="h-3.5 w-3.5" aria-hidden />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap",
                step.state === "current"
                  ? "text-primary"
                  : step.state === "done"
                    ? "text-[#0d6b64]"
                    : "text-[#8f8589]",
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 ? (
            <span
              className={cn(
                "mx-2 hidden h-px flex-1 sm:block",
                step.state === "done" ? "bg-[#0d6b64]" : "bg-[#e5dbdb]",
              )}
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[#6b6165]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white px-3 text-sm text-[#221c1e] outline-none focus:border-primary"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

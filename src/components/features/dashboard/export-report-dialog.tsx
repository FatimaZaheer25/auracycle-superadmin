"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Download,
  FileText,
  Lock,
  Shield,
  X,
} from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type ExportFormat = "pdf" | "csv";
type DialogStep = "confirm" | "ready";

type ExportReportDialogProps = {
  open: boolean;
  onClose: () => void;
};

const dateRanges = [
  "Oct 21 – Nov 19, 2026",
  "Sep 21 – Oct 20, 2026",
  "Last 7 days",
];

const summaryRows = [
  {
    label: "Included",
    value: "DAU/MAU, conversion, continuity, privacy usage",
  },
  {
    label: "Who can export",
    value: "Super Admin, Analyst",
  },
  {
    label: "Audit entry",
    value: "Export event with your name and range",
  },
];

export function ExportReportDialog({ open, onClose }: ExportReportDialogProps) {
  const [step, setStep] = useState<DialogStep>("confirm");
  const [format, setFormat] = useState<ExportFormat>("pdf");
  const [range, setRange] = useState(dateRanges[0]);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep("confirm");
      setFormat("pdf");
      setRange(dateRanges[0]);
      setExporting(false);
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleExport() {
    setExporting(true);
    window.setTimeout(() => {
      setExporting(false);
      setStep("ready");
    }, 700);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-[#221c1e]/45"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-dialog-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        {step === "confirm" ? (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="export-dialog-title"
                  className="text-lg font-semibold text-[#221c1e]"
                >
                  Export dashboard report
                </h2>
                <p className="mt-0.5 text-xs text-[#8f8589]">
                  Aggregate figures only · recorded in the Audit Log
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[8px] p-1.5 text-[#8f8589] hover:bg-[#f7f1f0] hover:text-[#221c1e]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="mb-1.5 text-xs font-medium text-[#6b6165]">
                  Date range
                </p>
                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  className="flex h-10 w-full rounded-[12px] border border-[#d9cdcf] bg-white px-3 text-sm text-[#221c1e] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                >
                  {dateRanges.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-medium text-[#6b6165]">
                  Format
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat("pdf")}
                    className={cn(
                      "rounded-[12px] border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      format === "pdf"
                        ? "border-primary bg-[#efd5de]/50 text-[#7a2f48]"
                        : "border-[#d9cdcf] bg-white text-[#5c5457] hover:bg-[#f7f1f0]",
                    )}
                  >
                    PDF summary
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat("csv")}
                    className={cn(
                      "rounded-[12px] border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      format === "csv"
                        ? "border-primary bg-[#efd5de]/50 text-[#7a2f48]"
                        : "border-[#d9cdcf] bg-white text-[#5c5457] hover:bg-[#f7f1f0]",
                    )}
                  >
                    CSV of KPIs
                  </button>
                </div>
              </div>

              <div className="flex gap-3 rounded-[12px] border border-[#b7ddd8] bg-[#c5ebe6]/55 px-3 py-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0d6b64]/12 text-[#0d6b64]">
                  <Shield className="h-3.5 w-3.5" aria-hidden />
                </span>
                <p className="flex-1 text-xs leading-relaxed text-[#0d6b64]">
                  <span className="font-semibold">Aggregate-only export:</span>{" "}
                  Reports hold totals and rates only. No user-level, health or
                  consent records can be included.
                </p>
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0d6b64]" aria-hidden />
              </div>

              <ul className="space-y-2.5 rounded-[12px] bg-[#f0e8e6] px-3 py-3">
                {summaryRows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-start justify-between gap-3 text-xs"
                  >
                    <span className="text-[#6b6165]">{row.label}</span>
                    <span className="max-w-[60%] text-right font-medium text-[#221c1e]">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="rounded-full"
                disabled={exporting}
                onClick={handleExport}
              >
                <Download className="h-4 w-4" aria-hidden />
                {exporting ? "Preparing…" : "Export report"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="export-dialog-title"
                  className="text-lg font-semibold text-[#221c1e]"
                >
                  Your report is ready
                </h2>
                <p className="mt-0.5 text-xs text-[#8f8589]">
                  Dashboard report · {range}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[8px] p-1.5 text-[#8f8589] hover:bg-[#f7f1f0] hover:text-[#221c1e]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 rounded-[12px] bg-[#f0e8e6] px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5ebe6] text-[#0d6b64]">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <p className="text-sm font-medium text-[#221c1e]">
                    Prepared in 12 seconds
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#0d6b64]">100%</p>
              </div>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#ebe1e1]">
                <div className="h-full w-full rounded-full bg-[#0d6b64]" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-[12px] border border-[#d9cdcf] px-3 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#f0d0d9] text-[#a33d52]">
                <FileText className="h-4 w-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#221c1e]">
                  {format === "pdf"
                    ? "dashboard-report-nov-2026.pdf"
                    : "dashboard-kpis-nov-2026.csv"}
                </p>
                <p className="mt-0.5 text-xs text-[#8f8589]">
                  {format === "pdf" ? "1.4 MB" : "86 KB"} · aggregate figures
                  only
                </p>
              </div>
              <Button size="sm" className="rounded-full shrink-0">
                <Download className="h-4 w-4" aria-hidden />
                Download
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-medium tracking-wide text-[#8f8589] uppercase">
                Other states of this dialog
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-[#6b6165]">
                <li>Preparing: Progress bar · Cancel available</li>
                <li>Failed: Message and Try again</li>
                <li>Link expires: After 24 hours</li>
              </ul>
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

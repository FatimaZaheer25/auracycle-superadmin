"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { AuditCategory, AuditEvent, AuditMeta } from "./types";
import { Button, PageHeader } from "@/components/ui";
import { AuditBanner } from "./audit-banner";
import { AuditEventsTable } from "./audit-events-table";
import { AuditFilters } from "./audit-filters";

type AuditLogViewProps = {
  meta: AuditMeta;
  filters: { id: AuditCategory; label: string }[];
  events: AuditEvent[];
};

export function AuditLogView({ meta, filters, events }: AuditLogViewProps) {
  const [filter, setFilter] = useState<AuditCategory>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => e.category === filter);
  }, [events, filter]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Audit Log"
        description={meta.subtitle}
        actions={
          <Button size="sm" className="rounded-full">
            <Download className="h-4 w-4" aria-hidden />
            Export log
          </Button>
        }
      />

      <AuditBanner message={meta.banner} />

      <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-[#221c1e]">Events</h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">{meta.dateLabel}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" aria-hidden />
            Tamper-evident
          </span>
        </div>

        <AuditFilters items={filters} active={filter} onSelect={setFilter} />

        <div className="mt-4">
          <AuditEventsTable events={filtered} />
        </div>
      </section>
    </div>
  );
}

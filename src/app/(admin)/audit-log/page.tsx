import { AuditLogView } from "@/components/features/audit-log";
import { auditEvents, auditFilters, auditMeta } from "@/mock/audit-log";

export default function AuditLogPage() {
  return (
    <AuditLogView
      meta={auditMeta}
      filters={auditFilters}
      events={auditEvents}
    />
  );
}

import type {
  ConsentType,
  DataRequestQueueItem,
  DataRequestRule,
  DataRequestStat,
  DeletionProgressStep,
  LegalRequestDetail,
  PrivacyMeta,
  RetentionRow,
} from "./types";

export const privacyMeta: PrivacyMeta = {
  subtitle: "Consent settings, data requests and retention · FR-PRV · FR-ADM-04",
  banner:
    "No third-party sharing is active. No identifiable health data goes to advertising, marketing or analytics partners. Any change needs a separate opt-in and a compliance review first.",
  consentSubtitle: "Same wording users see in Sharing & consent",
  requestsSubtitle: "Privacy dashboard actions",
  retentionSubtitle: "Published retention periods · FR-PRV-06",
};

export const consentTypes: ConsentType[] = [
  {
    id: "cycle-logs",
    name: "Cycle and symptom logs",
    userSees: "Stored encrypted, never sold",
    defaultValue: "private",
    optedIn: "—",
    changesNeed: "not-changeable",
  },
  {
    id: "pregnancy",
    name: "Pregnancy data",
    userSees: "Tracked if enabled in cycle profile",
    defaultValue: "private",
    optedIn: "—",
    changesNeed: "not-changeable",
  },
  {
    id: "basic-events",
    name: "Basic app events",
    userSees: "No health content, anonymous",
    defaultValue: "on",
    optedIn: "100%",
    changesNeed: "security-review",
  },
  {
    id: "analytics",
    name: "Product analytics",
    userSees: "Anonymous events with no health content",
    defaultValue: "opt-in",
    optedIn: "61%",
    changesNeed: "security-review",
  },
  {
    id: "partner-offers",
    name: "Partner offers",
    userSees: "Share data with a named third party",
    defaultValue: "off",
    optedIn: "0%",
    changesNeed: "compliance-review",
  },
  {
    id: "partner-sharing",
    name: "Partner sharing",
    userSees: "Share selected items with your partner",
    defaultValue: "off",
    optedIn: "9.4%",
    changesNeed: "user-only",
  },
];

export const dataRequestStats: DataRequestStat[] = [
  {
    id: "exports",
    label: "Exports",
    value: "3,842",
    hint: "avg 4 min",
    valueTone: "teal",
  },
  {
    id: "deletions",
    label: "Deletions",
    value: "1,106",
    hint: "all confirmed",
    valueTone: "coral",
  },
  {
    id: "legal",
    label: "Legal requests",
    value: "1",
    hint: "in review",
    valueTone: "lavender",
  },
];

export const dataRequestRules: DataRequestRule[] = [
  {
    id: "sla",
    label: "Deletion completed within SLA",
    value: "100%",
    tone: "pill-teal",
  },
  {
    id: "backups",
    label: "Backups and consented recipients",
    value: "Included",
    tone: "text",
  },
  {
    id: "confirm",
    label: "Confirmation sent to user",
    value: "Always",
    tone: "pill-teal-soft",
  },
];

export const retentionRows: RetentionRow[] = [
  {
    id: "cycle",
    label: "Cycle and period records",
    value: "Until user deletes",
  },
  {
    id: "account",
    label: "Account and device info",
    value: "90 days after deletion",
  },
  {
    id: "crash",
    label: "Crash reports · scrubbed",
    value: "90 days",
  },
  {
    id: "analytics",
    label: "Analytics events · no health data",
    value: "14 months",
  },
  {
    id: "sdk",
    label: "SDK scrub test · last release",
    value: "Passed",
    status: "passed",
  },
  {
    id: "iso",
    label: "ISO 27001 / 27701",
    value: "Certified",
    status: "certified",
  },
];

export const dataRequestsPageMeta = {
  subtitle: "Exports and deletions with timers · FR-PRV-04 · FR-EXP-02",
};

export const dataRequestQueueKpis = [
  {
    id: "open",
    label: "Open requests",
    value: "7",
    hint: "4 deletions · 3 exports",
    icon: "file" as const,
  },
  {
    id: "deletions",
    label: "Deletions in progress",
    value: "3",
    hint: "Backups and recipients included",
    icon: "trash" as const,
  },
  {
    id: "median",
    label: "Median completion",
    value: "2.1 days",
    hint: "Within the deletion SLA",
    icon: "clock" as const,
    hintTone: "ok" as const,
  },
  {
    id: "sla",
    label: "Past the SLA",
    value: "0",
    hint: "Every deletion confirmed",
    icon: "check" as const,
    hintTone: "ok" as const,
  },
];

export const dataRequestQueue: DataRequestQueueItem[] = [
  {
    id: "DR-3322",
    personId: "USR-6D41-C8B7",
    type: "Deletion",
    received: "Nov 17",
    sla: "Day 2 of 30",
    backups: "2 of 3 cleared",
    backupsTone: "warn",
    thirdParties: "None consented",
    status: "In progress",
  },
  {
    id: "DR-3321",
    personId: "ANON-C219E4",
    type: "Deletion",
    received: "Nov 16",
    sla: "Day 3 of 30",
    backups: "3 of 3 cleared",
    backupsTone: "ok",
    thirdParties: "None consented",
    status: "Confirm to person",
  },
  {
    id: "DR-3320",
    personId: "USR-4F82-91C3",
    type: "Export",
    received: "Nov 18",
    sla: "Day 1 of 7",
    backups: "—",
    backupsTone: "muted",
    thirdParties: "—",
    status: "File ready",
  },
  {
    id: "DR-3319",
    personId: "USR-91B2-0D4E",
    type: "Export",
    received: "Nov 15",
    sla: "Day 4 of 7",
    backups: "—",
    backupsTone: "muted",
    thirdParties: "—",
    status: "Generating",
  },
  {
    id: "DR-3317",
    personId: "USR-55D8-E310",
    type: "Deletion",
    received: "Nov 12",
    sla: "Day 7 of 30",
    backups: "3 of 3 cleared",
    backupsTone: "ok",
    thirdParties: "1 recipient notified",
    status: "Complete",
  },
];

export const deletionProgressById: Record<string, DeletionProgressStep[]> = {
  "DR-3322": [
    {
      id: "account",
      label: "Account data removed",
      detail: "Done · Nov 17",
      state: "done",
    },
    {
      id: "backups",
      label: "Backups cleared",
      detail: "2 of 3 · est. Nov 19",
      state: "pending",
    },
    {
      id: "third",
      label: "Consented third parties asked to delete",
      detail: "None consented",
      state: "done",
    },
    {
      id: "confirm",
      label: "Confirmation sent to person",
      detail: "Waiting for backups",
      state: "pending",
    },
  ],
};

export const legalRequestLr014: LegalRequestDetail = {
  id: "LR-2026-014",
  title: "Legal data-access request",
  statusBadge: "In legal review",
  steps: [
    { id: "intake", label: "Intake", state: "done" },
    { id: "review", label: "Legal review", state: "current" },
    { id: "decision", label: "Decision and response", state: "upcoming" },
  ],
  details: [
    { label: "Received", value: "Nov 19, 2026" },
    { label: "Source", value: "Government agency · US state" },
    { label: "Legal basis cited", value: "Subpoena" },
    { label: "Scope requested", value: "Reproductive health data for 1 account" },
    { label: "Account", value: "USR-••••-91C3 · Standard" },
    { label: "Response due", value: "Dec 3, 2026" },
    { label: "Handled by", value: "Data Protection Officer" },
  ],
  discloseRows: [
    {
      data: "Email",
      held: "Yes",
      note: "Only identifying field",
    },
    {
      data: "Cycle and symptom logs",
      held: "Yes",
      note: "Field-level encrypted",
    },
    {
      data: "Third-party sharing records",
      held: "None",
      note: "No data was shared",
    },
    {
      data: "Backups",
      held: "Yes",
      note: "Deleted with the account",
    },
    {
      data: "Anonymous Mode data",
      held: "Not this account",
      note: "No identifiers linked",
    },
  ],
  notes: [
    {
      id: "n1",
      author: "Outside counsel",
      when: "Today",
      body: "Scope looks broader than the statute allows. Recommend narrowing before any disclosure.",
    },
  ],
  draftNote:
    "Asked counsel to confirm whether the account holder must be notified.",
  decisionOptions: [
    { id: "full", label: "Comply in full" },
    { id: "part", label: "Comply in part" },
    { id: "reject", label: "Challenge or reject" },
  ],
  selectedDecision: "part",
  reasonDefault:
    "Disclose only the account email and dates the account was created.",
  daysUsed: "4 of 14",
  daysPercent: 29,
  policyVersion: "v2.1",
  outcomeLog: "Audit Log",
  personNotified: "Per policy",
};

export function getLegalRequest(id: string): LegalRequestDetail | null {
  if (id === legalRequestLr014.id) return legalRequestLr014;
  return null;
}

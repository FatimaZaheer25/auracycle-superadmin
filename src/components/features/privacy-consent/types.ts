export type ConsentDefault = "private" | "on" | "opt-in" | "off";

export type ConsentChangeNeed =
  | "not-changeable"
  | "security-review"
  | "compliance-review"
  | "user-only";

export type ConsentType = {
  id: string;
  name: string;
  userSees: string;
  defaultValue: ConsentDefault;
  optedIn: string;
  changesNeed: ConsentChangeNeed;
};

export type DataRequestStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  valueTone: "teal" | "coral" | "lavender";
};

export type DataRequestRule = {
  id: string;
  label: string;
  value: string;
  tone: "pill-teal" | "text" | "pill-teal-soft";
};

export type RetentionRow = {
  id: string;
  label: string;
  value: string;
  status?: "passed" | "certified";
};

export type PrivacyMeta = {
  subtitle: string;
  banner: string;
  consentSubtitle: string;
  requestsSubtitle: string;
  retentionSubtitle: string;
};

export type DataRequestFilter =
  | "all"
  | "exports"
  | "deletions"
  | "needs-attention";

export type DataRequestQueueStatus =
  | "In progress"
  | "Confirm to person"
  | "File ready"
  | "Generating"
  | "Complete";

export type DataRequestQueueItem = {
  id: string;
  personId: string;
  type: "Deletion" | "Export";
  received: string;
  sla: string;
  backups: string;
  backupsTone?: "ok" | "warn" | "muted";
  thirdParties: string;
  status: DataRequestQueueStatus;
};

export type DeletionProgressStep = {
  id: string;
  label: string;
  detail: string;
  state: "done" | "pending";
};

export type LegalRequestDetail = {
  id: string;
  title: string;
  statusBadge: string;
  steps: { id: string; label: string; state: "done" | "current" | "upcoming" }[];
  details: { label: string; value: string }[];
  discloseRows: { data: string; held: string; note: string }[];
  notes: { id: string; author: string; when: string; body: string }[];
  draftNote: string;
  decisionOptions: { id: string; label: string }[];
  selectedDecision: string;
  reasonDefault: string;
  daysUsed: string;
  daysPercent: number;
  policyVersion: string;
  outcomeLog: string;
  personNotified: string;
};

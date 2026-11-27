import type {
  ContinuityKpi,
  ContinuitySlaAlert,
  FoundAccountSummary,
  IdentifierShare,
  OutcomeStat,
  RecoveryCase,
  RecoveryCaseDetail,
} from "@/types/account-continuity";

export const continuityKpis: ContinuityKpi[] = [
  {
    id: "incident",
    label: "Incident rate · 30d",
    value: "0.006%",
    hint: "3 manual recoveries / 48,920 new-device sign-ins",
    hintTone: "warn",
    icon: "refresh",
  },
  {
    id: "open",
    label: "Open recovery cases",
    value: "3",
    hint: "Oldest 22h · due in 2h",
    hintTone: "warn",
    icon: "clock",
  },
  {
    id: "lag",
    label: "Sync lag p95",
    value: "4.2 min",
    hint: "Within the 15-minute RPO target",
    hintTone: "ok",
    icon: "shield",
  },
  {
    id: "anon-key",
    label: "Anonymous with recovery key",
    value: "71%",
    hint: "200,958 of 283,039 · 29% have not saved a key",
    hintTone: "warn",
    icon: "key",
  },
];

export const continuitySlaAlert: ContinuitySlaAlert = {
  caseId: "RC-1042",
  message:
    "RC-1042 is due in 2 hours. Reassign or restore it now to stay within the 24-hour target. The assignee and team lead were notified.",
};

/** Real Figma recovery cases */
export const recoveryCases: RecoveryCase[] = [
  {
    id: "RC-1042",
    userId: "USR-0B6F-72A9",
    screen: "Saved data not found",
    identifier: "Email · In-app account ID",
    status: "Due in 2h",
    ageSla: "22h · 2h left",
    assignee: "Support Agent",
  },
  {
    id: "RC-1041",
    userId: "ANON-C219E4",
    screen: "Restore with recovery key",
    identifier: "Prior device backup reference",
    status: "In progress",
    ageSla: "3h · 21h left",
    assignee: "Support Agent",
  },
  {
    id: "RC-1040",
    userId: "USR-55D8-E310",
    screen: "Other sign-in methods",
    identifier: "Purchase receipt",
    status: "Awaiting user",
    ageSla: "5h · 19h left",
    assignee: "Support Agent",
  },
  {
    id: "RC-1039",
    userId: "USR-91B2-0D4E",
    screen: "History restored",
    identifier: "Email",
    status: "Resolved",
    ageSla: "1h 12m",
    assignee: "Support Agent",
  },
  {
    id: "RC-1038",
    userId: "ANON-7F3A91",
    screen: "Link data to email account",
    identifier: "In-app account ID",
    status: "Resolved",
    ageSla: "2h 05m",
    assignee: "Support Agent",
  },
];

export const outcomeStats: OutcomeStat[] = [
  {
    label: "Other sign-in methods",
    count: 197,
    percent: "92.9%",
    tone: "teal",
  },
  { label: "Recovery key", count: 12, percent: "5.7%", tone: "purple" },
  { label: "Escalated", count: 3, percent: "1.4%", tone: "danger" },
];

export const outcomesMeta = {
  subtitle: "212 times shown in 30 days · FR-CNT-03",
  selfServed: "98.6% self-served",
  recovered: 209,
  total: 212,
};

export const identifierShares: IdentifierShare[] = [
  { label: "Email", percent: 48, color: "#8b3a54" },
  { label: "In-app account ID", percent: 24, color: "#1f7a72" },
  { label: "Purchase receipt", percent: 16, color: "#6d28d9" },
  { label: "Prior device backup reference", percent: 12, color: "#c4a035" },
];

export const identifiersMeta = {
  subtitle: "Multiple identifiers supported · FR-CNT-04",
};

export const foundAccountDemo: FoundAccountSummary = {
  id: "USR-0B6F-72A9",
  accountType: "Standard",
  devices: 2,
  lastActive: "2 days ago",
  signInMethod: "Email + password",
  lastSync: "2 days ago",
  recoveryKey: "Not applicable",
  cycleHistoryMasked: true,
};

export const newCaseDefaults = {
  emailQuery: "a••••@mail.com",
  issueType: "Saved data not found",
  priority: "Urgent" as const,
  details:
    "Signed in on a new phone and the cycle history is empty. Self-service 'Other sign-in methods' did not find another account.",
  assignee: "Support Agent · next available",
  issueTypes: [
    "Saved data not found",
    "Restore with recovery key",
    "Other sign-in methods",
    "Link data to email account",
  ],
  assignees: [
    "Support Agent · next available",
    "Marc Dubois · Support Agent",
    "Unassigned",
  ],
};

export const recoveryCaseDetail: RecoveryCaseDetail = {
  id: "RC-1042",
  title: "Saved data not found",
  status: "Open",
  priority: "Urgent",
  userId: "USR-0B6F-72A9",
  openedAgo: "Opened 6h ago",
  slaLeft: "18h left on the 24h target",
  steps: [
    { id: "reported", label: "Reported", state: "done" },
    { id: "located", label: "Account located", state: "current" },
    { id: "restore", label: "Restore", state: "upcoming" },
    { id: "verified", label: "Verified by person", state: "upcoming" },
    { id: "resolved", label: "Resolved", state: "upcoming" },
  ],
  identifiersTried: [
    {
      label: "Email",
      value: "a••••@mail.com",
      result: "Found USR-0B6F-72A9",
      resultTone: "ok",
    },
    {
      label: "In-app account ID",
      value: "Not provided",
      result: "Skipped",
      resultTone: "skip",
    },
    {
      label: "Purchase receipt",
      value: "GPA.3321-••••",
      result: "Matches same account",
      resultTone: "ok",
    },
    {
      label: "Prior device backup ref",
      value: "BK-2026-10-12",
      result: "Backup found",
      resultTone: "ok",
    },
  ],
  restorePoint: "Oct 12, 2026 · 2:14 PM · 3 cycles, 16 BBT days",
  restoreOptions: [
    { id: "cycles", label: "Cycles and period logs", checked: true },
    { id: "symptoms", label: "Symptoms and mood", checked: true },
    { id: "bbt", label: "BBT readings", checked: true },
    { id: "pregnancy", label: "Pregnancy data", checked: true },
    { id: "notes", label: "Day notes", checked: true },
  ],
  notes: [
    {
      id: "n1",
      author: "Marc Dubois",
      when: "6h ago",
      body: "Person signed in on a new phone. Self-service 'Other sign-in methods' found nothing.",
    },
    {
      id: "n2",
      author: "System",
      when: "6h ago",
      body: "Case opened from the in-app recovery flow. No data loss reported on the server.",
    },
  ],
  draftNote:
    "Located account through the purchase receipt. Backup from Oct 12 is complete.",
  assignee: "Marc Dubois · Support Agent",
  releaseBlocking: false,
  releaseBlockingToday: "Today: Off · data located",
  releaseBlockingIfOn: "If turned on: Pauses releases",
  resolution: {
    target: "24 hours · NFR-REL-05",
    progressLabel: "6h of 24h",
    progressPercent: 25,
    due: "Nov 20, 3:40 PM",
    state: "On track",
  },
  account: foundAccountDemo,
};

const caseDetailsById: Record<string, RecoveryCaseDetail> = {
  "RC-1042": recoveryCaseDetail,
};

export function getRecoveryCaseDetail(
  caseId: string,
): RecoveryCaseDetail | null {
  if (caseDetailsById[caseId]) return caseDetailsById[caseId];

  const listCase = recoveryCases.find((c) => c.id === caseId);
  if (!listCase) return null;

  return {
    ...recoveryCaseDetail,
    id: listCase.id,
    title: listCase.screen,
    status: listCase.status,
    userId: listCase.userId,
    assignee: listCase.assignee,
    account: {
      ...foundAccountDemo,
      id: listCase.userId,
    },
  };
}

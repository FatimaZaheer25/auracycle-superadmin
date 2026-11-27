export type RecoveryStatus =
  | "Open"
  | "Due in 2h"
  | "In progress"
  | "Awaiting user"
  | "Resolved";

export type ContinuitySlaAlert = {
  caseId: string;
  message: string;
};

export type ContinuityKpi = {
  id: string;
  label: string;
  value: string;
  hint: string;
  hintTone: "warn" | "ok";
  icon: "refresh" | "clock" | "shield" | "key";
};

export type RecoveryCase = {
  id: string;
  userId: string;
  userLabel?: string;
  screen: string;
  identifier: string;
  status: RecoveryStatus;
  ageSla: string;
  assignee: string;
};

export type OutcomeStat = {
  label: string;
  count: number;
  percent: string;
  tone: "teal" | "purple" | "danger";
};

export type IdentifierShare = {
  label: string;
  percent: number;
  color: string;
};

export type IdentifierKind =
  | "email"
  | "accountId"
  | "receipt"
  | "backup";

export type FoundAccountSummary = {
  id: string;
  accountType: string;
  devices: number;
  lastActive: string;
  signInMethod: string;
  lastSync: string;
  recoveryKey: string;
  cycleHistoryMasked: boolean;
};

export type CaseWorkflowStep = {
  id: string;
  label: string;
  state: "done" | "current" | "upcoming";
};

export type IdentifierTried = {
  label: string;
  value: string;
  result: string;
  resultTone: "ok" | "skip";
};

export type CaseNote = {
  id: string;
  author: string;
  when: string;
  body: string;
};

export type RecoveryCaseDetail = {
  id: string;
  title: string;
  status: RecoveryStatus;
  priority: "Normal" | "Urgent";
  userId: string;
  openedAgo: string;
  slaLeft: string;
  steps: CaseWorkflowStep[];
  identifiersTried: IdentifierTried[];
  restorePoint: string;
  restoreOptions: { id: string; label: string; checked: boolean }[];
  notes: CaseNote[];
  draftNote: string;
  assignee: string;
  releaseBlocking: boolean;
  releaseBlockingToday: string;
  releaseBlockingIfOn: string;
  resolution: {
    target: string;
    progressLabel: string;
    progressPercent: number;
    due: string;
    state: string;
  };
  account: FoundAccountSummary;
};

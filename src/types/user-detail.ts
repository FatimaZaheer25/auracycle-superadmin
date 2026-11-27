import type { AccountType, PlanType, SyncTone } from "./users";

export type UserDetailTab =
  | "overview"
  | "cycle-logs"
  | "pregnancy"
  | "perimenopause"
  | "privacy"
  | "subscription"
  | "devices"
  | "partner";

export type DetailRow = {
  label: string;
  value: string;
  badge?: string;
  badgeVariant?: "teal" | "coral" | "accent" | "success" | "peach" | "default";
  masked?: boolean;
  status?: "on" | "off" | "private";
};

export type CycleHistoryRow = {
  id: string;
  cycle: string;
  length: string;
  daysLogged: string;
  symptomsLogged: number;
  sync: string;
};

export type CycleLogsTab = {
  kpis: { id: string; label: string; value: string; hint: string; icon: "refresh" | "calendar" | "trend" | "check" }[];
  history: CycleHistoryRow[];
  bbt: {
    unit: string;
    loggedDays: string;
    thermometer: string;
    latestMasked: string;
    latestRevealed: string;
  };
  notes: {
    dayNotes: string;
    reminders: { label: string; on: boolean }[];
  };
};

export type PregnancyTab = {
  statusBadge: string;
  rows: DetailRow[];
  alwaysFree: string[];
  premiumExtras: string[];
  premiumNote: string;
  footer: string;
};

export type PerimenopauseTab = {
  statusBadge: string;
  rows: { label: string; value: string; badge?: string; badgeTone?: "warn" | "teal" | "muted" }[];
  symptoms: string[];
  scoreNote: string;
};

export type PrivacyTab = {
  consents: DetailRow[];
  dataRequests: DetailRow[];
  history: { when: string; change: string; by: string; source: string }[];
};

export type SubscriptionTab = {
  planTitle: string;
  status: string;
  rows: DetailRow[];
  unlocked: string[];
  billing: {
    date: string;
    event: string;
    amount: string;
    channel: string;
    status: "paid" | "restored";
  }[];
  footer: string;
};

export type DevicesTab = {
  kpis: { id: string; label: string; value: string; hint: string; hintTone?: "ok" | "muted"; icon: "check" | "phone" | "clock" | "shield" }[];
  devices: {
    device: string;
    platform: string;
    lastSynced: string;
    status: string;
    statusTone: "ok" | "danger";
    firstSignedIn: string;
  }[];
  recovery: DetailRow[];
  lastRestore: { text: string; badge: string };
};

export type PartnerTab = {
  statusBadge: string;
  subtitle: string;
  rows: DetailRow[];
  canShare: string[];
  rules: { label: string; value: string; badge?: boolean }[];
  footer: string;
};

export type UserDetail = {
  id: string;
  displayName: string;
  initial: string;
  accountType: AccountType;
  plan: PlanType;
  syncStatus: string;
  syncTone: SyncTone;
  region: string;
  joined: string;
  lifeStage: string;
  signInMethod: string;
  units: string;
  cycle: {
    phase: string;
    summary: string;
    nextPeriod: string;
    confidence: string;
    bbtMasked: boolean;
  };
  dailyLog: {
    date: string;
    rows: DetailRow[];
  };
  reminders: { label: string; on: boolean }[];
  subscription: {
    status: string;
    plan: string;
    price: string;
    renewsOn: string;
    billedVia: string;
  };
  privacy: DetailRow[];
  devices: {
    syncStatus: string;
    phone: string;
    watch: string;
    backup: string;
    recovery: string;
  };
  cycleLogs: CycleLogsTab;
  pregnancy: PregnancyTab;
  perimenopause: PerimenopauseTab;
  privacyTab: PrivacyTab;
  subscriptionTab: SubscriptionTab;
  devicesTab: DevicesTab;
  partnerTab: PartnerTab;
};

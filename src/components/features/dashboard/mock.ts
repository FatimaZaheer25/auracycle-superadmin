import type {
  ActiveUsersPoint,
  AttentionItem,
  ContinuityStats,
  DashboardKpi,
  NamedShare,
  SubscriptionStats,
} from "./types";

export const dashboardMeta = {
  subtitle: "Last 30 days · Oct 21 – Nov 19, 2026 · FR-ADM-01",
};

export const dashboardKpis: DashboardKpi[] = [
  {
    id: "stickiness",
    label: "DAU / MAU stickiness",
    value: "32.1%",
    detail: "412,380 DAU · 1,286,540 MAU",
    detailTone: "teal",
    icon: "users",
  },
  {
    id: "conversion",
    label: "Subscription conversion",
    value: "6.8%",
    detail: "87,800 Premium of 1,286,540 MAU",
    detailTone: "teal",
    icon: "card",
  },
  {
    id: "continuity",
    label: "Account-continuity incident rate",
    value: "0.006%",
    detail: "3 manual recoveries / 48,920 new-device sign-ins",
    detailTone: "warn",
    icon: "refresh",
  },
  {
    id: "privacy",
    label: "Privacy dashboard usage",
    value: "18.4%",
    detail: "of MAU opened the Privacy dashboard",
    detailTone: "muted",
    icon: "shield",
  },
  {
    id: "content",
    label: "Content-rating accuracy",
    value: "98.7%",
    detail: "Tagged content matches the store rating · next review Dec 1",
    detailTone: "teal",
    icon: "shield",
  },
  {
    id: "data",
    label: "Data requests",
    value: "7 open",
    detail: "Exports 3 · Deletions 4 · Legal 1",
    detailTone: "warn",
    icon: "file",
  },
  {
    id: "legal",
    label: "Legal requests in review",
    value: "1",
    detail: "LR-2026-014 · due Dec 3",
    detailTone: "lavender",
    icon: "scale",
  },
  {
    id: "consent",
    label: "Consent changes waiting",
    value: "2",
    detail: "Need compliance review before they apply",
    detailTone: "warn",
    icon: "key",
  },
];

export const activeUsersSeries: ActiveUsersPoint[] = [
  { label: "Oct 21", dau: 380, mau: 1180 },
  { label: "Oct 28", dau: 390, mau: 1205 },
  { label: "Nov 4", dau: 398, mau: 1230 },
  { label: "Nov 11", dau: 405, mau: 1255 },
  { label: "Nov 19", dau: 412, mau: 1286 },
];

export const lifeStageShares: NamedShare[] = [
  {
    name: "Track my cycle",
    percent: 58,
    count: "746,193",
    color: "#b24a68",
  },
  {
    name: "Trying to conceive",
    percent: 17,
    count: "218,712",
    color: "#0d6b64",
  },
  {
    name: "I'm pregnant",
    percent: 15,
    count: "192,981",
    color: "#5c4d84",
  },
  {
    name: "Perimenopause",
    percent: 10,
    count: "128,654",
    color: "#8a5f16",
  },
];

export const accountTypeShares: NamedShare[] = [
  {
    name: "Standard account",
    percent: 78,
    count: "1,003,501",
    color: "#0d6b64",
  },
  {
    name: "Anonymous Mode",
    percent: 22,
    count: "283,039",
    color: "#5c4d84",
  },
];

export const continuityStats: ContinuityStats = {
  newDeviceSignIns: "48,920",
  newDeviceHint: "last 30 days",
  restoredAutomatically: "48,917",
  restoredHint: "99.994%",
  manualRecovery: "3",
  manualHint: "oldest open 6h",
  syncLagLabel: "Sync lag p95 · 4.2 min",
  syncLagTarget: "RPO target 15 min",
  syncLagPercent: 28,
};

export const subscriptionStats: SubscriptionStats = {
  mrr: "$334.8k",
  activePremium: "87,800",
  activeHint: "6.8% of MAU",
  annual: "62,310",
  annualHint: "$39.99 / year",
  monthly: "25,490",
  monthlyHint: "$4.99 / month",
  annualShare: 71,
};

export const attentionItems: AttentionItem[] = [
  {
    id: "att-1",
    title: "3 account-recovery cases open",
    detail: "Oldest case 6h old · SLA 24h · Support Agent",
    category: "Account Continuity",
    href: "/account-continuity",
    tone: "warn",
  },
  {
    id: "att-2",
    title: "14 community reports pending",
    detail: "Posts reported via “Report post” · Trust & Safety Moderator",
    category: "Community",
    href: "/community",
    tone: "coral",
  },
  {
    id: "att-3",
    title: "1 legal data-access request in review",
    detail: "Documented policy applies · Data Protection Officer",
    category: "Privacy & Consent",
    href: "/privacy-consent",
    tone: "lavender",
  },
];

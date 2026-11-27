export type DashboardKpi = {
  id: string;
  label: string;
  value: string;
  detail: string;
  detailTone?: "teal" | "warn" | "lavender" | "muted";
  icon: "users" | "card" | "refresh" | "shield" | "file" | "scale" | "key";
};

export type ActiveUsersPoint = {
  label: string;
  dau: number;
  mau: number;
};

export type NamedShare = {
  name: string;
  percent: number;
  count: string;
  color: string;
};

export type ContinuityStats = {
  newDeviceSignIns: string;
  newDeviceHint: string;
  restoredAutomatically: string;
  restoredHint: string;
  manualRecovery: string;
  manualHint: string;
  syncLagLabel: string;
  syncLagTarget: string;
  syncLagPercent: number;
};

export type SubscriptionStats = {
  mrr: string;
  activePremium: string;
  activeHint: string;
  annual: string;
  annualHint: string;
  monthly: string;
  monthlyHint: string;
  annualShare: number;
};

export type AttentionItem = {
  id: string;
  title: string;
  detail: string;
  category: string;
  href: string;
  tone: "warn" | "coral" | "lavender";
};

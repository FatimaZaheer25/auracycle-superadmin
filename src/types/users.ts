export type AccountType = "Standard" | "Anonymous";
export type PlanType = "Premium - Annual" | "Premium - Monthly" | "Free";
export type SyncTone = "ok" | "warn" | "error";

export type UserFilter =
  | "all"
  | "standard"
  | "anonymous"
  | "premium"
  | "free"
  | "pregnant"
  | "sync-issues";

export type AdminUser = {
  id: string;
  displayName: string;
  accountType: AccountType;
  lifeStage: string;
  plan: PlanType;
  syncStatus: string;
  syncTone: SyncTone;
  devices: number;
  lastActive: string;
  isPregnant?: boolean;
};

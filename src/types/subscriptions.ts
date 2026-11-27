export type PricingTier = {
  id: string;
  name: string;
  price: string;
  usersLabel: string;
  badge: string;
  selected?: boolean;
};

export type FeatureAccess = "yes" | "no";

export type FeatureMatrixRow = {
  feature: string;
  free: FeatureAccess;
  premium: FeatureAccess;
  notes: string;
  protected?: boolean;
};

export type GrandfatherStep = {
  id: string;
  title: string;
  detail: string;
  state: "done" | "active" | "pending";
};

export type ScheduledChangeStatus =
  | "Awaiting approval"
  | "Completed"
  | "Scheduled";

export type ScheduledChange = {
  id: string;
  feature: string;
  move: string;
  takesEffect: string;
  peopleKeptFree: string;
  status: ScheduledChangeStatus;
  actions: ("View" | "Edit" | "Cancel")[];
};

export type GrandfatheredPerson = {
  id: string;
  lastUsed: string;
  notified: string;
  freeAccessUntil: string;
  status: string;
};

export type PricingRegionRow = {
  region: string;
  currency: string;
  monthly: string;
  annual: string;
  store: string;
  storeTone: "ok" | "warn";
};

export type SafetyCheck = {
  id: string;
  title: string;
  detail: string;
  pass: boolean;
};

export type TimelineStep = {
  id: string;
  title: string;
  detail: string;
  state: "done" | "pending";
};

export type ScheduleFeatureOption = {
  id: string;
  label: string;
  blocked: boolean;
};

export type TierChangeApproval = {
  id: string;
  requester: string;
  requestedOn: string;
  feature: string;
  moves: string;
  takesEffect: string;
  grandfathering: string;
  peopleAffected: string;
  message: string;
  safetyChecks: SafetyCheck[];
};

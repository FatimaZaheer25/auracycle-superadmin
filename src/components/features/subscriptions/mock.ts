import type {
  FeatureMatrixRow,
  GrandfatherStep,
  GrandfatheredPerson,
  PricingRegionRow,
  PricingTier,
  ScheduleFeatureOption,
  ScheduledChange,
  SafetyCheck,
  TimelineStep,
  TierChangeApproval,
} from "./types";

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0 forever",
    usersLabel: "1,198,740 users",
    badge: "93.2% of MAU",
  },
  {
    id: "annual",
    name: "Premium · Annual",
    price: "$39.99 / year",
    usersLabel: "62,310 subscribers",
    badge: "Best value",
    selected: true,
  },
  {
    id: "monthly",
    name: "Premium · Monthly",
    price: "$4.99 / month",
    usersLabel: "25,490 subscribers",
    badge: "29% of Premium",
  },
];

export const featureMatrix: FeatureMatrixRow[] = [
  {
    feature: "Period & cycle tracking",
    free: "yes",
    premium: "yes",
    notes: "Always free",
  },
  {
    feature: "Symptom & mood tracking (74 symptoms)",
    free: "yes",
    premium: "yes",
    notes: "Always free",
  },
  {
    feature: "Ovulation & fertile-window prediction",
    free: "yes",
    premium: "yes",
    notes: "Always free",
  },
  {
    feature: "Temperature (BBT) chart",
    free: "yes",
    premium: "yes",
    notes: "Always free",
  },
  {
    feature: "Pregnancy baseline",
    free: "yes",
    premium: "yes",
    notes: "Protected — cannot be moved to Premium",
    protected: true,
  },
  {
    feature: "Doctor summary & export",
    free: "yes",
    premium: "yes",
    notes: "Always free",
  },
  {
    feature: "Daily tailored insights",
    free: "no",
    premium: "yes",
    notes: "Paywall screen: Premium insights",
  },
  {
    feature: "Expanded fertility insights · LH test logging",
    free: "no",
    premium: "yes",
    notes: "Paywall: Fertility insights",
  },
  {
    feature: "In-depth pregnancy guidance & expert videos",
    free: "no",
    premium: "yes",
    notes: "Premium weekly guide · Expert video",
  },
  {
    feature: "Educational Symptom Checker",
    free: "no",
    premium: "yes",
    notes: "Off in UK and EU regions",
  },
  {
    feature: "24/7 virtual Health Assistant",
    free: "no",
    premium: "yes",
    notes: "Paywall: Health Assistant",
  },
  {
    feature: "Partner sharing",
    free: "no",
    premium: "yes",
    notes: "Paywall: Partner Sharing",
  },
  {
    feature: "Perimenopause Score",
    free: "no",
    premium: "yes",
    notes: "Paywall: Perimenopause Score",
  },
];

export const grandfatherSteps: GrandfatherStep[] = [
  {
    id: "1",
    title: "Configured",
    detail: "Nov 19, 2026 · Super Admin",
    state: "done",
  },
  {
    id: "2",
    title: "Advance notice sent",
    detail: "2,140 users see “Free feature change notice”",
    state: "active",
  },
  {
    id: "3",
    title: "Grandfathered access",
    detail: "90 days · free access unchanged",
    state: "pending",
  },
  {
    id: "4",
    title: "Change takes effect",
    detail: "Feb 17, 2027",
    state: "pending",
  },
];

export const grandfatherMeta = {
  subtitle:
    "Users actively using the feature keep free access during the transition · FR-MON-02",
  footer:
    "Feature in this change: symptom-frequency trends by cycle phase (enhanced view). Basic logging is unaffected.",
};

export const scheduledChanges: ScheduledChange[] = [
  {
    id: "PC-204",
    feature: "Symptom-frequency trends (enhanced)",
    move: "Free → Premium",
    takesEffect: "Feb 17, 2027",
    peopleKeptFree: "2,140",
    status: "Awaiting approval",
    actions: ["View", "Edit", "Cancel"],
  },
  {
    id: "PC-198",
    feature: "Expanded fertility insights",
    move: "Premium only",
    takesEffect: "Done",
    peopleKeptFree: "—",
    status: "Completed",
    actions: ["View"],
  },
  {
    id: "PC-203",
    feature: "Doctor summary layout",
    move: "Free → Free",
    takesEffect: "Nov 30, 2026",
    peopleKeptFree: "890",
    status: "Scheduled",
    actions: ["View", "Edit", "Cancel"],
  },
];

export const grandfatheredPeople: GrandfatheredPerson[] = [
  {
    id: "USR-4F82-91C3",
    lastUsed: "Today",
    notified: "In app and email",
    freeAccessUntil: "Feb 17, 2027",
    status: "Protected",
  },
  {
    id: "ANON-7F3A91",
    lastUsed: "2 days ago",
    notified: "In app",
    freeAccessUntil: "Feb 17, 2027",
    status: "Protected",
  },
  {
    id: "USR-55D8-E310",
    lastUsed: "Yesterday",
    notified: "In app and email",
    freeAccessUntil: "Feb 17, 2027",
    status: "Protected",
  },
];

export const pricingRegions: PricingRegionRow[] = [
  {
    region: "United States",
    currency: "USD",
    monthly: "$4.99",
    annual: "$39.99",
    store: "In sync",
    storeTone: "ok",
  },
  {
    region: "United Kingdom",
    currency: "GBP",
    monthly: "£4.49",
    annual: "£34.99",
    store: "In sync",
    storeTone: "ok",
  },
  {
    region: "European Union",
    currency: "EUR",
    monthly: "€4.99",
    annual: "€39.99",
    store: "Update pending",
    storeTone: "warn",
  },
];

export const pricingDefaults = {
  regionLabel: "United States · USD",
  monthly: "$4.99",
  annual: "$39.99",
  takesEffect: "Jan 1, 2027 · new subscribers",
  previewPrice: "$39.99 / year",
  previewPlan: "Premium · Annual",
  previewFooter: "Renews each year · cancel any time",
};

export const scheduleFeatureOptions: ScheduleFeatureOption[] = [
  {
    id: "symptom-trends",
    label: "Symptom-frequency trends (enhanced view)",
    blocked: false,
  },
  {
    id: "pregnancy-baseline",
    label: "Current week and due-date estimate (pregnancy baseline)",
    blocked: true,
  },
  {
    id: "fertility",
    label: "Expanded fertility insights",
    blocked: false,
  },
];

export const scheduleSafetyPass: SafetyCheck[] = [
  {
    id: "baseline",
    title: "Not part of the protected pregnancy baseline",
    detail: "Current week, due date, weekly milestones stay free.",
    pass: true,
  },
  {
    id: "notice",
    title: "Advance notice scheduled",
    detail: "In-app and email, 90 days before.",
    pass: true,
  },
  {
    id: "users",
    title: "Active users identified automatically",
    detail: "2,140 people use it now.",
    pass: true,
  },
];

export const scheduleSafetyBlocked: SafetyCheck[] = [
  {
    id: "baseline",
    title: "Part of the protected pregnancy baseline",
    detail: "Current week, due date, weekly milestones stay free.",
    pass: false,
  },
  {
    id: "notice",
    title: "Advance notice scheduled",
    detail: "In-app and email, 90 days before.",
    pass: true,
  },
  {
    id: "users",
    title: "Active users identified automatically",
    detail: "2,140 people use it now.",
    pass: true,
  },
];

export const scheduleTimeline: TimelineStep[] = [
  {
    id: "1",
    title: "Change scheduled and approved",
    detail: "Nov 19, 2026",
    state: "done",
  },
  {
    id: "2",
    title: "2,140 people get a clear notice",
    detail: "Nov 19, 2026",
    state: "done",
  },
  {
    id: "3",
    title: "Free access continues unchanged",
    detail: "Nov 19 – Feb 17",
    state: "pending",
  },
  {
    id: "4",
    title: "Feature moves to Premium",
    detail: "Feb 17, 2027",
    state: "pending",
  },
];

export const scheduleMessageDefault =
  "Symptom-frequency trends by cycle phase are moving to Premium on Feb 17, 2027. You keep full access until then. Basic logging stays free.";

export const tierChangeApproval: TierChangeApproval = {
  id: "PC-204",
  requester: "Taylor Reed",
  requestedOn: "Nov 19",
  feature: "Symptom-frequency trends (enhanced view)",
  moves: "Free → Premium",
  takesEffect: "Feb 17, 2027",
  grandfathering: "90 days · system-enforced",
  peopleAffected: "2,140 · they use it now",
  message: scheduleMessageDefault,
  safetyChecks: [
    {
      id: "1",
      title: "Not in the protected pregnancy baseline",
      detail: "",
      pass: true,
    },
    {
      id: "2",
      title: "90-day notice scheduled",
      detail: "",
      pass: true,
    },
    {
      id: "3",
      title: "Requester is not the approver",
      detail: "",
      pass: true,
    },
  ],
};

export function getTierChangeApproval(
  changeId: string,
): TierChangeApproval | null {
  if (changeId === tierChangeApproval.id) return tierChangeApproval;
  if (scheduledChanges.some((c) => c.id === changeId)) {
    return { ...tierChangeApproval, id: changeId };
  }
  return null;
}

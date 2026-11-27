import type { UserDetail } from "@/types/user-detail";
import { mockUsers } from "./users";

const baseDetail: UserDetail = {
  id: "USR-4F82-91C3",
  displayName: "s••••a@mail.com",
  initial: "S",
  accountType: "Standard",
  plan: "Premium - Annual",
  syncStatus: "Synced just now",
  syncTone: "ok",
  region: "Region PK",
  joined: "Joined Mar 14, 2025",
  lifeStage: "Track my cycle",
  signInMethod: "Email + password",
  units: "°C · kg",
  cycle: {
    phase: "Luteal phase",
    summary: "Cycle 4 · Day 18 of ~28",
    nextPeriod: "Oct 24–26, 2026",
    confidence: "Improving",
    bbtMasked: true,
  },
  dailyLog: {
    date: "Oct 14",
    rows: [
      { label: "Symptoms logged", value: "3 selected", masked: true },
      { label: "Period flow", value: "Hidden", masked: true },
      { label: "Mood and notes", value: "Hidden", masked: true },
      { label: "Custom symptoms", value: "Hidden", masked: true },
    ],
  },
  reminders: [
    { label: "Period coming · 2 days before", on: true },
    { label: "Fertile window starts", on: false },
    { label: "Log your temperature · each morning", on: true },
    { label: "Daily log · 8:00 PM", on: true },
  ],
  subscription: {
    status: "Active",
    plan: "Annual plan",
    price: "$39.99 / year",
    renewsOn: "October 14, 2027",
    billedVia: "App store account",
  },
  privacy: [
    {
      label: "Cycle and symptom logs",
      value: "Private",
      status: "private",
    },
    { label: "Basic app events", value: "On", status: "on" },
    {
      label: "Third-party sharing",
      value: "No active sharing",
      status: "off",
    },
    { label: "Research opt-in", value: "Off", status: "off" },
  ],
  devices: {
    syncStatus: "Synced just now",
    phone: "Pixel 8 · Android 15",
    watch: "Pixel Watch 2 · Wear OS",
    backup: "Continuous · RPO 15 min",
    recovery: "Email-linked",
  },
  cycleLogs: {
    kpis: [
      {
        id: "cycles",
        label: "Cycles logged",
        value: "3",
        hint: "Current is Cycle 4 · Day 18",
        icon: "refresh",
      },
      {
        id: "average",
        label: "Average cycle",
        value: "28 days",
        hint: "Irregular cycles supported",
        icon: "calendar",
      },
      {
        id: "confidence",
        label: "Prediction confidence",
        value: "Improving",
        hint: "Based on 3 logged cycles",
        icon: "trend",
      },
      {
        id: "saved",
        label: "Saved to server",
        value: "100%",
        hint: "Last entry synced just now",
        icon: "check",
      },
    ],
    history: [
      {
        id: "c4",
        cycle: "Cycle 4 · current",
        length: "Day 18",
        daysLogged: "18 of 18",
        symptomsLogged: 11,
        sync: "Saved",
      },
      {
        id: "c3",
        cycle: "Cycle 3",
        length: "28 days",
        daysLogged: "27 of 28",
        symptomsLogged: 14,
        sync: "Saved",
      },
      {
        id: "c2",
        cycle: "Cycle 2",
        length: "29 days",
        daysLogged: "26 of 29",
        symptomsLogged: 12,
        sync: "Saved",
      },
      {
        id: "c1",
        cycle: "Cycle 1",
        length: "27 days",
        daysLogged: "24 of 27",
        symptomsLogged: 9,
        sync: "Saved",
      },
    ],
    bbt: {
      unit: "°C",
      loggedDays: "16 days",
      thermometer: "Not connected",
      latestMasked: "•••• °C",
      latestRevealed: "36.65 °C",
    },
    notes: {
      dayNotes: "4",
      reminders: [
        { label: "Period coming reminder", on: true },
        { label: "Fertile window reminder", on: false },
        { label: "Log your temperature", on: true },
      ],
    },
  },
  pregnancy: {
    statusBadge: "Not pregnant",
    rows: [
      { label: "Life-stage focus", value: "Track my cycle" },
      { label: "Pregnancy mode", value: "Off" },
      { label: "Pregnancy history", value: "None recorded" },
      {
        label: "Carry-forward of cycle history",
        value: "Ready if status changes · FR-PRG-01",
      },
    ],
    alwaysFree: [
      "Current week",
      "Due-date estimate",
      "Basic weekly milestones",
      "Weight, appointments and notes",
    ],
    premiumExtras: [
      "Detailed weekly symptom guidance",
      "Expert-reviewed video content",
      "Trimester checklists",
    ],
    premiumNote: "This person has Premium · FR-PRG-04",
    footer:
      "If pregnancy ends, the person chooses what happens to their data. The app offers control over history and future content, rather than a generic reset. · FR-PRG-06",
  },
  perimenopause: {
    statusBadge: "Not active",
    rows: [
      { label: "Life-stage focus", value: "Track my cycle" },
      { label: "Perimenopause symptoms logged", value: "None" },
      {
        label: "Perimenopause Score",
        value: "Premium · not enough data",
        badge: "Premium · not enough data",
        badgeTone: "warn",
      },
      {
        label: "Menopause Timeline",
        value: "Available",
        badge: "Available",
        badgeTone: "teal",
      },
    ],
    symptoms: ["Hot flashes", "Night sweats", "Sleep changes", "Mood changes"],
    scoreNote:
      "A monthly summary of how often and how strongly perimenopause symptoms are logged. It needs at least 2 months of entries.",
  },
  privacyTab: {
    consents: [
      { label: "Cycle and symptom logs", value: "Private", status: "private" },
      { label: "Basic app events", value: "On", status: "on" },
      { label: "Product analytics", value: "On", status: "on" },
      { label: "Partner offers", value: "Off", status: "off" },
      { label: "Partner sharing", value: "Off", status: "off" },
      {
        label: "Third-party sharing",
        value: "No active sharing",
        status: "on",
      },
    ],
    dataRequests: [
      { label: "Exports", value: "1 · Jun 2, 2026" },
      { label: "Deletion requests", value: "None" },
      { label: "Legal data-access requests", value: "None" },
      { label: "Retention", value: "Until the person deletes" },
    ],
    history: [
      {
        when: "Mar 14, 2025 · 9:02 AM",
        change: "Accepted terms and privacy notice",
        by: "Person",
        source: "Onboarding",
      },
      {
        when: "Mar 14, 2025 · 9:03 AM",
        change: "Turned on Basic app events",
        by: "Person",
        source: "Onboarding",
      },
      {
        when: "Apr 2, 2025 · 6:40 PM",
        change: "Turned on Product analytics",
        by: "Person",
        source: "Privacy dashboard",
      },
      {
        when: "Jun 2, 2026 · 8:15 AM",
        change: "Requested a data export",
        by: "Person",
        source: "Settings",
      },
    ],
  },
  subscriptionTab: {
    planTitle: "Premium · Annual",
    status: "Active",
    rows: [
      { label: "Price", value: "$39.99 / year" },
      { label: "Renews on", value: "October 14, 2027" },
      { label: "Billed through", value: "App store account" },
      { label: "Started", value: "Oct 14, 2026" },
    ],
    unlocked: [
      "Daily tailored insights",
      "Expanded fertility insights",
      "In-depth pregnancy features and videos",
      "Symptom Checker (not in UK/EU)",
      "24/7 Health Assistant",
      "Partner sharing",
    ],
    billing: [
      {
        date: "Oct 14, 2026",
        event: "Annual plan purchased",
        amount: "$39.99",
        channel: "App store",
        status: "paid",
      },
      {
        date: "Oct 14, 2026",
        event: "Restore purchases · new device",
        amount: "—",
        channel: "App store",
        status: "restored",
      },
    ],
    footer:
      "Not affected by any feature-tier change. If a free feature moves to Premium, this person keeps access during the 90-day grandfathering period. · FR-MON-02",
  },
  devicesTab: {
    kpis: [
      {
        id: "sync",
        label: "Sync status",
        value: "Synced",
        hint: "Just now · continuous",
        hintTone: "ok",
        icon: "check",
      },
      {
        id: "devices",
        label: "Devices",
        value: "2",
        hint: "Phone and watch",
        icon: "phone",
      },
      {
        id: "rpo",
        label: "Backup RPO",
        value: "15 min",
        hint: "Within target",
        hintTone: "ok",
        icon: "clock",
      },
      {
        id: "recovery",
        label: "Recovery cases",
        value: "0",
        hint: "Never needed manual recovery",
        hintTone: "ok",
        icon: "shield",
      },
    ],
    devices: [
      {
        device: "Pixel 8",
        platform: "Android 15",
        lastSynced: "Just now",
        status: "Synced just now",
        statusTone: "ok",
        firstSignedIn: "Oct 14, 2026",
      },
      {
        device: "Pixel Watch 2",
        platform: "Wear OS",
        lastSynced: "2 min ago",
        status: "Synced 2 min ago",
        statusTone: "ok",
        firstSignedIn: "Oct 14, 2026",
      },
      {
        device: "iPhone 12",
        platform: "iOS · signed out",
        lastSynced: "Oct 13, 2026",
        status: "Signed out",
        statusTone: "danger",
        firstSignedIn: "Mar 14, 2025",
      },
    ],
    recovery: [
      { label: "Sign-in method", value: "Email + password" },
      { label: "Recovery key", value: "Not applicable" },
      { label: "Self-service recovery", value: "Available" },
      {
        label: "Identifiers for support",
        value: "Email · account ID · receipt",
      },
    ],
    lastRestore: {
      text: "Oct 14, 2026 · full history appeared on the new phone with no support contact.",
      badge: "Automatic restore",
    },
  },
  partnerTab: {
    statusBadge: "Off",
    subtitle: "Premium feature · this person has not invited anyone.",
    rows: [
      { label: "Partners invited", value: "None" },
      { label: "Items shared", value: "None" },
      { label: "Last change", value: "Never turned on" },
      {
        label: "Partner write access",
        value: "Never allowed · FR-PTN-03",
      },
    ],
    canShare: [
      "Cycle phase and period dates",
      "Fertile window",
      "Pregnancy week and milestones",
    ],
    rules: [
      { label: "Revoke access", value: "Immediate, by the person" },
      { label: "Partner can edit logs", value: "Never", badge: true },
      { label: "Partner sees unshared data", value: "Never", badge: true },
    ],
    footer:
      "No admin action available. Partner access is controlled only by the person. Admins can see whether sharing is on, never what is shared.",
  },
};

const detailById: Record<string, UserDetail> = {
  "USR-4F82-91C3": baseDetail,
};

export function getUserDetail(userId: string): UserDetail | null {
  if (detailById[userId]) return detailById[userId];

  const listUser = mockUsers.find((u) => u.id === userId);
  if (!listUser) return null;

  const initial =
    listUser.displayName === "Anonymous user"
      ? "A"
      : listUser.displayName.charAt(0).toUpperCase();

  return {
    ...baseDetail,
    id: listUser.id,
    displayName: listUser.displayName,
    initial,
    accountType: listUser.accountType,
    plan: listUser.plan,
    syncStatus: listUser.syncStatus,
    syncTone: listUser.syncTone,
    lifeStage: listUser.lifeStage,
  };
}

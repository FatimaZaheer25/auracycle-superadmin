import type {
  ActiveSession,
  AlertPreference,
  ProfileDetails,
  ProfileMeta,
  SecurityInfo,
} from "./types";

export const profileMeta: ProfileMeta = {
  breadcrumb: "Account",
  subtitle: "Your details, security and sign-in activity",
};

export const profileDetails: ProfileDetails = {
  fullName: "Super Admin",
  email: "admin@auracycle.com",
  role: "Super Admin · assigned by Roles & Access",
  roleNote: "Role changes are made by another Super Admin.",
  timeZone: "Pakistan Standard Time (UTC+5)",
  initials: "SA",
};

export const securityInfo: SecurityInfo = {
  passwordChanged: "Changed 42 days ago",
  twoStep: "Authenticator app · On",
  recoveryCodes: "6 unused",
};

export const activeSessions: ActiveSession[] = [
  {
    id: "sess-1",
    device: "Chrome · Windows (This device)",
    location: "Rawalpindi",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "sess-2",
    device: "Safari · iPad",
    location: "Islamabad",
    lastActive: "2 days ago",
  },
];

export const alertPreferences: AlertPreference[] = [
  {
    id: "recovery-sla",
    label: "Recovery cases nearing the SLA",
    enabled: true,
  },
  {
    id: "legal",
    label: "Legal data-access requests",
    enabled: true,
  },
  {
    id: "content-signoff",
    label: "Content awaiting sign-off",
    enabled: true,
  },
  {
    id: "community",
    label: "Community reports",
    enabled: false,
  },
  {
    id: "data-sla",
    label: "Data requests nearing the SLA",
    enabled: true,
  },
];

export const timeZoneOptions = [
  "Pakistan Standard Time (UTC+5)",
  "UTC",
  "Eastern Time (UTC-5)",
  "Greenwich Mean Time (UTC+0)",
];

export const recoveryCodes = [
  { code: "a7k2-9xq4" },
  { code: "m3p8-d5wz" },
  { code: "h6c1-t9ke" },
  { code: "q2v7-j4ru" },
  { code: "x8n5-b3yf" },
  { code: "z1s4-l6gm" },
  { code: "d9e3-w7ta", used: true },
  { code: "k5r2-c8hp", used: true },
];

export const recoveryCodesMeta = {
  unusedCount: 6,
  totalCount: 8,
};

export const logoutAllSummary = "2 · Chrome on Windows, Safari on iPad";

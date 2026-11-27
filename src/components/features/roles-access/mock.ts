import type {
  AdminRole,
  PermissionRow,
  RolesAccessMeta,
} from "./types";

export const rolesAccessMeta: RolesAccessMeta = {
  subtitle: "Six roles with the least access each needs · FR-ADM-07 · NFR-SEC-08",
  bannerTitle: "MFA is required for every admin sign-in",
  bannerBody:
    "Only the Data Protection Officer can reveal raw health data, and each reveal is logged. Super Admin cannot see raw health data.",
  matrixSubtitle: "Limited = can propose, another role approves",
};

export const adminRoles: AdminRole[] = [
  { id: "super-admin", label: "Super Admin", members: 2 },
  { id: "clinical", label: "Clinical Content", members: 4 },
  { id: "data-protection", label: "Data Protection", members: 2 },
  { id: "trust-safety", label: "Trust & Safety", members: 12 },
  { id: "support", label: "Support Agent", members: 18 },
  { id: "analyst", label: "Analyst", members: 6 },
];

/** Invite modal copy matches Figma role descriptions */
export const inviteRoleOptions = [
  {
    id: "super-admin",
    label: "Super Admin",
    description: "Everything except raw health data.",
  },
  {
    id: "clinical",
    label: "Clinical Content Officer",
    description: "Clinical content and Symptom Checker.",
  },
  {
    id: "data-protection",
    label: "Data Protection Officer",
    description: "Consent, legal requests, masked data reveal.",
  },
  {
    id: "trust-safety",
    label: "Trust & Safety Moderator",
    description: "Community queue and tagging.",
  },
  {
    id: "support",
    label: "Support Agent",
    description: "Recovery cases and limited user view.",
  },
  {
    id: "analyst",
    label: "Analyst",
    description: "Dashboard and aggregate reports.",
  },
] as const;

export const permissionRows: PermissionRow[] = [
  {
    id: "members",
    label: "Members",
    kind: "members",
    cells: {
      "super-admin": 2,
      clinical: 4,
      "data-protection": 2,
      "trust-safety": 12,
      support: 18,
      analyst: 6,
    },
  },
  {
    id: "dashboard",
    label: "Dashboard KPIs",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "yes",
      "data-protection": "yes",
      "trust-safety": "no",
      support: "no",
      analyst: "yes",
    },
  },
  {
    id: "users",
    label: "Users list (masked)",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "no",
      "data-protection": "yes",
      "trust-safety": "no",
      support: "yes",
      analyst: "no",
    },
  },
  {
    id: "reveal",
    label: "Reveal raw health data",
    kind: "permission",
    cells: {
      "super-admin": "no",
      clinical: "no",
      "data-protection": "yes",
      "trust-safety": "no",
      support: "no",
      analyst: "no",
    },
  },
  {
    id: "recovery",
    label: "Account recovery tools",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "no",
      "data-protection": "yes",
      "trust-safety": "no",
      support: "yes",
      analyst: "no",
    },
  },
  {
    id: "clinical-content",
    label: "Clinical content and Symptom Checker",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "yes",
      "data-protection": "no",
      "trust-safety": "no",
      support: "no",
      analyst: "no",
    },
  },
  {
    id: "community",
    label: "Community moderation",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "no",
      "data-protection": "no",
      "trust-safety": "yes",
      support: "no",
      analyst: "no",
    },
  },
  {
    id: "consent",
    label: "Consent settings and legal requests",
    kind: "permission",
    cells: {
      "super-admin": "limited",
      clinical: "no",
      "data-protection": "yes",
      "trust-safety": "no",
      support: "no",
      analyst: "no",
    },
  },
  {
    id: "subscriptions",
    label: "Subscription and tier catalogue",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "no",
      "data-protection": "no",
      "trust-safety": "no",
      support: "no",
      analyst: "no",
    },
  },
  {
    id: "audit",
    label: "Audit log",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "no",
      "data-protection": "yes",
      "trust-safety": "no",
      support: "no",
      analyst: "no",
    },
  },
  {
    id: "roles",
    label: "Roles and access",
    kind: "permission",
    cells: {
      "super-admin": "yes",
      clinical: "no",
      "data-protection": "no",
      "trust-safety": "no",
      support: "no",
      analyst: "no",
    },
  },
];

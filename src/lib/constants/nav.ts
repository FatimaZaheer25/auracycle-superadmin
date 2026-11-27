export type AdminNavIcon =
  | "layoutDashboard"
  | "users"
  | "refreshCw"
  | "bookOpen"
  | "fileText"
  | "messagesSquare"
  | "creditCard"
  | "shield"
  | "lock"
  | "scrollText";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: AdminNavIcon;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "layoutDashboard" },
    ],
  },
  {
    label: "Users & Data",
    items: [
      { label: "Users", href: "/users", icon: "users" },
      {
        label: "Account Continuity",
        href: "/account-continuity",
        icon: "refreshCw",
      },
      { label: "Symptom Library", href: "/symptom-library", icon: "bookOpen" },
    ],
  },
  {
    label: "Content & Care",
    items: [
      { label: "Clinical Content", href: "/global-content", icon: "fileText" },
      { label: "Community", href: "/community", icon: "messagesSquare" },
    ],
  },
  {
    label: "Business",
    items: [
      {
        label: "Subscriptions & Tiers",
        href: "/subscriptions",
        icon: "creditCard",
      },
    ],
  },
  {
    label: "Trust & Compliance",
    items: [
      { label: "Privacy & Consent", href: "/privacy-consent", icon: "lock" },
      { label: "Audit Log", href: "/audit-log", icon: "scrollText" },
      { label: "Roles & Access", href: "/staff", icon: "shield" },
    ],
  },
];

export const ADMIN_NAV: AdminNavItem[] = ADMIN_NAV_GROUPS.flatMap(
  (group) => group.items,
);

export function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getNavLabel(pathname: string) {
  if (pathname === "/profile" || pathname.startsWith("/profile/")) {
    return "My profile";
  }
  if (pathname === "/notifications" || pathname.startsWith("/notifications/")) {
    return "Notifications";
  }
  const match = ADMIN_NAV.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.label ?? "Admin";
}

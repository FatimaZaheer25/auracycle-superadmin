import type { AdminUser, UserFilter } from "@/types/users";

export const USERS_TOTAL = 1_286_540;

export const mockUsers: AdminUser[] = [
  {
    id: "USR-4F82-91C3",
    displayName: "s••••a@mail.com",
    accountType: "Standard",
    lifeStage: "Track my cycle",
    plan: "Premium - Annual",
    syncStatus: "Synced just now",
    syncTone: "ok",
    devices: 2,
    lastActive: "Just now",
  },
  {
    id: "USR-9A11-02BE",
    displayName: "Anonymous user",
    accountType: "Anonymous",
    lifeStage: "Trying to conceive",
    plan: "Free",
    syncStatus: "No recovery key saved",
    syncTone: "warn",
    devices: 1,
    lastActive: "5 min ago",
  },
  {
    id: "USR-77C0-3D1A",
    displayName: "m••••e@mail.com",
    accountType: "Standard",
    lifeStage: "I'm pregnant",
    plan: "Premium - Monthly",
    syncStatus: "Synced 2 min ago",
    syncTone: "ok",
    devices: 3,
    lastActive: "Today",
    isPregnant: true,
  },
  {
    id: "USR-12AB-88F0",
    displayName: "j••••h@mail.com",
    accountType: "Standard",
    lifeStage: "Perimenopause",
    plan: "Free",
    syncStatus: "Synced 1 hr ago",
    syncTone: "ok",
    devices: 1,
    lastActive: "Today",
  },
  {
    id: "USR-55E2-6C9D",
    displayName: "a••••n@mail.com",
    accountType: "Standard",
    lifeStage: "Track my cycle",
    plan: "Premium - Annual",
    syncStatus: "Sync pending",
    syncTone: "warn",
    devices: 2,
    lastActive: "Yesterday",
  },
  {
    id: "USR-30D4-A7E1",
    displayName: "Anonymous user",
    accountType: "Anonymous",
    lifeStage: "Track my cycle",
    plan: "Free",
    syncStatus: "Saved data not found",
    syncTone: "error",
    devices: 1,
    lastActive: "Yesterday",
  },
  {
    id: "USR-8B19-44C2",
    displayName: "r••••a@mail.com",
    accountType: "Standard",
    lifeStage: "Trying to conceive",
    plan: "Premium - Monthly",
    syncStatus: "Synced 3 hr ago",
    syncTone: "ok",
    devices: 2,
    lastActive: "2 days ago",
  },
  {
    id: "USR-6F03-91AA",
    displayName: "l••••y@mail.com",
    accountType: "Standard",
    lifeStage: "I'm pregnant",
    plan: "Free",
    syncStatus: "Synced just now",
    syncTone: "ok",
    devices: 1,
    lastActive: "Just now",
    isPregnant: true,
  },
  {
    id: "USR-21C8-0EE4",
    displayName: "t••••o@mail.com",
    accountType: "Standard",
    lifeStage: "Track my cycle",
    plan: "Premium - Annual",
    syncStatus: "No recovery key saved",
    syncTone: "warn",
    devices: 3,
    lastActive: "3 days ago",
  },
  {
    id: "USR-9D70-55B1",
    displayName: "Anonymous user",
    accountType: "Anonymous",
    lifeStage: "Perimenopause",
    plan: "Free",
    syncStatus: "Synced 12 min ago",
    syncTone: "ok",
    devices: 1,
    lastActive: "Today",
  },
];

export const USER_FILTERS: { id: UserFilter; label: string }[] = [
  { id: "all", label: "All users" },
  { id: "standard", label: "Standard" },
  { id: "anonymous", label: "Anonymous" },
  { id: "premium", label: "Premium" },
  { id: "free", label: "Free" },
  { id: "pregnant", label: "Pregnant" },
  { id: "sync-issues", label: "Sync issues" },
];

export function filterUsers(users: AdminUser[], filter: UserFilter) {
  switch (filter) {
    case "standard":
      return users.filter((u) => u.accountType === "Standard");
    case "anonymous":
      return users.filter((u) => u.accountType === "Anonymous");
    case "premium":
      return users.filter((u) => u.plan.startsWith("Premium"));
    case "free":
      return users.filter((u) => u.plan === "Free");
    case "pregnant":
      return users.filter((u) => u.isPregnant);
    case "sync-issues":
      return users.filter((u) => u.syncTone !== "ok");
    default:
      return users;
  }
}

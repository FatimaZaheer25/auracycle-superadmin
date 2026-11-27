export type AdminRoleId =
  | "super-admin"
  | "clinical"
  | "data-protection"
  | "trust-safety"
  | "support"
  | "analyst";

export type PermissionCell = "yes" | "no" | "limited";

export type AdminRole = {
  id: AdminRoleId;
  label: string;
  members: number;
};

export type PermissionRow = {
  id: string;
  label: string;
  kind: "members" | "permission";
  cells: Record<AdminRoleId, PermissionCell | number>;
};

export type RolesAccessMeta = {
  subtitle: string;
  bannerTitle: string;
  bannerBody: string;
  matrixSubtitle: string;
};

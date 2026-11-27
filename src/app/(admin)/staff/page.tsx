import { RolesAccessView } from "@/components/features/roles-access";
import {
  adminRoles,
  inviteRoleOptions,
  permissionRows,
  rolesAccessMeta,
} from "@/mock/roles-access";

export default function RolesAccessPage() {
  return (
    <RolesAccessView
      meta={rolesAccessMeta}
      roles={adminRoles}
      rows={permissionRows}
      inviteRoles={[...inviteRoleOptions]}
    />
  );
}

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type {
  AdminRole,
  PermissionRow,
  RolesAccessMeta,
} from "@/types/roles-access";
import { Button, PageHeader } from "@/components/ui";
import {
  InviteAdminDialog,
  type InviteRoleOption,
} from "./invite-admin-dialog";
import { MfaBanner } from "./mfa-banner";
import { PermissionsMatrix } from "./permissions-matrix";

type RolesAccessViewProps = {
  meta: RolesAccessMeta;
  roles: AdminRole[];
  rows: PermissionRow[];
  inviteRoles: InviteRoleOption[];
};

export function RolesAccessView({
  meta,
  roles,
  rows,
  inviteRoles,
}: RolesAccessViewProps) {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Roles & Access"
        description={meta.subtitle}
        actions={
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => setInviteOpen(true)}
          >
            <Plus className="h-4 w-4" aria-hidden />
            Invite admin
          </Button>
        }
      />

      <MfaBanner title={meta.bannerTitle} body={meta.bannerBody} />

      <PermissionsMatrix
        roles={roles}
        rows={rows}
        subtitle={meta.matrixSubtitle}
      />

      <InviteAdminDialog
        open={inviteOpen}
        roles={inviteRoles}
        onClose={() => setInviteOpen(false)}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import type {
  ActiveSession,
  AlertPreference,
  ProfileDetails,
  ProfileMeta,
  SecurityInfo,
} from "./types";
import { Button, PageHeader } from "@/components/ui";
import { ActiveSessionsCard } from "./active-sessions-card";
import { AlertPreferencesCard } from "./alert-preferences-card";
import { ConfirmIdentityDialog } from "./confirm-identity-dialog";
import { LogoutAllDialog } from "./logout-all-dialog";
import { PersonalDetailsCard } from "./personal-details-card";
import {
  RecoveryCodesDialog,
  type RecoveryCode,
} from "./recovery-codes-dialog";
import { SecurityCard } from "./security-card";

type ProfileViewProps = {
  meta: ProfileMeta;
  details: ProfileDetails;
  timeZones: string[];
  security: SecurityInfo;
  sessions: ActiveSession[];
  alerts: AlertPreference[];
  recoveryCodes: RecoveryCode[];
  recoveryUnusedCount: number;
  recoveryTotalCount: number;
  logoutAllSummary: string;
};

export function ProfileView({
  meta,
  details,
  timeZones,
  security,
  sessions,
  alerts,
  recoveryCodes,
  recoveryUnusedCount,
  recoveryTotalCount,
  logoutAllSummary,
}: ProfileViewProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [codesOpen, setCodesOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <div className="space-y-5">
      <p className="text-xs font-medium text-primary">
        {meta.breadcrumb} <span className="text-[#8f8589]">›</span> My profile
      </p>

      <PageHeader
        title="My profile"
        description={meta.subtitle}
        actions={
          <Link href="/login">
            <Button size="sm" variant="outline" className="rounded-full">
              <LogOut className="h-4 w-4" aria-hidden />
              Log out
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <PersonalDetailsCard details={details} timeZones={timeZones} />
        <div className="space-y-4">
          <div id="security" className="scroll-mt-24">
            <SecurityCard
              info={security}
              onViewRecoveryCodes={() => setConfirmOpen(true)}
            />
          </div>
          <div id="sessions" className="scroll-mt-24">
            <ActiveSessionsCard
              sessions={sessions}
              onLogoutAll={() => setLogoutOpen(true)}
            />
          </div>
          <div id="alerts" className="scroll-mt-24">
            <AlertPreferencesCard items={alerts} />
          </div>
        </div>
      </div>

      <ConfirmIdentityDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirmed={() => setCodesOpen(true)}
      />

      <RecoveryCodesDialog
        open={codesOpen}
        codes={recoveryCodes}
        unusedCount={recoveryUnusedCount}
        totalCount={recoveryTotalCount}
        onClose={() => setCodesOpen(false)}
      />

      <LogoutAllDialog
        open={logoutOpen}
        sessionsSummary={logoutAllSummary}
        onClose={() => setLogoutOpen(false)}
      />
    </div>
  );
}

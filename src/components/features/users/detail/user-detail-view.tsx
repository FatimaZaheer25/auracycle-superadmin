"use client";

import { useCallback, useEffect, useState } from "react";
import type { UserDetail, UserDetailTab } from "../user-detail.types";
import { CycleLogsPanel } from "./cycle-logs-panel";
import { DevicesSyncPanel } from "./devices-sync-panel";
import { MaskedViewBanner } from "./masked-view-banner";
import { OverviewPanel } from "./overview-panel";
import { PartnerSharingPanel } from "./partner-sharing-panel";
import { PerimenopausePanel } from "./perimenopause-panel";
import { PregnancyPanel } from "./pregnancy-panel";
import { PrivacyConsentTabPanel } from "./privacy-consent-tab-panel";
import { RevealDeniedDialog } from "./reveal-denied-dialog";
import { RevealMaskedValueDialog } from "./reveal-masked-value-dialog";
import { SubscriptionTabPanel } from "./subscription-tab-panel";
import { UserDetailHeader } from "./user-detail-header";
import { UserDetailTabs } from "./user-detail-tabs";

type UserDetailViewProps = {
  user: UserDetail;
  /** Demo: Support Agent sees denied modal; DPO can reveal. Default DPO. */
  revealRole?: "dpo" | "support";
};

const REVEAL_SECONDS = 5 * 60;

export function UserDetailView({
  user,
  revealRole = "dpo",
}: UserDetailViewProps) {
  const [tab, setTab] = useState<UserDetailTab>("overview");
  const [revealOpen, setRevealOpen] = useState(false);
  const [deniedOpen, setDeniedOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [revealMeta, setRevealMeta] = useState<{
    reason: string;
    referenceId: string;
    auditId: string;
  } | null>(null);

  const canReveal = revealRole === "dpo";

  const handleRevealRequest = useCallback(() => {
    if (canReveal) {
      setRevealOpen(true);
    } else {
      setDeniedOpen(true);
    }
  }, [canReveal]);

  const handleReveal = useCallback(
    (payload: { reason: string; referenceId: string; why: string }) => {
      setRevealed(true);
      setSecondsLeft(REVEAL_SECONDS);
      setRevealMeta({
        reason: payload.reason,
        referenceId: payload.referenceId,
        auditId: "AL-48213",
      });
    },
    [],
  );

  useEffect(() => {
    if (!revealed) return;

    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRevealed(false);
          setRevealMeta(null);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [revealed]);

  const revealEndsIn = formatCountdown(secondsLeft);

  return (
    <div className="space-y-5">
      <UserDetailHeader user={user} />
      <MaskedViewBanner />
      <UserDetailTabs value={tab} onChange={setTab} />

      {revealed && revealMeta ? (
        <div className="flex items-start gap-3 rounded-[12px] border border-[#e8c98a] bg-[#fbf3dc] px-4 py-3 text-sm text-[#7a5a12]">
          <span className="mt-0.5 font-semibold">!</span>
          <p>
            Value revealed for 5 minutes. Reason: {revealMeta.reason}{" "}
            {revealMeta.referenceId}. Logged as {revealMeta.auditId} in the
            Audit Log by Data Protection Officer.
          </p>
        </div>
      ) : null}

      {tab === "overview" ? (
        <OverviewPanel
          user={user}
          bbtRevealed={revealed}
          revealEndsIn={revealEndsIn}
          onRevealRequest={handleRevealRequest}
        />
      ) : null}
      {tab === "cycle-logs" ? (
        <CycleLogsPanel
          user={user}
          revealed={revealed}
          revealEndsIn={revealEndsIn}
          onRevealRequest={handleRevealRequest}
        />
      ) : null}
      {tab === "pregnancy" ? <PregnancyPanel user={user} /> : null}
      {tab === "perimenopause" ? <PerimenopausePanel user={user} /> : null}
      {tab === "privacy" ? <PrivacyConsentTabPanel user={user} /> : null}
      {tab === "subscription" ? <SubscriptionTabPanel user={user} /> : null}
      {tab === "devices" ? <DevicesSyncPanel user={user} /> : null}
      {tab === "partner" ? <PartnerSharingPanel user={user} /> : null}

      <RevealMaskedValueDialog
        open={revealOpen}
        onClose={() => setRevealOpen(false)}
        fieldLabel="Waking BBT · Cycle 4"
        accountId={user.id}
        maskedValue={user.cycleLogs.bbt.latestMasked}
        onReveal={handleReveal}
      />

      <RevealDeniedDialog
        open={deniedOpen}
        onClose={() => setDeniedOpen(false)}
        currentRole="Support Agent"
      />
    </div>
  );
}

function formatCountdown(totalSeconds: number) {
  if (totalSeconds <= 0) return undefined;
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

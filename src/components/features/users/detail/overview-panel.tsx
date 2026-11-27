import type { ReactNode } from "react";
import type { UserDetail } from "@/types/user-detail";
import { Badge } from "@/components/ui";
import { DetailRow } from "./detail-row";

type OverviewPanelProps = {
  user: UserDetail;
  bbtRevealed?: boolean;
  revealEndsIn?: string;
  onRevealRequest?: () => void;
};

function SectionCard({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[12px] border border-[#e8dfdf] bg-white p-4">
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#2a2426]">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-[#9a9094]">{subtitle}</p>
          ) : null}
        </div>
        {badge}
      </div>
      <div>{children}</div>
    </section>
  );
}

export function OverviewPanel({
  user,
  bbtRevealed,
  revealEndsIn,
  onRevealRequest,
}: OverviewPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-4">
        <SectionCard title="Account">
          <DetailRow
            label="Account type"
            badge={
              user.accountType === "Standard"
                ? "Standard account"
                : "Anonymous"
            }
            badgeVariant="teal"
          />
          <DetailRow label="Account ID" value={user.id} />
          <DetailRow label="Sign-in method" value={user.signInMethod} />
          <DetailRow label="Life-stage focus" value={user.lifeStage} />
          <DetailRow label="Units" value={user.units} />
        </SectionCard>

        <SectionCard
          title="Current cycle"
          badge={<Badge variant="coral">{user.cycle.phase}</Badge>}
        >
          <DetailRow label="Cycle progress" value={user.cycle.summary} />
          <DetailRow label="Next period estimate" value={user.cycle.nextPeriod} />
          <DetailRow label="Prediction confidence" value={user.cycle.confidence} />
          <DetailRow
            label="Waking BBT"
            masked={user.cycle.bbtMasked && !bbtRevealed}
            value={user.cycleLogs.bbt.latestMasked}
            revealedValue={
              bbtRevealed ? user.cycleLogs.bbt.latestRevealed : undefined
            }
            revealEndsIn={revealEndsIn}
            onMaskedClick={onRevealRequest}
          />
        </SectionCard>

        <SectionCard
          title={`Daily log · ${user.dailyLog.date}`}
          badge={<Badge variant="peach">Health data masked</Badge>}
        >
          {user.dailyLog.rows.map((row) => (
            <DetailRow
              key={row.label}
              label={row.label}
              value={row.value}
              masked={row.masked}
            />
          ))}
        </SectionCard>

        <SectionCard title="Reminders" subtitle="Mirrors Cycle reminders">
          {user.reminders.map((item) => (
            <DetailRow
              key={item.label}
              label={item.label}
              value={item.on ? "On" : "Off"}
              status={item.on ? "on" : "off"}
            />
          ))}
        </SectionCard>
      </div>

      <div className="space-y-4">
        <SectionCard
          title="Subscription"
          badge={<Badge variant="success">{user.subscription.status}</Badge>}
        >
          <DetailRow label="Plan" value={user.subscription.plan} />
          <DetailRow label="Price" value={user.subscription.price} />
          <DetailRow label="Renews on" value={user.subscription.renewsOn} />
          <DetailRow label="Billed via" value={user.subscription.billedVia} />
        </SectionCard>

        <SectionCard title="Privacy & consent">
          {user.privacy.map((row) => (
            <DetailRow
              key={row.label}
              label={row.label}
              value={row.value}
              status={row.status}
            />
          ))}
        </SectionCard>

        <SectionCard
          title="Devices & sync"
          badge={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f7f5] px-2.5 py-0.5 text-xs font-medium text-[#1f7a72]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1f7a72]" aria-hidden />
              {user.devices.syncStatus}
            </span>
          }
        >
          <DetailRow label="Phone" value={user.devices.phone} />
          <DetailRow label="Watch" value={user.devices.watch} />
          <DetailRow label="Backup" value={user.devices.backup} />
          <DetailRow label="Recovery" value={user.devices.recovery} />
        </SectionCard>
      </div>
    </div>
  );
}

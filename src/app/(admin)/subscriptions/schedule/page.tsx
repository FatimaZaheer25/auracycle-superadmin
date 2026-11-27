import { ScheduleTierChangeView } from "@/components/features/subscriptions/schedule-tier-change-view";
import {
  scheduleFeatureOptions,
  scheduleMessageDefault,
  scheduleSafetyBlocked,
  scheduleSafetyPass,
  scheduleTimeline,
} from "@/mock/subscriptions";

export default function ScheduleTierChangePage() {
  return (
    <ScheduleTierChangeView
      features={scheduleFeatureOptions}
      safetyPass={scheduleSafetyPass}
      safetyBlocked={scheduleSafetyBlocked}
      timeline={scheduleTimeline}
      defaultMessage={scheduleMessageDefault}
    />
  );
}

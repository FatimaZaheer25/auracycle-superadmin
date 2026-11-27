import { ProfileView } from "@/components/features/profile";
import {
  activeSessions,
  alertPreferences,
  logoutAllSummary,
  profileDetails,
  profileMeta,
  recoveryCodes,
  recoveryCodesMeta,
  securityInfo,
  timeZoneOptions,
} from "@/components/features/profile/mock";

export default function ProfilePage() {
  return (
    <ProfileView
      meta={profileMeta}
      details={profileDetails}
      timeZones={timeZoneOptions}
      security={securityInfo}
      sessions={activeSessions}
      alerts={alertPreferences}
      recoveryCodes={recoveryCodes}
      recoveryUnusedCount={recoveryCodesMeta.unusedCount}
      recoveryTotalCount={recoveryCodesMeta.totalCount}
      logoutAllSummary={logoutAllSummary}
    />
  );
}

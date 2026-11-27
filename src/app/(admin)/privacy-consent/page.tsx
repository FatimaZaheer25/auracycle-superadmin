import { PrivacyConsentView } from "@/components/features/privacy-consent";
import {
  consentTypes,
  dataRequestRules,
  dataRequestStats,
  privacyMeta,
  retentionRows,
} from "@/components/features/privacy-consent/mock";

export default function PrivacyConsentPage() {
  return (
    <PrivacyConsentView
      meta={privacyMeta}
      consents={consentTypes}
      requestStats={dataRequestStats}
      requestRules={dataRequestRules}
      retention={retentionRows}
    />
  );
}

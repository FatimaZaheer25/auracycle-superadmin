import { PrivacyConsentView } from "@/components/features/privacy-consent";
import {
  consentTypes,
  dataRequestRules,
  dataRequestStats,
  privacyMeta,
  retentionRows,
} from "@/mock/privacy-consent";

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

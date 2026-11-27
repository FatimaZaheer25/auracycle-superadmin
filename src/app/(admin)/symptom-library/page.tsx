import { SymptomLibraryView } from "@/components/features/symptom-library";
import {
  customSymptomsMeta,
  librarySymptoms,
  suggestedCustomSymptoms,
  symptomKpis,
  symptomLibraryMeta,
} from "@/mock/symptom-library";

export default function SymptomLibraryPage() {
  return (
    <SymptomLibraryView
      subtitle={symptomLibraryMeta.subtitle}
      kpis={symptomKpis}
      symptoms={librarySymptoms}
      customMeta={customSymptomsMeta}
      suggestions={suggestedCustomSymptoms}
    />
  );
}

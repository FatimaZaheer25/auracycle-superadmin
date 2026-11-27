import { NewRecoveryCaseView } from "@/components/features/account-continuity/new-recovery-case-view";
import {
  foundAccountDemo,
  newCaseDefaults,
} from "@/components/features/account-continuity/mock";

export default function NewRecoveryCasePage() {
  return (
    <NewRecoveryCaseView
      defaults={newCaseDefaults}
      foundAccount={foundAccountDemo}
    />
  );
}

import { NewRecoveryCaseView } from "@/components/features/account-continuity/new-recovery-case-view";
import {
  foundAccountDemo,
  newCaseDefaults,
} from "@/mock/account-continuity";

export default function NewRecoveryCasePage() {
  return (
    <NewRecoveryCaseView
      defaults={newCaseDefaults}
      foundAccount={foundAccountDemo}
    />
  );
}

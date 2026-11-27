import { AlertTriangle } from "lucide-react";

export function AnonymousWarning() {
  return (
    <div
      role="note"
      className="flex gap-3 rounded-[12px] border border-[#e8d7b0] bg-[#fbf6e9] px-4 py-3 text-sm text-[#8a6a2b]"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#9a6b1f]" aria-hidden />
      <p>
        <span className="font-semibold">Anonymous Mode has no email recovery path.</span>{" "}
        People who skip “Save recovery key” cannot be restored if the device is
        lost. Prefer in-app prompts and recovery-key coverage for Anonymous
        accounts.
      </p>
    </div>
  );
}

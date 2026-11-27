import { Shield } from "lucide-react";

export function MaskedViewBanner() {
  return (
    <div
      role="note"
      className="flex gap-3 rounded-[12px] border border-[#ddd0f5] bg-[#f4effc] px-4 py-3 text-sm text-[#5b3d8a]"
    >
      <Shield className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>
        <span className="font-semibold">Masked view.</span> Health fields are
        locked. A Data Protection Officer role is required to reveal them, and
        every reveal is written to the Audit Log.
      </p>
    </div>
  );
}

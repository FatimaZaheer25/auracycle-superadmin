import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import type { ContinuitySlaAlert } from "./types";
import { Button } from "@/components/ui";

type SlaAlertBannerProps = {
  alert: ContinuitySlaAlert;
};

export function SlaAlertBanner({ alert }: SlaAlertBannerProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-[12px] border border-[#e8c98a] bg-[#fbf3dc] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3 text-sm text-[#7a5a12]">
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0 text-[#9a6b1f]"
          aria-hidden
        />
        <p>{alert.message}</p>
      </div>
      <Link href={`/account-continuity/${alert.caseId}`} className="shrink-0">
        <Button
          size="sm"
          variant="outline"
          className="rounded-full border-[#d4b87a] bg-white text-[#7a5a12] hover:bg-[#f8eedc]"
        >
          Open case
        </Button>
      </Link>
    </div>
  );
}

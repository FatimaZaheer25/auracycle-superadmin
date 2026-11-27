import { FileText, KeyRound } from "lucide-react";
import type { SecurityInfo } from "./types";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type SecurityCardProps = {
  info: SecurityInfo;
  onViewRecoveryCodes?: () => void;
};

const rows = [
  { key: "password", label: "Password" },
  { key: "twoStep", label: "Two-step sign-in" },
  { key: "recoveryCodes", label: "Recovery codes" },
] as const;

export function SecurityCard({
  info,
  onViewRecoveryCodes,
}: SecurityCardProps) {
  const values = {
    password: info.passwordChanged,
    twoStep: info.twoStep,
    recoveryCodes: info.recoveryCodes,
  };

  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">Security</h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">
          Password and two-step sign-in
        </p>
      </div>

      <ul className="mt-4">
        {rows.map((row, index) => (
          <li
            key={row.key}
            className={cn(
              "flex items-center justify-between gap-3 py-2.5",
              index < rows.length - 1 && "border-b border-[#ebe3e3]",
            )}
          >
            <p className="text-sm text-[#6b6165]">{row.label}</p>
            {row.key === "twoStep" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-[11px] font-medium text-[#0d6b64]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]"
                  aria-hidden
                />
                {values.twoStep}
              </span>
            ) : (
              <p className="text-sm font-medium text-[#221c1e]">
                {values[row.key]}
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="rounded-full">
          <KeyRound className="h-3.5 w-3.5" aria-hidden />
          Change password
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={onViewRecoveryCodes}
        >
          <FileText className="h-3.5 w-3.5" aria-hidden />
          View recovery codes
        </Button>
      </div>
    </section>
  );
}

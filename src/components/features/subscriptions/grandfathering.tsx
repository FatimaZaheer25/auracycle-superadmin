import type { GrandfatherStep } from "@/types/subscriptions";
import { cn } from "@/lib/utils";

type GrandfatheringProps = {
  steps: GrandfatherStep[];
  subtitle: string;
  footer: string;
};

export function Grandfathering({ steps, subtitle, footer }: GrandfatheringProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">
            Scheduled change · 90-day grandfathering
          </h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#c5ebe6] px-2.5 py-1 text-xs font-medium text-[#0d6b64]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d6b64]" aria-hidden />
          Enforced by the system
        </span>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "relative rounded-[12px] border px-3 py-3",
              step.state === "active"
                ? "border-primary bg-[#efd5de]"
                : "border-[#e0d6d6] bg-[#f3eceb]",
            )}
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold",
                  step.state === "done" && "bg-[#c5ebe6] text-[#0d6b64]",
                  step.state === "active" && "bg-primary text-white",
                  step.state === "pending" && "bg-[#e6dcda] text-[#6b6165]",
                )}
              >
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-[#221c1e]">{step.title}</p>
            </div>
            <p className="text-xs text-[#6b6165]">{step.detail}</p>
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-[12px] bg-[#ebe1e1] px-3 py-2.5 text-xs text-[#6b6165]">
        {footer}
      </p>
    </section>
  );
}

import type { HealthAssistantRule } from "@/types/clinical-content";
import { cn } from "@/lib/utils";

type HealthAssistantPanelProps = {
  rules: HealthAssistantRule[];
  subtitle: string;
};

export function HealthAssistantPanel({
  rules,
  subtitle,
}: HealthAssistantPanelProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">Health Assistant</h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
      </div>

      <ul className="mt-3">
        {rules.map((rule, index) => (
          <li
            key={rule.id}
            className={cn(
              "grid grid-cols-[96px_minmax(0,1fr)] items-start gap-3 py-2.5",
              index < rules.length - 1 && "border-b border-[#ebe3e3]",
            )}
          >
            <p className="text-[13px] leading-snug text-[#8f8589]">{rule.label}</p>
            <p className="text-right text-[13px] font-medium leading-snug text-[#221c1e]">
              {rule.value}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  subtitle,
  badge,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={`rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5 ${className ?? ""}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-[#8f8589]">{subtitle}</p>
          ) : null}
        </div>
        {badge}
      </div>
      {children}
    </section>
  );
}

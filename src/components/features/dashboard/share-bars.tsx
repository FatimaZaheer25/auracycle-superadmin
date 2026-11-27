import type { NamedShare } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type ShareBarsProps = {
  title: string;
  description?: string;
  items: NamedShare[];
  className?: string;
};

export function ShareBars({
  title,
  description,
  items,
  className,
}: ShareBarsProps) {
  return (
    <div className={cn(className)}>
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-xs text-[#8f8589]">{description}</p>
        ) : null}
      </div>

      <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-[#ebe1e1]">
        {items.map((item) => (
          <div
            key={item.name}
            className="h-full"
            style={{
              width: `${item.percent}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
      </div>

      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="inline-flex items-center gap-2 text-[#221c1e]">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden
              />
              {item.name}
            </span>
            <span className="shrink-0 text-[#6b6165]">
              <span className="tabular-nums">{item.count}</span>
              <span className="ml-2 font-semibold text-[#221c1e]">
                {item.percent}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

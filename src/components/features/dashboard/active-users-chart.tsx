import type { ActiveUsersPoint } from "./types";

type ActiveUsersChartProps = {
  data: ActiveUsersPoint[];
};

function buildPath(
  values: number[],
  width: number,
  height: number,
  max: number,
) {
  if (!values.length) return "";
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - (value / max) * (height * 0.85) - height * 0.08;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function ActiveUsersChart({ data }: ActiveUsersChartProps) {
  const width = 640;
  const height = 220;
  const max = Math.max(...data.flatMap((d) => [d.dau, d.mau]), 1);
  const dauPath = buildPath(
    data.map((d) => d.dau),
    width,
    height,
    max,
  );
  const mauPath = buildPath(
    data.map((d) => d.mau),
    width,
    height,
    max,
  );
  const areaPath = `${mauPath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <section className="h-full rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[#221c1e]">Active users</h2>
          <p className="mt-0.5 text-xs text-[#8f8589]">
            Daily and monthly active accounts
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#6b6165]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#0d6b64]" /> DAU
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#b24a68]" /> MAU
          </span>
        </div>
      </div>

      <div className="w-full overflow-hidden border-t border-[#ebe3e3] pt-4">
        <svg
          viewBox={`0 0 ${width} ${height + 28}`}
          className="h-56 w-full"
          role="img"
          aria-label="Active users line chart"
        >
          <defs>
            <linearGradient id="mauFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#efd5de" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#efd5de" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#mauFill)" />
          <path
            d={mauPath}
            fill="none"
            stroke="#b24a68"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={dauPath}
            fill="none"
            stroke="#0d6b64"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * width;
            return (
              <text
                key={point.label}
                x={x}
                y={height + 20}
                textAnchor="middle"
                className="fill-[#8f8589] text-[10px]"
              >
                {point.label}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

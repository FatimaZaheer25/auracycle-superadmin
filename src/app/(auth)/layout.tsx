import { Check, Heart } from "lucide-react";

const highlights = [
  "Two-step sign-in on every login",
  "Health data stays masked unless your role allows it",
  "Every action is written to the audit log",
];

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[#7a2f48] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 left-1/4 h-96 w-96 rounded-full bg-black/10"
        />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-white text-[#7a2f48]">
              <Heart className="h-5 w-5 fill-current" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold">AuraCycle</p>
              <p className="text-xs text-white/70">Super Admin Console</p>
            </div>
          </div>

          <h1 className="mt-16 max-w-md text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
            Care for sensitive health data, built into every step
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
            Content, consent and recovery tools for the AuraCycle team, with
            every action recorded.
          </p>

          <ul className="mt-10 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="pt-0.5 text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/50">
          AuraCycle · Super Admin · FR-ADM auth
        </p>
      </aside>

      <div className="flex min-h-screen items-center justify-center bg-[#efe8e6] px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

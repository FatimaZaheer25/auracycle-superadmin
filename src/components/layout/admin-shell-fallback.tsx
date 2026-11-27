import { ADMIN_NAV_GROUPS } from "@/lib/constants/nav";

export function AdminShellFallback({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside className="sticky top-0 hidden h-dvh w-[var(--sidebar-width)] shrink-0 border-r border-border bg-surface md:block">
        <div className="border-b border-border px-4 py-4">
          <p className="text-sm font-semibold">AuraCycle</p>
          <p className="text-xs text-muted">Super Admin Console</p>
        </div>
        <nav className="space-y-4 overflow-y-auto px-3 py-4">
          {ADMIN_NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li
                    key={item.href}
                    className="rounded-[var(--radius)] px-3 py-2 text-sm text-muted"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="h-16 shrink-0 border-b border-border bg-surface" />
        <main className="scroll-on-interact min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

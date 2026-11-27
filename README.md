# Health Tracking · Super Admin Panel

Next.js (App Router) frontend for the Super Admin panel, built step-by-step from the Figma design.

## Run locally

```bash
cd superadmin-panel
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`.

## Folder concepts

| Pattern | Example | Meaning |
|---------|---------|---------|
| `(group)` | `(auth)`, `(admin)` | Route group — organizes layouts, **not** in the URL |
| kebab-case | `account-continuity` | Friendly URL segment |
| `[param]` | `[userId]` | Dynamic ID segment |

## Build steps

0. Scaffold + folder structure (done)
1. Design tokens + base UI (done) — see `/dashboard` preview
2. Real sidebar layout (done) — `AdminShell` + active nav
3. Login (MFA) (done) — `/login` credentials → MFA → dashboard
4. Dashboard (done) — AuraCycle Figma layout (8 KPIs, DAU/MAU, continuity, needs attention)
5. Users list (done) — filters, masked banner, table, pagination
6. User detail (done) — header, masked view, tabs, Overview cards
7. Account Continuity (done) — KPIs, recovery cases, insights
8. Subscriptions & Tiers (done) — plans, feature matrix, grandfathering
9+ Remaining modules (Symptom Library, Clinical Content, …)

## UI primitives (`src/components/ui`)

`Button`, `Input`, `Label`, `Badge`, `Card`, `Table`, `PageHeader` — import from `@/components/ui`.

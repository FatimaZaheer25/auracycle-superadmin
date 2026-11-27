"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { UserFilter } from "@/types/users";
import { USERS_TOTAL, filterUsers, mockUsers } from "@/mock/users";
import { Button, PageHeader } from "@/components/ui";
import { PrivacyBanner } from "./privacy-banner";
import { UserFilters } from "./user-filters";
import { UsersTable } from "./users-table";

export function UsersView() {
  const [filter, setFilter] = useState<UserFilter>("all");

  const rows = useMemo(() => filterUsers(mockUsers, filter), [filter]);
  const showingEnd = rows.length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Users"
        description={`${USERS_TOTAL.toLocaleString()} accounts · Standard and Anonymous`}
        actions={
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border bg-surface shadow-none"
          >
            <Download className="h-4 w-4" aria-hidden />
            Export CSV
          </Button>
        }
      />

      <PrivacyBanner />

      {/*
        Main white card:
          filters
          ┌─ inner bordered user table ─┐
          │ header + rows               │  ← table border ends here
          └─────────────────────────────┘
          gap
          pagination
      */}
      <div className="rounded-[16px] border border-[#e8dfdf] bg-white p-4 sm:p-5">
        <div className="mb-4">
          <UserFilters value={filter} onChange={setFilter} />
        </div>

        <div className="overflow-hidden rounded-[12px] border border-[#e8dfdf] bg-white">
          <UsersTable users={rows} />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#9a9094]">
            Showing 1–{showingEnd} of {USERS_TOTAL.toLocaleString()} accounts
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="h-9 rounded-full border-[#e0d6d6] bg-white px-4 text-[#2a2426] disabled:opacity-40"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-full border-[#e0d6d6] bg-white px-4 text-[#2a2426]"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

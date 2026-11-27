"use client";

import { Menu, Search } from "lucide-react";
import { NotificationsPopover } from "@/components/features/notifications";
import { Button, Input } from "@/components/ui";
import { notifications } from "@/components/features/notifications/mock";
import { ProfileMenu } from "./profile-menu";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur md:px-6">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="relative mx-auto hidden min-w-0 w-full max-w-xl flex-1 md:block">
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          className="h-11 rounded-full border-transparent bg-search-bg pl-10 shadow-none placeholder:text-muted-foreground focus-visible:border-primary/20 focus-visible:ring-primary/15"
          placeholder="Search users, IDs, content…"
          aria-label="Global search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <NotificationsPopover items={notifications} />
        <ProfileMenu />
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Mail, Send, Shield, X } from "lucide-react";
import { Button, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

export type InviteRoleOption = {
  id: string;
  label: string;
  description: string;
};

type InviteAdminDialogProps = {
  open: boolean;
  roles: InviteRoleOption[];
  onClose: () => void;
  onSend?: (payload: { email: string; roleId: string }) => void;
};

export function InviteAdminDialog({
  open,
  roles,
  onClose,
  onSend,
}: InviteAdminDialogProps) {
  const [email, setEmail] = useState("new.admin@auracycle.com");
  const [roleId, setRoleId] = useState(
    roles.find((r) => r.id === "support")?.id ?? roles[0]?.id ?? "",
  );

  useEffect(() => {
    if (!open) {
      setEmail("new.admin@auracycle.com");
      setRoleId(
        roles.find((r) => r.id === "support")?.id ?? roles[0]?.id ?? "",
      );
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, roles]);

  if (!open) return null;

  const canSend = email.trim().includes("@") && Boolean(roleId);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-[#221c1e]/45"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-admin-title"
        className="relative z-10 max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-[20px] border border-[#d9cdcf] bg-white shadow-[0_24px_60px_rgba(34,28,30,0.22)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe3e3] px-5 py-4">
          <div>
            <h2
              id="invite-admin-title"
              className="text-base font-semibold text-[#221c1e]"
            >
              Invite an admin
            </h2>
            <p className="mt-0.5 text-xs text-[#8f8589]">
              They get only the access of the role you choose.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] p-1.5 text-[#8f8589] hover:bg-[#f7f1f0]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="invite-email">Work email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]" />
              <input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-[10px] border border-[#d9cdcf] bg-white py-2 pr-3 pl-9 text-sm text-[#221c1e] outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-[#6b6165]">Role</p>
            {roles.map((role) => (
              <label
                key={role.id}
                className={cn(
                  "flex cursor-pointer gap-2.5 rounded-[12px] border px-3 py-3",
                  roleId === role.id
                    ? "border-primary bg-[#efd5de]"
                    : "border-[#d9cdcf] bg-white hover:bg-[#faf6f6]",
                )}
              >
                <input
                  type="radio"
                  name="invite-role"
                  checked={roleId === role.id}
                  onChange={() => setRoleId(role.id)}
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="text-sm font-semibold text-[#221c1e]">
                    {role.label}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6b6165]">
                    {role.description}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex items-start gap-2 rounded-[12px] border border-[#9ed4ce] bg-[#e6f6f4] px-3 py-2.5 text-xs text-[#0d6b64]">
            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <p>They must set up two-step sign-in before first use.</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#ebe3e3] bg-[#faf6f6] px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            className="gap-1.5"
            disabled={!canSend}
            onClick={() => {
              onSend?.({ email: email.trim(), roleId });
              onClose();
            }}
          >
            <Send className="h-4 w-4" aria-hidden />
            Send invite
          </Button>
        </div>
      </div>
    </div>
  );
}

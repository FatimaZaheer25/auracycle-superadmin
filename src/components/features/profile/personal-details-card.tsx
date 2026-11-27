"use client";

import { useState } from "react";
import { KeyRound, Mail, Upload } from "lucide-react";
import type { ProfileDetails } from "./types";
import { Button, Input, Label } from "@/components/ui";

type PersonalDetailsCardProps = {
  details: ProfileDetails;
  timeZones: string[];
};

export function PersonalDetailsCard({
  details,
  timeZones,
}: PersonalDetailsCardProps) {
  const [name, setName] = useState(details.fullName);
  const [email, setEmail] = useState(details.email);
  const [timeZone, setTimeZone] = useState(details.timeZone);

  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efd5de] text-sm font-semibold text-[#7a2f48]">
            {details.initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-[#221c1e]">
              {details.fullName}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <span className="inline-flex rounded-full bg-[#f0d0d9] px-2.5 py-0.5 text-[11px] font-medium text-[#a33d52]">
                Super Admin
              </span>
              <span className="inline-flex rounded-full bg-[#c5ebe6] px-2.5 py-0.5 text-[11px] font-medium text-[#0d6b64]">
                MFA verified
              </span>
            </div>
          </div>
        </div>
        <Button size="sm" variant="outline" className="rounded-full">
          <Upload className="h-3.5 w-3.5" aria-hidden />
          Change photo
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <Label htmlFor="full-name" className="text-xs text-[#6b6165]">
            Full name
          </Label>
          <Input
            id="full-name"
            className="mt-1.5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="work-email" className="text-xs text-[#6b6165]">
            Work email
          </Label>
          <div className="relative mt-1.5">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]"
              aria-hidden
            />
            <Input
              id="work-email"
              type="email"
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="role" className="text-xs text-[#6b6165]">
            Role
          </Label>
          <div className="relative mt-1.5">
            <KeyRound
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8f8589]"
              aria-hidden
            />
            <Input
              id="role"
              className="bg-[#f0e8e6] pl-9"
              value={details.role}
              readOnly
            />
          </div>
          <p className="mt-1.5 text-xs text-[#8f8589]">{details.roleNote}</p>
        </div>

        <div>
          <Label htmlFor="timezone" className="text-xs text-[#6b6165]">
            Time zone
          </Label>
          <select
            id="timezone"
            className="mt-1.5 flex h-10 w-full rounded-[var(--radius)] border border-border bg-surface px-3 text-sm text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            {timeZones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <Button size="sm" variant="outline" className="rounded-full">
          Cancel
        </Button>
        <Button size="sm" className="rounded-full">
          Save changes
        </Button>
      </div>
    </section>
  );
}

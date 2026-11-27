import { Lock } from "lucide-react";

type AuditBannerProps = {
  message: string;
};

export function AuditBanner({ message }: AuditBannerProps) {
  return (
    <div className="flex gap-3 rounded-[16px] border border-[#c9bde8] bg-[#ddd5f0]/70 px-4 py-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5c4d84]/12 text-[#5c4d84]">
        <Lock className="h-3.5 w-3.5" aria-hidden />
      </span>
      <p className="text-sm leading-relaxed text-[#5c4d84]">
        <span className="font-semibold">Entries cannot be edited or deleted.</span>{" "}
        {message.replace(/^Entries cannot be edited or deleted\.\s*/, "")}
      </p>
    </div>
  );
}

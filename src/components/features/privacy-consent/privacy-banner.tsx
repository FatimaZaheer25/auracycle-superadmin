import { Shield } from "lucide-react";

type PrivacyBannerProps = {
  message: string;
};

export function PrivacyBanner({ message }: PrivacyBannerProps) {
  return (
    <div className="flex gap-3 rounded-[16px] border border-[#b7ddd8] bg-[#c5ebe6]/55 px-4 py-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d6b64]/12 text-[#0d6b64]">
        <Shield className="h-3.5 w-3.5" aria-hidden />
      </span>
      <p className="text-sm leading-relaxed text-[#0d6b64]">
        <span className="font-semibold">No third-party sharing is active.</span>{" "}
        {message.replace(/^No third-party sharing is active\.\s*/, "")}
      </p>
    </div>
  );
}

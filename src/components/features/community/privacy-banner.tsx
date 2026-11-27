import { Lock } from "lucide-react";

type PrivacyBannerProps = {
  title: string;
  body: string;
};

export function PrivacyBanner({ title, body }: PrivacyBannerProps) {
  return (
    <div className="flex gap-3 rounded-[16px] border border-[#b7ddd8] bg-[#c5ebe6]/55 px-4 py-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d6b64]/12 text-[#0d6b64]">
        <Lock className="h-3.5 w-3.5" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-semibold text-[#0d6b64]">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#3d6b66]">{body}</p>
      </div>
    </div>
  );
}

import type { CommunityTopic, SecretChatRule } from "./types";
import { cn } from "@/lib/utils";

type TopicsPanelProps = {
  topics: CommunityTopic[];
  secretRules: SecretChatRule[];
};

const toneStyles: Record<SecretChatRule["tone"], string> = {
  ok: "bg-[#c5ebe6] text-[#0d6b64]",
  peach: "bg-[#e8d5c8] text-[#7a554c]",
  teal: "bg-[#c5ebe6] text-[#0d6b64]",
};

export function TopicsPanel({ topics, secretRules }: TopicsPanelProps) {
  return (
    <section className="rounded-[16px] border border-[#d9cdcf] bg-white p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-[#221c1e]">Topics</h2>
        <p className="mt-0.5 text-xs text-[#8f8589]">Same list as the app</p>
      </div>

      <ul className="mt-4">
        {topics.map((topic, index) => (
          <li
            key={topic.id}
            className={cn(
              "flex items-center justify-between gap-3 py-2.5",
              index < topics.length - 1 && "border-b border-[#ebe3e3]",
            )}
          >
            <p className="text-sm text-[#221c1e]">{topic.name}</p>
            <p className="shrink-0 text-xs font-semibold text-[#6b6165]">
              {topic.members}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-[#ebe3e3] pt-5">
        <h3 className="text-sm font-semibold text-[#221c1e]">Secret Chats</h3>
        <ul className="mt-3 space-y-3">
          {secretRules.map((rule) => (
            <li
              key={rule.id}
              className="flex items-center justify-between gap-3"
            >
              <p className="text-sm text-[#6b6165]">{rule.label}</p>
              <span
                className={cn(
                  "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
                  toneStyles[rule.tone],
                )}
              >
                {rule.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { CommunityView } from "@/components/features/community";
import {
  communityKpis,
  communityMeta,
  communityTopics,
  moderationReports,
  secretChatRules,
} from "@/mock/community";

export default function CommunityPage() {
  return (
    <CommunityView
      meta={communityMeta}
      kpis={communityKpis}
      reports={moderationReports}
      topics={communityTopics}
      secretRules={secretChatRules}
    />
  );
}

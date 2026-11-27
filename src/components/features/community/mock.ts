import type {
  CommunityKpi,
  CommunityMeta,
  CommunityTopic,
  ModerationReport,
  SecretChatRule,
} from "./types";

export const communityMeta: CommunityMeta = {
  subtitle: "Moderation queue, topics and Secret Chats · FR-ADM-04 · FR-CMN",
  privacyTitle: "Moderators see community names only",
  privacyBody:
    "Posts appear as names like “Calm Heron”. Accounts, emails and tracked health data are never shown to moderators or other members.",
};

export const communityKpis: CommunityKpi[] = [
  {
    id: "pending",
    label: "Pending reports",
    value: "14",
    hint: "Reported through “Report post”",
    hintTone: "muted",
    icon: "flag",
  },
  {
    id: "median",
    label: "Median review time",
    value: "38 min",
    hint: "Target under 60 min",
    hintTone: "ok",
    icon: "clock",
  },
  {
    id: "removed",
    label: "Posts removed · 30d",
    value: "96",
    hint: "Harassment, misinformation, personal info",
    hintTone: "muted",
    icon: "shield",
  },
  {
    id: "secret",
    label: "Secret Chats active",
    value: "3,420",
    hint: "Private chats by community name",
    hintTone: "muted",
    icon: "message",
  },
];

export const moderationReports: ModerationReport[] = [
  {
    id: "CR-882",
    postedBy: "Gentle Fern",
    topic: "Trying to conceive",
    reason: "Misinformation",
    reported: "12 min ago",
    status: "pending",
  },
  {
    id: "CR-881",
    postedBy: "Quiet Willow",
    topic: "First trimester",
    reason: "Harassment",
    reported: "25 min ago",
    status: "pending",
  },
  {
    id: "CR-880",
    postedBy: "Calm Heron",
    topic: "Irregular cycles",
    reason: "Rule violation",
    reported: "1 hr ago",
    status: "pending",
  },
  {
    id: "CR-879",
    postedBy: "Soft Maple",
    topic: "Perimenopause",
    reason: "Personal info",
    reported: "2 hr ago",
    status: "in-review",
  },
  {
    id: "CR-878",
    postedBy: "Brave Wren",
    topic: "Trying to conceive",
    reason: "Misinformation",
    reported: "3 hr ago",
    status: "removed",
  },
  {
    id: "CR-877",
    postedBy: "Warm Linden",
    topic: "First trimester",
    reason: "Harassment",
    reported: "5 hr ago",
    status: "warning-sent",
  },
];

export const communityTopics: CommunityTopic[] = [
  { id: "ttc", name: "Trying to conceive", members: "1.2k members" },
  { id: "first-tri", name: "First trimester", members: "860 members" },
  { id: "irregular", name: "Irregular cycles", members: "640 members" },
  { id: "peri", name: "Perimenopause", members: "910 members" },
];

export const secretChatRules: SecretChatRule[] = [
  {
    id: "name-only",
    label: "Community name only",
    value: "Default on",
    tone: "ok",
  },
  {
    id: "requests",
    label: "New chat requests",
    value: "User choice",
    tone: "peach",
  },
  {
    id: "block",
    label: "Block and report",
    value: "Always available",
    tone: "teal",
  },
];

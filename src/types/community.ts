export type CommunityKpi = {
  id: string;
  label: string;
  value: string;
  hint: string;
  hintTone: "muted" | "ok";
  icon: "flag" | "clock" | "shield" | "message";
};

export type ModerationStatus =
  | "pending"
  | "in-review"
  | "removed"
  | "warning-sent";

export type ModerationReport = {
  id: string;
  postedBy: string;
  topic: string;
  reason: string;
  reported: string;
  status: ModerationStatus;
};

export type CommunityTopic = {
  id: string;
  name: string;
  members: string;
};

export type SecretChatRule = {
  id: string;
  label: string;
  value: string;
  tone: "ok" | "peach" | "teal";
};

export type CommunityMeta = {
  subtitle: string;
  privacyTitle: string;
  privacyBody: string;
};

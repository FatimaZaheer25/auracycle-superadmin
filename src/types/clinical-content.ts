export type ContentTopic =
  | "Cycle health"
  | "Fertility"
  | "Pregnancy"
  | "Perimenopause"
  | "Symptom Checker";

export type TopicFilter =
  | "all"
  | "Cycle health"
  | "Fertility"
  | "Pregnancy"
  | "Perimenopause";

export type AudienceTier = "General" | "Mature · gated";

export type ArticleStatus = "published" | "published-premium" | "needs-sign-off";

export type ClinicalKpi = {
  id: string;
  label: string;
  value: string;
  hint: string;
  hintTone: "ok" | "warn" | "danger" | "muted";
  icon: "phone" | "clock" | "shield" | "file";
};

export type ClinicalArticle = {
  id: string;
  title: string;
  topic: ContentTopic;
  audience: AudienceTier;
  status: ArticleStatus;
};

export type CheckerRow = {
  id: string;
  label: string;
  status: "available" | "not-available" | "pending" | "live";
};

export type HealthAssistantRule = {
  id: string;
  label: string;
  value: string;
};

export type ClinicalContentMeta = {
  subtitle: string;
  librarySubtitle: string;
  checkerSubtitle: string;
  assistantSubtitle: string;
};

export type ArticleVersion = {
  version: string;
  date: string;
  by: string;
  change: string;
};

export type ArticleReviewDetail = {
  id: string;
  title: string;
  versionLabel: string;
  submittedBy: string;
  body: string[];
  versions: ArticleVersion[];
  checklist: { id: string; label: string; checked: boolean }[];
  reviewer: string;
  reviewDate: string;
  commentDefault: string;
};

export type CheckerTopic = {
  id: string;
  name: string;
  status: "Needs sign-off" | "Live";
  versionLabel: string;
  patterns: string[];
  resultText: string;
  regions: string;
  reviewedBy: string;
};

export type AssistantSource = {
  id: string;
  source: string;
  topic: string;
  reviewedBy: string;
  lastReviewed: string;
};

export type RatingFlaggedItem = {
  id: string;
  article: string;
  currentTag: string;
  suggested: string;
  why: string;
};

export type ContentRatingReview = {
  storeRating: string;
  taggedGeneral: string;
  taggedMature: string;
  drifted: string;
  alert: string;
  flagged: RatingFlaggedItem[];
};

export type CheckerRegion = {
  id: string;
  label: string;
  on: boolean;
  status: string;
};

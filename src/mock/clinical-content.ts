import type {
  ArticleReviewDetail,
  AssistantSource,
  CheckerRegion,
  CheckerRow,
  CheckerTopic,
  ClinicalArticle,
  ClinicalContentMeta,
  ClinicalKpi,
  ContentRatingReview,
  HealthAssistantRule,
  TopicFilter,
} from "@/types/clinical-content";

export const clinicalContentMeta: ClinicalContentMeta = {
  subtitle:
    "Articles, Symptom Checker and Health Assistant · OB/GYN sign-off before publishing · FR-ADM-02",
  librarySubtitle:
    "Topics match the app: Cycle health, Fertility, Pregnancy, Perimenopause",
  checkerSubtitle: "Regional availability · FR-CHK-04",
  assistantSubtitle: "Premium · FR-AST",
};

export const clinicalKpis: ClinicalKpi[] = [
  {
    id: "published",
    label: "Published articles",
    value: "482",
    hint: "All clinically reviewed",
    hintTone: "ok",
    icon: "phone",
  },
  {
    id: "awaiting",
    label: "Awaiting sign-off",
    value: "2",
    hint: "Clinical Content Officer queue",
    hintTone: "warn",
    icon: "clock",
  },
  {
    id: "mature",
    label: "Mature-tier items",
    value: "64",
    hint: 'Behind the "Mature content" gate',
    hintTone: "danger",
    icon: "shield",
  },
  {
    id: "checker",
    label: "Symptom Checker topics",
    value: "3",
    hint: "PCOS · Endometriosis · Uterine fibroids",
    hintTone: "muted",
    icon: "file",
  },
];

export const topicFilters: { id: TopicFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Cycle health", label: "Cycle health" },
  { id: "Fertility", label: "Fertility" },
  { id: "Pregnancy", label: "Pregnancy" },
  { id: "Perimenopause", label: "Perimenopause" },
];

export const clinicalArticles: ClinicalArticle[] = [
  {
    id: "art-cycle-phases",
    title: "Understanding your cycle phases",
    topic: "Cycle health",
    audience: "General",
    status: "published",
  },
  {
    id: "art-bbt",
    title: "Tracking your temperature (BBT)",
    topic: "Fertility",
    audience: "General",
    status: "published",
  },
  {
    id: "art-fertile-window",
    title: "Your fertile window explained",
    topic: "Fertility",
    audience: "General",
    status: "published",
  },
  {
    id: "art-trimester",
    title: "Trimester checklist",
    topic: "Pregnancy",
    audience: "General",
    status: "published-premium",
  },
  {
    id: "art-menopause",
    title: "Menopause timeline",
    topic: "Perimenopause",
    audience: "General",
    status: "published",
  },
  {
    id: "art-sexual-health",
    title: "Sexual health and your cycle",
    topic: "Cycle health",
    audience: "Mature · gated",
    status: "published",
  },
  {
    id: "art-pregnancy-loss",
    title: "Pregnancy loss: next steps",
    topic: "Pregnancy",
    audience: "Mature · gated",
    status: "needs-sign-off",
  },
  {
    id: "art-pcos",
    title: "Understanding PCOS",
    topic: "Symptom Checker",
    audience: "General",
    status: "needs-sign-off",
  },
];

export const checkerRows: CheckerRow[] = [
  { id: "global", label: "Global", status: "available" },
  { id: "uk", label: "United Kingdom", status: "not-available" },
  { id: "eu", label: "European Union", status: "not-available" },
  { id: "pcos", label: "PCOS topic", status: "pending" },
  { id: "endo", label: "Endometriosis topic", status: "live" },
  { id: "fibroids", label: "Uterine fibroids topic", status: "live" },
];

export const healthAssistantRules: HealthAssistantRule[] = [
  {
    id: "kb",
    label: "Knowledge base",
    value: "Clinically reviewed only",
  },
  {
    id: "urgent",
    label: "Urgent concerns",
    value: "Redirects to a clinician",
  },
  {
    id: "conversation",
    label: "Conversation use",
    value: "This chat only, unless opted in",
  },
  {
    id: "labelling",
    label: "Labelling",
    value: "Educational, not medical advice",
  },
];

export const newArticleDefaults = {
  title: "What is a fertile window?",
  body: `A fertile window is the stretch of days in each cycle when pregnancy is most likely.

It usually sits around ovulation. The more cycles someone logs, the clearer the prediction becomes.

Predictions improve with history. They are not a guarantee.`,
  topic: "Fertility",
  audience: "General audience",
  premiumOnly: false,
};

export const articleReviewPcos: ArticleReviewDetail = {
  id: "art-pcos",
  title: "Understanding PCOS",
  versionLabel: "Version 3 · submitted Nov 18 by the Clinical Content Officer",
  submittedBy: "Clinical Content Officer",
  body: [
    "Polycystic ovary syndrome (PCOS) can affect periods, hormones and fertility. Common signs include irregular cycles, acne and changes in hair growth.",
    "This article is for education only. Only a healthcare provider can diagnose PCOS or recommend treatment.",
  ],
  versions: [
    {
      version: "v3",
      date: "Nov 18, 2026",
      by: "Clinical Content Officer",
      change: "Softened wording at key points",
    },
    {
      version: "v2",
      date: "Nov 12, 2026",
      by: "Clinical Content Officer",
      change: "Added medical disclaimer",
    },
    {
      version: "v1",
      date: "Nov 5, 2026",
      by: "Clinical Content Officer",
      change: "First draft",
    },
  ],
  checklist: [
    { id: "1", label: "Medically accurate and current", checked: true },
    { id: "2", label: "Educational, no diagnosis claims", checked: true },
    { id: "3", label: "Plain language, reading level fits", checked: true },
    { id: "4", label: "Disclaimer shown on the page", checked: true },
    { id: "5", label: "Audience tier is right (General)", checked: false },
  ],
  reviewer: "OB/GYN advisor",
  reviewDate: "Nov 19, 2026",
  commentDefault: "Please confirm the wording on 'irregular cycles'.",
};

export const checkerTopics: CheckerTopic[] = [
  {
    id: "topic-pcos",
    name: "PCOS",
    status: "Needs sign-off",
    versionLabel: "Version 2 · last reviewed Nov 12",
    patterns: ["Irregular cycles", "Acne", "Excess hair"],
    resultText:
      "These patterns can be linked to several conditions, including PCOS. Only a healthcare provider can say what is causing them.",
    regions: "Global · not UK or EU",
    reviewedBy: "OB/GYN advisor",
  },
  {
    id: "topic-endo",
    name: "Endometriosis",
    status: "Live",
    versionLabel: "Version 4 · last reviewed Oct 30",
    patterns: [
      "Painful periods",
      "Pelvic pain",
      "Heavy flow",
      "Pain with sex",
      "Bloating",
    ],
    resultText:
      "These patterns can be linked to several conditions, including endometriosis. Only a healthcare provider can say what is causing them.",
    regions: "Global · not UK or EU",
    reviewedBy: "OB/GYN advisor",
  },
  {
    id: "topic-fibroids",
    name: "Uterine fibroids",
    status: "Live",
    versionLabel: "Version 3 · last reviewed Oct 18",
    patterns: ["Heavy flow", "Pelvic pressure", "Frequent urination"],
    resultText:
      "These patterns can be linked to several conditions, including uterine fibroids. Only a healthcare provider can say what is causing them.",
    regions: "Global · not UK or EU",
    reviewedBy: "OB/GYN advisor",
  },
];

export const assistantSources: AssistantSource[] = [
  {
    id: "s1",
    source: "Understanding your cycle phases",
    topic: "Cycle health",
    reviewedBy: "OB/GYN advisor",
    lastReviewed: "Nov 4",
  },
  {
    id: "s2",
    source: "Your fertile window explained",
    topic: "Fertility",
    reviewedBy: "OB/GYN advisor",
    lastReviewed: "Oct 21",
  },
  {
    id: "s3",
    source: "Menopause timeline",
    topic: "Perimenopause",
    reviewedBy: "OB/GYN advisor",
    lastReviewed: "Nov 2",
  },
  {
    id: "s4",
    source: "Understanding PCOS",
    topic: "Symptom Checker",
    reviewedBy: "Waiting",
    lastReviewed: "—",
  },
];

export const assistantSafetyRules = [
  {
    id: "urgent",
    label: "Urgent or worrying symptoms",
    value: "Declines and points to a clinician",
  },
  {
    id: "every",
    label: "Every answer",
    value: "Labelled educational, not advice",
  },
  {
    id: "chat",
    label: "Conversation content",
    value: "Kept for that chat only, unless the person opts in",
  },
];

export const checkerRegions: CheckerRegion[] = [
  {
    id: "global",
    label: "Global (all other regions)",
    on: true,
    status: "Available",
  },
  {
    id: "uk",
    label: "United Kingdom",
    on: false,
    status: "Not available",
  },
  {
    id: "eu",
    label: "European Union",
    on: false,
    status: "Not available",
  },
  {
    id: "au",
    label: "New region: Australia",
    on: false,
    status: "Not available",
  },
];

export const contentRatingReview: ContentRatingReview = {
  storeRating: "Ages 3+",
  taggedGeneral: "418",
  taggedMature: "64",
  drifted: "6",
  alert:
    "6 articles read as more mature than their General tag. Re-tag and gate them behind the age confirmation step, or update the store rating disclosure. Either choice is logged.",
  flagged: [
    {
      id: "f1",
      article: "Sexual health and your cycle",
      currentTag: "General",
      suggested: "Mature · gated",
      why: "Explicit health education",
    },
    {
      id: "f2",
      article: "Pregnancy loss: next steps",
      currentTag: "General",
      suggested: "Mature · gated",
      why: "Sensitive subject matter",
    },
    {
      id: "f3",
      article: "Contraception and ovulation",
      currentTag: "General",
      suggested: "Mature · gated",
      why: "Adult content",
    },
  ],
};

export const unpublishDefaults = {
  articleId: "art-cycle-phases",
  title: "Understanding your cycle phases",
  seenBy: "12,480 people this month",
  savedBy: "They see 'No longer available'",
  linkedFrom: "2 other articles · links will break",
  reason: "Replacing with a clinically reviewed version.",
};

export function getArticleReview(
  contentId: string,
): ArticleReviewDetail | null {
  if (contentId === articleReviewPcos.id) return articleReviewPcos;
  const article = clinicalArticles.find((a) => a.id === contentId);
  if (!article || article.status !== "needs-sign-off") return null;
  return { ...articleReviewPcos, id: article.id, title: article.title };
}

export function getClinicalArticle(contentId: string): ClinicalArticle | null {
  return clinicalArticles.find((a) => a.id === contentId) ?? null;
}

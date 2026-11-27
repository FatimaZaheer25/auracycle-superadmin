import type {
  CustomSymptomsMeta,
  LibrarySymptom,
  SuggestedCustomSymptom,
  SymptomDetail,
  SymptomKpi,
} from "@/types/symptom-library";

export const symptomLibraryMeta = {
  totalCount: 74,
  subtitle: "74 supported symptoms — matches “Select symptoms” in the app",
};

export const symptomKpis: SymptomKpi[] = [
  {
    id: "all",
    label: "All symptoms",
    value: "74",
    hint: "Across 4 categories",
    filter: "all",
  },
  {
    id: "physical",
    label: "Physical",
    value: "30",
    hint: "30 listed",
    filter: "Physical",
  },
  {
    id: "emotional",
    label: "Emotional",
    value: "16",
    hint: "16 listed",
    filter: "Emotional",
  },
  {
    id: "discharge",
    label: "Discharge",
    value: "12",
    hint: "12 listed",
    filter: "Discharge",
  },
  {
    id: "other-sleep",
    label: "Other & Sleep",
    value: "16",
    hint: "16 listed",
    filter: "Other & Sleep",
  },
];

/** Top logged symptoms — counts match Figma */
export const librarySymptoms: LibrarySymptom[] = [
  {
    id: "sym-cramps",
    name: "Cramps",
    category: "Physical",
    logged30d: 612430,
  },
  {
    id: "sym-fatigue",
    name: "Fatigue",
    category: "Physical",
    logged30d: 588341,
  },
  {
    id: "sym-bloating",
    name: "Bloating",
    category: "Physical",
    logged30d: 540876,
  },
  {
    id: "sym-headache",
    name: "Headache",
    category: "Physical",
    logged30d: 498112,
  },
  {
    id: "sym-mood-swings",
    name: "Mood swings",
    category: "Emotional",
    logged30d: 455022,
  },
  {
    id: "sym-tender-breasts",
    name: "Tender breasts",
    category: "Physical",
    logged30d: 377205,
  },
  {
    id: "sym-calm",
    name: "Calm",
    category: "Emotional",
    logged30d: 301884,
  },
  {
    id: "sym-insomnia",
    name: "Insomnia",
    category: "Physical",
    logged30d: 214660,
  },
  {
    id: "sym-hot-flashes",
    name: "Hot flashes",
    category: "Physical",
    tag: "Perimenopause",
    logged30d: 128904,
  },
  {
    id: "sym-night-sweats",
    name: "Night sweats",
    category: "Physical",
    tag: "Perimenopause",
    logged30d: 96310,
  },
  {
    id: "sym-anxiety",
    name: "Anxiety",
    category: "Emotional",
    logged30d: 87450,
  },
  {
    id: "sym-spotting",
    name: "Spotting",
    category: "Discharge",
    logged30d: 71200,
  },
  {
    id: "sym-creamy",
    name: "Creamy discharge",
    category: "Discharge",
    logged30d: 58440,
  },
  {
    id: "sym-vivid-dreams",
    name: "Vivid dreams",
    category: "Other & Sleep",
    logged30d: 42100,
  },
  {
    id: "sym-restless-sleep",
    name: "Restless sleep",
    category: "Other & Sleep",
    logged30d: 38950,
  },
];

export const customSymptomsMeta: CustomSymptomsMeta = {
  entries30d: 18420,
  privacyNote: "Private to each user. Only grouped counts are visible.",
  thresholdNote:
    "A term is shown only when 1,000 or more people use it, so no one can be identified.",
};

export const suggestedCustomSymptoms: SuggestedCustomSymptom[] = [
  {
    id: "sug-brain-fog",
    name: "Brain fog",
    users: 3880,
    closestExisting: "Fatigue — no exact match",
  },
  {
    id: "sug-heartburn",
    name: "Heartburn",
    users: 2115,
    closestExisting: "Bloating — no exact match",
  },
  {
    id: "sug-pelvic-floor",
    name: "Pelvic floor tension",
    users: 1204,
    closestExisting: "Cramps — no exact match",
  },
];

export const symptomCategories = [
  "Physical",
  "Emotional",
  "Discharge",
  "Other & Sleep",
] as const;

export const symptomTags = ["None", "Perimenopause"] as const;

export const symptomLifeStages = [
  "Cycle tracking",
  "Trying to conceive",
  "Pregnant",
  "Perimenopause",
] as const;

export const addSymptomDefaults = {
  name: "Brain fog",
  category: "Physical" as const,
  tag: "None",
  lifeStages: [...symptomLifeStages],
  freePlan: true,
  previewNeighbors: ["Cramps", "Headache", "Bloating"],
  libraryAfter: {
    all: "74 → 75",
    physical: "30 → 31",
    suggestedBy: '3,880 people use "Brain fog"',
    shownAfter: "Review and publish",
  },
};

export function getLibrarySymptom(symptomId: string): SymptomDetail | null {
  const match = librarySymptoms.find((s) => s.id === symptomId);
  if (!match) return null;

  return {
    id: match.id,
    name: match.name,
    category: match.category,
    tag: match.tag ?? "None",
    lifeStages: [...symptomLifeStages],
    freePlan: true,
    peopleLogged30d: match.logged30d,
    shownIn: match.tag
      ? "Select symptoms · Perimenopause view"
      : "Select symptoms",
    status: "Active",
  };
}

export function getSuggestedSymptom(
  suggestionId: string,
): SuggestedCustomSymptom | null {
  return (
    suggestedCustomSymptoms.find((s) => s.id === suggestionId) ??
    suggestedCustomSymptoms[0] ??
    null
  );
}

export type SymptomCategory =
  | "Physical"
  | "Emotional"
  | "Discharge"
  | "Other & Sleep";

export type SymptomCategoryFilter = "all" | SymptomCategory;

export type SymptomKpi = {
  id: string;
  label: string;
  value: string;
  hint: string;
  filter: SymptomCategoryFilter;
};

export type LibrarySymptom = {
  id: string;
  name: string;
  category: SymptomCategory;
  tag?: string;
  logged30d: number;
};

export type SuggestedCustomSymptom = {
  id: string;
  name: string;
  users: number;
  closestExisting: string;
};

export type CustomSymptomsMeta = {
  entries30d: number;
  privacyNote: string;
  thresholdNote: string;
};

export type SymptomLifeStage =
  | "Cycle tracking"
  | "Trying to conceive"
  | "Pregnant"
  | "Perimenopause";

export type SymptomDetail = {
  id: string;
  name: string;
  category: SymptomCategory;
  tag: string;
  lifeStages: SymptomLifeStage[];
  freePlan: boolean;
  peopleLogged30d: number;
  shownIn: string;
  status: "Active" | "Retired";
};

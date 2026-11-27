export type AuditCategory =
  | "all"
  | "consent"
  | "deletion"
  | "content"
  | "legal"
  | "reveal";

export type AuditResultTone =
  | "lavender"
  | "peach"
  | "coral"
  | "warn"
  | "teal"
  | "muted"
  | "danger";

export type AuditEvent = {
  id: string;
  time: string;
  actor: string;
  action: string;
  target: string;
  result: string;
  resultTone: AuditResultTone;
  resultDot?: boolean;
  category: Exclude<AuditCategory, "all">;
};

export type AuditMeta = {
  subtitle: string;
  banner: string;
  dateLabel: string;
};

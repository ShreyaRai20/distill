export type Summary = {
  id: string;
  title: string;
  excerpt: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
};

export const PLAN_LIMIT = 3;

export type SummaryDetail = Summary & {
  summaryText: string;
  fileName: string | null;
  fileUrl: string;
};
export type Summary = {
  id: string;
  title: string;
  excerpt: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
  tldr: string | null
};

export const PLAN_LIMIT = 5;

export type SummaryDetail = {
  id: string;
  title: string;
  excerpt: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
  summaryText: string;
  fileName: string | null;
  fileUrl: string;
};
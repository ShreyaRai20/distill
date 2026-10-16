export type Summary = {
  id: string;
  title: string;
  excerpt: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
};

export const PLAN_LIMIT = 5;
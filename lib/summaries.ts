export type Summary = {
  id: string;
  title: string;
  excerpt: string;
  status: "completed" | "processing" | "failed";
  createdAt: Date;
};

export const PLAN_LIMIT = 5;

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

export async function getSummaries(): Promise<Summary[]> {
  // TODO: replace with a real database query later
  const now = Date.now();
  return [
    { id: "1", title: "Sous Sol Bar Menu", status: "completed", createdAt: new Date(now - 8 * MINUTE),
      excerpt: "Sip, Savor, Repeat: your ultimate drink guide. Enjoy carefully crafted cocktails, beers, wines and more." },
    { id: "2", title: "Nextjs Hot Tips Cheatsheet", status: "completed", createdAt: new Date(now - 1 * DAY),
      excerpt: "Level up your Next.js skills with a comprehensive guide to the framework's most useful tricks." },
    { id: "3", title: "Engineering Leadership Template", status: "completed", createdAt: new Date(now - 5 * DAY),
      excerpt: "Free templates and frameworks for running engineering teams." },
    { id: "4", title: "Product Leadership Handbook", status: "completed", createdAt: new Date(now - 5 * DAY),
      excerpt: "Insider secrets to build top-tier product teams." },
    { id: "5", title: "Sous Sol Bar Menu", status: "completed", createdAt: new Date(now - 6 * DAY),
      excerpt: "Your guide to delicious drinks: classic cocktails and unique house creations." },
  ];
}
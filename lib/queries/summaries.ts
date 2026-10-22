import { currentUser } from "@clerk/nextjs/server";
import { dbConnect } from "../db";
import { Summary } from "../summaries";
import { parseSummary } from "../parse-summary";

export async function getSummaries(): Promise<(Summary & {tldr: string | null})[] > {
  const user = await currentUser()

  if (!user) throw new Error("Not authorized")

  const sql = await dbConnect()

  const rows = await sql`
    SELECT * FROM pdf_summaries
    WHERE user_id = ${user.id}
    ORDER BY created_at DESC
    `;

  const summaries = rows.map((row) => (
      {
        id: row.id,
        title: row.title,
        excerpt: row.summary_text,
        status: row.status,
        createdAt: new Date(row.created_at)
      }
    )
  )

  const finalSummaries = summaries.map((summary)=> {
      const parsed = parseSummary(summary.excerpt)
      return {
        ...summary,
        tldr: parsed?.tldr ?? null
      }
      })

  return  finalSummaries
}

export async function getSummaryById(summaryId:  string) {
  const user = await currentUser()
  if (!user) throw new Error("Not authorized")

  console.log(`user: ${user.id}, summary: ${summaryId}`)
    
  const sql = await dbConnect()
  const rows = await sql`
      SELECT * FROM pdf_summaries
      WHERE id = ${summaryId} AND user_id = ${user.id}
    `;

  const row = rows[0];
  if (!row) return null;

  return {
    id: row.id,
    title: row.title ?? "Untitled summary",
    excerpt: row.summary_text,
    status: row.status,
    createdAt: new Date(row.created_at),
    summaryText: row.summary_text,
    fileName: row.file_name,
    fileUrl: row.original_file_url,
  };
}

export const MAX_SUMMARIES_TOTAL = 3;

export async function getSummaryUsage() {
  const user = await currentUser()
  if (!user) throw new Error("Not authorized")
  const sql = await dbConnect();
  const rows = await sql`
    SELECT count FROM summary_usage WHERE user_id = ${user.id}
  `;
  return { used: Number(rows[0]?.count ?? 0), limit: MAX_SUMMARIES_TOTAL };
}

// Returns true if a slot was reserved, false if the user is at the cap.
export async function reserveSummarySlot(userId: string, isPro: boolean) {
  if (isPro) return true;
  const sql = await dbConnect();

  await sql`
    INSERT INTO summary_usage (user_id) VALUES (${userId})
    ON CONFLICT (user_id) DO NOTHING
  `;

  // Check and increment in one statement so parallel uploads can't both pass.
  const rows = await sql`
    UPDATE summary_usage SET count = count + 1
    WHERE user_id = ${userId} AND count < ${MAX_SUMMARIES_TOTAL}
    RETURNING count
  `;
  return rows.length === 1;
}

// Only when processing failed and no pdf_summaries row was created.
// Never call this from the delete action.
export async function refundSummarySlot(userId: string) {
  const sql = await dbConnect();
  await sql`
    UPDATE summary_usage SET count = GREATEST(count - 1, 0)
    WHERE user_id = ${userId}
  `;
}

export async function isProUser() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) return false;

  const sql = await dbConnect();
  const rows = await sql`SELECT status FROM users WHERE email = ${email}`;
  return rows[0]?.status === "active"; // no row means Basic
}

export async function hasReachedUploadLimit() {
  if (await isProUser()) return false;
  const { used, limit } = await getSummaryUsage();
  return used >= limit;
}
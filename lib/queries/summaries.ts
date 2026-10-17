import { currentUser } from "@clerk/nextjs/server";
import { dbConnect } from "../db";
import { Summary } from "../summaries";
import { parseSummary } from "../parse-summary";

export async function getSummaries(): Promise<Summary[]> {
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
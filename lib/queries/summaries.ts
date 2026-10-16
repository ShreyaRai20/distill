import { currentUser } from "@clerk/nextjs/server";
import { dbConnect } from "../db";
import { Summary } from "../summaries";

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
    return summaries
}

export async function getSummaryById(summaryId:  string) {
    const user = await currentUser()
    if (!user) throw new Error("Not authorized")

    console.log(`user: ${user.id}, summary: ${summaryId}`)
    
    const sql = await dbConnect()
    const row = await sql`
        SELECT * FROM pdf_summaries
        WHERE id = ${summaryId} AND user_id = ${user.id}
        `;

    const summaries: Summary[] = row.map((row) => ({
      id: row.id,
      title: row.title,
      excerpt: row.summary_text,
      status: row.status,
      createdAt: new Date(row.created_at),
      }));

      return summaries;
}
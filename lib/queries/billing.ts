import "server-only";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "../db";

export async function isProUser() {
  const { userId } = await auth();
  if (!userId) return false;

  const sql = await dbConnect();
  const rows = await sql`
    SELECT 1 FROM users
    WHERE clerk_user_id = ${userId} AND status = 'active'
    LIMIT 1
  `;
  return rows.length > 0;
}

export async function getUploadCount() {
  const { userId } = await auth();
  if (!userId) return 0;

  const sql = await dbConnect();
  const rows = await sql`
    SELECT COUNT(*)::int AS count FROM pdf_summaries WHERE user_id = ${userId}
  `;
  return rows[0].count as number;
}
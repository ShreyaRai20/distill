// app/actions.ts
"use server";
import { dbConnect } from "@/lib/db";
import { Summary } from "@/lib/summaries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getData() {
    const sql = await dbConnect()
    const data = await sql`...`;
    return data;
}

export async function deleteSummaryById(summaryId:  string) {
    const user = await currentUser()
    if (!user) throw new Error("Not authorized")

    console.log(`user: ${user.id}, summary: ${summaryId}`)
    
    const sql = await dbConnect()
    const deletedSummary = await sql`
        DELETE FROM pdf_summaries
        WHERE id = ${summaryId} AND user_id = ${user.id}
        `;

    revalidatePath("/summaries")
    return deletedSummary ;
}

export async function isUserActive() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        throw new Error("Not authorized");
    }

    const sql = await dbConnect();

    const rows = await sql`
        SELECT status
        FROM users
        WHERE email = ${clerkUser.emailAddresses[0]?.emailAddress}
        LIMIT 1
    `;

    return rows[0]?.status === "active";
}
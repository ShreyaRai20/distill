// app/actions.ts
"use server";
import { dbConnect } from "@/lib/db";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const sql = await dbConnect()
    const data = await sql`...`;
    return data;
}
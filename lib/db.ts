// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function dbConnect() {
    if(!process.env.DATABASE_URL) {
        throw new Error("Neon database url is not defined")
    }

    return neon(process.env.DATABASE_URL);
}
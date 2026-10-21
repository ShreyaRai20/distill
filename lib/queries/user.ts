import { dbConnect } from "../db";

export async function getUserPriceId(email: string) {
    const sql = await dbConnect()
    const rows = await sql`
    SELECT price_id FROM users WHERE email=${email} and status ='active'
    `;

    const row = rows[0]

    return row ? row.price_id : null
}
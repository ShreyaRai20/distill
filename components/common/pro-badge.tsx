// import { isUserActive } from "@/app/actions/neon-db-actions"
// import { Badge } from "../ui/badge"
// import { dbConnect } from "@/lib/db";
// import { currentUser } from "@clerk/nextjs/server";
// import { plans } from "@/lib/plans";

// export async function ProBadge() {
//     const clerkUser = await currentUser();

//     if (!clerkUser) {
//         throw new Error("Not authorized");
//     }

//     const sql = await dbConnect();

//     const priceId = await sql`
//             SELECT priceId
//             FROM users
//             WHERE email = ${clerkUser.emailAddresses[0]?.emailAddress} AND status === 'active'
//             LIMIT 1
//         `;

//     const pricePlan = plans.find((plan) => plan.priceId === priceId)
//     return (
//         <Badge
//             variant="ghost"
//             className="gap-1.5 rounded-full px-3 py-1 text-primary hover:text-primary"
//         >
//             {pricePlan}
//         </Badge>
//     )
// }
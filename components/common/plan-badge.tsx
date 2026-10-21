import { plans } from "@/lib/plans"
import { getUserPriceId } from "@/lib/queries/user"
import { currentUser } from "@clerk/nextjs/server"

export default async function PlanBadge() {
    const user = await currentUser()
    if (!user) return null

    const email = user?.emailAddresses?.[0]?.emailAddress

    let priceId: string | null = null

    if (email) {
        priceId = await getUserPriceId(email)
    }

    let planName = 'Basic'

    const plan = plans.find(plan => plan.priceId === priceId)

    if (plan) {
        planName = plan.name
    }

    return (
        <>
            {planName}
        </>
    )
}
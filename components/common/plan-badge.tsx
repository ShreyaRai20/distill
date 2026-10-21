import Link from "next/link"
import { Crown, Sparkles } from "lucide-react"
import { plans } from "@/lib/plans"
import { getUserPriceId } from "@/lib/queries/user"
import { currentUser } from "@clerk/nextjs/server"

export default async function PlanBadge() {
    const user = await currentUser()
    if (!user) return null

    const email = user.primaryEmailAddress?.emailAddress
    const priceId = email ? await getUserPriceId(email) : null

    const plan = plans.find((p) => p.priceId === priceId)
    const isPro = plan?.name === "Pro"

    if (isPro) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Crown className="size-4" aria-hidden />
                Pro
            </span>
        )
    }

    return (
        <div className="inline-flex items-center overflow-hidden rounded-full border border-muted-foreground/60 text-sm">
            <span className="px-3 py-1 font-medium text-muted-foreground">
                Basic
            </span>

            <Link
                href="/pricing"
                className="border-l border-muted-foreground/40 px-3 py-1 font-semibold text-primary transition-colors hover:bg-primary/10"
            >
                Upgrade
            </Link>
        </div>
    )
}
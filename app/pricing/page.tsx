import Faq from "@/components/pricing/faq";
import PlanCard from "@/components/pricing/plan-card";
import UpgradeButton from "@/components/pricing/upgrade-button";
import { buttonVariants } from "@/components/ui/button";
import { plans } from "@/lib/plans";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Pricing() {
    return (
        <div className="mx-auto max-w-6xl px-8 pb-24 pt-20">
            <header className="text-center">
                <p className="text-sm font-semibold uppercase text-primary tracking-wider">
                    PRICING
                </p>
                <h1 className="mx-auto mt-3.5 max-w-3xl text-balance leading-[1.04] tracking-tight">
                    Start free, upgrade when you need more
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-xl leading-relaxed text-muted-foreground">
                    Five uploads on the house. Go Pro when your reading pile outgrows them.
                </p>
            </header>

            <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
                {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} action={
                        plan.name === "Basic" ?
                            (
                                <Link
                                    href="/upload" className={cn(
                                        buttonVariants({ variant: "outline", size: "lg" }),
                                        "rounded-full h-14 w-full text-lg font-semibold")}>
                                    Start free
                                </Link>
                            ) : plan.paymentLink ? (
                                <Link
                                    href={plan.paymentLink}
                                    className={cn(
                                        buttonVariants({ size: "lg" }),
                                        "h-14 w-full rounded-full text-lg font-semibold"
                                    )}
                                >
                                    Upgrade to Pro
                                </Link>
                            ) : (
                                <button disabled>
                                    Payment unavailable
                                </button>
                            )
                    } />
                ))}
            </div>
            <Faq />
        </div>
    )
}
import { isUserActive } from "@/app/actions/neon-db-actions";
import FeaturedSummaryCard from "@/components/summaries/featured-summary-card";
import SummaryCard from "@/components/summaries/summary-card";
import UsageMeter from "@/components/summaries/usage-meter";
import { getSummaries } from "@/lib/queries/summaries";
import { auth } from "@clerk/nextjs/server"
import { connection } from "next/server";
import { Suspense } from "react";

export const instant = false

async function SummariesContent() {
    await connection()
    const isActive = await isUserActive()
    const summaries = await getSummaries()
    const [latest, ...rest] = summaries;
    return (
        <>
            <header className="flex flex-wrap justify-between items-end gap-7">
                <div>
                    <h1 className="leading-[1.04] tracking-tight">Your Summaries</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Your PDFs, boiled down to the key points.
                    </p>
                </div>
                {!isActive && <UsageMeter used={summaries.length} limit={5} />}
            </header>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {latest && <FeaturedSummaryCard summary={latest} />}
                {rest.map((summary) => (
                    <SummaryCard key={summary.id} summary={summary} />
                ))}
            </div>
        </>
    )
}

export default async function SummariesPage() {
    await auth.protect();
    return (
        <div className="mx-auto max-w-7xl px-8 pb-24 pt-14">
            <Suspense fallback={< p className="text-muted-foreground">Loading...</p>} >
                <SummariesContent />
            </Suspense>
        </div >
    )
}
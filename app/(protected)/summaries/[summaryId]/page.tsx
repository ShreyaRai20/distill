import SummaryHeader from "@/components/summaries/summary-header";
import SummaryMarkdown from "@/components/summaries/summary-markdown";
import { getSummaryById } from "@/lib/queries/summaries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const instant = false

type Props = {
    params: Promise<{ summaryId: string }>;
    searchParams: Promise<{ new?: string }>;
};

export default async function SummaryId({ params, searchParams }: Props) {
    await auth.protect();

    const { summaryId } = await params
    const { new: justCreated } = await searchParams

    const summary = await getSummaryById(summaryId)
    if (!summary) return redirect("/summaries")
    // console.log(s)

    return (
        <div className="mx-auto max-w-7xl px-8 pt-14 pb-24">
            <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
                <SummaryHeader summary={summary[0]} isNew={justCreated === "1"} />
                <div className="mt-12 grid gap-18 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <main className="rounded-[28px] border border-primary bg-primary/5 p-6 md:p-">
                        <main className="rounded-[28px] border border-primary bg-primary/5 p-6 md:p-10">
                            <pre className="whitespace-pre-wrap">{summary[0].excerpt}</pre>
                        </main>
                        <SummaryMarkdown text={JSON.stringify(summary[0].excerpt)} />
                    </main>
                    <aside>{/* sidebar in step 4 */}</aside>
                </div>
            </Suspense>
        </div>
    )
}
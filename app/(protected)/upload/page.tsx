
import { toast } from "@/components/ui/toast";
import UploadForm from "@/components/upload/upload-form";
import UploadLimitNotice from "@/components/upload/upload-limit-notice";
import { UploadSkeleton } from "@/components/upload/upload-skeleton";
import { getSummaryUsage } from "@/lib/queries/summaries";
import { PLAN_LIMIT } from "@/lib/summaries";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "distill | upload pdf",
    description: "upload your pdf here and summarize it in key points",
};

export const instant = false;

export default async function Upload() {
    await auth.protect();
    if (await getSummaryUsage()) {
        return <UploadLimitNotice />
    }
    return (
        <div className="mx-auto max-w-7xl px-8 pt-14 pb-24">
            <Suspense fallback={<UploadSkeleton />}>
                <UploadContent />
            </Suspense>
        </div>
    )
}

async function UploadContent() {
    return (
        <>
            <h1 className="max-w-2xl text-balance leading-[1.02] tracking-tight">
                Turn any PDF into a
                <span className="whitespace-nowrap"> one-page </span>
                summary
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Reports, papers, contracts, meeting packs. Upload the file and read thekey points in under a minute.
            </p>
            <UploadForm />
        </>
    );
}

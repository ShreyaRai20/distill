import SampleCard from "@/components/upload/sample.card";
import UploadForm from "@/components/upload/upload-form";
import { UploadSkeleton } from "@/components/upload/upload-skeleton";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "distill | upload pdf",
    description: "upload your pdf here and summarize it in key points",
};

export default function Upload() {
    return (
        <div className="mx-auto max-w-5xl px-6 pt-14 pb-24">
            <Suspense fallback={<UploadSkeleton />}>
                <UploadContent />
            </Suspense>
        </div>
    )
}

async function UploadContent() {
    const user = await currentUser();
    if (!user) return redirect("/sign-in");

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
            <SampleCard />
        </>
    );
}

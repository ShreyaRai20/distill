import { UploadSkeleton } from "@/components/upload/upload-skeleton";
import { auth } from "@clerk/nextjs/server"
import { Suspense } from "react";

export const instant = false

export default async function Summaries() {

    await auth.protect();
    return (
        <Suspense fallback={<UploadSkeleton />}>
            summaries
        </Suspense>
    )
}
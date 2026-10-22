"use client";

import { useEffect } from "react";
import { toast } from "../ui/toast";
import { redirect, useRouter } from "next/navigation";

export default function UploadLimitNotice() {
    // const router = useRouter()


    useEffect(() => {
        toast.add({
            type: "warning",
            title: "Upload limit reached",
            description: "You have reached your upload limit. Please upgrade your plan to continue.",
        });
    }, []);

    // router.push("/summaries")
    return redirect("/summaries")
}
"use client"
import { deleteSummaryById } from "@/app/actions/neon-db-actions";
import { X } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";

export default function DeleteButton({ summaryId }: {
    summaryId: string
}) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            console.log("summaryId: ", summaryId)
            await deleteSummaryById(summaryId)
        })
    }


    return (
        <Button
            variant="secondary"
            className="bg-transparent"
            disabled={isPending}
            onClick={handleDelete}
        >
            <X />
        </Button>
    )
}
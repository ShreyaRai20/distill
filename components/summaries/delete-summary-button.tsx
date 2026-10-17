"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { Loader2, X } from "lucide-react"
import { useState, useTransition } from "react"
import { deleteSummaryById } from "@/app/actions/neon-db-actions"
import { useRouter } from "next/navigation"

export default function DeleteSummaryButton({ summaryId, screenCode }: { summaryId: string, screenCode: "summaries" | "summary" }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteSummaryById(summaryId)
                setOpen(false)

                if (screenCode === "summary") {
                    router.push("/summaries")
                } else {
                    router.refresh()
                }
            } catch (error) {
                console.error(error)
                setOpen(false)
                // optional: show a toast here, as in your upload form
            }
        })
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={(next) => {
                if (!isPending) setOpen(next)
            }}
        >
            <AlertDialogTrigger render={
                screenCode === "summaries" ? <Button
                    variant="secondary"
                    className="bg-transparent"
                    disabled={isPending}
                >
                    <X />
                </Button> :
                    <Button
                        variant="ghost"
                        className="h-11 w-full text-destructive hover:text-destructive"
                    >
                        Delete summary
                    </Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this summary?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This permanently removes the summary. It can&apos;t be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                        {isPending && <Loader2 className="size-4 animate-spin" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
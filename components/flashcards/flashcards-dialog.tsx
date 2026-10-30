"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "../ui/dialog"
import { Flashcard } from "@/lib/flashcards"
import FlashcardViewer from "./flashcard-viewer"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    cards: Flashcard[]
    usedToday: number
    isGenerating: boolean
    onGenerateMore: () => void
    error?: string | null
}

export default function FlashcardsDialog({ open, onOpenChange, ...viewer }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="gap-5 rounded-[28px] bg-card p-6 sm:p-8"
                style={{ maxWidth: "min(48rem, calc(100% - 2rem))" }}
            >
                <DialogTitle className="text-xl font-semibold tracking-tight">
                    Flashcards
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Study flashcards for this document. Click a card to flip it, and use
                    the arrow keys to move between cards.
                </DialogDescription>
                <FlashcardViewer {...viewer} />
            </DialogContent>
        </Dialog>
    )
}
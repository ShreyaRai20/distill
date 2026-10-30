"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Copy, FileText, Loader2 } from "lucide-react"
import { SummaryDetail } from "@/lib/summaries"
import { CARDS_PER_GENERATION, Flashcard } from "@/lib/flashcards"
import { generateFlashcards } from "@/app/actions/flashcard-actions"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "../ui/card"
import { Button, buttonVariants } from "../ui/button"
import SummaryActions from "./summary-actions"
import FlashcardsDialog from "../flashcards/flashcards-dialog"

export default function SummarySidebar({ summary }: { summary: SummaryDetail }) {
    const [open, setOpen] = useState(false)
    const [cards, setCards] = useState<Flashcard[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function generate(openAfter: boolean) {
        setIsGenerating(true)
        setError(null)

        const result = await generateFlashcards(
            summary.id,
            cards.map((card) => card.front)
        )

        setIsGenerating(false)

        if (!result.success) {
            setError(result.message)
            return
        }

        setCards((prev) => [...prev, ...result.cards])
        if (openAfter) setOpen(true)
    }

    return (
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-[24px] border border-primary">
                <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-[14px] border border-primary">
                            <Copy className="size-5 scale-x-[-1] transform text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="break-words text-lg font-semibold">
                                Study this document
                            </p>
                        </div>
                    </div>

                    <p className="text-muted-foreground">
                        Turn this summary into {CARDS_PER_GENERATION} flashcards in one click.
                    </p>

                    {cards.length === 0 ? (
                        <Button
                            className="h-12 w-full rounded-full text-base font-semibold"
                            disabled={isGenerating}
                            onClick={() => generate(true)}
                        >
                            {isGenerating && <Loader2 className="size-4 animate-spin" />}
                            {isGenerating
                                ? "Creating flashcards…"
                                : `Create ${CARDS_PER_GENERATION} flashcards`}
                        </Button>
                    ) : (
                        <Button
                            className="h-12 w-full rounded-full text-base font-semibold"
                            onClick={() => {
                                setError(null)
                                setOpen(true)
                            }}
                        >
                            Study flashcards
                        </Button>
                    )}

                    {error && !open && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <FlashcardsDialog
                        open={open}
                        onOpenChange={setOpen}
                        cards={cards}
                        usedToday={cards.length}
                        isGenerating={isGenerating}
                        error={error}
                        onGenerateMore={() => generate(false)}
                    />
                </CardContent>
            </Card>

            <Card className="rounded-[24px]">
                <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-[14px] border border-primary">
                            <FileText className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Original PDF
                            </p>
                            <p className="break-words font-semibold">
                                {summary.fileName ?? "Uploaded document"}
                            </p>
                        </div>
                    </div>
                    <a
                        href={summary.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        // optional: use variant: "outline" here so flashcards is the only filled button
                        className={cn(buttonVariants({ size: "lg" }), "h-12 w-full rounded-full")}
                    >
                        Open original PDF
                    </a>
                    <SummaryActions title={summary.title} text={summary.summaryText} />
                </CardContent>
            </Card>

            <div className="rounded-[24px] border-2 border-dashed border-primary p-6">
                <p className="text-lg font-semibold">Another PDF?</p>
                <p className="mt-1 text-muted-foreground">
                    Turn your next document into a one-page summary.
                </p>
                <Link
                    href="/upload"
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-primary"
                >
                    Upload a PDF
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </aside>
    )
}
"use client"
import { SummaryDetail } from "@/lib/summaries";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, Copy, FileText } from "lucide-react";
import SummaryActions from "./summary-actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import FlashcardsDialog from "../flashcards/flashcards-dialog";
import { useState } from "react";
import { CARDS_PER_GENERATION, Flashcard, sampleCards } from "@/lib/flashcards";
// change this import line
import { Button, buttonVariants } from "../ui/button";

export default function SummarySidebar({ summary }: { summary: SummaryDetail }) {
    const [open, setOpen] = useState(false)
    const [cards, setCards] = useState<Flashcard[]>(sampleCards)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateMore = async () => {
        setIsGenerating(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setCards((prev) => [
            ...prev,
            ...Array.from({ length: CARDS_PER_GENERATION }, (_, i) => ({
                id: `extra-${prev.length + i}`,
                topic: "Sample",
                front: `Sample question ${prev.length + i + 1}`,
                back: `Sample answer ${prev.length + i + 1}`,
            }))
        ])
        setIsGenerating(false)
    }
    return (
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-[24px] border border-primary">
                <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <div className="size-12 flex justify-center items-center shrink-0 rounded-[14px] border border-primary">
                            <Copy className="size-5 text-primary transform scale-x-[-1]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg wrap-break-words font-semibold">
                                Study this document
                            </p>
                        </div>
                    </div>
                    <p className="text-muted-foreground">
                        Turn this summary into {CARDS_PER_GENERATION} flashcards in one click.
                    </p>
                    <Button
                        className="h-12 w-full rounded-full text-base font-semibold"
                        onClick={() => setOpen(true)}
                    >
                        Study flashcards
                    </Button>
                    <FlashcardsDialog
                        open={open}
                        onOpenChange={setOpen}
                        cards={cards}
                        usedToday={cards.length}
                        isGenerating={isGenerating}
                        onGenerateMore={handleGenerateMore}
                    />
                </CardContent>
            </Card>
            <Card className="rounded-[24px]">
                <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <div className="size-12 flex justify-center items-center shrink-0 rounded-[14px] border border-primary">
                            <FileText className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Original PDF
                            </p>
                            <p className="wrap-break-word font-semibold">
                                {summary.fileName ?? "Uploaded document"}
                            </p>
                        </div>
                    </div>
                    <a
                        href={summary.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(buttonVariants({ size: "lg" }), "h-12 w-full rounded-full")}
                    >
                        Open original PDF
                    </a>
                    <SummaryActions title={summary.title} text={summary.summaryText} />
                </CardContent>
            </Card>
            <div className="rounded-[24px] border-2 border-dashed  border-primary p-6">
                <p className="text-lg font-semibold">
                    Another PDF?
                </p>
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
import { CARDS_PER_GENERATION, DAILY_CARD_LIMIT, Flashcard } from "@/lib/flashcards"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight, Loader2, Shuffle, Sparkles } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { number } from "zod"
import { cn } from "@/lib/utils"

type Props = {
    cards: Flashcard[]
    usedToday: number
    isGenerating: boolean
    onGenerateMore: () => void
}

function shuffledIndices(length: number) {
    const items = Array.from({ length }, (_, i) => i)
    for (let i = length - 1; i < 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]]
    }

    return items
}


function Face({
    back,
    text,
    hint,
    hidden
}: {
    back?: boolean
    text: string
    hint: string
    hidden: boolean
}
) {
    return (
        <span
            aria-hidden={hidden}
            className={cn(
                "absolute inset-0 flex flex-col rounded-3xl p-7 [backface-visibility:hidden]",
                back ? "bg-primary/10 [transform:rotateY(180deg)]" : "bg-background"
            )}
        >
            <span
                className={cn(
                    "text-xs font-semibold uppercase tracking-widest",
                    back ? "text-primary" : "text-muted-foreground"
                )}
            >
                {back ? "Answer" : "Question"}
            </span>
            <span
                className={cn(
                    "flex flex-1 items-center overflow-y-auto py-3 tracking-tight",
                    back
                        ? "text-xl font-medium leading-snug sm:text-2xl"
                        : "text-2xl font-semibold leading-tight sm:text-3xl"
                )}
            >
                {text}
            </span>
            <span className="text-sm text-muted-foreground">
                {hint}
            </span>
        </span>
    )
}

export default function FlashcardViewer({
    cards,
    usedToday,
    isGenerating,
    onGenerateMore,
}: Props) {
    const [order, setOrder] = useState<number[]>([])
    const [position, setPosition] = useState(0)
    const [flipped, setFlipped] = useState(false)

    // Shuffled order first, then any new cards appended at the end
    const indices = useMemo(() => {
        const known = new Set(order)
        const kept = order.filter((i) => i < cards.length)
        const extra = cards.map((_, i) => i).filter((i) => !known.has(i))
        return [...kept, ...extra]
    }, [order, cards])

    const total = indices.length
    const safePosition = Math.min(position, Math.max(total - 1, 0))
    const current = total > 0 ? cards[indices[safePosition]] : undefined

    const go = useCallback(
        (delta: number) => {
            setFlipped(false)
            setPosition((p) => Math.min(Math.max(p + delta, 0), Math.max(total - 1, 0)))
        },
        [total]
    )

    // Arrow keys move between cards while the modal is open
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "ArrowRight") go(1)
            if (e.key === "ArrowLeft") go(-1)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [go])

    function shuffle() {
        setOrder(shuffledIndices(cards.length))
        setPosition(0)
        setFlipped(false)
    }

    if (!current) {
        return <p className="py-16 text-center text-muted-foreground">No flashcards yet.</p>
    }

    const remaining = Math.max(0, DAILY_CARD_LIMIT - usedToday)
    const canGenerate = remaining >= CARDS_PER_GENERATION

    return (
        <div className="flex flex-col gap-6">
            {/* Progress */}
            <div className="flex items-center gap-3">
                <div className="h-1 flex-1 rounded-full bg-muted">
                    <div
                        className="h-1 rounded-full bg-primary transition-all"
                        style={{ width: `${((safePosition + 1) / total) * 100}%` }}
                    />
                </div>
                <span className="text-sm tabular-nums text-muted-foreground">
                    {safePosition + 1} / {total}
                </span>
            </div>

            {/* Card and arrows */}
            <div className="flex items-center gap-3 sm:gap-4">
                <Button
                    variant="secondary"
                    size="icon"
                    className="size-12 shrink-0 rounded-full sm:size-14"
                    onClick={() => go(-1)}
                    disabled={safePosition === 0}
                >
                    <ChevronLeft className="size-6" />
                    <span className="sr-only">Previous card</span>
                </Button>

                <button
                    key={current.id}
                    type="button"
                    onClick={() => setFlipped((f) => !f)}
                    className="relative h-[340px] min-w-0 flex-1 rounded-3xl text-left outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <span
                        className={cn(
                            "relative block size-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none",
                            flipped && "[transform:rotateY(180deg)]"
                        )}
                    >
                        <Face text={current.front} hint="Click to reveal the answer" hidden={flipped} />
                        <Face back text={current.back} hint="Click to see the question" hidden={!flipped} />
                    </span>
                </button>

                <Button
                    variant="secondary"
                    size="icon"
                    className="size-12 shrink-0 rounded-full sm:size-14"
                    onClick={() => go(1)}
                    disabled={safePosition === total - 1}
                >
                    <ChevronRight className="size-6" />
                    <span className="sr-only">Next card</span>
                </Button>
            </div>

            {/* Footer */}
            <div className="flex items-start justify-between gap-3">
                <Button variant="ghost" className="text-muted-foreground" onClick={shuffle}>
                    <Shuffle className="size-4" />
                    Shuffle
                </Button>

                <div className="flex flex-col items-end gap-1.5">
                    <Button
                        className="h-11 rounded-full bg-primary/10 px-5 font-semibold text-primary hover:bg-primary/20"
                        disabled={!canGenerate || isGenerating}
                        onClick={onGenerateMore}
                    >
                        {isGenerating ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Sparkles className="size-4" />
                        )}
                        {isGenerating
                            ? `Generating ${CARDS_PER_GENERATION} more…`
                            : canGenerate
                                ? `Generate ${CARDS_PER_GENERATION} more`
                                : "Daily limit reached"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        {remaining} of {DAILY_CARD_LIMIT} cards left today
                    </p>
                </div>
            </div>
        </div>
    )
}


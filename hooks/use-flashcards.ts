"use client"
import { CardStatus, Flashcard } from "@/lib/flashcards/types";
import { useCallback, useEffect, useState } from "react";

const DAILY_LIMIT = 30

const MOCK_POOL = [
  { topic: "Strategic IT acquisition", question: "What did Disney pay for a majority stake in BAMTech in 2017?", answer: "$1.58 billion, to give its future streaming business a technology foundation." },
  { topic: "Menu structure", question: "How is the drinks menu organized?", answer: "By drink type, which makes it quick to scan." },
  { topic: "Menu structure", question: "What opens each section of the menu?", answer: "A short description to help you pick." },
  { topic: "House drinks", question: "What sits next to the classic cocktails?", answer: "Original house creations." },
  { topic: "Beer and wine", question: "Why are beer and wine on the menu?", answer: "So there is a choice for every taste." },
];


export function useFlashcards(summaryId: string) {
    const [cards, setCards] = useState<Flashcard[]>([])
    const [phase, setPhase] = useState<"loading"| "ready" | "generating">("loading")
    const [error, setError] = useState<string | null>(null);
    const [usedToday, setUsedToday] = useState(0);
    const remaining = DAILY_LIMIT - usedToday;

    useEffect(() => {

    }, [])

    const generate = useCallback( async () => {
        setPhase("generating")
        setError(null)
        
        setPhase("ready")
    }, [remaining])

    const mark = useCallback((id: string, status: CardStatus)=> {
        setCards((cs) => cs.map( (c) => (c.id === id ? {...c, status}: c)) )
    }, [])

    return {}
}
"use server"

import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { getSummaryById } from "@/lib/queries/summaries"
import { generateFlashcardsFromPdf } from "@/components/summaries/ai/generate-flashcards"
import type { Flashcard } from "@/lib/flashcards"

type Result =
  | { success: true; cards: Flashcard[] }
  | { success: false; message: string }

const InputSchema = z.object({
  summaryId: z.string().uuid(),
  existingFronts: z.array(z.string().max(500)).max(300),
})

export async function generateFlashcards(
  summaryId: string,
  existingFronts: string[] = []
): Promise<Result> {
  const { userId } = await auth()
  if (!userId) return { success: false, message: "Please sign in to create flashcards." }

  const parsed = InputSchema.safeParse({ summaryId, existingFronts })
  if (!parsed.success) return { success: false, message: "Invalid request." }

  // Only returns the summary if it belongs to this user
  const summary = await getSummaryById(parsed.data.summaryId)
  if (!summary) return { success: false, message: "Summary not found." }

  try {
    const cards = await generateFlashcardsFromPdf({
      pdfUrl: summary.fileUrl,
      fileName: summary.fileName ?? summary.title,
      existingFronts: parsed.data.existingFronts.slice(-100),
    })

    if (cards.length === 0) {
      return {
        success: false,
        message: parsed.data.existingFronts.length
          ? "No more flashcards to generate from this document."
          : "We couldn't create flashcards from this PDF.",
      }
    }

    return { success: true, cards }
  } catch (error) {
    console.error("generateFlashcards failed:", error)
    return {
      success: false,
      message: "Something went wrong creating flashcards. Please try again.",
    }
  }
}
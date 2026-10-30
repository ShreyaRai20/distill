import "server-only"
import { extractText, getDocumentProxy } from "unpdf"
import { ChatGoogle } from "@langchain/google"
import { SystemMessage, HumanMessage } from "@langchain/core/messages"
import { z } from "zod"
import { CARDS_PER_GENERATION, type Flashcard } from "@/lib/flashcards"
import {
  FLASHCARDS_SYSTEM_PROMPT,
  buildFlashcardsUserPrompt,
} from "./flashcards-prompt"

const MAX_CHARS = 200_000

const OutputSchema = z.object({
  cards: z.array(
    z.object({
      topic: z.string().describe("Topic label of 1 to 3 words"),
      front: z.string().describe("The question, 25 words or fewer"),
      back: z.string().describe("The answer, 40 words or fewer"),
    })
  ),
})

const model = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  temperature: 0.3,
  apiKey: process.env.GOOGLE_API_KEY,
})

const structuredModel = model.withStructuredOutput(OutputSchema)

async function extractPdfText(pdfUrl: string) {
  const res = await fetch(pdfUrl)
  if (!res.ok) throw new Error(`Failed to download PDF: ${res.status}`)

  const pdf = await getDocumentProxy(new Uint8Array(await res.arrayBuffer()))
  const { text } = await extractText(pdf, { mergePages: false })
  return text.join("\n\n")
}

const normalize = (s: string) =>
  s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim()

async function invokeWithRetry(messages: [SystemMessage, HumanMessage]) {
  try {
    return await structuredModel.invoke(messages)
  } catch (error) {
    console.warn("Flashcard generation failed, retrying once", error)
    return await structuredModel.invoke(messages)
  }
}

export async function generateFlashcardsFromPdf({
  pdfUrl,
  fileName,
  existingFronts,
}: {
  pdfUrl: string
  fileName: string
  existingFronts: string[]
}): Promise<Flashcard[]> {
  const text = (await extractPdfText(pdfUrl)).slice(0, MAX_CHARS)

  // No text layer (a scanned PDF): nothing to learn from
  if (text.trim().length < 200) return []

  const result = await invokeWithRetry([
    new SystemMessage(FLASHCARDS_SYSTEM_PROMPT),
    new HumanMessage(buildFlashcardsUserPrompt(fileName, text, existingFronts)),
  ])

  // Clean up: trim, drop empties, drop duplicates, cap at 10
  const seen = new Set(existingFronts.map(normalize))
  const cards: Flashcard[] = []

  for (const card of result.cards) {
    const front = card.front.trim()
    const back = card.back.trim()
    const key = normalize(front)
    if (!front || !back || seen.has(key)) continue

    seen.add(key)
    cards.push({
      id: crypto.randomUUID(),
      topic: card.topic.trim() || "General",
      front,
      back,
    })
    if (cards.length === CARDS_PER_GENERATION) break
  }

  return cards
}
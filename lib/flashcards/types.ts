// lib/flashcards/types.ts
export type CardStatus = "new" | "learning" | "known";

export type Flashcard = {
  id: string;
  topic: string;
  question: string;
  answer: string;
  status: CardStatus;
};
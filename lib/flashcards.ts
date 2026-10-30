export type Flashcard = {
  id: string
  topic: string
  front: string
  back: string
}

export const CARDS_PER_GENERATION = 10
export const DAILY_CARD_LIMIT = 30

// Temporary data for building the UI. Replaced by real cards later.
export const sampleCards: Flashcard[] = [
  { id: "1", topic: "Acquisition", front: "What did Disney pay for a majority stake in BAMTech in 2017?", back: "$1.58 billion, to give its streaming business a technology foundation." },
  { id: "2", topic: "Launch", front: "When did Disney+ officially launch?", back: "November 12, 2019." },
  { id: "3", topic: "Reorganization", front: "What did Disney create in 2018 to centralize its streaming efforts?", back: "A Direct-to-Consumer and International segment, covering ESPN+ and Disney+." },
  { id: "4", topic: "Finances", front: "How large was Disney's streaming operating loss in 2023?", back: "$2.5 billion." },
  { id: "5", topic: "Finances", front: "What did the direct-to-consumer business produce in 2024?", back: "$22.8 billion in revenue and $143 million in operating income." },
  { id: "6", topic: "Strategy", front: "What was Disney's \"innovation dilemma\"?", back: "Investing heavily in streaming risked cannibalizing its profitable TV, theatrical and physical-media revenues." },
  { id: "7", topic: "Advantage", front: "Which content did Disney+ launch with?", back: "Disney's existing library: Pixar, Marvel, Star Wars and National Geographic." },
  { id: "8", topic: "Strategy", front: "What did cutting out intermediaries give Disney?", back: "Direct consumer relationships, behavioral data and recurring revenue." },
  { id: "9", topic: "Outlook", front: "Which disruptions does Disney still face?", back: "Artificial intelligence, market fragmentation, changing consumer habits and advertising technology." },
  { id: "10", topic: "Lesson", front: "Is digital transformation a one-time project?", back: "No. Organizations must keep monitoring technologies, trends and disruptions." },
]
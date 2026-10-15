import { extractText, getDocumentProxy } from "unpdf";
import { ChatGoogle } from "@langchain/google";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { buildSummaryUserPrompt, SUMMARY_SYSTEM_PROMPT } from "./prompt";

const MAX_CHARS = 200_000;

const model = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  temperature: 0.2,
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function fetchAndExtractPdfText(pdfUrl: string) {
  const res = await fetch(pdfUrl);
  if (!res.ok) throw new Error(`Failed to download PDF: ${res.status}`);

  const pdf = await getDocumentProxy(new Uint8Array(await res.arrayBuffer()));
  const { text } = await extractText(pdf, { mergePages: false });
  return text.join("\n\n");
}

export async function summarizePdfText(text: string, fileName: string) {
  const truncated = text.length > MAX_CHARS;
  const input = truncated ? text.slice(0, MAX_CHARS) : text;

  const result = await model.invoke([
    new SystemMessage(SUMMARY_SYSTEM_PROMPT),
    new HumanMessage(buildSummaryUserPrompt(fileName, input)),
  ]);

  const summary = result.text;

  return truncated
    ? `${summary}\n\n_Note: this document was long, so only the first part was summarized._`
    : summary;
}
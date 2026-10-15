import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { createAgent } from "langchain";
import { buildSummaryUserPrompt, SUMMARY_SYSTEM_PROMPT } from "./prompt";

const MAX_CHARS = 200_000;

const summarizerAgent = createAgent({
  model: "google:gemini-2.5-flash-lite",
  tools: [],
  systemPrompt: SUMMARY_SYSTEM_PROMPT,
});

export async function fetchAndExtractPdfText(pdfUrl: string) {
    const res = await fetch(pdfUrl)
    const blob = await res.blob()

    const arrayBuffer = await blob.arrayBuffer()

    const loader = new PDFLoader (new Blob([arrayBuffer]))

    const docs = await loader.load()

    return docs.map((doc)=> doc.pageContent).join("\n")
}


export async function summarizePdfText(text: string, fileName: string) {
  const truncated = text.length > MAX_CHARS;
  const input = truncated ? text.slice(0, MAX_CHARS) : text;
 
  const result = await summarizerAgent.invoke({
    messages: [
      { role: "user", content: buildSummaryUserPrompt(fileName, input) },
    ],
  });
 
  const content = result.messages[result.messages.length - 1].content;
 
  // content can be a string or an array of content blocks
  const summary =
    typeof content === "string"
      ? content
      : content
          .map((block: any) => (block.type === "text" ? block.text : ""))
          .join("");
 
  return truncated
    ? `${summary}\n\n_Note: this document was long, so only the first part was summarized._`
    : summary;
}
 
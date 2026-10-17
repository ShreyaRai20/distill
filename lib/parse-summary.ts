export type ParsedSummary = {
  tldr: string | null;
  keyPoints: string[];
  details: string | null;
  takeaways: string[];
  docType: string | null;
  note: string | null;
};

const toBullets = (block: string) =>
  block
    .split("\n")
    .map((line) => line.replace(/^\s*(?:[-*]|\d+\.)\s+/, "").trim())
    .filter(Boolean);

export function parseSummary(text: string): ParsedSummary | null {
  let body = text
    .trim()
    .replace(/^```(?:markdown|md)?[ \t]*\n/i, "")
    .replace(/\n```[ \t]*$/, "")
    .trim();

  let docType: string | null = null;
  const docMatch = body.match(/^[ \t]*Document type:[ \t]*(.+)$/im);
  if (docMatch) {
    docType = docMatch[1].trim();
    body = body.replace(docMatch[0], "").trim();
  }

  let note: string | null = null;
  const noteMatch = body.match(/^[ \t]*_?Note:[ \t]*(.+?)_?[ \t]*$/im);
  if (noteMatch) {
    note = noteMatch[1].trim();
    body = body.replace(noteMatch[0], "").trim();
  }

  let tldr: string | null = null;
  const tldrMatch = body.match(/^[ \t]*\*{0,2}TL;DR:?\*{0,2}:?[ \t]*(.+)$/im);
  if (tldrMatch) {
    tldr = tldrMatch[1].trim();
    body = body.replace(tldrMatch[0], "").trim();
  }

  const sections: Record<string, string> = {};
  for (const part of body.split(/^##\s+/m).slice(1)) {
    const [heading, ...rest] = part.split("\n");
    sections[heading.trim().toLowerCase()] = rest.join("\n").trim();
  }

  const keyPoints = toBullets(sections["key points"] ?? "");
  const details = sections["details"] ?? sections["full summary"] ?? null;
  const takeaways = toBullets(sections["key takeaways"] ?? "");

  if (!tldr && keyPoints.length === 0) return null;

  return { tldr, keyPoints, details, takeaways, docType, note };
}
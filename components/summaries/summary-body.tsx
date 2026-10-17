import { parseSummary } from "@/lib/parse-summary";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SummaryMarkdown from "./summary-markdown";
import { Check } from "lucide-react";

function Inline({ text }: { text: string }) {
    return (
        <ReactMarkdown
            components={{
                p: ({ children }) => <>{children}</>,
            }}
        >
            {text}
        </ReactMarkdown>
    )
}

export default function SummaryBody({ text }: { text: string }) {
    const parsed = parseSummary(text)

    if (!parsed) {
        return (
            <div>
                <SummaryMarkdown text={text} />
            </div>
        )
    }

    const { tldr, keyPoints, details, takeaways, docType, note } = parsed;
    return (
        <div className="flex min-w-0 flex-col gap-12">
            {tldr && (
                <section className="rounded-[28px] border border-primary bg-primary/5 p-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                        In short
                    </p>
                    <p className="mt-3 text-2xl font-medium leading-snug tracking-tight text-muted-foreground">
                        <Inline text={tldr} />
                    </p>
                </section>
            )}
            {keyPoints.length > 0 && (
                <section>
                    <h2 className="font-bold tracking-tight">
                        Key points
                    </h2>
                    <ul className="mt-5">
                        {keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-4 border-t py-5">
                                <span className="flex justify-center items-center size-10 text-primary border shrink-0 rounded-full border-primary text-sm font-bold">
                                    {i + 1}
                                </span>
                                <p className="text-lg leading-relaxed">
                                    <Inline text={point} />
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {details && (
                <section>
                    <h2 className="font-bold tracking-tight">
                        Details
                    </h2>
                    <div className="mt-5">
                        <SummaryMarkdown text={details} />
                    </div>
                </section>
            )}
            {takeaways.length > 0 && (
                <section>
                    <h2 className="font-bold tracking-tight">
                        Key takeaways
                    </h2>
                    <ul className="mt-5 space-y-4">
                        {takeaways.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="mt-1 size-5 shrink-0 text-primary" />
                                <p className="text-lg leading-relaxed">
                                    <Inline text={item} />
                                </p>
                            </li>
                        ))}
                    </ul>
                    {/* <ul className="mt-5">
                        {takeaways.map((items, i) => (
                            <li key={i} className="flex items-start gap-4 border-t py-5">
                                <span className="flex justify-center items-center size-10 text-primary border shrink-0 rounded-full border-primary text-sm font-bold">
                                    {i + 1}
                                </span>
                                <p className="text-lg leading-relaxed">
                                    <Inline text={items} />
                                </p>
                            </li>
                        ))}
                    </ul> */}
                </section>
            )}
            {docType && (
                <p className="text-sm text-muted-foreground">
                    Document type: {docType}
                </p>
            )}
            {note && (
                <p className="text-sm text-muted-foreground">
                    {note}
                </p>
            )}

        </div>
    )
}
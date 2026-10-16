import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function clean(text: string) {
    let t = text.trim();

    // stored with literal "\n" instead of real line breaks
    if (!t.includes("\n") && t.includes("\\n")) t = t.replace(/\\n/g, "\n");

    // model wrapped everything in a ```markdown fence
    t = t.replace(/^```(?:markdown|md)?[ \t]*\n/i, "").replace(/\n```[ \t]*$/, "");

    return t.trim();
}

export default function SummaryMarkdown({ text }: { text: string }) {
    return (
        <article className="max-w-2xl text-lg leading-8 text-foreground">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    /* eslint-disable @typescript-eslint/no-unused-vars */
                    h1: ({ node, ...p }) => <h2 className="mb-4 mt-10 text-3xl font-bold tracking-tight first:mt-0" {...p} />,
                    h2: ({ node, ...p }) => <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight first:mt-0" {...p} />,
                    h3: ({ node, ...p }) => <h3 className="mb-2 mt-8 text-xl font-semibold" {...p} />,
                    p: ({ node, ...p }) => <p className="mb-4" {...p} />,
                    ul: ({ node, ...p }) => <ul className="mb-4 list-disc space-y-2 pl-6 marker:text-primary" {...p} />,
                    ol: ({ node, ...p }) => <ol className="mb-4 list-decimal space-y-2 pl-6 marker:font-bold marker:text-primary" {...p} />,
                    strong: ({ node, ...p }) => <strong className="font-semibold" {...p} />,
                    a: ({ node, ...p }) => <a className="text-primary underline underline-offset-4" target="_blank" rel="noreferrer" {...p} />,
                    blockquote: ({ node, ...p }) => <blockquote className="my-4 border-l-2 border-primary pl-4 text-muted-foreground" {...p} />,
                    /* eslint-enable @typescript-eslint/no-unused-vars */
                }}
            >
                {clean(text)}
            </ReactMarkdown>
        </article>
    );
}
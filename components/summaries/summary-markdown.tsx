import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SummaryMarkdown({ text }: { text: string }) {
    return (
        <article>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: (p) => <h2 className="mb-4 mt-10 text-3xl font-bold tracking-tight first:mt-0" {...p} />,
                    h2: (p) => <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight" {...p} />,
                    h3: (p) => <h3 className="mb-2 mt-8 text-xl font-semibold" {...p} />,
                    p: (p) => <p className="mb-4" {...p} />,
                    ul: (p) => <ul className="mb-4 list-disc space-y-2 pl-6 marker:text-primary" {...p} />,
                    ol: (p) => <ol className="mb-4 list-decimal space-y-2 pl-6 marker:font-bold marker:text-primary" {...p} />,
                    strong: (p) => <strong className="font-semibold" {...p} />,
                    a: (p) => <a className="text-primary underline underline-offset-4" target="_blank" rel="noreferrer" {...p} />,
                    blockquote: (p) => <blockquote className="my-4 border-l-2 border-primary pl-4 text-muted-foreground" {...p} />,
                }}
            />
        </article>
    )
}
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCard({
    fileName,
    summary,
}: {
    fileName: string;
    summary: string;
}) {
    return (
        <Card className="mt-10">
            <CardHeader>
                <CardTitle className="truncate">Summary · {fileName}</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h2 className="mb-4 text-xl font-semibold">{children}</h2>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc space-y-3 pl-6 marker:text-primary">{children}</ul>
                        ),
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        p: ({ children }) => (
                            <p className="mt-4 text-sm text-muted-foreground">{children}</p>
                        ),
                    }}
                >
                    {summary}
                </ReactMarkdown>
            </CardContent>
        </Card>
    );
}
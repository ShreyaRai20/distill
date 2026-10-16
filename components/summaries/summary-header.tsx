import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Summary } from "@/lib/summaries";

export default function SummaryHeader({
    summary,
    isNew
}:
    {
        summary: Summary,
        isNew: boolean
    }) {
    return (
        <header>
            <Link
                href="/summaries"
                className="inline-flex min-h-11 items-center gap-2 text-muted-foreground font-semibold hover:text-foreground"
            >
                <ArrowLeft className="size-5" />
                Your Summaries
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge className="bg-primary/15 text-primary gap-2 hover:bg-primary/15">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Completed
                </Badge>
                {
                    isNew &&
                    <Badge
                        variant="outline"
                        className="border-primary text-primary"
                    >
                        New
                    </Badge>
                }
                <span className="text-muted-foreground text-sm">
                    Generated {formatDistanceToNow(summary.createdAt)}
                </span>
            </div>

            <h1 className="mt-5 max-3xl leading-[1.04] tracking-tight">
                {summary.title}
            </h1>
        </header>
    )
}
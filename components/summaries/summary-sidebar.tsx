import { SummaryDetail } from "@/lib/summaries";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import SummaryActions from "./summary-actions";
import DeleteSummaryButton from "./delete-summary-button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export default function SummarySidebar({ summary }: { summary: SummaryDetail }) {
    return (
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-[24px]">
                <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <div className="size-12 flex justify-center items-center shrink-0 rounded-[14px] border border-primary">
                            <FileText className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Original PDF
                            </p>
                            <p className="wrap-break-words font-semibold">
                                {summary.fileName ?? "Uploaded document"}
                            </p>
                        </div>
                    </div>
                    <a
                        href={summary.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(buttonVariants({ size: "lg" }), "h-12 w-full rounded-full")}
                    >
                        Open original PDF
                    </a>
                    <SummaryActions title={summary.title} text={summary.summaryText} />
                </CardContent>
            </Card>
            <div className="rounded-[24px] border-2 border-dashed  border-primary p-6">
                <p className="text-lg font-semibold">
                    Another PDF?
                </p>
                <p className="mt-1 text-muted-foreground">
                    Turn your next document into a one-page summary.
                </p>
                <Link
                    href="/upload"
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-primary"
                >
                    Upload a PDF
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </aside>
    )
}
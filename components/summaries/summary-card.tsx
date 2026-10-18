import type { Summary } from "@/lib/summaries";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ArrowRight, FileText, X } from "lucide-react";
import DeleteSummaryButton from "./delete-summary-button";

export default function SummaryCard({ summary }: { summary: (Summary & { tldr: string | null }) }) {
    return (
        <Card className="h-full rounded-[24px] px-2">
            <CardHeader>
                <div className="flex items-start gap-3.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-[14px] border bg-background">
                        <FileText className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                        <CardTitle className="text-lg leading-tight">{summary.title}</CardTitle>
                        <CardDescription>{formatDistanceToNow(summary.createdAt, { addSuffix: true })}</CardDescription>
                    </div>
                    {/* delete button goes here in a later step */}
                    <div className="ml-auto shrink-0">
                        <DeleteSummaryButton summaryId={summary.id} screenCode="summaries" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                    {summary.tldr}
                </p>
            </CardContent>
            <CardFooter className="mt-auto justify-between border-t-0 bg-transparent">
                <Badge className="gap-2 bg-primary/15 text-primary hover:bg-primary/15">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Completed
                </Badge>
                <Link
                    href={`/summaries/${summary.id}`}
                    className="font-semibold text-sm flex items-center"
                >
                    Read <ArrowRight />
                </Link>
            </CardFooter>
        </Card>
    )
}
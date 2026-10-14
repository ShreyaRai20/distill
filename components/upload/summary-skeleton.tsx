import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SummarySkeleton() {
    return (
        <Card className="mt-10" aria-busy="true">
            <CardHeader>
                <CardTitle>Summarizing your PDF...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[75%]" />
                <Skeleton className="h-4 w-[85%]" />
            </CardContent>
        </Card>
    );
}
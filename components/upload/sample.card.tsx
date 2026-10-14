import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SampleCard() {
    return (
        <div className="relative mt-20 h-64 overflow-hidden">
            <Card
                aria-hidden
                className="absolute h-56 left-2 top-4 w-3/5 origin-top-left -rotate-2 shadow-xl"
            >
                <CardHeader>
                    <CardTitle className="pt-4 pl-3 text-xl font-semibold">
                        Q3 market report
                    </CardTitle>
                </CardHeader>
                <CardContent className="mt-3 space-y-3.5">
                    <Skeleton className="h-4 ml-2 w-[92%] rounded-full bg-muted" />
                    <Skeleton className="h-4 ml-2 w-[92%] rounded-full bg-muted" />
                    <Skeleton className="h-4 ml-2 w-[92%] rounded-full bg-muted" />
                    <Skeleton className="h-4 ml-2 w-[92%] rounded-full bg-muted" />
                </CardContent>
            </Card>
            {/* <div className="absolute left-2 top-4 w-3/5 origin-top-left -rotate-2 rounded-xl border bg-card p-8 shadow-xl">
                    <p className="text-xl font-semibold">
                        Q3 market report
                    </p>
                    <div className="mt-6 space-y-3.5">
                        <div className="h-2 w-[92%] rounded-full bg-muted" />
                        <div className="h-2 w-[92%] rounded-full bg-muted" />
                        <div className="h-2 w-[92%] rounded-full bg-muted" />
                    </div>
                </div> */}
        </div>
    )
}
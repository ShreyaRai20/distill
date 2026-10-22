
import { cn } from "@/lib/utils";
import Link from "next/link";

type usageMeterProps = {
    used: number;
    limit: number
}

export default function UsageMeter({ used, limit }: usageMeterProps) {
    return (
        <div className="min-w-64 rounded-[24px] border bg-card px-5 py-4">
            <div className="flex gap-1.5">
                {
                    Array.from({ length: limit }).map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                "h-2 flex-1 rounded-full",
                                i < used ? "bg-primary" : "bg-muted"
                            )}
                        />
                    ))
                }
            </div>
            <div className="mt-3 flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                    {used} of {limit} uploads used
                </span>
                <Link
                    href="/pricing"
                    className="text-primary font-semibold"
                >
                    Upgrade to Pro
                </Link>
            </div>
        </div>
    )
}
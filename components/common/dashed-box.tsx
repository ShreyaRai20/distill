import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    radius?: number;
    children?: ReactNode;
};

export default function DashedBox({
    className,
    radius,
    children,
}: Props) {
    return (
        <div className={cn("relative", className)} style={{ borderRadius: radius }}>
            <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full text-primary"
            >
                <rect
                    width="100%"
                    height="100%"
                    rx={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="14 10"
                // className="border-dashed"
                />
            </svg>
            {children}
        </div>
    )
}
import { Plan } from "@/lib/plans"
import { ReactNode } from "react"
import { Card, CardContent } from "../ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Props =
    {
        plan: Plan,
        action: ReactNode
    }

export default function PlanCard({ plan, action }: Props) {
    return (
        <Card
            className={cn(
                "relative h-full rounded-[28px] overflow-visible",
                plan.recommended && "border border-primary bg-primary/5"
            )}
        >
            {
                plan.recommended && (
                    <span
                        className="absolute -top-3.5 left-9 bg-primary text-primary-foreground rounded-full px-3.5 py-1.5 text-sm font-bold uppercase tracking-wider"
                    >
                        Recommended
                    </span>
                )
            }
            <CardContent className="flex h-full flex-col p-8">
                <p className="text-xl font-semibold tracking-tight">
                    {plan.name}
                </p>
                <p className="mt-3.5 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight">
                        {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                        {plan.period}
                    </span>
                </p>
                <p className="mt-2 text-muted-foreground">
                    {plan.blurb}
                </p>
                <ul className="my-7 flex flex-col gap-4">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-lg leading-snug">
                            <Check className="mt-1 size-5 shrink-0 text-primary" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto">{action}</div>
            </CardContent>
        </Card>
    )
}
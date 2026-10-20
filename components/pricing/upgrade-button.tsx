
"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions/stripe-actions";

export default function UpgradeButton() {
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            size="lg"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await createCheckoutSession();
                });
            }}
            className="h-14 w-full rounded-full text-lg font-semibold"
        >
            {isPending ? "Redirecting..." : "Upgrade to Pro"}
        </Button>
    );
}

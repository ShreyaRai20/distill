import Link from "next/link";
import DashedBox from "../common/dashed-box";
import { Button } from "../ui/button";

export default function FinalCTASection() {
    return (
        <section className="mt-20">
            <DashedBox radius={36} className="bg-primary/5">
                <div className="relative flex flex-wrap items-center justify-between gap-7 px-8 py-12 md:px-12 md:py-14">
                    <div>
                        <h2 className="max-w-lg text-4xl font-fold leading-tight tracking-tight lg:text-5xl">
                            Your next PDF is one drop away
                        </h2>
                        <p className="mt-3.5 text-lg text-muted-foreground">
                            Start with 5 free uploads. Upgrade to Pro for unlimited.
                        </p>
                    </div>
                    <Link href="/upload">
                        <Button variant="default" className="h-14 px-8 rounded-full text-lg font-semibold">
                            Upload a PDF
                        </Button>
                    </Link>
                </div>
            </DashedBox>
        </section>
    )
}
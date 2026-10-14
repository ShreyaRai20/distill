import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="min-h-screen bg-background text-foreground">
            {/* mx-auto center the div from left and right, provides equal margin  from left and*/}
            {/* max-w-4xl - Never wider than 56rem (896px), so text doesn’t stretch across a huge monitor*/}
            {/* spacing is 1 = 4px, px-1 = 4px, 6*4 -> 24px,  pt-20 = 80px, pb-24 = 96px*/}
            <div className="mx-auto max-w-4xl px-6 pt-20 pb-24 text-center">
                <Badge
                    variant="outline"
                    className="gap-1.5 rounded-full border-emerald-200 bg-white/70 px-3 py-1 text-emerald-700"
                >
                    {/* size-3.5 -> 14px */}
                    <Sparkles className="size-3.5" />
                    Powered by AI
                </Badge>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                    Turn long PDFs into clear takeaways
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600 text-pretty">
                    Drop in a document and get a swipeable summary in seconds
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                        size="lg"
                        className="group h-12 rounded-full bg-stone-900 px-7 text-base hover:bg-stone-800"
                        nativeButton={false}
                        render={<Link href="/dashboard" />}
                    >
                        Try Distill free
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        className="h-12 rounded-full px-7 text-base hover:bg-stone-200 hover:text-stone-900"
                        nativeButton={false}
                        render={<Link href="#demo" />}
                    >
                        See an example
                    </Button>
                </div>
            </div>
        </section>
    )
}
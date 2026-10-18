import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
import DashedBox from "../common/dashed-box";

export default function HeroSection() {
    return (
        <section className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
                <Badge variant="outline" className="text-primary border-primary text-sm px-1.5 py-3.5">
                    PDF summaries in under a minute
                </Badge>
                <h1 className="mt-6 text-balance leading-[1.01] tracking-tighter">
                    Turn any PDF into a <span className="whitespace-nowrap">one-page</span> summary
                </h1>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
                    Reports, papers, contracts, meeting packs. Drop in the file and read the key points before your coffee cools.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                    <Link href="/upload">
                        <Button variant="default" className="h-14 px-8 rounded-full text-lg font-semibold">
                            Upload a PDF
                        </Button>
                    </Link>
                    <Link href="#how-it-works" className="bg-transparent">
                        <Button variant="outline" className="h-14 px-7 rounded-full text-lg font-semibold bg-transparent">
                            See how it works
                        </Button>
                    </Link>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">Free plan includes 5 uploads. Your files stay private to your account.</p>
            </div>
            <div className="relative h-115" aria-hidden>
                <DashedBox radius={32} className="absolute bottom-0 left-6 right-0 top-10 opacity-60" />
                <Card className="absolute left-0 right-9 top-0 -rotate-2 rounded-[28px] shadow-xl">
                    <CardContent className="space-y-5">
                        <Badge className="bg-primary/15 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/15">
                            IN SHORT
                        </Badge>
                        <p className="text-2xl font-semibold tracking-tight">
                            Q3 market report
                        </p>
                        <div className="flex flex-col gap-2">
                            {/* bar */}
                            <Bar w="96%" />
                            <Bar w="84%" />
                        </div>
                        <div className="space-y-5 pt-2">
                            {/* point */}
                            <Point n={1} a="90%" b="60%" />
                            <Point n={2} a="84%" b="52%" />
                            <Point n={3} a="902" b="48%" />
                        </div>
                    </CardContent>
                </Card>
            </div>

        </section >
        // <section className="min-h-screen bg-background text-foreground">
        //     <div className="mx-auto max-w-4xl px-6 pt-20 pb-24 text-center">
        //         <Badge
        //             variant="outline"
        //             className="gap-1.5 rounded-full border-primary bg-secondary px-3 py-1 text-primary"
        //         >
        //             {/* size-3.5 -> 14px */}
        //             <Sparkles className="size-3.5" />
        //             Powered by AI
        //         </Badge>
        //         <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
        //             Turn long PDFs into clear takeaways
        //         </h1>
        //         <p className="mx-auto mt-6 max-w-xl text-lg text-stone-600 text-pretty">
        //             Drop in a document and get a swipeable summary in seconds
        //         </p>
        //         <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        //             <Button
        //                 size="lg"
        //                 className="group h-12 rounded-full bg-secondary px-7 text-primary hover:bg-stone-800"
        //                 nativeButton={false}
        //                 render={<Link href="/dashboard" />}
        //             >
        //                 Try Distill free
        //                 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        //             </Button>
        //             <Button
        //                 size="lg"
        //                 variant="ghost"
        //                 className="h-12 rounded-full px-7 text-base hover:bg-stone-200 hover:text-stone-900"
        //                 nativeButton={false}
        //                 render={<Link href="#demo" />}
        //             >
        //                 See an example
        //             </Button>
        //         </div>
        //     </div>
        // </section>
    )
}


function Bar({ w }: { w: string }) {
    return <div className={`h-2.5 w-[${w}] rounded-full bg-muted`} />
}

function Point({ n, a, b }: { n: number; a: string; b: string }) {
    return (
        <div className="flex items-center gap-3.5">
            <span className="flex size-9 shrink-0 items-center border border-primary rounded-full justify-center text-primary font-bold text-sm">
                {n}
            </span>
            <div className="flex flex-1 flex-col gap-2">
                <Bar w={a} />
                <Bar w={b} />
            </div>
        </div>
    )
}
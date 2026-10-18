import { Card, CardContent } from "../ui/card";

const features = [
    {
        title: "Built for scanning",
        text: "A short in-short line, then numbered key points with bold labels.",
    },
    {
        title: "The original is one click away",
        text: "Open the source PDF from any summary to check a detail.",
    },
    {
        title: "Private to your account",
        text: "Only you can open the summaries you create.",
    },
    {
        title: "Take it with you",
        text: "Copy a summary or download it as Markdown.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="mt-20">
            <p className="uppercase tracking-widest text-sm font-semibold text-primary">
                WHY DISTILL
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
                Made for scanning, not scrolling
            </h2>
            <div className="mt-11 grid gap-5 md:grid-cols-2">
                {features.map((feature, i) => (
                    <Card key={feature.title} className="rounded-[14px] border border-muted-foreground/5">
                        <CardContent>
                            <span className="flex size-11 text-primary items-center justify-center rounded-full font-bold border border-primary">
                                {i + 1}
                            </span>
                            <p className="mt-5 text-2xl font-semibold tracking-tight">
                                {feature.title}
                            </p>
                            <p className="mt-2.5 text-lg leading-relaxed text-muted-foreground">
                                {feature.text}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
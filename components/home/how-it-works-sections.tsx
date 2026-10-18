import { Card, CardContent } from "../ui/card";

const steps = [
    { title: "Upload", text: "Drop in a PDF up to 32 MB, or browse for it." },
    { title: "Distill", text: "Distill reads the document and pulls out what matters." },
    { title: "Read", text: "Get an in-short line, numbered key points and the details." },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="mt-20 scroll-mt-24">
            <p className="uppercase tracking-widest text-sm font-semibold text-primary">
                HOW IT WORKS
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
                Three steps from a long PDF to a short read
            </h2>
            <div className="mt-11 grid gap-5 md:grid-cols-3">
                {steps.map((step, i) => (
                    <Card key={step.title} className="rounded-[14px] border border-muted-foreground/5">
                        <CardContent>
                            <span className="flex size-11 text-primary items-center justify-center rounded-full font-bold border border-primary">
                                {i + 1}
                            </span>
                            <p className="mt-5 text-2xl font-semibold tracking-tight">
                                {step.title}
                            </p>
                            <p className="mt-2.5 text-lg leading-relaxed text-muted-foreground">
                                {step.text}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
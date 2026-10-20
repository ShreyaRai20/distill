const questions = [
    {
        q: "What counts as an upload?",
        a: "Each PDF you summarize uses one of your uploads on the Basic plan.",
    },
    {
        q: "Are my PDFs private?",
        a: "Yes. Only you can open the summaries you create.",
    },
    {
        q: "How do I upgrade?",
        a: "Choose Pro, check out, and the upload limit is lifted on your account.",
    },
];

export default function Faq() {
    return (
        <section className="mx-auto mt-28 max-w-3xl">
            <h2 className="mb-7 text-4xl font-semibold tracking-tight">
                Questions
            </h2>
            <dl>
                {questions.map(({ q, a }) => (
                    <div key={q} className="border-t py-6">
                        <dt className="text-2xl font-semibold">{q}</dt>
                        <dd className="mt-2 text-lg leading-relaxed text-muted-foreground">{a}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
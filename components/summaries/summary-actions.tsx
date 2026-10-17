"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Check, CheckLine, Copy, Download } from "lucide-react"

export default function SummaryActions({ title, text }: { title: string, text: string }) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const download = async () => {
        const blob = new Blob([text], { type: "text/pdf" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${title.replace(/\.pdf$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="flex flex-col gap-4">
            <Button variant="outline" className="w-full h-12 rounded-full font-bold" onClick={copy}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy summary"}
            </Button>

            <Button variant="outline" className="w-full h-12 rounded-full font-bold" onClick={download}>
                <Download className="size-4" />
                Download as Markdown
            </Button>
        </div>
    )
}
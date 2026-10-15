export async function fetchAndExtractPdfText(pdfUrl: string) {
    const res = await fetch(pdfUrl)
    const blob = await res.blob()

    const arrayBuffer = await blob.arrayBuffer()

}
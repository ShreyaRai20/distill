"use server"

import { fetchAndExtractPdfText, summarizePdfText } from "@/lib/generate-summary";

type UploadResponse = {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}[];

export async function generatePdfSummary(uploadResponse: UploadResponse) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "file upload failed",
            data: null
        }
    } 

    const {
        serverData: {
            userId,
            file: {url: pdfUrl, name: pdfName}
        },
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: "file upload failed",
            data: null
        }
    } 

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl)
        if (!pdfText.trim()) {
            return {
                success: false,
                message: "Couldn't read any text from this PDF (it may be scanned).",
                data: null,
            };
        }

        const summary = await summarizePdfText(pdfText, pdfName)
        return {
                success: true,
                message: "Summary generated successfully",
                data: { fileName: pdfName, summary },
            };
    } catch (error) {
        console.error("generatePdfSummary error:", error)
        return {
            success: false,
            message: "Failed to generate summary. Please try again.",
            data: null
        }
    }
}
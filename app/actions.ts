"use server"

import { fetchAndExtractPdfText } from "@/lib/langchain";

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: String;
        file: {
            url: string,
            name: string
        }
    }
}]) {
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
    } catch (error) {
        return {
            success: false,
            message: "file upload failed",
            data: null
        }
    }
}
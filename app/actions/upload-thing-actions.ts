"use server"

import { dbConnect } from "@/lib/db";
import { fetchAndExtractPdfText, summarizePdfText } from "@/lib/generate-summary";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type UploadResponse = {
  serverData: {
    file: {
      url: string;
      name: string;
    };
  };
}[];

// Only fetch files hosted by UploadThing
function isAllowedFileUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    return (
      url.protocol === "https:" &&
      (url.hostname === "utfs.io" || url.hostname.endsWith(".ufs.sh"))
    );
  } catch {
    return false;
  }
}

export async function generatePdfSummary(uploadResponse: UploadResponse) {
  if (!uploadResponse?.length) {
    return { success: false, message: "file upload failed", data: null };
  }

  const { url: pdfUrl, name: pdfName } = uploadResponse[0].serverData.file;

  if (!pdfUrl || !isAllowedFileUrl(pdfUrl)) {
    return { success: false, message: "Invalid file URL", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    if (!pdfText.trim()) {
      return {
        success: false,
        message: "Couldn't read any text from this PDF (it may be scanned).",
        data: null,
      };
    }

    const summary = await summarizePdfText(pdfText, pdfName);

    const { userId } = await auth();

    if (userId) {
      try {
        const savedSummary = await savePdfSummary({
          userId,
          fileUrl: pdfUrl,
          fileName: pdfName,
          summary,
        });
        console.log(savedSummary)
        //  revalidate
        revalidatePath(`/summaries/${savedSummary}`)
        
      } catch (error) {
        // the summary is still returned; the failure is already logged in savePdfSummary
        console.error("Failed to persist summary:", error);
      }
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: { fileName: pdfName, summary },
    };
  } catch (error) {
    console.error("generatePdfSummary error:", error);
    return {
      success: false,
      message: "Failed to generate summary. Please try again.",
      data: null,
    };
  }
}

type SavePdfSummaryParams = {
  userId: string;
  fileUrl: string;
  fileName: string;
  title?: string;
  summary: string;
};

async function savePdfSummary({
  userId,
  fileUrl,
  fileName,
  title,
  summary,
}: SavePdfSummaryParams) {
  try {
    const sql = await dbConnect();
    const [row] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title ?? fileName},
        ${fileName}
      )
      RETURNING id
    `;

    console.log("row: ",row)

    return row;
  } catch (error) {
    console.error("error saving the pdf summary", error);
    throw error;
  }
}
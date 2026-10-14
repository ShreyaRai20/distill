import z from "zod";

export const uploadSchema = z.object({
    file: z
    .instanceof(File)
    .refine(
        (file) => file.type === "application/pdf",
        "Only pdf files are allowed"
    )
    .refine(
        (file) => file.size <= 32 * 1024 * 1024,
        "File size must be 32 MB or less."
    )
})
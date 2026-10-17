"use client"
import { FileText, FileUp, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadSchema } from "@/lib/schema";
import { useEffect, useState } from "react";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useUploadThing } from "@/utils/uploadthing";
import { cn } from "@/lib/utils";
import { toast } from "../ui/toast";
import { generatePdfSummary } from "@/app/actions/upload-thing-actions";
import SummarySkeleton from "./summary-skeleton";
import { useRouter } from "next/navigation";

function formatSize(bytes: number) {
    return bytes < 1024 * 1024
        ? `${Math.max(1, Math.round(bytes / 1024))} KB`
        : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function UploadForm() {
    const router = useRouter()
    const [dragging, setDragging] = useState(false)
    const [isSummarizing, setIsSummarizing] = useState(false)
    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        mode: "onChange",
        defaultValues: {
            file: undefined
        }
    })

    useEffect(() => {
        // Runs when the page is hidden (navigating away) or unmounted
        return () => {
            form.reset()
            setIsSummarizing(false)
        }
    }, [form])

    const { startUpload, isUploading } = useUploadThing("pdfUploader", {
        onClientUploadComplete: (res) => {
            console.log("Done:", res);
        },
        onUploadError: (err) => {
            form.setError("file", { message: err.message });
        },
    });

    const handleSubmit = async (data: z.infer<typeof uploadSchema>) => {
        const res = await startUpload([data?.file])

        if (!res) {
            form.setError("file", { message: "Upload failed. Please try again." })
            return
        }

        toast.add({
            type: "success",
            description: "file uploaded successfully"
        })

        setIsSummarizing(true)
        try {
            const result = await generatePdfSummary(res)

            if (!result.success || !result.data) {
                form.setError("file", { message: result.message })
                setIsSummarizing(false)
                return
            }

            router.push(`/summaries/${result.data.savedSummaryId}?new=1`)
            // no setIsSummarizing(false) on success: keep the skeleton and button
            // in the loading state until the new page replaces this one
        } catch (error) {
            console.error(error)
            form.setError("file", { message: "Something went wrong. Please try again." })
            setIsSummarizing(false)
        }
    }

    return (
        <>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mt-12"
            >
                <FieldGroup>
                    <Controller
                        name="file"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const file = field.value as File | undefined
                            return (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="pdf-upload" className="sr-only">
                                        PDF file
                                    </FieldLabel>

                                    <div
                                        onDragOver={(e) => {
                                            e.preventDefault()
                                            setDragging(true)
                                        }}
                                        onDragLeave={() => setDragging(false)}
                                        onDrop={(e) => {
                                            e.preventDefault()
                                            setDragging(false)
                                            field.onChange(e.dataTransfer.files[0])
                                        }}
                                        className={cn(
                                            "mt-4 flex items-center gap-6 rounded-[28px] border-2 border-dashed border-primary p-8 transition-colors",
                                            file && "bg-primary/5",
                                            dragging && "bg-primary/10",
                                            fieldState.invalid && "border-destructive"
                                        )}
                                    >
                                        <div className="flex size-20 shrink-0 items-center justify-center rounded-[22px] border bg-card">
                                            {file ? (
                                                <FileText className="size-8 text-primary" />
                                            ) : (
                                                <FileUp className="size-8 text-primary" />
                                            )}
                                        </div>

                                        {file ? (
                                            <div className="flex min-w-0 flex-1 items-center gap-4">
                                                <div className="min-w-0">
                                                    <p className="truncate text-xl font-semibold">{file.name}</p>
                                                    <p className="text-muted-foreground">
                                                        {formatSize(file.size)} · {isUploading ? "Uploading..." : "Ready to summarize"}
                                                    </p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="ml-auto shrink-0 rounded-full"
                                                    disabled={isUploading}
                                                    onClick={() => form.resetField("file")}
                                                >
                                                    <X className="size-5" />
                                                    <span className="sr-only">Remove file</span>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-xl font-semibold">
                                                    Drop your PDF here, or{" "}
                                                    <label
                                                        htmlFor="pdf-upload"
                                                        className="cursor-pointer text-primary underline underline-offset-4"
                                                    >
                                                        browse files
                                                    </label>
                                                </p>
                                                <p className="mt-1 text-muted-foreground">PDF only, up to 32 MB</p>
                                            </div>
                                        )}
                                    </div>

                                    <Input
                                        id="pdf-upload"
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        className="sr-only"
                                        aria-invalid={fieldState.invalid}
                                        onBlur={field.onBlur}
                                        onChange={(e) => {
                                            field.onChange(e.target.files?.[0])
                                            e.target.value = ""
                                        }}
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )
                        }
                        }
                    />
                </FieldGroup>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isUploading || isSummarizing}
                        className="h-14 px-8 rounded-full text-lg font-semibold"
                    >
                        {(isUploading || isSummarizing) && <Loader2 className="size-5 animate-spin" />}
                        {isUploading ? "Uploading..." : isSummarizing ? "Summarizing..." : "Summarize PDF"}
                    </Button>
                    <p className="text-muted-foreground">
                        Your file stays private to your account.
                    </p>
                </div>
            </form>
        </>
    )
}
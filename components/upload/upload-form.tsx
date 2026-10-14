"use client"
import { FileUp, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadSchema } from "@/lib/schema";
import { useTransition } from "react";
import z from "zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function UploadForm() {
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {
            file: undefined
        }
    })

    const handleSubmit = (data: z.infer<typeof uploadSchema>) => {
        startTransition(async () => {
            console.log(data.file)
        })
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FieldGroup>
                    <Controller
                        name="file"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <label
                                    htmlFor="pdf-upload"
                                    className="mt-4 flex cursor-pointer items-center gap-6 rounded-xl border-2 border-dashed border-primary p-8 transition-colors hover:bg-primary/5"
                                >
                                    <div className="flex size-16 shrink-0 items-center justify-center rounded-[20px] border bg-card">
                                        <FileUp className="size-7 text-primary" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-base font-semibold">
                                            Drop your PDF here, or{" "}
                                            <span className="text-primary underline">
                                                browse files
                                            </span>
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            PDF only, up to 32 MB
                                        </p>
                                    </div>

                                    <Input
                                        id="pdf-upload"
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        className="sr-only"
                                        onChange={(e) => {
                                            field.onChange(e.target.files?.[0]);
                                            e.target.value = "";
                                        }}
                                    />
                                </label>

                                {fieldState.error && (
                                    <p className="mt-2 text-sm text-destructive">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isPending}
                        className="h-14 px-8 rounded-full text-lg font-semibold"
                    >
                        {isPending ? <><Loader2 /> uploading...</> : "Summarize PDF"}
                    </Button>
                    <p className="text-muted-foreground">
                        Your file stays private to your account.
                    </p>
                </div>
            </form>
            {/* <div className="mt-12 flex gap-6 items-center border-2 border-dashed border-primary rounded-sm p-8">
                <div className="flex size-20 items-center justify-center rounded-[28px] border bg-card">
                    <FileUp className="size-8 text-primary" />
                </div>
                <div>
                    <p className="text-xl font-semibold">
                        Drop your PDF here, or browse files
                    </p>
                    <p className=" mt-1 text-muted-foreground">
                        PDF only, up to 32 MB
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button
                    size="lg"
                    className="h-14 px-8 rounded-full text-lg font-semibold"
                >
                    Summarize PDF
                </Button>
                <p className="text-muted-foreground">
                    Your file stays private to your account.
                </p>
            </div> */}
        </>
    )
}
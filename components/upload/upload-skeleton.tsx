// app/(protected)/upload/upload-skeleton.tsx
export function UploadSkeleton() {
    return (
        <div className="animate-pulse space-y-8" aria-busy="true" aria-label="Loading upload form">
            {/* Heading + description */}
            <div className="space-y-3">
                <div className="h-8 w-64 rounded-md bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-full max-w-md rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-2/3 max-w-sm rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Dropzone */}
            <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-9 w-32 rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>
        </div>
    );
}
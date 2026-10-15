import type { Metadata } from "next";
import { Source_Sans_3 as FontSans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Schibsted_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/toast";

const font = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted" });

export const metadata: Metadata = {
  title: "pdf-summarizer",
  description: "this applicatiom is to summarize the pdf",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", font.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <Suspense fallback={<>Loading...</>}>
              <Navbar />
            </Suspense>
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

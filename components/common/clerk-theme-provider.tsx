
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function ClerkThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: isDark ? "#3ddcae" : "#087a59",
                    colorForeground: isDark ? "#f2f4f3" : "#121413",
                    colorBackground: isDark ? "#151918" : "#ffffff",
                    colorInput: isDark ? "#0d0f0e" : "#fafaf8",
                    colorInputForeground: isDark ? "#f2f4f3" : "#121413",
                    colorBorder: isDark ? "#3a423f" : "#d3d8d4",
                    colorMuted: isDark ? "#1e2422" : "#e6e9e7",
                    colorMutedForeground: isDark ? "#a3ada9" : "#55605b",
                    borderRadius: "1rem",
                },
                elements: {
                    userButtonPopoverCard: {
                        backgroundColor: "var(--popover)",
                        color: "var(--popover-foreground)",
                        border: "1px solid var(--border)",
                    },
                    userButtonPopoverActionButton: {
                        color: "var(--foreground)",
                    },
                    userButtonPopoverActionButtonText: {
                        color: "var(--foreground)",
                    },
                    userButtonPopoverActionButtonIcon: {
                        color: "var(--muted-foreground)",
                    },
                    userButtonPopoverFooter: {
                        backgroundColor: "var(--popover)",
                    },
                },
                options: {
                    unsafe_disableDevelopmentModeWarnings: true,
                },
            }}
        >
            {children}
        </ClerkProvider>
    );
}

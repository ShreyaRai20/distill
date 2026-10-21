"use client"
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavProps = {
    href: string;
    children: ReactNode,
    className?: string
}

export default function NavLink({ href, children, className }: NavProps) {
    const pathname = usePathname()
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
    return (
        <Link href={href} className={cn(
            "relative inline-block px-3 py-1 text-sm",
            "text-muted-foreground hover:text-foreground",
            "transition-colors duration-200",
            "after:absolute after:bottom-0 after:left-2 after:right-2",
            "after:h-0.5 after:bg-primary",
            "after:origin-center after:transition-transform after:duration-300",
            isActive
                ? "font-medium text-foreground after:scale-x-100"
                : "after:scale-x-0",
            className
        )}>
            {children}
        </Link>
    )
}
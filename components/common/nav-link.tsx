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
            "transition-colors text-sm duration-200 text-muted-foreground hover:text-foreground",
            className,
            isActive && "text-foreground font-medium"
        )}>
            {children}
        </Link>
    )
}
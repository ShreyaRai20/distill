import NavLink from "./nav-link";
import { Show } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import Link from "next/link";
import PlanBadge from "./plan-badge";
import { UserMenu } from "./user-menu";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur border-transparent">
            <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3 lg:py-4">
                {/* Left */}
                <div className="flex items-center lg:flex-1">
                    <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                        <Image
                            src="/logo.svg"
                            alt="Distill logo"
                            width={32}
                            height={32}
                            priority
                            className="w-6 h-6 lg:w-8 lg:h-8 hover:rotate-12 transform transition duration-200 ease-in-out"
                        />
                        <span className="font-extrabold lg:text-xl text-foreground">
                            Distill
                        </span>
                    </Link>
                </div>

                {/* Center */}
                <div className="flex items-center gap-4 lg:gap-6 lg:justify-center">
                    <NavLink href="/pricing">Pricing</NavLink>
                    <span />
                    <Show when="signed-in">
                        <NavLink href="/summaries">Your Summaries</NavLink>
                    </Show>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 lg:gap-4 lg:flex-1 lg:justify-end">
                    <ThemeToggle />
                    <Show when="signed-in">
                        <NavLink href="/upload">Upload a PDF</NavLink>
                        <PlanBadge />
                        <UserMenu />
                    </Show>
                    <Show when="signed-out">
                        <NavLink href="/sign-in">Sign In</NavLink>
                    </Show>
                </div>
            </nav>
        </header>
    );
}
"use client"
import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-2 py-2 lg:px-3 lg:py-4">
            {/* Left */}
            <div className="flex lg:flex-1 items-center">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                    <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
                    <span className="font-extrabold lg:text-xl text-gray-900">
                        Summarizer
                    </span>
                </NavLink>
            </div>

            {/* Center */}
            <div className="flex items-center gap-4 lg:gap-12 lg:justify-center">
                <NavLink href="/pricing">Pricing</NavLink>
                <Show when="signed-in">
                    <NavLink href="/dashboard">Your Summaries</NavLink>
                </Show>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 lg:gap-4 lg:flex-1 lg:justify-end">
                <Show when="signed-in">
                    <NavLink href="/upload">Upload a PDF</NavLink>
                    <span className="text-sm font-medium text-rose-500">Pro</span>
                    <UserButton />
                </Show>
                <Show when="signed-out">
                    <NavLink href="/sign-in">Sign In</NavLink>
                </Show>
            </div>
        </nav>
    );
}
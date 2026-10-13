import { File } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

export default function Navbar() {
    const isLoggedIn = false;

    return (
        <nav className="flex items-center justify-between px-2 py-2 lg:px-3 lg:py-4">
            {/* Left */}
            <div className="flex lg:flex-1 items-center">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                    <File className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
                    <span className="font-extrabold lg:text-xl text-gray-900">
                        Summarizer
                    </span>
                </NavLink>
            </div>

            {/* Center */}
            <div className="flex items-center gap-4 lg:gap-12 lg:justify-center">
                <NavLink href="/pricing">Pricing</NavLink>
                {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 lg:gap-4 lg:flex-1 lg:justify-end">
                {isLoggedIn ? (
                    <>
                        <NavLink href="/upload">Upload a PDF</NavLink>
                        <span className="text-sm font-medium text-rose-500">Pro</span>
                        <Button>
                            <NavLink href="/sign-in" className="text-white hover:text-white">
                                Sign out
                            </NavLink>
                        </Button>
                    </>
                ) : (
                    <NavLink href="/sign-in">Sign In</NavLink>
                )}
            </div>
        </nav>
    );
}
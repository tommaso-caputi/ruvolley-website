"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white px-8 overscroll-none">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold text-blue-600 waving-text">Ruvolley</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:items-center md:space-x-6">
                    {/* <Link href="/" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                        Home
                    </Link> */}
                    <Link href="/teams" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                        Squadre
                    </Link>
                    <Link href="/schedule" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                        Calendari e risultati
                    </Link>
                    <Link href="/sponsors" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                        Sponsors
                    </Link>
                    <Link href="/news" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                        Notizie
                    </Link>
                    {/* <Link href="/about" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                        About
                    </Link> */}
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="container md:hidden">
                    <nav className="flex flex-col space-y-4 pb-6">
                        {/* <Link
                            href="/"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link> */}
                        <Link
                            href="/teams"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Teams
                        </Link>
                        <Link
                            href="/schedule"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Schedule
                        </Link>
                        <Link
                            href="/sponsors"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Sponsors
                        </Link>
                        <Link
                            href="/news"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            News
                        </Link>
                        {/*  <Link
                            href="/about"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            About
                        </Link> */}
                    </nav>
                </div>
            )}
        </header>
    )
}

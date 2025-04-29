"use client"

import { useState } from "react"
import Link from "next/link"
import { Share2, Instagram, Facebook, Youtube } from "lucide-react"
import { socialVars } from "@/lib/utils"

export default function FloatingSocialButtons() {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <div className="relative flex flex-col items-end">
                {/* Social media buttons that appear when expanded */}
                <div
                    className={`mb-2 flex flex-col space-y-2 transition-all duration-300 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                        }`}
                >
                    <Link
                        href={socialVars.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg transition-transform hover:scale-110"
                        aria-label="Instagram"
                    >
                        <Instagram className="h-5 w-5" />
                    </Link>
                    <Link
                        href={socialVars.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110"
                        aria-label="Facebook"
                    >
                        <Facebook className="h-5 w-5" />
                    </Link>
                    <Link
                        href={socialVars.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110"
                        aria-label="YouTube"
                    >
                        <Youtube className="h-5 w-5" />
                    </Link>
                </div>

                {/* Main toggle button */}
                <button
                    onClick={toggleExpanded}
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:bg-blue-700 ${isExpanded ? "rotate-45" : ""
                        }`}
                    aria-label="Toggle social media buttons"
                >
                    <Share2 className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}

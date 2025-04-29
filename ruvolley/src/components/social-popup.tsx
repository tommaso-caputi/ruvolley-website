"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Instagram, Facebook, Youtube } from "lucide-react"
import { socialVars } from "@/lib/utils"

export default function SocialPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        const hasDismissed = localStorage.getItem("socialPopupDismissed")
        if (hasDismissed) return

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const closePopup = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsVisible(false)
            setIsClosing(false)
        }, 300)
    }

    const neverShowAgain = () => {
        localStorage.setItem("socialPopupDismissed", "true")
        closePopup()
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4 md:bottom-8 md:right-8 md:left-auto">
            <div
                className={`relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${isClosing ? "translate-y-full opacity-0 md:translate-y-0 md:translate-x-full" : "translate-y-0 opacity-100"
                    }`}
            >
                <div className="bg-blue-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">Seguici sui Social</h3>
                        <button
                            onClick={closePopup}
                            className="rounded-full p-1 text-white transition-colors hover:bg-blue-700"
                            aria-label="Chiudi popup"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <p className="mb-4 text-gray-600">
                        Resta aggiornato con le ultime notizie, foto e video della nostra associazione!
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <Link
                            href={socialVars.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center rounded-lg p-3 text-center transition-colors hover:bg-pink-50"
                        >
                            <Instagram className="h-8 w-8 text-pink-600" />
                            <span className="mt-2 text-sm font-medium">Instagram</span>
                        </Link>
                        <Link
                            href={socialVars.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center rounded-lg p-3 text-center transition-colors hover:bg-blue-50"
                        >
                            <Facebook className="h-8 w-8 text-blue-600" />
                            <span className="mt-2 text-sm font-medium">Facebook</span>
                        </Link>
                        <Link
                            href={socialVars.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center rounded-lg p-3 text-center transition-colors hover:bg-red-50"
                        >
                            <Youtube className="h-8 w-8 text-red-600" />
                            <span className="mt-2 text-sm font-medium">YouTube</span>
                        </Link>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={neverShowAgain}
                            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                        >
                            Non mostrare più
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
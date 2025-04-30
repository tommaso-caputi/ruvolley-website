"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ShareButton() {
    const [copied, setCopied] = useState(false)

    const handleClick = async () => {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 4000) // Reset dopo 2 secondi
    }

    return (
        <Button
            variant={copied ? "default" : "outline"}
            size="icon"
            className={`h-8 w-8 rounded-full transition-colors duration-300`}
            onClick={handleClick}
        >
            {copied ? <Check className="h-4 w-4 text-white" /> : <Share2 className="h-4 w-4" />}
        </Button>
    )
}
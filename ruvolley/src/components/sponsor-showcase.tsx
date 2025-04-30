import { Sponsor } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function SponsorShowcase() {
    const sponsors: Sponsor[] = []
    if (!sponsors || sponsors.length === 0) {
        return (
            <p className="text-gray-500 text-center">Nessuno sponsor</p>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {sponsors.map((sponsor) => (
                <Link
                    key={sponsor.id}
                    href={sponsor.url || ""}
                    className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-all hover:border-blue-500 hover:shadow-md"
                >
                    <div className="relative h-16 w-full">
                        <Image
                            src={sponsor.logo || "/placeholder.svg"}
                            alt={`${sponsor.name} logo`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h3 className="mt-4 text-sm font-medium">{sponsor.name}</h3>
                    <span
                        className={`mt-1 text-xs ${sponsor.tier === "Gold"
                            ? "text-yellow-600"
                            : sponsor.tier === "Silver"
                                ? "text-gray-500"
                                : "text-amber-700"
                            }`}
                    >
                        {sponsor.tier} Sponsor
                    </span>
                </Link>
            ))}
        </div>
    )
}

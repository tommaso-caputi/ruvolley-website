"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Match } from "@/lib/utils"
import { getNextMatches } from "@/lib/data"

export default function UpcomingMatches() {
    const [matches, setMatches] = useState<Match[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getNextMatches()
            .then(setMatches)
            .catch((err) => setError(err.message))
    }, [])

    if (error) {
        return <p className="text-red-500 text-center">Errore: {error}</p>
    }

    if (!matches) {
        return <p className="text-gray-500 text-center">Caricamento partite in corso...</p>
    }

    if (matches.length === 0) {
        return <p className="text-gray-500 text-center">Nessuna partita in programma.</p>
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {matches.map((match, index) => (
                <Card key={match.id ?? index} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className={`${match.color ? "bg-blue-primary" : "bg-purple-primary"} p-4 text-white`}>                            <p className="text-sm font-medium">{match.division ?? "Divisione sconosciuta"}</p>
                            <h3 className="text-xl font-bold">
                                {match.homeTeam ?? "?"} vs {match.awayTeam ?? "?"}
                            </h3>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center text-sm text-gray-500">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                <span>{match.date ?? "Data non disponibile"}</span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{match.time ?? "Orario non disponibile"}</span>
                            </div>
                            <div className="mt-4">
                                <p className="font-medium">{match.location ?? "Luogo non specificato"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
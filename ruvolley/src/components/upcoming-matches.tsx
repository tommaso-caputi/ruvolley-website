"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Match } from "@/lib/utils"
import { getUpcomingMatches } from "@/lib/db"

export default function UpcomingMatches() {
    const [matches, setMatches] = useState<Match[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const matchesData = await getUpcomingMatches()
                setMatches(matchesData)
            } catch (error) {
                setError(error instanceof Error ? error.message : "Errore sconosciuto")
            }
        }

        fetchData()
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
                <Card key={match.id ?? index} className="overflow-hidden py-0">
                    <CardContent className="p-0">
                        <div className={`${match.teamId.charAt(match.teamId.length - 1) == 'f' ? "bg-purple-primary" : "bg-blue-primary"} p-4 text-white`}>
                            {match.division && <p className="text-sm font-medium">{match.division}</p>}
                            <h3 className="text-xl font-bold">
                                {match.isAway ? `${match.opponent} vs Ruvolley` : `Ruvolley vs ${match.opponent}`}
                            </h3>
                        </div>
                        <div className="p-4">
                            {match.date && (
                                <div className="flex items-center text-sm text-gray-500">
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    <span>{match.date}</span>
                                </div>
                            )}
                            {match.time && (
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <Clock className="mr-2 h-4 w-4" />
                                    <span>{match.time.slice(0, 5)}</span>
                                </div>
                            )}
                            {match.location && (
                                <div className="mt-4">
                                    <p className="font-medium">{match.location}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
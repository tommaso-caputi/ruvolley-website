"use client"

import { useEffect, useState } from "react"
import { Match } from "@/lib/utils"
import { getUpcomingMatches } from "@/lib/db"
import MatchCard from "./match-card"

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
                <MatchCard match={match} key={match.id} />
            ))}
        </div>
    )
}
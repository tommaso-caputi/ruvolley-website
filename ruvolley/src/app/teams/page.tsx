"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Calendar } from "lucide-react"
import { Team } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getAllTeams } from "@/lib/db"

export default function TeamsPage() {
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teamsData = await getAllTeams()
                setTeams(teamsData)
            } catch (err) {
                setError("Errore nel caricamento delle squadre. Riprova più tardi.")
                console.error("Error fetching teams:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchTeams()
    }, [])

    if (loading) {
        return (
            <div className="py-12 px-8 text-center">
                <div className="text-lg">Caricamento squadre...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-12 px-8 text-center">
                <div className="text-lg text-red-600">{error}</div>
            </div>
        )
    }

    if (teams.length === 0) {
        return (
            <div className="py-12 px-8 text-center">
                <div className="text-lg">Nessuna squadra disponibile al momento.</div>
            </div>
        )
    }

    return (
        <div className="py-12 px-8">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Le Nostre Squadre</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Conosci le squadre che rappresentano la nostra associazione di pallavolo nelle varie competizioni.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                    <Card key={team.id} className="flex flex-col overflow-hidden">
                        {team.image && (
                            <div className="relative h-48 w-full">
                                <Image
                                    src={team.image}
                                    alt={team.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{team.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {team.description && (
                                    <p className="text-gray-600">{team.description}</p>
                                )}
                                {team.achievements && team.achievements.length > 0 && (
                                    <div className="flex items-start">
                                        <Trophy className="mr-3 h-5 w-5 text-yellow-600" />
                                        <div>
                                            <h4 className="font-medium">Risultati Principali</h4>
                                            <ul className="mt-1 list-inside list-disc text-gray-600">
                                                {team.achievements.map((achievement, index) => (
                                                    <li key={index}>{achievement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {team.players && (
                                    <div className="flex items-start">
                                        <Users className="mr-3 h-5 w-5 text-blue-600" />
                                        <div>
                                            <h4 className="font-medium">Dettagli Squadra</h4>
                                            <p className="mt-1 text-gray-600">Coach: {team.coach?.name}</p>
                                            <p className="text-gray-600">Players: {team.players.length}</p>
                                        </div>
                                    </div>
                                )}

                                {team.practice && (
                                    <div className="flex items-start">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <div>
                                            <h4 className="font-medium">Orario Allenamenti</h4>
                                            <p className="mt-1 text-gray-600">{team.practice}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link
                                href={`/teams/${team.id}`}
                                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white bg-yellow-primary text-gray-950"
                            >
                                Più Informazioni
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Trophy } from "lucide-react"
import { getAllTeams, getMatchesByTeam, getMatchesGroupedByTeam } from "@/lib/db"
import { useEffect, useState } from "react"
import { Match, Team } from "@/lib/utils"
import MatchCard from "@/components/match-card"

export default function SchedulePage() {
    const [teams, setTeams] = useState<Team[]>([])
    const [matchesByTeam, setMatchesByTeam] = useState<any>({})
    const [standingsByDivision, setStandingsByDivision] = useState<any>({}) // Adatta il tipo se ne hai uno più preciso

    useEffect(() => {
        const fetchData = async () => {
            const teams = await getAllTeams()
            const matches = await getMatchesGroupedByTeam()
            // Se hai una funzione per standings, aggiungila qui
            // const standings = await getStandingsGroupedByDivision()
            setTeams(teams)
            setMatchesByTeam(matches)
            // setStandingsByDivision(standings)
            console.log(matches)
        }
        fetchData()
    }, [])

    return (
        <div className="py-12 px-8">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Programma delle partite e risultati</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Visualizza le partite in programma, i risultati passati e la classifica per tutte le nostre squadre
                </p>
            </div>

            <Tabs defaultValue="2div-m" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    {teams.map((team) => (
                        <TabsTrigger key={team.id} value={team.id}>
                            {team.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {teams.map((team) => (
                    <TabsContent key={team.id} value={team.id}>
                        <div className="mb-6">
                            {/* <h2 className="mb-4 text-2xl font-bold mt-2">Calendario {team.name}</h2> */}

                            <div className="mb-8 mt-2">
                                <h3 className="mb-4 text-xl font-semibold">Prossime Partite</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {(matchesByTeam[team.id] ?? []).filter((match: Match) => match.result === null).map((match: Match) => (
                                        <MatchCard match={match} key={match.id} />
                                    ))}
                                </div>
                            </div>

                            <div className="mb-12">
                                <h3 className="mb-4 text-xl font-semibold">Risultati</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {(matchesByTeam[team.id] ?? []).filter((match: Match) => match.result !== null).map((match: Match) => (
                                        <MatchCard match={match} key={match.id} />
                                    ))}
                                </div>
                            </div>

                            {/* Season Standings */}
                            {/* <div>
                                <div className="mb-4 flex items-center">
                                    <Trophy className="mr-3 h-6 w-6 text-yellow-500" />
                                    <h3 className="text-xl font-semibold">Season Standings</h3>
                                </div>

                                <Card>
                                    <CardHeader className="bg-blue-600 text-white">
                                        <CardTitle>Current Rankings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">
                                                        <th className="px-4 py-3">Pos</th>
                                                        <th className="px-4 py-3">Team</th>
                                                        <th className="px-4 py-3">P</th>
                                                        <th className="px-4 py-3">W</th>
                                                        <th className="px-4 py-3">L</th>
                                                        <th className="px-4 py-3 hidden sm:table-cell">Sets W</th>
                                                        <th className="px-4 py-3 hidden sm:table-cell">Sets L</th>
                                                        <th className="px-4 py-3">Pts</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(standingsByDivision[team.id] ?? []).map((standing: any, index: number) => (
                                                        <tr
                                                            key={index}
                                                            className={`border-b border-gray-200 text-sm ${standing.team === team.name
                                                                ? "bg-blue-50 font-medium"
                                                                : index % 2 === 0
                                                                    ? "bg-white"
                                                                    : "bg-gray-50"
                                                                }`}
                                                        >
                                                            <td className="px-4 py-3">
                                                                <div
                                                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${standing.position <= 3 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
                                                                        }`}
                                                                >
                                                                    {standing.position}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3">{standing.team}</td>
                                                            <td className="px-4 py-3">{standing.played}</td>
                                                            <td className="px-4 py-3">{standing.won}</td>
                                                            <td className="px-4 py-3">{standing.lost}</td>
                                                            <td className="px-4 py-3 hidden sm:table-cell">{standing.setsWon}</td>
                                                            <td className="px-4 py-3 hidden sm:table-cell">{standing.setsLost}</td>
                                                            <td className="px-4 py-3 font-bold">{standing.points}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="bg-gray-50 p-4 text-sm text-gray-500">
                                            <p>P = Played, W = Won, L = Lost, Pts = Points</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div> */}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Trophy, ArrowLeft, Users, Youtube, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTeamById } from "@/lib/db"

export default async function TeamDetailPage({ params }: { params: { teamId: string } }) {
    const team = await getTeamById(params.teamId)
    if (!team) {
        notFound()
    }

    return (
        <div className="py-12 px-8">
            <Link href="/teams"
                className={`mb-6 inline-flex items-center hover:underline ${team.id.charAt(team.id.length - 1) === 'm'
                    ? 'text-blue-primary'
                    : 'text-purple-primary'
                    }`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Torna a tutte le squadre
            </Link>

            {/* Team Header */}
            <div className="relative mb-10 overflow-hidden rounded-xl">
                <div className={`absolute z-10 inset-0 bg-gradient-to-r 
                ${team.id.charAt(team.id.length - 1) === 'm'
                        ? 'from-blue-900/80 to-blue-700/60'
                        : 'from-purple-primary to-pink-300/60'
                    }`} />
                <Image
                    src={team.image || "/placeholder.svg"}
                    alt={team.name}
                    width={1000}
                    height={300}
                    className="h-[300px] w-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{team.name}</h1>
                    <p className="mt-4 max-w-2xl text-lg text-blue-100">{team.description}</p>
                </div>
            </div>

            {/* Team Content */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informazioni Squadra</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {team.coach?.name && (
                                <div>
                                    <h3 className="font-medium">Allenatore</h3>
                                    <div className="mt-2 flex items-center">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                            <Image
                                                src={team.coach.image || "/person-placeholder.svg"}
                                                fill
                                                className="object-cover"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium">{team.coach.name}</p>
                                            <p className="text-sm text-gray-500">Allenatore Principale</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {team.assistantCoach?.name && (
                                <div>
                                    <h3 className="font-medium">Vice Allenatore</h3>
                                    <p>{team.assistantCoach.name}</p>
                                </div>
                            )}

                            {team.practice && (
                                <div>
                                    <h3 className="font-medium">Allenamenti</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{team.practice}</span>
                                    </div>
                                </div>
                            )}

                            {team.location && (
                                <div>
                                    <h3 className="font-medium">Sede</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        <span>{team.location}</span>
                                    </div>
                                </div>
                            )}

                            {team.achievements && (
                                <div>
                                    <h3 className="font-medium">Risultati Principali</h3>
                                    <ul className="mt-2 list-inside list-disc text-gray-500">
                                        {team.achievements.map((achievement, index) => (
                                            <li key={index}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {team.stats && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Statistiche Stagione</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {team.stats.wins != null && (
                                            <div className="rounded-lg bg-blue-50 p-4 text-center">
                                                <p className="text-sm text-gray-500">Vittorie</p>
                                                <p className="text-2xl font-bold text-blue-600">{team.stats.wins}</p>
                                            </div>
                                        )}
                                        {team.stats.losses != null && (
                                            <div className="rounded-lg bg-blue-50 p-4 text-center">
                                                <p className="text-sm text-gray-500">Sconfitte</p>
                                                <p className="text-2xl font-bold text-blue-600">{team.stats.losses}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        {team.stats.setsWon != null && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Set Vinti</span>
                                                <span className="font-medium">{team.stats.setsWon}</span>
                                            </div>
                                        )}
                                        {team.stats.setsLost != null && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Set Persi</span>
                                                <span className="font-medium">{team.stats.setsLost}</span>
                                            </div>
                                        )}
                                        {team.stats.pointsScored != null && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Punti Fatti</span>
                                                <span className="font-medium">{team.stats.pointsScored}</span>
                                            </div>
                                        )}
                                        {team.stats.pointsConceded != null && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Punti Subiti</span>
                                                <span className="font-medium">{team.stats.pointsConceded}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="roster" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            {/* <TabsTrigger value="about">La Squadra</TabsTrigger> */}
                            <TabsTrigger value="roster">Giocatori</TabsTrigger>
                            <TabsTrigger value="matches">Partite</TabsTrigger>
                        </TabsList>

                        <TabsContent value="about" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Chi Siamo</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700">{team.fullDescription}</p>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold">Il Nostro Allenatore</h3>
                                        <div className="mt-4 flex flex-col items-center gap-4 rounded-lg bg-blue-50 p-6 sm:flex-row">
                                            <div className="relative h-24 w-24 overflow-hidden rounded-full">
                                                <Image
                                                    src={team.coach?.image || "/person-placeholder.svg"}
                                                    alt={team.coach?.name || ""}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold">{team.coach?.name}</h4>
                                                <p className="mt-2 text-gray-700">{team.coach?.bio}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold">Obiettivi Stagionali</h3>
                                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                            <div className="flex items-start">
                                                <Trophy className="mr-3 h-5 w-5 text-yellow-500" />
                                                <div>
                                                    <h4 className="font-medium">Competitivi</h4>
                                                    <p className="mt-1 text-gray-600">
                                                        Puntare alle prime posizioni del campionato e qualificarsi per le fasi finali.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <Users className="mr-3 h-5 w-5 text-blue-600" />
                                                <div>
                                                    <h4 className="font-medium">Sviluppo</h4>
                                                    <p className="mt-1 text-gray-600">
                                                        Migliorare le capacità individuali e collettive, rafforzando lo spirito di squadra.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold">Formazione Titolare</h3>
                                        <div className="mt-4 overflow-hidden rounded-lg border">
                                            <div className="relative h-[300px] w-full bg-green-800">
                                                {/* Campo da pallavolo stilizzato */}
                                                <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-white"></div>
                                                <div className="absolute bottom-4 left-4 right-4 top-4 border border-white"></div>
                                                <div className="absolute bottom-4 left-[33%] right-[33%] top-4 border-x border-white"></div>

                                                {/* Giocatori titolari - mostriamo solo i primi 6 */}
                                                {team.players?.slice(0, 6).map((player, index) => {
                                                    // Posizioni dei giocatori sul campo (stilizzate)
                                                    const positions = [
                                                        { top: "20%", left: "20%" },
                                                        { top: "20%", left: "50%" },
                                                        { top: "20%", left: "80%" },
                                                        { top: "70%", left: "20%" },
                                                        { top: "70%", left: "50%" },
                                                        { top: "70%", left: "80%" },
                                                    ]

                                                    return (
                                                        <div
                                                            key={player.number}
                                                            className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                                                            style={{
                                                                top: positions[index].top,
                                                                left: positions[index].left,
                                                            }}
                                                        >
                                                            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-white">
                                                                <Image
                                                                    src={player.image || "/placeholder.svg"}
                                                                    fill
                                                                    className="object-cover" alt={""} />
                                                            </div>
                                                            <div className="mt-1 rounded-full bg-white px-2 py-0.5 text-xs font-bold">
                                                                #{player.number}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-4 sm:grid-cols-6">
                                                {team.players?.slice(0, 6).map((player) => (
                                                    <div key={player.number} className="text-center text-xs">
                                                        <div className="font-medium">{player.name?.split(" ")[0]}</div>
                                                        <div className="text-gray-500">{player.role}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="roster" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Roster Giocatori</CardTitle>
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div className="text-sm text-gray-500">{team.players?.length} giocatori nel roster</div>
                                        {/* <div className="flex space-x-2">
                                        <button className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">
                                            Griglia
                                        </button>
                                        <button className="rounded-md bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-300">
                                            Lista
                                        </button>
                                    </div> */}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {team.players?.map((player) => (
                                            <div
                                                key={player.number}
                                                className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-blue-500 hover:shadow-md"
                                            >
                                                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={player.image || "/person-placeholder.svg"}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105" alt={""} />
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                                        <span className="inline-block rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                                                            #{player.number}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-col p-4">
                                                    <h3 className="text-lg font-bold">{player.name}</h3>
                                                    <p className="text-sm text-blue-600">{player.role}</p>
                                                    <div className="mt-auto grid grid-cols-2 gap-2 pt-3 text-sm text-gray-500">
                                                        {/* <div className="flex items-center">
                                                        <span className="mr-1 font-medium">Età:</span> {player.age}
                                                    </div> */}
                                                        {/* <div className="flex items-center">
                                                            <span className="mr-1 font-medium">Altezza:</span> {player.height} cm
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="matches" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prossime Partite</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {team.upcomingMatches?.map((match) => (
                                            <div key={match.id} className="overflow-hidden rounded-lg border">
                                                <div className={`p-4 text-white 
                                                ${team.id.charAt(team.id.length - 1) === 'm'
                                                        ? 'bg-blue-primary'
                                                        : 'bg-purple-primary'
                                                    }`}>
                                                    <div className="text-lg font-bold">
                                                        {match.is_away ? `${match.opponent} vs Ruvolley` : `Ruvolley vs ${match.opponent}`}
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        <span>
                                                            {match.date}, {match.time.slice(0, 5)}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                                        <MapPin className="mr-2 h-4 w-4" />
                                                        <span>{match.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Risultati Recenti</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {team.pastMatches?.map((match) => (
                                            <div key={match.id} className="overflow-hidden rounded-lg border">
                                                <div className={`p-4 text-white 
                                                ${team.id.charAt(team.id.length - 1) === 'm'
                                                        ? 'bg-blue-primary'
                                                        : 'bg-purple-primary'
                                                    }`}>
                                                    <div className="text-lg font-bold">
                                                        {match.is_away ? `${match.opponent} vs Ruvolley` : `Ruvolley vs ${match.opponent}`}
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        <span>
                                                            {match.date}, {match.time.slice(0, 5)}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                                        <MapPin className="mr-2 h-4 w-4" />
                                                        <span>{match.location}</span>
                                                    </div>
                                                    <div className="mt-4">
                                                        <p className="font-medium">Risultato: {match.result}</p>
                                                    </div>
                                                    {match.video_url && (
                                                        <div className="mt-4">
                                                            <a
                                                                href={match.video_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="group inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                                            >
                                                                <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                                                Guarda la partita
                                                                <Youtube className="ml-2 h-4 w-4" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </div >
    )
}
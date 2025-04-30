import { Match } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { CalendarDays, Clock, MapPin, Play, Youtube } from "lucide-react";

type MatchCardProps = {
    match: Match;
    index?: number;
};

export default function MatchCard({ match, index }: MatchCardProps) {
    return (
        <Card key={match.id ?? index} className="overflow-hidden py-0">
            <CardContent className="p-0">
                <div className={`${match.team_id.charAt(match.team_id.length - 1) == 'f' ? "bg-purple-primary" : "bg-blue-primary"} p-4 text-white`}>
                    {match.division && <p className="text-sm font-medium">{match.division}</p>}
                    <h3 className="text-xl font-bold">
                        {match.is_away ? `${match.opponent} vs Ruvolley` : `Ruvolley vs ${match.opponent}`}
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
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{match.location}</span>
                        </div>
                    )}
                    {match.result && (
                        <div className="mt-4">
                            <p className="font-medium">Risultato: {match.result}</p>
                        </div>
                    )}
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
            </CardContent>
        </Card>
    );
}
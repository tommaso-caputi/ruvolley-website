import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const socialVars = {
  instagram: "https://www.instagram.com/ruvolleyasd",
  facebook: "https://www.facebook.com/Ruvolley",
  youtube: "https://www.youtube.com/channel/UCZSWPzUkwl7aDDz1pqMnbtQ",
}


export interface Sponsor {
  id: number,
  name: string,
  logo?: string,
  tier?: string,
  url?: string,
}

export interface NewsItem {
  id: number,
  title: string,
  excerpt?: string,
  date?: string,
  image?: string,
  slug?: string,
}

export interface Match {
  id: number,
  team_id: string,
  opponent: string,
  date: string,
  time: string,
  location: string,
  division: string,
  result?: string,
  video_url?: string,
  is_away: boolean
}

export interface Player {
  number?: number,
  name?: string,
  surname?: string,
  role?: string,
  birthDate?: string,
  height?: number,
  image?: string,
}

export interface Team {
  id: string,
  name: string,
  description?: string
  fullDescription?: string
  image?: string,
  coach?: {
    name: string,
    bio?: string,
    image?: string,
  },
  assistantCoach?: {
    name: string,
    bio?: string,
    image?: string,
  },
  practice?: string,
  location?: string,
  achievements?: string[],
  players?: Player[],
  stats?: Stats,
  upcomingMatches?: Match[],
  pastMatches?: Match[]
}

export interface Stats {
  wins: number,
  losses: number,
  setsWon: number,
  setsLost: number,
  pointsScored: number,
  pointsConceded: number
}

const MONTHS_IT: Record<string, string> = {
  Gennaio: "January",
  Febbraio: "February",
  Marzo: "March",
  Aprile: "April",
  Maggio: "May",
  Giugno: "June",
  Luglio: "July",
  Agosto: "August",
  Settembre: "September",
  Ottobre: "October",
  Novembre: "November",
  Dicembre: "December",
}

export function parseMatchDate(match: Match): Date | null {
  const dateStr = match.date

  // Replace Italian months with English
  const replaced = Object.entries(MONTHS_IT).reduce(
    (acc, [it, en]) => acc.replace(it, en),
    dateStr
  )

  const parsed = new Date(replaced)
  return isNaN(parsed.getTime()) ? null : parsed
}
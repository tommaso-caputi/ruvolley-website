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

export interface Match {
  id: number,
  homeTeam: string,
  awayTeam: string,
  date: string,
  time: string,
  location: string,
  division: string,
  color: boolean // 1 male, 2 female
}

export interface Sponsor {
  id: number,
  name: string,
  logo: string,
  tier: string,
  url: string,
}

export interface NewsItem {
  id: number,
  title: string,
  excerpt: string,
  date: string,
  image: string,
  slug: string,
}
import { createClient } from '@supabase/supabase-js'
import { Match, Player, Team, Stats, Sponsor, NewsItem } from './utils'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Teams
export async function getAllTeams(): Promise<Team[]> {
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select(`
      *,
      players:players(*),
      coach:coaches!coach_id(*)
    `)

  if (teamsError) throw teamsError

  return teams.map(team => {
    const numberOfPlayers = team.players?.length || 0

    return {
      ...team,
      coach: team.coach,
      numberOfPlayers
    }
  })
}

export async function getTeamById(id: string): Promise<Team | null> {
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select(`
      *,
      players:players(*), 
      coach:coaches!coach_id(*)
    `)
    .eq('id', id)
    .single()

  if (teamError) throw teamError
  if (!team) return null

  const { data: matches, error: matchesError } = await supabase
    .from('matches')
    .select('*')
    .eq('team_id', id)

  if (matchesError) throw matchesError

  const stats: Stats = {
    wins: 0,
    losses: 0,
    setsWon: 0,
    setsLost: 0,
    pointsScored: 0,
    pointsConceded: 0
  }

  matches.forEach(match => {
    if (match.result) {
      const [setA, setB] = match.result.split('-').map(Number)
      const isAway = match.is_away

      const teamSets = isAway ? setB : setA
      const opponentSets = isAway ? setA : setB

      if (teamSets > opponentSets) {
        stats.wins++
      } else {
        stats.losses++
      }

      stats.setsWon += teamSets
      stats.setsLost += opponentSets

      stats.pointsScored += match.p_fatti || 0
      stats.pointsConceded += match.p_subiti || 0
    }
  })

  const now = new Date()
  const upcomingMatches = matches
    .filter(match => new Date(match.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastMatches = matches
    .filter(match => new Date(match.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const numberOfPlayers = team.players?.length || 0

  return {
    ...team,
    stats,
    upcomingMatches,
    pastMatches,
    numberOfPlayers
  }
}

// Players
export async function getAllPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')

  if (error) throw error
  return data
}

export async function getPlayersByTeam(teamId: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('teamId', teamId)

  if (error) throw error
  return data
}

// Matches
export async function getAllMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team:teams(name)
    `)

  if (error) throw error
  return data.map(match => ({
    ...match,
    teamName: match.team.name
  }))
}

export async function getMatchesByTeam(teamId: string): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team:teams(name)
    `)
    .eq('teamId', teamId)

  if (error) throw error
  return data.map(match => ({
    ...match,
    teamName: match.team.name
  }))
}

export async function getUpcomingMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team:teams(name)
    `)
    .gt('date', new Date().toISOString())
    .order('date', { ascending: true })

  if (error) throw error
  return data.map(match => ({
    ...match,
    teamName: match.team.name
  })) ?? []
}

export async function getPastMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team:teams(name)
    `)
    .lt('date', new Date().toISOString())
    .order('date', { ascending: false })

  if (error) throw error
  return data.map(match => ({
    ...match,
    teamName: match.team.name
  }))
}

// Sponsors
export async function getAllSponsors(): Promise<Sponsor[]> {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .order('tier')

  if (error) throw error
  return data
}

// News
export async function getAllNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return data
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

// Stats
export async function getTeamStats(teamId: string): Promise<Stats | null> {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .eq('teamId', teamId)
    .single()

  if (error) throw error
  return data
}

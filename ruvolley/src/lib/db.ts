import { createClient } from '@supabase/supabase-js'
import { Match, Player, Team, Stats, Sponsor, NewsItem } from './utils'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Teams
export async function getAllTeams(): Promise<Team[]> {
  // Get basic team data and players
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select(`
      *,
      players:players(*)
    `)

  if (teamsError) throw teamsError

  // Get all matches
  const { data: matches, error: matchesError } = await supabase
    .from('matches')
    .select('*')

  if (matchesError) throw matchesError

  // Process each team
  return teams.map(team => {
    // Filter matches for this team
    const teamMatches = matches.filter(match => match.teamId === team.id)
    
    // Calculate stats
    const stats: Stats = {
      wins: 0,
      losses: 0,
      setsWon: 0,
      setsLost: 0,
      pointsScored: 0,
      pointsConceded: 0
    }

    teamMatches.forEach(match => {
      if (match.result) {
        const [teamScore, opponentScore] = match.result.split('-').map(Number)
        if (teamScore > opponentScore) {
          stats.wins++
        } else {
          stats.losses++
        }
        stats.setsWon += teamScore
        stats.setsLost += opponentScore
        stats.pointsScored += teamScore * 25 // Assuming 25 points per set
        stats.pointsConceded += opponentScore * 25
      }
    })

    // Separate matches into upcoming and past
    const now = new Date()
    const upcomingMatches = teamMatches
      .filter(match => new Date(match.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    const pastMatches = teamMatches
      .filter(match => new Date(match.date) <= now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return {
      ...team,
      stats,
      upcomingMatches,
      pastMatches
    }
  })
}

export async function getTeamById(id: string): Promise<Team | null> {
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      players:players(*),
      stats:stats(*),
      upcomingMatches:matches!matches_teamId_fkey(*),
      pastMatches:matches!matches_teamId_fkey(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
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

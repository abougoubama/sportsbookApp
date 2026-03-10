
export interface Match {
  id: string;
  sport: string;
  competition: string;
  teams: Teams;
  odds: Odds;
  startDate: string;
}

export interface Teams {
  a: string;
  b: string;
}

export interface Odds {
  homeWin: number; 
  draw?: number;
  awayWin: number; 
}
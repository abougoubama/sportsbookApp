
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
  homeWin: number; //l’équipe à domicile gagne
  draw?: number; //cote du match null
  awayWin: number; //l'equipe a l'exterieur gagne
}
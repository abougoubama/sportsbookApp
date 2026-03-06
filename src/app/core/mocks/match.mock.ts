import { Match } from "../models/match.model";


export const MATCHES_MOCK: Match[] = [
  {
    id: '1',
    sport: 'Football',
    competition: 'Ligue 1',
    teams: {
      a: 'PSG',
      b: 'Marseille'
    },
    odds: {
      homeWin: 1.85,
      draw: 3.40,
      awayWin: 4.20
    },
    startDate: '2026-04-10T18:00:00Z'
  },
  {
    id: '2',
    sport: 'Tennis',
    competition: 'ATP Miami',
    teams: {
      a: 'Nadal',
      b: 'Djokovic'
    },
    odds: {
      homeWin: 2.10,
      awayWin: 1.70
    },
    startDate: '2026-04-10T18:00:00Z'
  },
    {
    id: '3',
    sport: 'Football',
    competition: 'Ligue 1',
    teams: {
      a: 'Reims',
      b: 'Lille'
    },
    odds: {
        homeWin : 1.70,
        draw : 2.80,
        awayWin : 3.20
    },
    startDate: '2026-04-03T10:30:00Z'
  },
   {
    id: '4',
    sport: 'Football',
    competition: 'Premier League',
    teams: {
      a: 'Arsenal',
      b: 'Leeds'
    },
    odds: {
        homeWin : 1.5,
        draw : 1.4,
        awayWin : 1.8
    },
    startDate: '2026-04-04T10:30:00Z'
  },
     {
    id: '5',
    sport: 'Handball',
    competition: 'Champions League',
    teams: {
      a: 'Montpellier',
      b: 'Kiel'
    },
    odds: {
        homeWin : 3.5,
        draw : 2.4,
        awayWin : 1.8
    },
    startDate: '2026-03-31T18:30:00Z'
  }
];
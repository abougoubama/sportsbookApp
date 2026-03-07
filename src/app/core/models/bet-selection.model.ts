export type TypePari = 'homeWin' | 'draw' | 'awayWin';

export interface BetSelection {
  matchId: string;
  matchLabel: string; //le match exemple Paris vs Marseille
  typePari: TypePari;//type de pari
  libellePari: string;
  cote: number;//cote du pari que l'utilisateur a sélectionné
}
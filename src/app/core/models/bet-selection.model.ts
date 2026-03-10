export type TypePari = 'homeWin' | 'draw' | 'awayWin';

export interface BetSelection {
  matchId: string;
  matchLabel: string; 
  typePari: TypePari;
  libellePari: string;
  libelleCote:string;
  cote: number;
  gain:number;
  mise:number;
  misMax:boolean;
}
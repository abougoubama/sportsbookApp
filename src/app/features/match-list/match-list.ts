import { Component, OnInit } from '@angular/core';
import { Match } from '../../core/models/match.model';
import { BetSelection, TypePari } from '../../core/models/bet-selection.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatchService } from '../../core/services/match';
import { BetSlipService } from '../../core/services/bet-slip';

@Component({
  selector: 'app-match-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './match-list.html',
  styleUrl: './match-list.scss',
})
export class MatchList implements OnInit {

  protected  matches$!:Observable<Match[]>;
  private readonly selectionsByMatchId: Record<string, BetSelection> = {};

  constructor(private readonly matchService:MatchService, private readonly betSlipService:BetSlipService) {

   }

  ngOnInit() {
    this.matches$ = this.matchService.getMatches();

  }

  getCote(match: Match, typePari: TypePari):number{
    if(typePari === "awayWin"){
      return match.odds.awayWin
    }else if(typePari === "draw"){
      return match.odds.draw?match.odds.draw:0;
    }else{
      return match.odds.homeWin
    }
  }

  selectOdd(match: Match, typePari: TypePari) {
    const betSelection = {
    matchId: match.id,
    matchLabel: match.competition,
    typePari: typePari,
    libellePari: match.teams.a + " vs " + match.teams.b,
    cote: this.getCote(match, typePari)
  }

  const currentSelection = this.betSlipService.getSelectionPariValue();
  if(currentSelection[match.id] === undefined){
    this.selectionsByMatchId[match.id] = betSelection;
  }else{
    const pariCurrentMatch =this.selectionsByMatchId[match.id].typePari;
    if(pariCurrentMatch === typePari){
      delete this.selectionsByMatchId[match.id];
    }else{
      this.selectionsByMatchId[match.id] = betSelection;
    }

  }
    this.betSlipService.setSelectionPari(this.selectionsByMatchId);
}

}

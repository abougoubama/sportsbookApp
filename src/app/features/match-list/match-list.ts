import { Component, OnInit } from '@angular/core';
import { Match } from '../../core/models/match.model';
import { BetSelection, TypePari } from '../../core/models/bet-selection.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatchService } from '../../core/services/match';
import { BetSlipService } from '../../core/services/bet-slip';
import { MATCH_LIST_LABELS } from '../../constants/constants-sportBookApp';


@Component({
  selector: 'app-match-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './match-list.html',
  styleUrl: './match-list.scss',
})
export class MatchList implements OnInit {
  matchListlabels = MATCH_LIST_LABELS;

  public  matches$!:Observable<Match[]>;
  public readonly selectionsByMatchId: Record<string, BetSelection> = {};

  constructor(private readonly matchService:MatchService, private readonly betSlipService:BetSlipService) {

   }

  ngOnInit() {
    this.matches$ = this.matchService.getMatches();

  }

  getCote(match: Match, typePari: TypePari):{libelleEquipe:string,cote:number}{
    if(typePari === "awayWin"){
      return { libelleEquipe: match.teams.b,cote:match.odds.awayWin}
    }else if(typePari === "draw"){
      return { libelleEquipe: typePari,cote: match.odds.draw?match.odds.draw:0};
    }else{
      return { libelleEquipe: match.teams.a,cote: match.odds.homeWin};
    }
  }

  selectOdd(match: Match, typePari: TypePari):void {
    const currentSelection = this.betSlipService.getSelectionPariValue();
    const betSelection = {
    matchId: match.id,
    matchLabel: match.competition,
    typePari: typePari,
    libellePari: match.teams.a + " vs " + match.teams.b,
    libelleCote: this.getCote(match, typePari).libelleEquipe,
    cote: this.getCote(match, typePari).cote,
    gain: currentSelection[match.id]?currentSelection[match.id].gain: 0,
    mise: currentSelection[match.id]?currentSelection[match.id].mise: 0,
    misMax: false
  }

  if(currentSelection[match.id] === undefined){
    this.selectionsByMatchId[match.id] = betSelection;
  }else{
    const pariCurrentMatch =currentSelection[match.id].typePari;
    if(pariCurrentMatch === typePari){
      delete this.selectionsByMatchId[match.id];
    }else{
      this.selectionsByMatchId[match.id] = betSelection;
    }

  }
    this.betSlipService.setSelectionPari(this.selectionsByMatchId);
}

}

import { Component, OnInit } from '@angular/core';
import { Match } from '../../core/models/match.model';
import { TypePari } from '../../core/models/bet-selection.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatchService } from '../../core/services/match';

@Component({
  selector: 'app-match-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './match-list.html',
  styleUrl: './match-list.scss',
})
export class MatchList implements OnInit {

  protected  matches$!:Observable<Match[]>;

  constructor(private readonly matchService:MatchService) {

   }

  ngOnInit() {
    this.matches$ = this.matchService.getMatches();

  }

  selectOdd(match: Match, typePari: TypePari) {
  console.log('cote sélectionné :', {
    matchId: match.id,
    teams: `${match.teams.a} vs ${match.teams.b}`,
    typePari : typePari
  });
}

}

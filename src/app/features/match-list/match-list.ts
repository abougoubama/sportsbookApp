import { Component, OnInit } from '@angular/core';
import { Match } from '../../core/models/match.model';
import { TypePari } from '../../core/models/bet-selection.model';
import { MATCHES_MOCK } from '../../core/mocks/match.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './match-list.html',
  styleUrl: './match-list.scss',
})
export class MatchList {

  protected readonly matches: Match[] = MATCHES_MOCK;

  selectOdd(match: Match, typePari: TypePari) {
  const pariSelected =  {
    matchId: match.id,
    teams: `${match.teams.a} vs ${match.teams.b}`,
    typePari : typePari
  };
}

}

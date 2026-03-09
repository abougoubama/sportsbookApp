import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchList } from './match-list';
import { Match } from '../../core/models/match.model';
import { BetSelection, TypePari } from '../../core/models/bet-selection.model'
import { MatchService } from '../../core/services/match';
import { MATCHES_MOCK } from '../../core/mocks/match.mock';
import { Observable, of } from 'rxjs';
import { BetSlipService } from '../../core/services/bet-slip';

let typePari: TypePari = 'homeWin';

const match_mock:Match =  {
    id: '1',
    sport: 'Football',
    competition: 'Ligue 1',
    teams: {
      a: 'PSG',
      b: 'Marseille'
    },
    odds: {
      homeWin: 1.85,
      draw: 3.4,
      awayWin: 4.2
    },
    startDate: '2026-04-10T18:00:00Z'
  }

const betSelection_mock : BetSelection = {
  matchId: "1",
  matchLabel: "Ligue 1",
  typePari: typePari,
  libellePari: "PSG vs Marseille",
  libelleCote:"PSG",
  cote: 1.85,
  gain:0,
  mise:0,
}


  class MockMatchService{
    getMatches(): Observable<Match[]> {
      return of(MATCHES_MOCK);
    }
  }

  class MockBetSlipService{
    listSelectionMock :Record<string, BetSelection> = { 1: betSelection_mock }

      getSelectionPariValue(): Record<string, BetSelection> {
        return this.listSelectionMock;
    }
  }

describe('MatchList', () => {
  let component: MatchList;
  let fixture: ComponentFixture<MatchList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchList],
      providers:[
        {provide: MatchService, useClass: MockMatchService},
        {provide: BetSlipService, useClass: MockBetSlipService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to initialize the component', () => {
    component.ngOnInit();
    component.matches$.subscribe((result) => {
    expect(result.length).toBeGreaterThan(0);
    expect(result[2].id).toBe(3);
    expect(result[2].sport).toBe('Football');
    expect(result[2].competition).toBe('Ligue 1');
    expect(result[2].teams.a).toBe('Reims');
    expect(result[2].odds.awayWin).toBe(3.2);
    })
  });

  it('should get the cote for odd homewin', () => {
    const result = component.getCote(match_mock, typePari);
    expect(result.cote).toBe(1.85)
  });

  it('should get the team label for odd homewin', () => {
    const result = component.getCote(match_mock, typePari);
    expect(result.libelleEquipe).toBe("PSG");
  });

  it('should get the event when the user select a different Odd awayWin for the same match', () => {
    let typePari: TypePari = 'awayWin';
    const idSelectedMatch = match_mock.id;
    component.selectOdd(match_mock, typePari);
    expect(component.selectionsByMatchId[idSelectedMatch].cote).toBe(4.2);
    expect(component.selectionsByMatchId[idSelectedMatch].libellePari).toBe("PSG vs Marseille");
  });
});

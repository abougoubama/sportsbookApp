import { TestBed } from '@angular/core/testing';
import { BetSlipService } from './bet-slip';
import { BetSelection } from '../models/bet-selection.model';

let pari: BetSelection = {
  matchId: '1',
  matchLabel: 'Ligue 1',
  typePari: 'homeWin',
  libellePari: 'PSG vs Marseille',
  libelleCote: 'PSG',
  cote: 1.85,
  gain: 0.35150000000000003,
  mise: 0.19,
  misMax: false,
};

let pari2: BetSelection = {
  matchId: '2',
  matchLabel: 'ATP Miami',
  typePari: 'awayWin',
  libellePari: 'Ndal vs Djokovic',
  libelleCote: 'Djokovic',
  cote: 1.7,
  gain: 0,
  mise: 0,
  misMax: false,
};

let selectionBetListMock: Record<string, BetSelection> = {
  1: pari,
  2: pari2,
  3: { ...pari, matchId: '3', matchLabel: 'test' },
};

describe('BetSlip', () => {
  let service: BetSlipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetSlipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a bet selection', () => {
    service.updateBetSelection(pari);
    const result = service.getSelectionPariValue();
    expect(result[pari.matchId].cote).toBe(1.85);
    expect(result[pari.matchId].matchLabel).toBe('Ligue 1');
    expect(result[pari.matchId].libelleCote).toBe('PSG');
    expect(result[pari.matchId].mise).toBe(0.19);
  });

  it('should return selections as array', () => {
    service.updateBetSelection(pari);
    service.updateBetSelection(pari2);
    service.selectionsList$.subscribe((list) => {
      expect(list.length).toBe(2);
    });
  });

  it('should update the selection bet list', () => {
    selectionBetListMock = { '4': { ...pari, matchId: '4', matchLabel: 'test' } };
    service.setSelectionPari(selectionBetListMock);
    service.selectionsList$.subscribe((resul) => {
      expect(resul.length).toBe(4);
      expect(resul[0].matchId).toBe('1');
      expect(resul[1].matchId).toBe('2');
      expect(resul[2].matchId).toBe('3');
      expect(resul[3].matchId).toBe('4');
    });
  });
});

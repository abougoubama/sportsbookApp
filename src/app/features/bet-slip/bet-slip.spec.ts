import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BetSlip } from './bet-slip';
import { BetSelection } from '../../core/models/bet-selection.model';
import { BetSlipService } from '../../core/services/bet-slip';
import { of } from 'rxjs';


let  pari:BetSelection ={
  matchId: '1', 
  matchLabel: 'Ligue 1', 
  typePari: 'homeWin', 
  libellePari: 'PSG vs Marseille', 
  libelleCote: 'PSG',
  cote: 1.85,
  gain : 0.35150000000000003,
  mise:0.19
}

let  pari2:BetSelection ={
  matchId: '2', 
  matchLabel: 'ATP Miami', 
  typePari: 'awayWin', 
  libellePari: 'Ndal vs Djokovic', 
  libelleCote: 'Djokovic',
  cote: 1.7,
  gain : 0,
  mise:0
}

class MockBetSlipService{

  readonly selectionsList$ = of([pari, pari2])

}

describe('BetSlip', () => {
  let component: BetSlip;
  let fixture: ComponentFixture<BetSlip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetSlip],
      providers:[{
        provide:BetSlipService, useClass:MockBetSlipService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetSlip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
    component.selectionPari$.subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res[1].matchId).toBe(pari2.matchId)
      expect(res[1].matchLabel).toBe(pari2.matchLabel)
      expect(res[1].typePari).toBe(pari2.typePari)
      expect(res[1].cote).toBe(pari2.cote)
    })
  });

  it('should send mise of user', () => {
  const event: any = {
    target: {
      value: '10'
    }
  };
  component.sendMise(event, pari);
  expect(component.gain).toBe(pari.cote * 10);
});
});

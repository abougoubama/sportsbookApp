import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BetSlip } from './bet-slip';
import { BetSelection } from '../../core/models/bet-selection.model';
import { BetSlipService } from '../../core/services/bet-slip';
import { of } from 'rxjs';
import { inject } from '@angular/core';


let  pari:BetSelection ={
  matchId: '1', 
  matchLabel: 'Ligue 1', 
  typePari: 'homeWin', 
  libellePari: 'PSG vs Marseille', 
  libelleCote: 'PSG',
  cote: 1.85,
  gain : 0.35150000000000003,
  mise:0.19,
  misMax:false
}

let  pari2:BetSelection ={
  matchId: '2', 
  matchLabel: 'ATP Miami', 
  typePari: 'awayWin', 
  libellePari: 'Ndal vs Djokovic', 
  libelleCote: 'Djokovic',
  cote: 1.7,
  gain : 0,
  mise:0,
  misMax:false
}

class MockBetSlipService{

  readonly selectionsList$ = of([pari, pari2]);

  updateBetSelection(newBetSelection: any):void{
    const doNothing = {};
  }
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

  it('should new send mise of user', () => {
  const mockService = TestBed.inject(BetSlipService);
  const updateBetSelectionSpy = jest.spyOn(mockService, 'updateBetSelection')
  const event: any = {
    target: {
      value: '10'
    }
  };
  component.sendMise(event, pari);
  expect(component.gain).toBe(pari.cote * 10);
  expect(updateBetSelectionSpy).toHaveBeenCalled();
});

it('should not send mise of user when it is below 0', () => {
  const event: any = {
    target: {
      value: '-3'
    }
  };
  component.sendMise(event, pari);
  expect(component.gain).toBe(0);
});

it('should send new mise max of user when it is over the mise MAX', () => {
  const mockService = TestBed.inject(BetSlipService);
  const updateBetSelectionSpy = jest.spyOn(mockService, 'updateBetSelection')
  const event: any = {
    target: {
      value: '2000000000'
    }
  };
  component.sendMise(event, pari);
  expect(component.gain).toBe(pari.cote * component.MAX);
  expect(updateBetSelectionSpy).toHaveBeenCalled();
});


});

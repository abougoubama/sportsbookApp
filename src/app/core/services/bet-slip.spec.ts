import { TestBed } from '@angular/core/testing';
import { BetSlipService } from './bet-slip';

describe('BetSlip', () => {
  let service: BetSlipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetSlipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


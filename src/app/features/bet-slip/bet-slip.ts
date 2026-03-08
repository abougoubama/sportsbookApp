import { Component, OnInit } from '@angular/core';
import { BetSlipService } from '../../core/services/bet-slip';
import { Observable, of, switchMap } from 'rxjs';
import { BetSelection } from '../../core/models/bet-selection.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bet-slip',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './bet-slip.html',
  styleUrl: './bet-slip.scss',
})
export class BetSlip {

  selectionPari$!:Observable<BetSelection[]>;
  gain: number = 0;

  constructor(private readonly betSlipService: BetSlipService){
    this.selectionPari$ = this.betSlipService.selectionsList$;
  }

  //validation du champs
  sendMise(event: Event, pari:BetSelection) {

    const cote = pari.cote
    const input = event.target as HTMLInputElement;
    const mise = Number(input.value);

    if (!mise) {
      this.gain = 0;
      return;
    }
    this.gain = mise * cote;
    const newBetSelection = {...pari, gain:this.gain, mise: mise}
    this.betSlipService.updateBetSelection(newBetSelection)
  }
}

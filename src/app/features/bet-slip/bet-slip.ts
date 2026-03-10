import { Component } from '@angular/core';
import { BetSlipService } from '../../core/services/bet-slip';
import { Observable } from 'rxjs';
import { BetSelection } from '../../core/models/bet-selection.model';
import { CommonModule } from '@angular/common';
import { BET_SLIP_LABELS} from '../../constants/constants-sportBookApp'

@Component({
  selector: 'app-bet-slip',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './bet-slip.html',
  styleUrl: './bet-slip.scss',
})
export class BetSlip {
  betSlipLabel = BET_SLIP_LABELS;

  selectionPari$!:Observable<BetSelection[]>;
  gain: number = 0;
  MAX = 999999;


  constructor(private readonly betSlipService: BetSlipService){
    this.selectionPari$ = this.betSlipService.selectionsList$;
  }

  sendMise(event: Event, pari:BetSelection):void {
    const cote = pari.cote
    const input = event.target as HTMLInputElement;
    let mise = Number(input.value);

    if (Number.isNaN(mise) || mise < 0) {
      this.gain = 0;
      pari.misMax = false;
      return;
    }else if (mise > this.MAX) {
      mise = this.MAX;
      input.value = Number(this.MAX).toString();
      pari.misMax = true;
  } else {
    pari.misMax = false;
  }
    this.gain = mise * cote;
    const newBetSelection = {...pari, gain:this.gain, mise: mise, miseMax:pari.misMax}
    this.betSlipService.updateBetSelection(newBetSelection)
  }
}

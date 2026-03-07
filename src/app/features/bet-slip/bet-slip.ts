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
  sendMise(event:number, cote:number ){
    if(event !== 0){
      of(event).pipe(
        switchMap((e)=>"test")
      )
    }
  }
}

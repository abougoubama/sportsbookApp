import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BetSelection } from '../models/bet-selection.model';

@Injectable({
  providedIn: 'root',
})
export class BetSlipService {

  private readonly selectionsSubject = new BehaviorSubject<Record<string, BetSelection>>({});
  readonly selections$ = this.selectionsSubject.asObservable();

  setSelectionPari(selections: Record<string, BetSelection>): void {
  this.selectionsSubject.next(selections);
}

  getSelectionPariValue(): Record<string, BetSelection> {
  return this.selectionsSubject.value;
}

//transforme le record (objet prop - value) en tableau
readonly selectionsList$ = this.selections$.pipe(
  map((matchId) => Object.values(matchId))
);

updateBetSelection(newBetSelection: BetSelection):void{
  const idToUpdate = newBetSelection.matchId;
  this.selectionsSubject.value[idToUpdate]= {...newBetSelection}
  this.selectionsSubject.next(this.selectionsSubject.value);
}

  
}

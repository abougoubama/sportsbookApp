import { Injectable } from '@angular/core';
import { BehaviorSubject, map, filter } from 'rxjs';
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

  readonly selectionsList$ = this.selections$.pipe(map((matchId) => Object.values(matchId)));

  readonly sommeGain$$ = this.selections$.pipe(
    map((item) => {
      let betSelection = Object.values(item);
      return betSelection.reduce((acc, selection) => acc + selection.gain, 0);
    }),
  );

  readonly sommeGain$ = this.selections$.pipe(
    map((item) => Object.values(item).reduce((acc, selection) => acc + selection.gain, 0)),
  );

  //filtrer les gains inferior à 10 000 euros
  readonly sommeGainSup10000$ = this.selections$.pipe(
    map((item) => Object.values(item).reduce((acc, selection) => acc + selection.gain, 0)),
    filter((total) => total < 10000),
  );

  updateBetSelection(newBetSelection: BetSelection): void {
    const idToUpdate = newBetSelection.matchId;
    this.selectionsSubject.value[idToUpdate] = { ...newBetSelection };
    this.selectionsSubject.next(this.selectionsSubject.value);
  }
}

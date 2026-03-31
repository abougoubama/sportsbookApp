import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';
import { MATCHES_MOCK } from '../mocks/match.mock';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  getMatches(): Observable<Match[]> {
    return of(MATCHES_MOCK);
  }
}

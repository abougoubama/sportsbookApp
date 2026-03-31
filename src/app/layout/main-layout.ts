import { Component } from '@angular/core';
import { MatchList } from '../features/match-list/match-list';
import { BetSlip } from '../features/bet-slip/bet-slip';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MatchList, BetSlip],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}

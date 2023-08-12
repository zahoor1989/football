import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PlayerSelectors from "../../_store/selectors/players.selectors";
import * as TeamSelectors from "../../_store/selectors/teams.selectors";

@Component({
  selector: 'app-coach-dashbaord',
  templateUrl: './coach-dashbaord.component.html',
  styleUrls: ['./coach-dashbaord.component.scss']
})
export class CoachDashbaordComponent {
  players: any = [];
  teams: any = [];
  constructor(private store: Store) {

  }

  ngOnInit(): void {
       // select to get user from store
       this.store.select(PlayerSelectors.getPlayers).subscribe(players => {
        this.players = players;
       });

       this.store.select(TeamSelectors.getTeams).subscribe(teams => {
        this.teams = teams;
       });
  }
}

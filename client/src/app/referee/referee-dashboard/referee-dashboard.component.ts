import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as UserActions from "../../_store/actions/users.actions";
import * as PlayerSelectors from "../../_store/selectors/players.selectors";
import * as LeagueSelectors from "../../_store/selectors/leagues.selectors";
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { AcademyService } from 'src/app/_services/academy.service';
import { StorageService } from 'src/app/_services/storage.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-referee-dashboard',
  templateUrl: './referee-dashboard.component.html',
  styleUrls: ['./referee-dashboard.component.scss']
})
export class RefereeDashboardComponent {
  @ViewChild('myTable') table:any;
  private notifier: NotifierService;
  options = {}
  data:any = [];
  columns:any = [{ prop: 'firstname' }, { name: 'lastname' }, { name: 'dob' } , { name: 'email' }];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(private userService: UserService, private storageService: StorageService, notifier: NotifierService, private academyService: AcademyService, private teamService: TeamService, private store: Store, private router: Router,  public activatedRoute: ActivatedRoute) {
    this.notifier = notifier;
    this.getPlayersFromStore();
  }
  getPlayersFromStore () {
    this.data = [
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
        {
          fixture: 1,
          league: 'Under 6 A Division',
          homeTeam: 'Dubai City FC Red',
          awayTeam: 'Allaince FC'
        },
      ]
    }

  edit(value: any) {
      console.log(value);
      this.userService.deleteUser(value).subscribe((result:any)  => {
        console.log(result)
        this.store.dispatch(UserActions.loadUsers());
      })
    }

    deletePlayer(value: any) {
      this.userService.deleteUser(value).subscribe((result:any)  => {
        this.store.dispatch(UserActions.loadUsers());
      })
    }

}

import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as UserActions from "../../_store/actions/users.actions";
import * as PlayerSelectors from "../../_store/selectors/players.selectors";
import { NotifierService } from 'angular-notifier';
import { StorageService } from 'src/app/_services/storage.service';
import { AcademyService } from 'src/app/_services/academy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: ['./squad-list.component.scss']
})
export class SquadListComponent {
  @ViewChild('myTable') table:any;
  options = {}
  data:any = [];
  columns:any = [{ prop: 'firstname' }, { name: 'lastname' }, { name: 'dob' } , { name: 'email' }];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  public teams: any = [];
  private notifier: NotifierService;
  public academies: any = []
  public academy: any = {};
  public currentTeam: any = {};
  public coach: any = {};
  constructor(private userService: UserService, private storageService: StorageService, notifier: NotifierService, private academyService: AcademyService, private teamService: TeamService, private store: Store, private router: Router,  public activatedRoute: ActivatedRoute){
    this.notifier = notifier;
  }

  ngOnInit() {
    let  teamId = this.activatedRoute.snapshot.params['id'];
    // Now get team by id
    this.teamService.getTeamById(teamId).subscribe((res:any) => {
      if(res){
        this.academy = res.academy_id;
        this.currentTeam = res
        if(res.user_id){
          this.userById(res.user_id);
        }
      }
      this.getPlayersFromStore();
    })
  }

getPlayersFromStore () {
  this.store.select(PlayerSelectors.getPlayers).subscribe(players => {
    this.data = players;
    });
  }

edit(value: any) {
    this.userService.deleteUser(value).subscribe((result:any)  => {
      this.store.dispatch(UserActions.loadUsers());
    })
  }

  deletePlayer(value: any) {
    this.userService.deleteUser(value).subscribe((result:any)  => {
      this.store.dispatch(UserActions.loadUsers());
    })
  }
  userById(id: any) {
    this.userService.getUserById(id).subscribe((result:any)  => {
      debugger
      this.coach = result
    })
  }
}

import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as UserActions from "../../_store/actions/users.actions";
import * as PlayerSelectors from "../../_store/selectors/players.selectors";

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

  constructor(private store: Store, private userService: UserService) {

  }

  ngOnInit() {
    this.getPlayersFromStore();
  }

getPlayersFromStore () {
  this.store.select(PlayerSelectors.getPlayers).subscribe(players => {
    debugger
    this.data = players;
    });
  }

edit(value: any) {
    debugger
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

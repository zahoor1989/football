import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as PlayerSelectors from "../../_store/selectors/players.selectors";

@Component({
  selector: 'app-coach-squad-list',
  templateUrl: './coach-squad-list.component.html',
  styleUrls: ['./coach-squad-list.component.scss']
})
export class CoachSquadListComponent {
  @ViewChild('myTable') table:any;
  @Output() delPlayer = new EventEmitter<string>();
  options = {}
  @Input() players:any = [];
  columns:any = [{ prop: 'firstname' }, { name: 'lastname' }, { name: 'username' } , { name: 'email' }];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  constructor(private store: Store, private userService: UserService) {

  }

  ngOnInit() {

  }

  getUsersFromStore () {
    this.store.select(PlayerSelectors.getPlayers).subscribe(players => {
      this.players = players;
     });
  }

  edit(value: any) {
    // this.userService.deleteUser(value).subscribe((result:any)  => {
      console.log(value)
    // })
  }

  delete(value: any) {
    debugger
    this.delPlayer.emit(value);
  }

}

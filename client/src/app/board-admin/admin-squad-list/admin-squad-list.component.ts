import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as PlayerSelectors from "../../_store/selectors/players.selectors";

@Component({
  selector: 'app-admin-squad-list',
  templateUrl: './admin-squad-list.component.html',
  styleUrls: ['./admin-squad-list.component.scss']
})
export class AdminSquadListComponent {
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
    this.delPlayer.emit(value);
  }

}

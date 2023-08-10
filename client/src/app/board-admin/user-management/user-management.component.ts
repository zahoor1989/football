import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserSelectors from "../../_store/selectors/users.selectors";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as UserActions from "../../_store/actions/users.actions";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('myTable') table:any;
  options = {}
  data:any = [];
  columns:any = [{ prop: 'firstname' }, { name: 'lastname' }, { name: 'username' } , { name: 'email' }];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(private store: Store, private userService: UserService) {

  }

  ngOnInit() {
    this.getUsersFromStore();
  }

getUsersFromStore () {
  this.store.select(UserSelectors.getUsers).subscribe(users => {
    this.data = users;
    });
  }

edit(value: any) {
    debugger
    console.log(value);
    this.userService.deleteUser(value).subscribe((result:any)  => {
      console.log(result)
      this.store.dispatch(UserActions.loadUsers());
      // this.getUsersFromStore();
    })
  }

deleteUser(value: any) {
    this.userService.deleteUser(value).subscribe((result:any)  => {
      this.store.dispatch(UserActions.loadUsers());
    })
  }

}

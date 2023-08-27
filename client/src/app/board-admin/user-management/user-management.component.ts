import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserSelectors from "../../_store/selectors/users.selectors";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as UserActions from "../../_store/actions/users.actions";
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('myTable') table:any;
  private notifier: NotifierService;
  options = {}
  data:any = [];
  columns:any = [{ prop: 'firstname' }, { name: 'lastname' }, { name: 'username' } , { name: 'email' }];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  public userForm: FormGroup;
  public submitted: boolean = false;
  public roles: any = [];
  public userToEdit: any = {};
  public loggedInUser: any = {};
  displayEditForm: boolean = false;
  constructor(    private formBuilder: FormBuilder, private store: Store, private userService: UserService, notifier: NotifierService,private storageService: StorageService) {
    this.notifier = notifier;
    this.userForm = new FormGroup({
      username: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      contact: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      roles: new FormControl('')
    });
  }

  ngOnInit() {
    // get logged in user
    this.loggedInUser = this.storageService.getUser();
    this.userForm = this.formBuilder.group({
        username: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        contact: ['', Validators.required],
        password: [''],
        email: ['', Validators.required],
        roles: ['', Validators.required]
      });
    this.getUsersFromStore();
    this.getRoles();
  }

getUsersFromStore () {
  this.store.select(UserSelectors.getUsers).subscribe(users => {
    this.data = users.filter((user: any) => user.username !== this.loggedInUser.username);
    });
  }

editUser(value: any) {
    this.userToEdit = this.data.find((user: any) => user._id === value);
    if(this.userToEdit) {
      this.displayEditForm = true;
      // Patch the values to form
      this.userForm.patchValue({
        username: this.userToEdit.username,
        firstname: this.userToEdit.firstname,
        lastname: this.userToEdit.lastname,
        contact: this.userToEdit?.contact,
        email: this.userToEdit.email,
        roles: this.userToEdit?.roles[0]?._id
      })
    }
    this.store.dispatch(UserActions.loadUsers());
  }

deleteUser(value: any) {
  this.userService.deleteUser(value).subscribe((result:any)  => {
    this.store.dispatch(UserActions.loadUsers());
  })
}
get f() { return this.userForm.controls; }

onFormSubmit = () => {
  this.submitted = true;
  if(!this.userForm.value.password) {
    this.userForm.patchValue({
      password: this.userToEdit.password
    })
  }
  if (this.userForm.invalid) {
    this.notifier.notify('error', 'Please fill all the required fields!');
    return;
  } else {
    this.userService.updateUser(this.userToEdit._id, this.userForm.value).subscribe((result:any) => {
      if(!result.message){
        this.notifier.notify('success', 'User updated successfully!');
        this.store.dispatch(UserActions.loadUsers());
        this.displayEditForm = false;
      } else {
        this.notifier.notify('error', 'User updating failed!');
      }
    })
    }
  }

  getRoles() {
    this.userService.getAllRoles().subscribe((result: any) => {
      if(result){
        this.roles = result;
      }
    })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserSelectors from "../../_store/selectors/users.selectors";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as UserActions from "../../_store/actions/users.actions";
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
// importing selectors
import * as AcademySelectors from "../../_store/selectors/academies.selectors";
import { AcademyService } from 'src/app/_services/academy.service';

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
  public displayEditForm: boolean = false;
  public displayAddForm: boolean = false;
  public academies: any = [];

  constructor( private formBuilder: FormBuilder, private store: Store, private userService: UserService, notifier: NotifierService,private storageService: StorageService, private academyService: AcademyService) {
    this.notifier = notifier;
    this.userForm = new FormGroup({
      username: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      contact: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
      academy: new FormControl('')
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
        role: ['', Validators.required],
        academy: ['']
      });
    this.getUsersFromStore();
    this.getAcademiesFromStore();
    this.getRoles();

  }

getUsersFromStore () {
  this.store.select(UserSelectors.getUsers).subscribe(users => {
    this.data = users.filter((user: any) => user.username !== this.loggedInUser.username);
    });
  }

editUser(value: any) {
  debugger
    this.displayAddForm = false;
    this.userToEdit = this.data.find((user: any) => user._id === value);
    debugger
    if(this.userToEdit) {
      this.displayEditForm = true;
      this.academyService.getAcademyByCoachId(this.userToEdit._id).subscribe((res)=> {
        debugger
        if(res){
          // Patch the values to form
           this.userForm.patchValue({
             username: this.userToEdit.username,
             firstname: this.userToEdit.firstname,
             lastname: this.userToEdit.lastname,
             contact: this.userToEdit?.contact,
             email: this.userToEdit.email,
             role: this.userToEdit?.roles[0]?.name,
             academy: res?._id
           })
        }
      })

    }
    this.store.dispatch(UserActions.loadUsers());
  }

getAcademyByCoach = (id: any): any => {
  debugger
  this.academyService.getAcademyByCoachId(id).subscribe((res)=> {
    return res;
  })
}

deleteUser(value: any) {
  this.userService.deleteUser(value).subscribe((result:any)  => {
    debugger
    console.log(result);
    if(result){
      this.notifier.notify('success', 'User deleted successfully!');
      this.store.dispatch(UserActions.loadUsers());
    }
  })
}
get f() { return this.userForm.controls; }

onAddFormSubmit = () => {
  this.submitted = true;
  if(this.userForm.invalid) {
    return this.notifier.notify ('error', 'Please fill all the required fields!');
  } else {
    const userObj = {
      username: this.userForm.value.username,
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      contact: this.userForm.value.contact,
      password: this.userForm.value.password,
      email: this.userForm.value.email,
      role: this.userForm.value.role
    }
    this.userService.createUser(userObj).subscribe((result:any) => {
      if(result && this.userForm.value.academy) {
        let coachId = result._id;
       this.associateCoach(coachId);
      }
    })
  }
}
associateCoach(coachId: any) {
  if(this.userForm.value.academy) {
  this.academyService.updateAcademyCoach(this.userForm.value.academy, { coach: coachId }).subscribe((academy:any) => {
    if(academy){
      this.notifier.notify('success', 'Coach created successfully!');
      this.store.dispatch(UserActions.loadUsers());
      this.displayAddForm = false;
    }
    })
  }
}
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
        this.associateCoach(this.userToEdit._id);
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

  getAcademiesFromStore () {
    this.store.select(AcademySelectors.getAcademies).subscribe(academy => {
      this.academies = academy;
      });
    }
    toggleForm() {
      this.userForm.reset();
      this.displayEditForm = false;
      this.displayAddForm = !this.displayAddForm;
    }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AcademyService } from 'src/app/_services/academy.service';
import { StorageService } from 'src/app/_services/storage.service';
import * as AcademyActions from "../../_store/actions/academies.actions";
// importing selectors
import * as AcademySelectors from "../../_store/selectors/academies.selectors";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent implements OnInit {
  private notifier: NotifierService;
  public academies: any = []

  academyForm = new FormGroup({
    academyName: new FormControl('')
  });

  constructor( private storageService: StorageService, notifier: NotifierService, private academyService: AcademyService, private store: Store, private router: Router) {
    this.notifier = notifier;
   }

ngOnInit(): void {
  this.getAcademiesFromStore();
}

  getAcademiesFromStore () {
  this.store.select(AcademySelectors.getAcademies).subscribe(academy => {
    debugger
    this.academies = academy;
    });
  }


  onSubmit() {
    if(!this.academyForm.value.academyName) {
      this.notifier.notify('error', 'Academy name not provided!');
      return;
    } else {
      const user = this.storageService.getUser();
      if(this.academyForm.value.academyName) {
        const academyData =  {
          "Academy Name": this.academyForm.value.academyName,
          "Academy User Name": this.makeAcademyUserName(this.academyForm.value.academyName),
          "Email": `${this.makeAcademyUserName(this.academyForm.value.academyName)}@dummy.com`,
          "Password": `Password@${this.makeAcademyUserName(this.academyForm.value.academyName)}`,
          "user": {
              "createdBy": user.id
          }
        }
        this.academyService.createAcademy(academyData).subscribe((res:any) => {
          debugger
          console.log(res);
          if(res._id){
            this.notifier.notify('success', 'Academy created successfully!');
            this.store.dispatch(AcademyActions.loadAcademies());
          }
        })
      }
    }
  }

  makeAcademyUserName(academyName:any) {
    if(academyName) {
      return academyName.replace(/\s/g,'').toLowerCase();
    }
  }

  academyDetails(id:string) {
    this.router.navigate([`/academies/academy/${id}`]);
  }

}

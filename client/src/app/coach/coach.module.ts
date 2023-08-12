import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachSquadManagementComponent } from './coach-squad-management/coach-squad-management.component';
import { RouterModule } from '@angular/router';
import { CoachDashbaordComponent } from './coach-dashbaord/coach-dashbaord.component';
import { CoachAcademyDetailsComponent } from './coach-academy-details/coach-academy-details.component';
import { CoachSquadListComponent } from './coach-squad-list/coach-squad-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    CoachSquadManagementComponent,
    CoachDashbaordComponent,
    CoachAcademyDetailsComponent,
    CoachSquadListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule
  ],
  exports: [RouterModule]
})
export class CoachModule { }

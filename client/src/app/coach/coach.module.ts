import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachSquadManagementComponent } from './coach-squad-management/coach-squad-management.component';
import { RouterModule } from '@angular/router';
import { CoachDashbaordComponent } from './coach-dashbaord/coach-dashbaord.component';
import { CoachAcademyDetailsComponent } from './coach-academy-details/coach-academy-details.component';
import { CoachSquadListComponent } from './coach-squad-list/coach-squad-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CoachSquadManagementComponent,
    CoachDashbaordComponent,
    CoachAcademyDetailsComponent,
    CoachSquadListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class CoachModule { }

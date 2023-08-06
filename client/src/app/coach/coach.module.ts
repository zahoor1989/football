import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachSquadManagementComponent } from './coach-squad-management/coach-squad-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CoachSquadManagementComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [RouterModule]
})
export class CoachModule { }

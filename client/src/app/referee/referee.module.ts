import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefereeComponent } from './referee.component';
import { GameManagementComponent } from './game-management/game-management.component';



@NgModule({
  declarations: [
    RefereeComponent,
    GameManagementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RefereeModule { }

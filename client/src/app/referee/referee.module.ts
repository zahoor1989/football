import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefereeComponent } from './referee.component';
import { GameManagementComponent } from './game-management/game-management.component';
import { RefereeDashboardComponent } from './referee-dashboard/referee-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FixtureListingComponent } from './fixture-listing/fixture-listing.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
const refereeRoutes: Routes = [
  {
    path: '',
    component: RefereeComponent,
    // pathMatch: 'full',
    children: [
      {
        path: 'dashboard',
        component: RefereeDashboardComponent,
      },
      {
        path: 'mangegames',
        component: GameManagementComponent,
      }
    ]
  }
];



@NgModule({
  declarations: [
    RefereeComponent,
    GameManagementComponent,
    RefereeDashboardComponent,
    FixtureListingComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgxDatatableModule,
    RouterModule.forChild(refereeRoutes),
  ]
})
export class RefereeModule { }

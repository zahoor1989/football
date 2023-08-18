import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefereeComponent } from './referee.component';
import { GameManagementComponent } from './game-management/game-management.component';
import { RefereeDashboardComponent } from './referee-dashboard/referee-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FixtureListingComponent } from './fixture-listing/fixture-listing.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RefereeSquadListingComponent } from './referee-squad-listing/referee-squad-listing.component';
import { RefereeTeamSquadComponent } from './referee-team-squad/referee-team-squad.component';
import { FixtureTeamDetailsComponent } from './fixture-team-details/fixture-team-details.component';
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
    FixtureListingComponent,
    RefereeSquadListingComponent,
    RefereeTeamSquadComponent,
    FixtureTeamDetailsComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgxDatatableModule,
    RouterModule.forChild(refereeRoutes),
  ]
})
export class RefereeModule { }

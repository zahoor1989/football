import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { LeagueManagementComponent } from './league-management/league-management.component';
import { SquadManagementComponent } from './squad-management/squad-management.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './board-admin.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { TeamManagementComponent } from './team-management/team-management.component';
import { AcademyManagementComponent } from './academy-management/academy-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminDataTableComponent } from './admin-data-table/admin-data-table.component';
import { AcademyDetailComponent } from './academy-detail/academy-detail.component';
import { AcademyLeagueSelectionComponent } from './academy-league-selection/academy-league-selection.component';
import { SquadAcademyListComponent } from './squad-academy-list/squad-academy-list.component';
import { SquadListComponent } from './squad-list/squad-list.component';
import { AdminSquadListComponent } from './admin-squad-list/admin-squad-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: BoardAdminComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'users',
        component: UserManagementComponent,
      },
      {
        path: 'leagues',
        component: LeagueManagementComponent,
      },
      // {
      //   path: 'academies',
      //   component: SquadManagementComponent,
      // },
      {
        path: 'academies/academy/:id',
        component: AcademyDetailComponent,
      },
      {
        path: 'academy/team/:id',  // select leagues for team
        component: AcademyLeagueSelectionComponent,
      },
      {
        path: 'squads',
        component: SquadManagementComponent,
      },
      {
        path: 'squads/academy/:id',
        component: SquadAcademyListComponent,
      },
      {
        path: 'squads/squadlist',
        component: SquadListComponent,
      },
      {
        path: 'academies',
        component: TeamManagementComponent,
      }
    ]
  },
]

@NgModule({
  declarations: [
    UserManagementComponent,
    LeagueManagementComponent,
    SquadManagementComponent,
    TeamManagementComponent,
    AcademyManagementComponent,
    AdminDashboardComponent,
    AdminDataTableComponent,
    AcademyDetailComponent,
    AcademyLeagueSelectionComponent,
    SquadAcademyListComponent,
    SquadListComponent,
    AdminSquadListComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    RouterModule.forChild(adminRoutes),
  ],
  exports: [RouterModule]
})
export class BoardAdminModule { }

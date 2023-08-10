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
const adminRoutes: Routes = [
  {
    path: '',
    component: BoardAdminComponent,
    pathMatch: 'full',
    children: [
      {
        path: 'users',
        component: UserManagementComponent,
      },
      {
        path: 'leagues',
        canActivate: [AuthGuard],
        component: LeagueManagementComponent,
      },
      {
        path: 'squads',
        canActivate: [AuthGuard],
        component: SquadManagementComponent,
      }
    ]
  }
];


@NgModule({
  declarations: [
    UserManagementComponent,
    LeagueManagementComponent,
    SquadManagementComponent,
    TeamManagementComponent,
    AcademyManagementComponent,
    AdminDashboardComponent,
    AdminDataTableComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(adminRoutes),
  ],
  exports: [RouterModule]
})
export class BoardAdminModule { }

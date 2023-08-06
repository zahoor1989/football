import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  AuthGuardService as AuthGuard
} from './guards/auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';

import { UserManagementComponent } from './board-admin/user-management/user-management.component';
import { LeagueManagementComponent } from './board-admin/league-management/league-management.component';
import { SquadManagementComponent } from './board-admin/squad-management/squad-management.component';
import { TeamManagementComponent } from './board-admin/team-management/team-management.component';
import { CoachSquadManagementComponent } from './coach/coach-squad-management/coach-squad-management.component';
import { CoachComponent } from './coach/coach.component';
import { RefereeComponent } from './referee/referee.component';
import { GameManagementComponent } from './referee/game-management/game-management.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        component: BoardAdminComponent,
        children: [
          {
            path: 'users',
            component: UserManagementComponent,
          },
          {
            path: 'leagues',
            component: LeagueManagementComponent,
          },
          {
            path: 'Academies',
            component: SquadManagementComponent,
          },
          {
            path: 'squads',
            component: SquadManagementComponent,
          },
          {
            path: 'teams',
            component: TeamManagementComponent,
          }
        ]
      },
      {
        path: 'coach',
        canActivate: [AuthGuard],
        component: CoachComponent,
        children: [
          {
            path: 'squads',
            component: CoachSquadManagementComponent,
          }
        ]
      },
      {
        path: 'referee',
        canActivate: [AuthGuard],
        component: RefereeComponent,
        children: [
          {
            path: 'mangegames',
            component: GameManagementComponent,
          }
        ]
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: '404',
        component: ErrorPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

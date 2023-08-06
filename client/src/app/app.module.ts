import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './_store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CollectionsComponentComponent } from './collections-component/collections-component.component';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './_store/effects/users.effects';
import { AcademiesEffects } from './_store/effects/academies.effects';
import { TeamsEffects } from './_store/effects/teams.effects';
import { LeaguesEffects } from './_store/effects/leagues.effects';
import { FixuresEffects } from './_store/effects/fixures.effects';
import { PlayersEffects } from './_store/effects/players.effects';
import { HttpRequestInterceptor } from './_helpers/http.interceptor';
import { AuthInterceptor } from './_helpers/authconfig.interceptor';
import { CoachComponent } from './coach/coach.component';
import { RefereeComponent } from './referee/referee.component';

const environment = {
  production: false
};


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    CoachComponent,
    RefereeComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AdminComponent,
    CollectionsComponentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UsersEffects, AcademiesEffects, TeamsEffects, LeaguesEffects, FixuresEffects, PlayersEffects]),
  ],
  providers: [
    AuthGuardService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

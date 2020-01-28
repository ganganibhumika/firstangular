import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from './user/user.module';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuradService } from '../service/auth-gurad.service';

export function loadAdminModule() {
  return AdminModule;
}

export function loadUserModule() {
  return UserModule;
}
const routes: Routes = [
  { path: '', redirectTo: 'work_area', pathMatch: 'full' },
  {
    path: 'work_area', component: HomeComponent, children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: 'landing', component: LandingComponent },
      { path: 'register', component: UserRegistrationComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'admin', loadChildren: loadAdminModule },
      { path: 'user', loadChildren: loadUserModule}
      // { path: 'admin', loadChildren: loadAdminModule, canActivate: [AuthGuradService] },
      // { path: 'user', loadChildren: loadUserModule, canActivate: [AuthGuradService] }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    LandingComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    ResetPasswordComponent
  ]
})
export class HomeModule { }

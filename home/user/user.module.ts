import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { OfferDiscountComponent } from './offer-discount/offer-discount.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockInnerDetailComponent } from './stock-inner-detail/stock-inner-detail.component';
import { UserAcountComponent } from './user-acount/user-acount.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditUserAccountComponent } from './edit-user-account/edit-user-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: UserDashboardComponent, children: [
      { path: '', redirectTo: 'offer-list', pathMatch: 'full' },
      { path: 'offer-list', component: OfferDiscountComponent },
      { path: 'stock-list', component: StockListComponent},
      { path: 'stock-detail-view/:search', component: StockInnerDetailComponent},
      { path: 'user-account', component: UserAcountComponent},
      { path: 'edit-user-account', component: EditUserAccountComponent},
      { path: 'contact-us', component: ContactUsComponent},
      { path: 'change-password', component: ChangePasswordComponent},

    ]
  },

];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)

  ],
  declarations: [
    UserComponent,
    OfferDiscountComponent,
    UserSettingsComponent,
     UserDashboardComponent,
     StockListComponent,
     StockInnerDetailComponent,
     UserAcountComponent,
     ContactUsComponent,
     EditUserAccountComponent,
     ChangePasswordComponent
    ]
})
export class UserModule { }

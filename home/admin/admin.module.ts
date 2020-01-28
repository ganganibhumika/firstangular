import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../../shared/shared.module';
import { OfferListComponent } from './offer-list/offer-list.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { UserListComponent } from './user-list/user-list.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { SettingsComponent } from './settings/settings.component';
import { OfferStockListComponent } from './offer-stock-list/offer-stock-list.component';
import { UserDetailsComponent } from '../user/user-details/user-details.component';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ContactUsReplayComponent } from './contact-us-replay/contact-us-replay.component';
import { OfferStockDetailViewComponent } from './offer-stock-detail-view/offer-stock-detail-view.component';
import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard', component: AdminDashboardComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'widget' },
      { path: 'widget', component: WidgetsComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'account-manager', component: AccountManagerComponent },
      { path: 'offer-stock', component: OfferStockListComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'user-detail/:id', component: UserDetailsComponent },
      { path: 'edit-user/:id', component: UserDetailEditComponent },
      // { path: 'stock-detail', component: StockDetailViewComponent },
      { path: 'offer-list', component: OfferListComponent },
      { path: 'offer-list-view/:orderId/:userId', component: OfferStockDetailViewComponent },
      { path: 'mail-template', component: MailTemplateComponent },
      { path: 'contact-us', component: ContactUsReplayComponent }
    ]
  }

]
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    //DataTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WidgetsComponent,
    AdminComponent,
    AdminDashboardComponent,
    OfferListComponent,
    UserListComponent,
    AccountManagerComponent,
    SettingsComponent,
    OfferStockListComponent,
    UserDetailsComponent,
    OfferStockDetailViewComponent,
    MailTemplateComponent,
    ContactUsReplayComponent,
    UserDetailEditComponent
  ]
})
export class AdminModule { }

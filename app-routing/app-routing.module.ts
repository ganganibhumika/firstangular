import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from '../home/admin/admin.module';
import { HomeComponent } from '../home/home.component';
import { HomeModule } from '../home/home.module';
import { SharedModule } from '../shared/shared.module';

export function loadHomeModule() {
  return HomeModule;
}
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: loadHomeModule },
]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UtilService } from './util.service';
import { StorageListnerService } from './storage-listner.service';
export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean> | boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuradService implements CanActivate, CanDeactivate<CanComponentDeactivate> {

  constructor(
    public utilsService: UtilService,
    public storageListnerService: StorageListnerService
  ) { }
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    try {
      console.log('-----------------canDeactivate');
      console.log(this.utilsService.isAdmin());
      if (this.utilsService.isAdmin()) {
        return true;
      } else {
        this.utilsService.redirectTo('/home/work_area/user/dashboard');
      }
    } catch (error) {
      return false;
    }
    // return component.canDeactivate ? component.canDeactivate() : true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      if (this.utilsService.isLogin()) {
        console.log('is login.....in authgard..');
        return true;
      } else {
        this.utilsService.redirectTo('/home/work_area/login');
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

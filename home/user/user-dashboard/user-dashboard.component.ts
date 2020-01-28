import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { StorageListnerService } from '../../../service/storage-listner.service';
import { User } from '../../../models/User';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userName: string = undefined;
  constructor(public utilService: UtilService, public storageListnerService: StorageListnerService) { }

  ngOnInit() {
    this.userName = this.getUserNameFromLocalStorge();
  }
  logout() {
    this.utilService.storageListnerService.clear();
  }

  public openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  public closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  getUserNameFromLocalStorge() {
    const user: User = JSON.parse(localStorage.getItem('userDetails'));
    if (!this.utilService.isNullUndefinedOrBlank(user)) {
      return (user.firstName ? user.firstName : '') + ' ' +(user.lastName ? user.lastName : '');
    }
    return null;
  }
}

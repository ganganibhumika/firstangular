import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { StorageListnerService } from '../../../service/storage-listner.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public utilService: UtilService, public storageListnerService: StorageListnerService) { }

  ngOnInit() {

  }
  logout() {
    console.log('...........');
    this.utilService.storageListnerService.clear();
  }

}

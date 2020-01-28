import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { User } from '../../../models/User';
import { Deserialize } from 'cerialize';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { PaginattionService } from '../../../service/PaginationService';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  listOfUserDetails = new Array<User>();
  pagination = new Pagination();

  constructor(public utilService: UtilService, public router: Router, public paginattionService: PaginattionService) { }

  ngOnInit() {
    this.getAllUserDetail();
  }

  getAllUserDetail(key?: string) {
    if (key) {
      this.pagination.startPos = 0;
      this.pagination.selectPage = this.pagination.startPos.toString();
    };
    this.listOfUserDetails = new Array<User>();
    this.paginattionService.setPaginationVariablesBeforeAPICall(this.pagination);
    var param = {
      pageNo: this.pagination.selectPage.toString(),
      noOfRecords: this.pagination.perPage.toString(),
      searchText: this.pagination.searchText ? this.pagination.searchText : undefined
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.findAllUserAPI, param, response => {
      if (!this.utilService.isNullUndefinedOrBlank(response)) {
        this.paginattionService.setPaginationVariablesAfterAPICall(this.pagination, response);
        this.listOfUserDetails = Deserialize(response, User);
        this.listOfUserDetails.forEach(user => user['tmpStatus'] = user.status);
      }
    }, undefined, true);
  }

  getPreviousData() {
    this.paginattionService.getPreviousData(this.pagination);
    this.getAllUserDetail();
  }
  getNextData() {
    this.paginattionService.getNextData(this.pagination);
    this.getAllUserDetail();
  }
  goToPageFun() {
    this.paginattionService.goToPageFun(this.pagination);
    this.getAllUserDetail();
  }
  selectPerPage() {
    this.paginattionService.selectPerPage(this.pagination);
    this.getAllUserDetail();
  }
  redirectToUserDetail(id) {
    this.router.navigate(['home/work_area/admin/dashboard/user-detail/' + id])
  }
  activeUser(user: User, status) {
    var param = {
      id: user.id,
      status: status
    }

    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.changeActiveStatusOfUserAPI, param, (response, isRoute) => {
      if (isRoute) {
        user['tmpStatus'] = param.status;
      }
    });
  }

  ngOnDestroy() {
    this.listOfUserDetails = new Array<User>();
    this.pagination = new Pagination();
  }

}

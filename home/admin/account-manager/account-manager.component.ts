import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountManager } from '../../../models/AccountManager';
import { UtilService } from '../../../service/util.service';
import { serialize, Serialize, Deserialize } from 'cerialize';
import { Pagination } from 'src/app/models/Pagination';
import { PaginattionService } from 'src/app/service/PaginationService';
declare var $: any;

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit, OnDestroy {

  AccountManagerValidationFrom: FormGroup;
  accountManagerDetail = new AccountManager();
  listOfAccountManager = new Array<AccountManager>();
  managerId: string;
  headerText: string = 'Add New Account Manager';
  errors = new Array<string>();
  pagination = new Pagination();

  constructor(public formBuilder: FormBuilder, public utilService: UtilService, public paginattionService: PaginattionService) { }

  ngOnInit() {
    this.AccountManagerValidationFrom = this.formBuilder.group(
      { managerName: [null, Validators.compose([Validators.required])] }
    )
    this.getAllAccountManagerDetail();
  }
  ngOnDestroy() {
    this.accountManagerDetail = new AccountManager();
    this.listOfAccountManager = new Array<AccountManager>();
    this.managerId = undefined;
    this.headerText = 'Add New Account Manager';
    this.errors = new Array<string>();
    this.pagination = new Pagination();
  }


  showDiscountModel(action, managerDetails) {
    if (this.utilService.isNullUndefinedOrBlank(managerDetails)) {
      this.accountManagerDetail = new AccountManager();
    } else {
      this.accountManagerDetail = Deserialize(managerDetails, AccountManager);
    }
    if (action === 'Add') {
      this.headerText = 'Add New Account Manager';
    }
    if (action === 'Edit') {
      this.headerText = 'Edit Account Manager';
    }
    this.utilService.openModal('addmanager');
  }
  saveManagerDetail() {
    this.errors = new Array<string>();
    var param =
    {
      jsonOfObject: Serialize(this.accountManagerDetail, AccountManager)
    }
    if (!this.utilService.isNullUndefinedOrBlank(this.accountManagerDetail.id)) {
      this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.updateManagerDetailAPI, param, (response, isRoute) => {

        if (isRoute) {
          this.utilService.hideModal('addmanager');
          this.getAllAccountManagerDetail();
          this.resetModel();
        } else {
          this.errors.push(response);
          var elmnt = document.getElementById("error_div");
          elmnt.scrollIntoView();
        }
      }, undefined, true)
    } else {
      this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.saveManagerDetailAPI, param, (response, isRoute) => {
        console.log(isRoute);
        console.log(response);
        if (isRoute) {
          this.utilService.hideModal('addmanager');
          this.getAllAccountManagerDetail();
          this.resetModel();
        } else {
          this.errors.push(response);
          var elmnt = document.getElementById("error_div");
          elmnt.scrollIntoView();
        }
      }, undefined, true);
    }
  }
  updateManagerDetail() {
    var param = Serialize(this.accountManagerDetail, AccountManager);
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.updateManagerDetailAPI, param, response => {
      this.utilService.hideModal('addmanager');
      this.getAllAccountManagerDetail();
      this.resetModel();
    })
  }

  getAllAccountManagerDetail(key?: string) {
    if (key) {
      this.pagination.startPos = 0;
      this.pagination.selectPage = this.pagination.startPos.toString();
    };
    this.paginattionService.setPaginationVariablesBeforeAPICall(this.pagination);
    var param = {
      pageNo: this.pagination.selectPage.toString(),
      noOfRecords: this.pagination.perPage.toString(),
      searchText: this.pagination.searchText ? this.pagination.searchText : undefined
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllManagerDetailForDisplayAPI, param, (response, isRoute) => {
      this.listOfAccountManager = new Array<AccountManager>();
      if (!this.utilService.isNullUndefinedOrBlank(response)) {
        this.paginattionService.setPaginationVariablesAfterAPICall(this.pagination, response);
        this.listOfAccountManager = Deserialize(response, AccountManager);
      }
    }, undefined, true)
  }

  getPreviousData() {
    this.paginattionService.getPreviousData(this.pagination);
    this.getAllAccountManagerDetail();
  }
  getNextData() {
    this.paginattionService.getNextData(this.pagination);
    this.getAllAccountManagerDetail();
  }
  goToPageFun() {
    this.paginattionService.goToPageFun(this.pagination);
    this.getAllAccountManagerDetail();
  }
  selectPerPage() {
    this.paginattionService.selectPerPage(this.pagination);
    this.getAllAccountManagerDetail();
  }
  resetModel() {
    this.AccountManagerValidationFrom.reset();
    this.accountManagerDetail = new AccountManager();
    this.errors = new Array<string>();
    this.headerText = "Add New Account Manager";
  }
  deleteManager(managerId) {
    this.managerId = managerId;
    this.accountManagerDetail = new AccountManager();
  }
  deleteManagerById() {
    var param = { id: this.managerId };
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.deleteManagerByIdAPI, param, (response, isRoute) => {
      if (isRoute) {
        this.utilService.hideModal('addmanager');
        var length = this.listOfAccountManager.length;
        if (isRoute) {
          if (this.pagination.startPos != 0 && length - 1 == 0) {
            this.getPreviousData();
          }
        }
        this.getAllAccountManagerDetail();
        this.resetModel();
      } else {
        this.errors.push(response);
        var elmnt = document.getElementById("error_div");
        elmnt.scrollIntoView();
      }
    })

  }


  /* ...............Change status ....................  */

  changeStatus(data, index) {
    var param = { jsonOfObject: Serialize(this.listOfAccountManager[index], AccountManager) };
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.updateManagerDetailAPI, param, response => {
      this.getAllAccountManagerDetail();
    })
  }
  /* ...............End....................  */
  /* ............ Edit manager ............ */
  editManagerDetail(data) {
    // this.accountManagerDetail = data;
    this.headerText = "Edit Account Manager"
    // this.headerText = "Edit Manager";
    this.accountManagerDetail = $.extend(true, {}, data);
    this.accountManagerDetail = Deserialize(this.accountManagerDetail, AccountManager);
    this.errors = new Array<string>();
  }
  /* Download image from server */
  // downloadFunction(links) {
  //   console.log(links);

  //   var dlLink = document.createElement('a');
  //   dlLink.download = 'downloadfile';
  //   dlLink.href = links;
  //   dlLink.dataset.downloadurl = [links._body, links.href].join(':');
  //   document.body.appendChild(dlLink);
  //   dlLink.click();
  //   document.body.removeChild(dlLink);
  // }
  /* End download image from server */



}

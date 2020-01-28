import { Component, OnInit } from '@angular/core';
import { PaginattionService } from '../../../service/PaginationService';
import { Pagination } from '../../../models/Pagination';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-offer-stock-list',
  templateUrl: './offer-stock-list.component.html',
  styleUrls: ['./offer-stock-list.component.css']
})
export class OfferStockListComponent implements OnInit {

  pagination = new Pagination();
  listOfStockList: Array<object> = new Array<object>();
  isCheckAll: boolean;
  listOfSelectedIds = []
  constructor(public paginattionService: PaginattionService, public utilService: UtilService) {
    this.getAllStockRequest();
  }

  ngOnInit() {
  }


  singleCheck(isSingleChecked, id) {
    this.isCheckAll = this.utilService.singleCheck(isSingleChecked, this.isCheckAll, this.listOfStockList);
    // if check all is true then get all the id of the record. else push/splice selected id into array.
    if (this.isCheckAll) {
      // this.listOfSelectedIds = this.listOfStockList.map(item => (item['id']));
      this.listOfStockList.map(item => {
        if (!this.listOfSelectedIds.includes(item['id'])) { this.listOfSelectedIds.push(item['id']); }
      });
    } else {
      if (isSingleChecked) {
        if (!this.listOfSelectedIds.includes(id)) { this.listOfSelectedIds.push(id); }
      } else {
        const index = this.listOfSelectedIds.indexOf(id); console.log('index for remove : ' + index);
        this.listOfSelectedIds.splice(index, 1);
      }
    }
    console.log(this.listOfSelectedIds);
  }

  checkAllItem() {
    this.isCheckAll = this.utilService.checkAll(this.isCheckAll, this.listOfStockList);
    // if check all is true then get all the id of the record. else black  ids array.
    if (this.isCheckAll) {
      // this.listOfAgencyIds = this.listOfStockList.map(item => (item['id']));
      this.listOfStockList.map(item => {
        if (!this.listOfSelectedIds.includes(item['id'])) { this.listOfSelectedIds.push(item['id']); }
      });
    } else {
      // this.listOfSelectedIds = [];
      this.listOfStockList.map(item => {
        if (this.listOfSelectedIds.includes(item['id'])) {
          const ind = this.listOfSelectedIds.indexOf(item['id']);
          this.listOfSelectedIds.splice(ind, 1);
        }
      });
    }
    console.log(this.listOfSelectedIds);
  }

  getAllStockRequest(key?: string) {
    if (key) {
      this.pagination.startPos = 0;
      this.pagination.selectPage = this.pagination.startPos.toString();
    };
    this.paginattionService.setPaginationVariablesBeforeAPICall(this.pagination);
    var param = {
      pageNo: this.pagination.selectPage.toString(),
      noOfRecords: this.pagination.perPage.toString(),
      // status: 'Pending',
      searchText: this.pagination.searchText ? this.pagination.searchText : undefined

    }
    // this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllStockOfferWithUserByStatusAPI, param, (response, isRoute) => {
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllOrdersDetailAPI, param, (response, isRoute) => {
      console.error(isRoute)
      this.listOfStockList = new Array<object>();
      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.paginattionService.setPaginationVariablesAfterAPICall(this.pagination, response);
          this.listOfStockList = response;
          this.makeItemSelected();
        }
      }
    })
  }

  getPreviousData() {
    this.paginattionService.getPreviousData(this.pagination);
    this.getAllStockRequest();
  }
  getNextData() {
    this.paginattionService.getNextData(this.pagination);
    this.getAllStockRequest();
  }
  goToPageFun() {
    this.paginattionService.goToPageFun(this.pagination);
    this.getAllStockRequest();
  }
  selectPerPage() {
    this.paginattionService.selectPerPage(this.pagination);
    this.getAllStockRequest();
  }

  makeItemSelected() {
    let counter = 0;
    this.isCheckAll = false;
    this.listOfStockList.forEach((element, index) => {
      if (this.listOfSelectedIds.includes(element['id'])) {
        element['selected'] = true;
        counter++;
        if (counter === this.listOfStockList.length) {
          console.log('===>all selected agency <===' + counter);
          this.isCheckAll = true;
        }
      } else {
        element['selected'] = false;
      }
    });
  }

  ChangeStockRequestStatus() {
    console.log(status);
    var param = {
      jsonOfObject: {
        id: this.listOfSelectedIds,
        status: 'Accepted'
      },
    }

    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.changeStockOfferStatusAPI, param, (response, isRoute) => {
      if (isRoute) {
        this.getAllStockRequest();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { PaginattionService } from '../../../service/PaginationService';
import { Pagination } from '../../../models/Pagination';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-offer-discount',
  templateUrl: './offer-discount.component.html',
  styleUrls: ['./offer-discount.component.css']
})
export class OfferDiscountComponent implements OnInit {

  pagination = new Pagination();
  listOfStockList: Array<object> = new Array<object>();

  constructor(public paginattionService: PaginattionService, public utilService: UtilService) {
    this.getAllStockData();
  }

  ngOnInit() {
    console.log('offer')
  }

  getAllStockData() {
    this.paginattionService.setPaginationVariablesBeforeAPICall(this.pagination);
    var param = {
      pageNo: this.pagination.selectPage.toString(),
      noOfRecords: this.pagination.perPage.toString(),
      status: 'Requested',
      userId : this.utilService.getLoginUsersId(),
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllStockOfferByUserAnStatusAPI, param, (response, isRoute) => {
      console.error(isRoute)
      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.paginattionService.setPaginationVariablesAfterAPICall(this.pagination, response);
          this.listOfStockList = response;
        }
      }
    })
  }

  getPreviousData() {
    this.paginattionService.getPreviousData(this.pagination);
    this.getAllStockData();
  }
  getNextData() {
    this.paginattionService.getNextData(this.pagination);
    this.getAllStockData();
  }
  goToPageFun() {
    this.paginattionService.goToPageFun(this.pagination);
    this.getAllStockData();
  }
  selectPerPage() {
    this.paginattionService.selectPerPage(this.pagination);
    this.getAllStockData();
  }
  navigateRoute(){
    this.utilService.redirectTo('/home/work_area/user/dashboard/stock-list')
  };
}

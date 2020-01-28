import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnumForStock } from '../../../../enum/enum-for-stock.enum';
import { Pagination } from '../../../models/Pagination';
import { ExportExcelService } from '../../../service/exportExcel.service';
import { PaginattionService } from '../../../service/PaginationService';
import { UtilService } from '../../../service/util.service';
@Component({
  selector: 'app-stock-inner-detail',
  templateUrl: './stock-inner-detail.component.html',
  styleUrls: ['./stock-inner-detail.component.css']
})
export class StockInnerDetailComponent implements OnInit {

  listOfStockList: Array<object> = new Array<object>();
  listOfBackupStockList: Array<object> = new Array<object>();
  listOfGrade = new Array();
  listOfNetwork = new Array();
  searchText:any;
  totalNoOfRecords: number = 0;
  listOfModels: Array<String>;
  enumForStock: EnumForStock;
  currency = 'GBP';
  pagination = new Pagination();
  searchParam: string;
  arrayForMakeOffer = new Array();
  makeErrorButtonDisable: boolean = false;
  filterByGrade: string;
  filterByModel: string;
  filterByNetwork: string;
  listOfPendingRequest = new Array<object>();

  allTH = [
    {
      name: 'Model',
      // value: 'model'
    },
    {
      name: 'Name',
    },
    {
      name: 'Grade',
      value: 'grade'
    },
    {
      name: 'Qty In Stock',
      value: 'qty'
    },
    {
      name: 'Guide Price',
      value: 'sale_price'

    },
    {
      name: 'Currency',
    },
    {
      name: 'Network',
    },
    {
      name: 'Offer Qty',
    },

    {
      name: 'Offer Price',
    },

  ]
  // arrayOfCurrency = [
  //   { name: 'GBP' },
  //   { name: 'EUR' },
  // ]
  constructor(public utilService: UtilService, public paginattionService: PaginattionService, public exportExcelService: ExportExcelService, public activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      console.log(params.search);
      this.searchParam = params.search;
      this.getAllStockDetail(true);
    })
  }

  ngOnInit() {
    this.getPendingRequest();
  }

  getPendingRequest() {
    var param = {
      status: 'Pending',
      userId: this.utilService.getLoginUsersId(),
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllStockOffersByUserIdAndStatusAPI, param, (response, isRoute) => {
      console.error(isRoute)
      this.getAllData();

      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.listOfPendingRequest = response;
          this.listOfPendingRequest.forEach(stock => {
            this.arrayForMakeOffer.push({
              id : stock['id'],
              stock_item_id: stock['stock_item_id'].id,
              offerQty: stock['offerQty'],
              offer: stock['offer'],
              grade: stock['stock_item_id'].grade,
              detail: stock['stock_item_id'].detail,
              status: 'Requested',
              userId: this.utilService.getLoginUsersId()
            });
          });
        }
      }
    })
  }
  checkIsEmpty(){
    if(this.utilService.isNullUndefinedOrBlank(this.searchText)){
      console.log("found")
      this.getAllStockDetail(true);
    }
    console.log(this.searchText);
  }
  getAllStockDetail(callAPI?: boolean, key?: string, ) {
    // var param = {
    //   searchBy: search
    // }
    if (!callAPI) {
      return false;
    }
    if (key) {
      this.paginattionService.setSortByKeyAndOrder(this.pagination, key);
    }
    this.paginattionService.setPaginationVariablesBeforeAPICall(this.pagination);
    var param = {
      pageNo: this.pagination.selectPage.toString(),
      noOfRecords: this.pagination.perPage.toString(),
      sortColumn: this.pagination.sortColumn,
      sortBy: this.pagination.sortBy,
      searchBy: this.searchParam,
      filterByGrade: this.filterByGrade ? this.filterByGrade : undefined,
      filterByModel: this.filterByModel ? this.filterByModel : undefined,
      filterByNetwork: this.filterByNetwork ? this.filterByNetwork : undefined,
      searchText: this.searchText ? this.searchText : undefined,
    }
    this.utilService.postMethodAPI(false, this.utilService.ServiceVariable.getAllStockDetailsWithPaginationAPI, param, (response, isRoute) => {
      console.error(isRoute)
      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.paginattionService.setPaginationVariablesAfterAPICall(this.pagination, response);
          this.listOfStockList = response;
          this.listOfBackupStockList = response.map(x => Object.assign({}, x));
          // this.listOfStockList.forEach(stock => {
          //   if (!this.utilService.isEmptyObject(this.listOfPendingRequest)) {
          //     let findPendingRecord = this.listOfPendingRequest.find(pending => !this.utilService.isNullUndefinedOrBlank(pending['stock_item_id']) && pending['stock_item_id'].id == stock['stock_item_id']);
          //     console.error(findPendingRecord);
          //     if (!this.utilService.isNullUndefinedOrBlank(findPendingRecord)) {
          //       stock['offerQty'] = findPendingRecord['offerQty'] ? findPendingRecord['offerQty'] : 0;
          //       stock['offerDiscount'] = findPendingRecord['offer'] ? findPendingRecord['offer'] : 0;
          //     }
          //   }
          // })
          this.listOfPendingRequest.forEach(pendingReq => {
            let findPendingRecord = this.listOfStockList.find(stockL => !this.utilService.isNullUndefinedOrBlank(pendingReq['stock_item_id']) && stockL['stock_item_id'] == pendingReq['stock_item_id'].id);
            console.error(findPendingRecord);
            findPendingRecord['offerQty'] = pendingReq['offerQty'] ? pendingReq['offerQty'] : 0;
            findPendingRecord['offerPrice'] = pendingReq['offer'] ? pendingReq['offer'] : 0;
          })

          // let findFromArray = this.arrayForMakeOffer.find(s => s.stock_item_id == stock['id']);
          // if (!this.utilService.isNullUndefinedOrBlank(findFromArray)) {
          //   stock['offerQty'] = findFromArray.offerQty;
          //   stock['offerDiscount'] = findFromArray.offer;
          // }

        }
      }
    })
  }
  getPreviousData() {
    this.paginattionService.getPreviousData(this.pagination);
    this.getAllStockDetail(true);
  }
  getNextData() {
    this.paginattionService.getNextData(this.pagination);
    this.getAllStockDetail(true);
  }
  goToPageFun() {
    this.paginattionService.goToPageFun(this.pagination);
    this.getAllStockDetail(true);
  }
  selectPerPage() {
    this.paginattionService.selectPerPage(this.pagination);
    this.getAllStockDetail(true);
  }
  saveOffer() {
    console.log(this.listOfStockList);
  }
  getAllData() {
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllFilterDataAPI, "", response => {
      this.listOfModels = response['modelData'] ? response['modelData'] : new Array();
      this.listOfGrade = response['gradeData'] ? response['gradeData'] : new Array();
      this.listOfNetwork = response['networks'] ? response['networks'] : new Array();
    })
  }
  // downloadStockList() {
  //   this.exportExcelService.exportAsExcelFile(this.listOfStockList, 'StockList')
  // }

  checkForQtyAndAdd(stock, index) {
    // console.error(JSON.stringify(stock));
    stock.qtyError = false;
    stock.offerError = false;
    // let removedRecord ;
    let findIndexInExitRecord = this.arrayForMakeOffer.findIndex(s => s.stock_item_id == stock.stock_item_id)
    if (findIndexInExitRecord >= 0) {
      // removedRecord = this.arrayForMakeOffer[findIndexInExitRecord];
      this.arrayForMakeOffer.splice(findIndexInExitRecord, 1);
    }
    if (!this.utilService.isNullUndefinedOrBlank(stock.offerQty) && stock.offerQty > 0 && stock.qty > 0) {
      if (stock.offerQty > stock.qty) {
        stock.qtyError = true;
      }
    }
    if (!this.utilService.isNullUndefinedOrBlank(stock.offerPrice) && stock.offerPrice > 0 && +this.utilService.siteSettingDetail.offerDiscount > 0) {
      let price = +stock.sale_price - (+stock.sale_price * +this.utilService.siteSettingDetail.offerDiscount / 100);
      price = +price.toFixed(2);
      stock.offerPriceCal = price;
      if (stock.offerPrice < +price) {
        stock.offerError = true;
      }
    }
    if ((!stock.qtyError && !stock.offerError) && (stock.offerQty || stock.offerPrice)) {
      this.arrayForMakeOffer.push(this.setObjectToPush(stock));
    }
    this.makeErrorButtonDisable = false;
    let count = this.listOfStockList.filter(stock => stock['qtyError'] == true || stock['offerError'] == true);
    if (count.length > 0) {
      this.makeErrorButtonDisable = true;
    }
  }

  setObjectToPush(stock) {
    return {
      stock_item_id: stock.stock_item_id,
      offerQty: stock.offerQty,
      offer: stock.offerPrice,
      offerPrice: stock.offerPriceCal,
      grade: stock.grade,
      detail: stock.detail,
      status: 'Requested',
      userId: this.utilService.getLoginUsersId()
    }
  }
  makeOffer() {
    this.arrayForMakeOffer.forEach(item => item.status = 'Requested')
    var param = {
      listOfJsonObject: this.arrayForMakeOffer
    }
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.makeAnOfferForStockAPI, param, (response, isRoute) => {
      console.error(response);
      console.error(isRoute);
      if (isRoute) {
        this.arrayForMakeOffer = [];
        this.listOfStockList = this.listOfBackupStockList;
      }
    });
  }
  saveOfferForLater() {
    this.arrayForMakeOffer.forEach(item => item.status = 'Pending')
    var param = {
      listOfJsonObject: this.arrayForMakeOffer
    }
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.saveOfferForStockAPI, param, (response, isRoute) => {
      console.error(response);
      console.error(isRoute);
      if (isRoute) {
        // this.arrayForMakeOffer = [];
        // this.listOfStockList = this.listOfBackupStockList;
      }
    });
  }

  downloadStockList() {
    // var ob = {
    //   searchBy: this.searchParam
    // }
    // this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.downloadStockListAPI, ob, response => {
    //   console.log(response);
    //   this.exportExcelService.exportAsExcelFile(response, 'StockList')
    //   // this.listOfModels = response['modelData'] ? response['modelData'] : new Array();
    //   // this.listOfGrade = response['gradeData'] ? response['gradeData'] : new Array();
    // });

    // var dirPath = 'http://localhost:1337/downloadStockList?searchBy=grade';
    var dirPath = this.utilService.URL + this.utilService.ServiceVariable.downloadStockListAPI + '?searchBy=' + this.searchParam
    var fileName = 'Stocklist';
    this.utilService.downloadFunction(dirPath, fileName);
  }

  downloadOffer() {
    var dirPath = this.utilService.URL + this.utilService.ServiceVariable.downloadStockOffersAPI + '?userId=' + this.utilService.getLoginUsersId();
    var fileName = 'Offerlist';
    this.utilService.downloadFunction(dirPath, fileName);
  }
}

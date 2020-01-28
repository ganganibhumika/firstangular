import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../service/util.service';
import { User } from '../../../models/User';
import { Deserialize, DeserializeInto } from 'cerialize';
import { StockOffer } from 'src/app/models/StockOffer';
import { st } from '@angular/core/src/render3';

@Component({
  selector: 'app-offer-stock-detail-view',
  templateUrl: './offer-stock-detail-view.component.html',
  styleUrls: ['./offer-stock-detail-view.component.css']
})
export class OfferStockDetailViewComponent implements OnInit {

  orderId: string;
  userId: string;
  isCheckAll = false;
  user = new User();
  listOfStockList: Array<User> = new Array<User>();
  listOfSelectedIds = []
  listOfOffer: Array<StockOffer> = new Array<StockOffer>();
  constructor(public activatedRoute: ActivatedRoute, public utilService: UtilService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.orderId = params['orderId'];
      this.userId = params['userId'];
      // this.searchParam = params.search;
      // this.getAllStockDetail(true);
      this.getOfferById();
    })
  }


  getOfferById() {

    var param = {
      orderId: this.orderId,
      userId: this.userId
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllOrdersDetailDescriptionAPI, param, (response, isRoute) => {
      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.user = Deserialize(response, User);
          // if (!this.utilService.isEmptyObjectOrNullUndefiend(this.user.listOfOffer)) {
          //   this.user.listOfOffer = DeserializeInto(this.user.listOfOffer, StockOffer, this.user);
          // }
        }
      }
    });
  }

  singleCheck(isSingleChecked, stock) {
    this.isCheckAll = this.utilService.singleCheck(isSingleChecked, this.isCheckAll, this.user.listOfOffer);
    if (this.isCheckAll) {
      this.user.listOfOffer.map(item => {
        if (!this.listOfSelectedIds.some(sItem => sItem == item.id)) {
          this.listOfSelectedIds.push(item.id);
        }
      });
    } else {
      if (isSingleChecked) {
        if (!this.listOfSelectedIds.some(sItem => sItem == stock)) {
          this.listOfSelectedIds.push(stock);
        }
      } else {
        const index = this.listOfSelectedIds.findIndex(sItem => sItem == stock);
        console.log('index for remove : ' + index);
        this.listOfSelectedIds.splice(index, 1);
      }
    }

    console.error(this.listOfSelectedIds);
  }

  checkAllItem() {
    this.isCheckAll = this.utilService.checkAll(this.isCheckAll, this.user.listOfOffer);
    if (this.isCheckAll) {
      this.user.listOfOffer.map(item => {
        if (!this.listOfSelectedIds.some(sItem => sItem == item.id)) {
          this.listOfSelectedIds.push(item.id);
        }
      });
    } else {
      this.listOfStockList.map(item => {
        let index = this.listOfSelectedIds.findIndex(sItem => sItem == item['id'])
        if (index >= 0) {
          this.listOfSelectedIds.splice(index, 1);
        }
        // if (this.listOfSelectedIds.some(sItem => sItem.id == item['id'])) {
        //   const ind = this.listOfSelectedIds.indexOf(item['id']);
        // }
      });
    }
    console.error(this.listOfSelectedIds);
  }

  getSelectedArrayField(stock: StockOffer) {
    return {
      "id": stock.id,
      // "menufacturingname": stock.otherDetail['menufacturingname'],
      "grade": stock.otherDetail ? stock.otherDetail['grade'] : undefined,
      "detail": stock.otherDetail ? stock.otherDetail['detail'] : undefined,
      "offerQty": stock.offerQty,
      "offerPrice": stock.offer,
      status : stock.status,
    }
  }

  changeStockRequestStatus(status) {
    console.log(status);
    var param = {
      jsonOfObject: {
        // userId : this.user.id,
        // email : this.user.email,
        // orderId : this.orderId,
        // status: status,
        // listOfOffer : this.listOfSelectedIds
        id: this.listOfSelectedIds,
        status: status
      },
    }

    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.changeStockOfferStatusAPI, param, (response, isRoute) => {
      if (isRoute) {
        this.getOfferById();
        this.listOfSelectedIds = [];
        this.isCheckAll = false;
      }
    });
  }

  sendEmail() {
    let listOfOffer = []
    console.error(this.user.listOfOffer.every(item => item['status'] === 'Requested'));
    let isRequested = this.user.listOfOffer.every(item => item['status'] === 'accepted' || item['status'] === 'decline');
    if (!isRequested) {
      console.log('111111111111111');
      // alert('All item status should be either accept or decline');
      this.utilService.CreateNotification('error', undefined, 'All item status should be either accept or decline', 0)
      return;
    }
    this.user.listOfOffer.forEach(item => {
      listOfOffer.push(this.getSelectedArrayField(item))
    })
    var param = {
      jsonOfObject: {
        userId: this.user.id,
        userName: this.user.firstName,
        email: this.user.email,
        orderId: this.orderId,
        listOfOffer: listOfOffer
      },
    }

    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.sendmailByAdminAPI, param, (response, isRoute) => {
      if (isRoute) {
        this.getOfferById();
        this.listOfSelectedIds = [];
        this.isCheckAll = false;
      }
    });
  }

}

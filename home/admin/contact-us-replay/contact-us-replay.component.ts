import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { PaginattionService } from 'src/app/service/PaginationService';
import { Pagination } from 'src/app/models/Pagination';
import { ContactUs } from '../../../models/ContactUs';
import { Deserialize } from 'cerialize';

@Component({
  selector: 'app-contact-us-replay',
  templateUrl: './contact-us-replay.component.html',
  styleUrls: ['./contact-us-replay.component.css']
})
export class ContactUsReplayComponent implements OnInit {

  pagination = new Pagination();
  listOfReplay = new Array<ContactUs>();
  deleteId: string;

  constructor(public utilService: UtilService, public paginattionService: PaginattionService) { }

  ngOnInit() {
    this.getAllRecords();
  }

  getAllRecords(key?: string) {
    if (key) {
      this.pagination.startPos = 0;
      this.pagination.selectPage = this.pagination.startPos.toString()
    };

    this.paginattionService.setPaginationVariablesBeforeAPICall(this.pagination);
    var param = {
      pageNo: this.pagination.selectPage.toString(),
      noOfRecords: this.pagination.perPage.toString(),
      searchText : this.pagination.searchText ? this.pagination.searchText : undefined
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllContactUsAPI, param, (response, isRoute) => {
      this.listOfReplay = new Array<ContactUs>();
      if (!this.utilService.isNullUndefinedOrBlank(response)) {
        this.paginattionService.setPaginationVariablesAfterAPICall(this.pagination, response);
        this.listOfReplay = Deserialize(response, ContactUs);
      }
    }, undefined, true)

  }
  deleteContactById() {
    var param = { contactUsId: this.deleteId };
    this.utilService.getMethodAPI(true, this.utilService.ServiceVariable.removeContactUsByIdAPI, param, (response, isRoute) => {
      var length = this.listOfReplay.length;
      if (isRoute) {
        if (this.pagination.startPos != 0 && length - 1 == 0) {
          this.getPreviousData();
        }
      }
      this.getAllRecords();
    });
  }
  removeContactUs(replayId) {
    this.deleteId = replayId;
  }

  getPreviousData() {
    this.paginattionService.getPreviousData(this.pagination);
    this.getAllRecords();
  }
  getNextData() {
    this.paginattionService.getNextData(this.pagination);
    this.getAllRecords();
  }
  goToPageFun() {
    this.paginattionService.goToPageFun(this.pagination);
    this.getAllRecords();
  }
  selectPerPage() {
    this.paginattionService.selectPerPage(this.pagination);
    this.getAllRecords();
  }

}

import { Injectable } from '@angular/core';
import { Pagination } from '../models/Pagination';

@Injectable({
    providedIn: 'root'
})
export class PaginattionService {

    public getPreviousData(pagination) {
        console.error('pagination.startPos ::' + pagination.startPos)
        console.error('pagination.perPage ::' + pagination.perPage)
        pagination.startPos = +pagination.startPos - +pagination.perPage;
        pagination.selectPage = (+pagination.selectPage - 1).toString();
    }
    public getNextData(pagination) {
        // pagination.startPos += 1;
        // console.error('pagination.startPos ::' + pagination.startPos)
        // console.error('pagination.perPage ::' + pagination.perPage)
        pagination.startPos = +pagination.startPos + +pagination.perPage;
        pagination.selectPage = (+pagination.selectPage + 1).toString();
    }

    public goToPageFun(pagination) {
        pagination.startPos = +(+pagination.selectPage * +pagination.perPage);
    }

    public setPaginationVariablesBeforeAPICall(pagination) {
        if (pagination.staselectPagertPos < 0) {
            pagination.selectPage = 0;
        }

        pagination.noOfRecordsPerPage = Number(pagination.perPage);
        pagination.lastAchive = false;
    }

    public setPaginationVariablesAfterAPICall(pagination, Response) {
        if (Response.length == 0) {
            pagination.totalRecords = 0;
        }
        if (Response.length > 0 && Response[0].totalNoOfRecords) {
            pagination.totalRecords = Response[0].totalNoOfRecords;
        }
        // 21 <= 25
        if ((pagination.totalRecords <= (pagination.startPos + +pagination.noOfRecordsPerPage))) {
            pagination.lastAchive = true;
        }
        pagination.goToPageArray = this.fillgoToPageDropDownArray(pagination.totalRecords, pagination.perPage)
    }

    public selectPerPage(pagination) {
        pagination.startPos = 0;
        pagination.selectPage = pagination.startPos.toString();
    }

    public searchStoneByButton(pagination) {
        pagination.startPos = 0;
        pagination.selectPage = pagination.startPos.toString();
    }

    public fillgoToPageDropDownArray(totalNoOfRecords, recordsPerPage) {
        var count = Math.ceil(totalNoOfRecords / +recordsPerPage);
        if (count > 0) {
            let goToPageArray = [];
            for (var i = 1; i <= count; i++) {
                goToPageArray.push({
                    "name": "Page " + i,
                    "id": (i - 1).toString()
                });
            }
            return goToPageArray;
        }
    }
    public setSortByKeyAndOrder(pagination: Pagination, key: string) {
        let className = '';
        if (pagination.sortColumn && pagination.sortColumn === key) {
            if (pagination.sortBy === 'asc') {
                pagination.sortBy = 'desc';
                className = 'fa fa-sort-amount-desc';
            } else {
                pagination.sortBy = 'asc';
                className = 'fa fa-sort-amount-asc';
            }
        } else {
            pagination.sortColumn = key;
            pagination.sortBy = 'asc';
            className = 'fa fa-sort-amount-asc';
        }
        pagination.className = className;
    }
}
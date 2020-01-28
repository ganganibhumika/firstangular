import { Component, OnInit } from '@angular/core';
import { EnumForStock } from '../../../../enum/enum-for-stock.enum';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  enumForStock = EnumForStock;
  constructor(public utilService: UtilService) {
    console.log(EnumForStock.GRADE.toString());
  }

  ngOnInit() {
  }

  routeForNextPage(routeName) {
    this.utilService.redirectTo('/home/work_area/user/dashboard/stock-detail-view/' + routeName);
  }

}

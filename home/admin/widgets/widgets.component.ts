import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  response : any; 
  constructor(public utilService : UtilService) { }

  ngOnInit() {
    this.getDataForDashBoard();
  }

  getDataForDashBoard() {
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getTotalNoOfRecorsAPI, undefined, (response) => {
      console.log(JSON.stringify(response));
      if (!this.utilService.isNullUndefinedOrBlank(response)) {
        this.response = response;
      }
    })
  }


}

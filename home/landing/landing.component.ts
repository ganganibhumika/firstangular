import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../service/util.service';
import { User } from '../../models/User';
import { Serialize } from 'cerialize';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isLoading = true;
  constructor(public utilService: UtilService) {
    console.error(this.utilService.SITE_LOGO)
  }
  userDetails = new User();
  ngOnInit() {
  }
  register() {
    console.log(this.userDetails);
    var param = {
      jsonOfObject: Serialize(this.userDetails, User)
    }
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.registerUserAPI, param, response => {
      console.log(response);
    });
  }

}

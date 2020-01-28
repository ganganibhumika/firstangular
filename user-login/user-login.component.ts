import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../models/User';
import { UtilService } from '../service/util.service';
import { Serialize } from 'cerialize';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,
    public utilService: UtilService) { }

  ngOnInit() {
    this.loginValidtionFrom = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    })
    console.log('change by bharti')
  }

  loginUserDetail = new User();
  private loginValidtionFrom: FormGroup;

  userLogin() {
    if(!this.loginValidtionFrom.valid){
      return;
    }
    var param = {
      jsonOfobject: Serialize(this.loginUserDetail, User)
    }
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.userLoginAPI, param, (response, isRoute) => {
      console.log(response)
      console.log(isRoute);
      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.utilService.storageListnerService.store(this.utilService.storageListnerService.key, response);
        }
      }
    });
  }

}

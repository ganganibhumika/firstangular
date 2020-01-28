import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UtilService } from '../../../service/util.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Serialize } from 'cerialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user = new User();
  form: FormGroup;
  passwordRes = { strength: undefined, color: undefined };
  constructor(public utilService: UtilService, public formBuilder: FormBuilder, public router: Router) {

  }

  ngOnInit() {
    this.user.id = this.utilService.getUserIdFromLocalStorge();
    this.applyValidation();
  }

  applyValidation() {
    this.form = this.formBuilder.group({
      oldPassword: [null, Validators.compose([Validators.required])],
      newPassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])],
      confirmPassword: [null, Validators.compose([Validators.required])],
    });
  }

  changePassword() {
    if (!this.form.valid) {
      return;
    }
    var param = {
      jsonOfObject: Serialize(this.user, User)
    }
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.changePasswordAPI, param, (response, isRoute) => {
      // console.log(response);
      // console.log(isRoute);
      if (isRoute) {
        this.router.navigate(['home/work_area/login']);
      }
    });
  }

  checkPassword() {
    this.passwordRes = this.utilService.validationService.checkPasswordStrength(this.user.password);
  }

}

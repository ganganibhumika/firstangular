import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UtilService } from '../../service/util.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public utilService: UtilService) { }

  ngOnInit() {
    this.emailValidation = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(this.utilService.validationService.PATTERN_FOR_EMAIL)])],
    })
  }
  userEmail: any;
  emailValidation: FormGroup;

  sendMailForResetPassword() {
    console.log('call');
    var param = {
      email: this.userEmail
    }
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.sendMailOfForgetPasswordAPI, param, response => {
      console.log(response);
      this.utilService.redirectTo('/home/work_area/login');
    });

  }

}

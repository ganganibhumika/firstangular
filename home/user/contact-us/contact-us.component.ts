import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../../../models/ContactUs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UtilService } from '../../../service/util.service';
import { Serialize } from 'cerialize';
import { User } from '../../../models/User';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactDetail = new ContactUs();
  contactFormValidation: FormGroup;
  user: User = JSON.parse(localStorage.getItem('userDetails'));
  constructor(private formBuilder: FormBuilder, public utilService: UtilService) {
    // const user: User = JSON.parse(localStorage.getItem('userDetails'));
    // if (!this.utilService.isNullUndefinedOrBlank(this.user)) {
    //   this.contactDetail.email = this.user.email ? this.user.email : '';
    //   this.contactDetail.name = (this.user.firstName ? this.user.firstName : '') + ' ' + (this.user.lastName ? this.user.lastName : '');
    // }
    this.setUserDetail();
  }

  ngOnInit() {
    this.contactFormValidation = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(this.utilService.validationService.PATTERN_FOR_EMAIL)])],
      message: [null, Validators.compose([Validators.required])],
    });
  }
  saveContactDetail() {
    this.contactDetail.idOfUser = this.utilService.getUserIdFromLocalStorge();
    var ob = {
      jsonOfObject: Serialize(this.contactDetail, ContactUs)
    }
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.saveContactUsDetailAPI, ob, response => {
      // console.log(response);
      this.contactFormValidation.reset();
      this.contactDetail = new ContactUs();
      setTimeout(() => {
        this.setUserDetail();
      }, 100);
    })
  }

  setUserDetail() {
    console.log('calledd')
    if (!this.utilService.isNullUndefinedOrBlank(this.user)) {
      this.contactDetail.email = this.user.email ? this.user.email : '';
      console.error(JSON.stringify(this.user.email));
      this.contactDetail.name = (this.user.firstName ? this.user.firstName : '') + ' ' + (this.user.lastName ? this.user.lastName : '');
    }
  }
}

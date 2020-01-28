import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UtilService } from '../service/util.service';
import { Serialize, Deserialize } from 'cerialize';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { AccountManager } from '../models/AccountManager';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(public utilService: UtilService, private formBuilder: FormBuilder) {
    console.error(JSON.stringify(this.utilService.siteSettingDetail));
    this.userRegistrationDetail.currency = this.utilService.isEmptyObjectOrNullUndefiend(this.utilService.siteSettingDetail) ? 'GBP' : this.utilService.siteSettingDetail.currency;
  }

  ngOnInit() {
    this.applyValidationForUserRegistration();
    this.getAllCountryDetails();
    this.getAllAcountManagerList();
  }

  userRegistrationDetail = new User();

  iAgree: boolean = false;
  registartionForm: FormGroup;
  formData: FormData;
  COUNTRY_JSON_FILE = './assets/json/allCountry.json';
  companyType = [
    { name: 'Limited' },
    { name: 'Partnership' },
    { name: 'Public Limited Company' },
    { name: 'Sole Trader' },
  ];
  countryList = new Array<string>();
  mtrAccountManager = new Array<AccountManager>();
  arrayOfCurrency = [
    { name: 'GBP' },
    { name: 'EUR' },
  ]
  errors = new Array<string>();
  listOfFiles = new Array<File>();
  listOfFilenNames = new Array<string>();
  applyValidationForUserRegistration() {
    this.registartionForm = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.pattern(this.utilService.validationService.PATTERN_FOR_EMAIL)])],
      mobileNo: [null, Validators.compose([Validators.required, Validators.pattern(this.utilService.validationService.PATTERN_FOR_PHONE_NO)])],
      mtrAccountManager: [null, Validators.compose([Validators.required])],
      companyType: [null, Validators.compose([Validators.required])],
      company: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      registrationNo: [null, Validators.compose([Validators.required])],
      vatNo: [null, Validators.compose([Validators.required])],
      // currency: [null, Validators.compose([Validators.required])],
      companyAddress: [null, Validators.compose([Validators.required])],
    });
  }
  userRegistration() {


    var emailParam = {
      email: this.userRegistrationDetail.email
    }
    if (!this.iAgree) {
      this.errors.push('You must agree to the terms and conditions before register.');
      var elmnt = document.getElementById("error_div");
      elmnt.scrollIntoView();
      return;
    }

    // Object.keys(this.registartionForm.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.registartionForm.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
    //     });
    //   }
    // });

    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.checkEmailIsExistOrNotAPI, emailParam, (res, isroute) => {
      if (isroute) {
        var param = {
          jsonOfObject: Serialize(this.userRegistrationDetail, User)
        };
        if (!this.utilService.isNullUndefinedOrBlank(this.iAgree)) {

          if (!this.utilService.isEmptyObjectOrNullUndefiend(this.listOfFiles)) {
            this.listOfFiles.forEach(file => this.formData.append('file', file));
            this.utilService.postMethodAPI(false, this.utilService.ServiceVariable.uploadDocumentAPI, this.formData, (response, isRoute) => {
              if (isRoute) {
                param['document'] = response;
                this.saveUserDetail(param);
              }
            });
          }
          else {
            this.saveUserDetail(param)
          }

        }
      }
    })
  }
  saveUserDetail(param) {
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.registerUserAPI, param, response => {
      this.utilService.redirectTo('/home/work_area/login');
    })
  }

  iAgreeWithTearms() {
    this.iAgree = !this.iAgree;
    if (this.iAgree) {
      this.errors = new Array<string>();
    }
  }
  resetError() {
    this.errors = new Array<string>();
  }
  getAllCountryDetails() {

    this.utilService.http.get(this.COUNTRY_JSON_FILE).subscribe(data => {
      this.countryList = data as string[];

    })
  }
  selectFile(event) {
    this.errors = new Array();
    this.formData = new FormData();
    var max_size = 1024 * (1024 * 1)
    var countInvalidExtension = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i];
      if (file) {
        var ext = file.name.split('.').pop();

        if (this.listOfFilenNames.includes(file.name)) {
          this.errors.push(file.name + ' already present');
        }
        else if (!this.utilService.isFileExtensionAllow(ext)) {
          countInvalidExtension = +countInvalidExtension + 1;
        } else if (max_size < file.size) {
          this.errors.push(file.name + ': File size must be less than 1 MB');
        } else {
          // this.utilService.readUrl(event, response => {
          //   this.imageSrc = response;
          // });
          this.listOfFiles.push(file);
          this.listOfFilenNames.push(file.name);
          // this.formData.append('file', this.selectedFile);
        }
      }
    }
    console.error(countInvalidExtension)
    if (countInvalidExtension > 0) {
      this.errors.push(this.utilService.FILE_EXTENSION_NOT_ALLOW_IMAGE);
    }

    if (this.errors.length > 0) {
      var elmnt = document.getElementById("error_div");
      elmnt.scrollIntoView();
    }
  }

  removeFile(index) {
    console.error(index);
    this.listOfFiles.splice(index, 1);
    this.listOfFilenNames.splice(index, 1);
    console.log(this.listOfFiles);
  }
  getAllAcountManagerList() {
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllManagerDetailAPI, "", response => {
      this.mtrAccountManager = Deserialize(response, AccountManager);
    })
  }

}

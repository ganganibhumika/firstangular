import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deserialize, Serialize } from 'cerialize';
import { AccountManager } from '../../../models/AccountManager';
import { User } from '../../../models/User';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-user-detail-edit',
  templateUrl: './user-detail-edit.component.html',
  styleUrls: ['./user-detail-edit.component.css']
})
export class UserDetailEditComponent implements OnInit, OnDestroy {

  companyType = [
    { name: 'Limited' },
    { name: 'Partnership' },
    { name: 'Public Limited Company' },
    { name: 'Sole Trader' },
  ];
  formData = new FormData();
  registartionForm: FormGroup;
  countryList = new Array<string>();
  COUNTRY_JSON_FILE = './assets/json/allCountry.json';
  mtrAccountManager = new Array<AccountManager>();
  user = new User();
  errors = new Array<string>();
  listOfFiles = new Array<File>();
  listOfFilenNames = new Array<string>();


  constructor(public utilService: UtilService, private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute, public route: Router) { }

  ngOnInit() {
    this.utilService.notFound = false;
    this.activatedRoute.params.subscribe(params => {
      this.user.id = params['id'];
    })
    this.applyValidation();
    this.getAllAcountManagerList();
    this.getUserDetailById();
    this.getAllCountryDetails();
  }

  ngOnDestroy() {
    this.utilService.notFound = false;
    this.countryList = new Array<string>();
    this.mtrAccountManager = new Array<AccountManager>();
    this.user = new User();
    this.errors = new Array<string>();
    this.listOfFiles = new Array<File>();
    this.listOfFilenNames = new Array<string>();
  }
  applyValidation() {
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

  getAllCountryDetails() {

    this.utilService.http.get(this.COUNTRY_JSON_FILE).subscribe(data => {
      this.countryList = data as string[];

    })
  }
  getAllAcountManagerList() {
    this.mtrAccountManager = new Array<AccountManager>();
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllManagerDetailAPI, "", response => {
      if (!this.utilService.isNullUndefinedOrBlank(response)) {
        this.mtrAccountManager = Deserialize(response, AccountManager);
      }
    })
  }

  getUserDetailById() {

    var param = {
      userId: this.user.id
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.findUserByIdAPI, param, (response, isRoute) => {
      console.log(isRoute)
      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.user = Deserialize(response, User);
          if (!this.utilService.isEmptyObjectOrNullUndefiend(this.user.idOfAccountManager)) {
            this.user.idOfAccountManager = this.user.idOfAccountManager['id'] ? this.user.idOfAccountManager['id'] : this.user.idOfAccountManager
          }
        }
        console.log(this.user);
      } else {
        this.utilService.notFound = true;
      }
    })
  }
  resetError() {
    this.errors = new Array<string>();
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
          this.listOfFiles.push(file);
          this.listOfFilenNames.push(file.name);
        }
      }
    }
    console.error(countInvalidExtension)
    if (countInvalidExtension > 0) {
      this.errors.push(this.utilService.FILE_EXTENSION_NOT_ALLOW_IMAGE);
    }
    console.error(this.listOfFilenNames);
    if (this.errors.length > 0) {
      var elmnt = document.getElementById("error_div");
      elmnt.scrollIntoView();
    }
  }

  removeFile(index) {
    this.listOfFiles.splice(index, 1);
    this.listOfFilenNames.splice(index, 1);
  }
  updateUser() {
    if (this.errors.length < 0 || !this.registartionForm.valid) {
      return;
    }


    // let idOfAccountManager = this.user.idOfAccountManager;
    // let userForEdit = new us
    this.user = Serialize(this.user, User);
    // this.user.idOfAccountManager = idOfAccountManager;
    var param = {
      jsonOfObject: this.user
    }
    console.warn(param.jsonOfObject.idOfAccountManager)
    let formData = new FormData();
    if (this.listOfFiles.length > 0) {
      for (let i = 0; i < this.listOfFiles.length; i++) {
        formData.append('file', this.listOfFiles[i]);
      }
      this.utilService.putMethodAPI(false, this.utilService.ServiceVariable.uploadMultipleDocumentAPI, formData, this.user.id, (response, isRoute) => {
        if (isRoute) {
          this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.updateUserAPI, param, (response, isRoute) => {
            if (isRoute) {
              this.route.navigate(['/home/work_area/admin/dashboard/user-list']);
            }
          });
        }
      });
    } else {
      this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.updateUserAPI, param, (response, isRoute) => {
        console.error(response);
        console.log(isRoute);
        if (isRoute) {
          this.route.navigate(['/home/work_area/admin/dashboard/user-list']);
        }
      });
    }
  }
  goToListPage() {
    this.route.navigate(['home/work_area/admin/dashboard/user-list'])
  }
}

import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { User } from '../../../models/User';
import { Deserialize, Serialize } from 'cerialize';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AccountManager } from '../../../models/AccountManager';
import { Documents } from '../../../models/Documents';
import { ServerVariableService } from '../../../service/servervariable.service';
declare var $: any;
@Component({
  selector: 'app-user-acount',
  templateUrl: './user-acount.component.html',
  styleUrls: ['./user-acount.component.css']
})
export class UserAcountComponent implements OnInit {

  isEdit = false;
  user = new User();
  userForEdit = new User();
  registartionForm: FormGroup;
  mtrAccountManager = new Array<AccountManager>();
  idForRemove:any;
  companyType = [
    { name: 'Limited' },
    { name: 'Partnership' },
    { name: 'Public Limited Company' },
    { name: 'Sole Trader' },
  ];
  arrayOfCurrency = [
    { name: 'GBP' },
    { name: 'EUR' },
  ];
  formData = new FormData();
  // listOfFiles = []
  listOfFiles = new Array<File>();
  listOfFilenNames = new Array<string>();

  countryList = new Array<string>();
  COUNTRY_JSON_FILE = './assets/json/allCountry.json';


  constructor(public utilService: UtilService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user.id = this.utilService.getUserIdFromLocalStorge();
    this.applyValidation();
    this.getAllAcountManagerList();
    this.getUserDetailById();
    this.getAllCountryDetails();
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
      // currency: [null, Validators.compose([Validators.required])],
      registrationNo: [null, Validators.compose([Validators.required])],
      vatNo: [null, Validators.compose([Validators.required])],
      companyAddress: [null, Validators.compose([Validators.required])],
    });
  }

  getAllCountryDetails() {

    this.utilService.http.get(this.COUNTRY_JSON_FILE).subscribe(data => {
      this.countryList = data as string[];

    })
  }

  getUserDetailById() {

    var param = {
      userId: this.user.id
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.findUserByIdAPI, param, (response, isRoute) => {
      if (isRoute) {
        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.user = Deserialize(response, User);
          this.userForEdit = this.user;
        }
        console.log(this.user);
      } else {
        this.utilService.notFound = true;
      }
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

  changeView() {

    this.isEdit = !this.isEdit;
    this.listOfFiles = new Array<File>();
    this.listOfFilenNames = new Array<string>();
    if (this.isEdit) {
      let user: User = this.user;
      user = $.extend(true, {}, this.user);
      this.userForEdit = Deserialize(user, User);
      if (!this.utilService.isNullUndefinedOrBlank(this.user.idOfAccountManager)) {
        this.userForEdit.idOfAccountManager = this.user.idOfAccountManager['id'];
      }
    }
  }
  updateUser() {
    if (!this.registartionForm.valid) {
      return;
    }
    // Object.keys(this.registartionForm.controls).forEach(key => {
    //   console.log('key :: ' + key)
    //   const controlErrors: ValidationErrors = this.registartionForm.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
    //     });
    //   }
    // });

    let idOfAccountManager = this.userForEdit.idOfAccountManager;
    this.userForEdit = Serialize(this.userForEdit, User);
    this.userForEdit.idOfAccountManager = idOfAccountManager;
    var param = {
      jsonOfObject: this.userForEdit
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
              this.getUserDetailById();
              // this.isEdit = false;
              this.changeView()
            }
          });
        }
      });
    } else {
      this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.updateUserAPI, param, (response, isRoute) => {
        console.error(response);
        console.log(isRoute);
        if (isRoute) {
          this.getUserDetailById();
          // this.isEdit = false;
          this.changeView()

        }
      });
    }
    console.error('2222222222222222222222222');
  }

  errors = new Array<string>();
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
    if (countInvalidExtension > 0) {
      this.errors.push(this.utilService.FILE_EXTENSION_NOT_ALLOW_IMAGE);
    }

    if (this.errors.length > 0) {
      var elmnt = document.getElementById("error_div");
      elmnt.scrollIntoView();
    }
  }

  downloadDocument(item: Documents) {

    var dirPath = this.utilService.URL + 'downloadFile?dirPath=' + this.utilService.FILE_DOWNLOAD_URL + item.documentName + '&fileName=' + item.fileName;
    var fileName = item.fileName;
    this.utilService.downloadFunction(dirPath, fileName);
  }

  removeDocumentById(id) {
    var ob = {
      documentId: id
    }
    this.utilService.getMethodAPI(true, this.utilService.ServiceVariable.removeDocumentByIdAPI, ob, (response) => {
      if (!this.utilService.isNullUndefinedOrBlank(response)) {
        this.user.document = this.user.document.filter(doc => doc.id != id);
      }
    })
  }

  removeFile(index) {
    this.listOfFiles.splice(index, 1);
    this.listOfFilenNames.splice(index, 1);
  }
  resetError() {
    this.errors = new Array<string>();
  }
}

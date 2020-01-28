import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UtilService } from '../../../service/util.service';
import { SiteSettings } from '../../../models/SiteSetting';
import { Serialize, Deserialize } from 'cerialize';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingValidation: FormGroup;
  siteSettingDetail = new SiteSettings();
  countryList = new Array<string>();
  COUNTRY_JSON_FILE = './assets/json/allCountry.json';
  imagePreviewSrc: any;
  selectedFile: any;
  imageOnly: boolean = true;
  arrayOfCurrency = [
    { name: 'GBP' },
    // { name: 'EUR' },
  ]
  constructor(private formBuilder: FormBuilder, public utilService: UtilService) { }

  ngOnInit() {
    this.getAllCountryDetails();
    this.getSiteSettingDetails();
    this.settingValidation = this.formBuilder.group({
      siteName: [null, Validators.compose([Validators.required])],
      siteEmail: [null, Validators.compose([Validators.required, Validators.pattern(this.utilService.validationService.PATTERN_FOR_EMAIL)])],
      mobileNo: [null, Validators.compose([Validators.required, Validators.pattern(this.utilService.validationService.PATTERN_FOR_PHONE_NO)])],
      // currency: [null, Validators.compose([Validators.required])],
      offerDiscount: [null, Validators.compose([Validators.required, Validators.pattern(this.utilService.validationService.PATTERN_FOR_NUMBER)])],
    });
  }
  imagePreview(event) {
    this.imagePreviewSrc = '';
    this.selectedFile = '';
    this.imageOnly = true;
    if (event.target.files[0] !== undefined && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const ext = this.selectedFile.name.split('.').pop();
      if (ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg') {
        this.utilService.readUrl(event, (response) => {
          this.imagePreviewSrc = response;
        });
      } else {
        this.imageOnly = false;
      }
    }

  }
  saveSettings() {
    let formData = new FormData();
    this.siteSettingDetail.logo = undefined;
    if (!this.utilService.isNullUndefinedOrBlank(this.selectedFile)) {
      formData.append('file', this.selectedFile);
      this.utilService.postMethodAPI(false, this.utilService.ServiceVariable.uploadSiteLogoAPI, formData, response => {
        this.siteSettingDetail.logo = response;
        var param = Serialize(this.siteSettingDetail, SiteSettings);
        this.saveSiteSettings(param);
      })

    } else {
      var param = Serialize(this.siteSettingDetail, SiteSettings);
      this.saveSiteSettings(param);
    }

  }
  saveSiteSettings(param) {
    this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.saveOrUpdateSiteSettingsAPI, param, response => {
      console.log(response);
      this.getSiteSettingDetails();
    })
  }
  getAllCountryDetails() {
    this.utilService.http.get(this.COUNTRY_JSON_FILE).subscribe(data => {
      this.countryList = data as string[];
    })
  }
  getSiteSettingDetails() {
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getSiteSettingDetailAPI, '', response => {
      console.log(response);
      if (response.length > 0) {
        this.siteSettingDetail = Deserialize(response[0], SiteSettings);
      } else {
        this.siteSettingDetail = new SiteSettings();
      }
    })
  }

}

import { Component, Inject } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { Deserialize } from 'cerialize';
import { UtilService } from '../app/service/util.service';
import { SiteSettings } from './models/SiteSetting';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToasterService],
})

export class AppComponent {

  title = 'MTRWeb';
  public options = {
    position: ['bottom', 'right'],
    clickToClose: false,
    clickIconToClose: true
  };
  ngOnInit() {

    this.getSiteSettingDetails().then(() => {
      this.utilsService.SITE_LOGO = this.utilsService.URL + 'images/document/logo_mtr.jpg';
      if (this.utilsService.siteSettingDetail.logo) {
        this.utilsService.SITE_LOGO = this.utilsService.URL + 'images/document/' + this.utilsService.siteSettingDetail.logo;
      }
      if (!this.imageExists(this.utilsService.SITE_LOGO)) {
        this.utilsService.SITE_LOGO = this.utilsService.URL + 'images/document/logo_mtr.jpg';
      }
      this._document.getElementById('appFavicon').setAttribute('href', this.utilsService.SITE_LOGO);
      console.error(this.utilsService.SITE_LOGO);
    })
  }
  private toasterService: ToasterService;

  constructor(toasterService: ToasterService, public router: Router, public utilsService: UtilService,
    private titleService: Title, @Inject(DOCUMENT) private _document: HTMLDocument) {
    this.utilsService.toasterService = toasterService;

    router.events.forEach(val => {

      if (val instanceof NavigationStart) {

        if (!this.utilsService.isLogin()) {
          if (
            !val.url.includes('/home/work_area/landing') &&
            !val.url.includes('/home/work_area/login') &&
            !val.url.includes('/home/work_area/register') &&
            !val.url.includes('/home/work_area/reset-password')
          ) {
            this.utilsService.redirectTo('/home/work_area/landing');
          }
        } else {

          if (val.url.includes('/home/work_area/login') || val.url.includes('/home/work_area/register') || val.url.includes('/home/work_area/reset-password')) {
            if (this.utilsService.isAdmin()) {
              // console.log('admin is logined..');
              this.utilsService.redirectTo('/home/work_area/admin/dashboard');
            } else {
              // console.log('user is logined..');
              this.utilsService.redirectTo('/home/work_area/user/dashboard');
            }
          }
        }

      }
    });
  }

  getSiteSettingDetails() {
    this.utilsService.siteSettingDetail = new SiteSettings();

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.utilsService.getMethodAPI(false, this.utilsService.ServiceVariable.getSiteSettingDetailAPI, '', response => {
          if (response && response.length > 0) {
            this.utilsService.SITE_LOGO = this.utilsService.URL + '/images/document/' + this.utilsService.siteSettingDetail.logo;
            this.utilsService.siteSettingDetail = Deserialize(response[0], SiteSettings);
            this.titleService.setTitle(this.utilsService.siteSettingDetail.siteName);
            resolve();
          } else {
            this.titleService.setTitle('I Need Mobile');
            reject();
          }
        })
      }, 1000);
    })
    return promise;
  }

  imageExists(image_url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
  }
}

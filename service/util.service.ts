import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Deserialize } from 'cerialize';
import { SiteSettings } from '../models/SiteSetting';
import { ResponseWrapperDTO } from '../response/ResponseWrapperDTO';
import { StorageListnerService } from '../service/storage-listner.service';
import { ServerVariableService } from './servervariable.service';
import { ValidationService } from './validation.service';
import { Title } from '@angular/platform-browser';
declare var $;
@Injectable({
    providedIn: 'root'
})
export class UtilService {
    loaderStart = 0;
    notFound: boolean = false;
    serverResponse = new ResponseWrapperDTO();
    noRecordFound = ' No Records Found.';
    imagePreview: any;
    arrayOfCurrency = [
        { name: 'GBP' },
        { name: 'EUR' },
    ]
    printNullValue = '-';
    public config: ToasterConfig =
        new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            timeout: { error: 0, success: 1000 },
            animation: 'fade out',
            limit: 1,
            positionClass: 'toast-top-center',
            newestOnTop: true,
            mouseoverTimerStop: true
        });

// 
    //  URL = 'http://wholesale.ineedamobile.com/whadmin/';
    // URL = 'http://192.168.43.210:1337/';
    // URL = 'http://localhost:49152/'; //heena url
    URL = 'http://localhost:1337/';

    imageUrl = this.URL + '/images/document/';

    siteSettingDetail = new SiteSettings();
    NO_RECORDS_FOUND = "No Records Found."
    FILE_DOWNLOAD_URL = '//assets//images//document//';
    SITE_LOGO = this.URL + 'images/document/logo.jpg';

    FILE_EXTENSION_NOT_ALLOW_IMAGE = 'ONLY FILES WITH THE FOLLOWING EXTENSIONS ARE ALLOWED: PDF, DOC, DOCX, XLS, XLSX, TXT, CSV , IMAGE FILE.';

    constructor(public http: HttpClient,
        public notificationsService: NotificationsService,
        public ServiceVariable: ServerVariableService,
        public validationService: ValidationService,
        public router: Router,
        public storageListnerService: StorageListnerService,
        public toasterService: ToasterService, ) {

        this.toasterService = toasterService;
    }



    getUserIdFromLocalStorge() {
        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (!this.isNullUndefinedOrBlank(user)) {
            return user.id;
        }
        return null;
    }



    isNullUndefinedOrBlank(obj) {
        if (obj == null || obj === undefined || (obj === '' && obj !== 0)) {
            return true;
        }
        return false;
    }

    CreateNotification(type, message, content, time?: number) {
        // console.log(type);
        // console.log(message);
        // console.log(content);
        // let timeOut = 0;
        // if (type === 'success') {
        //     timeOut = 5000;
        // }
        // console.log(timeOut);
        // this.notificationsService.create(message, content, type, {
        //     timeOut: timeOut,
        //     showProgressBar: true,
        //     pauseOnHover: true,
        //     clickToClose: true,
        //     maxLength: 1000
        // });

        this.config.timeout = 0;
        if (type === 'success') {
            this.config.timeout = 2000;
        }
        if (type === 'error') {
            this.config.timeout = 10000;
        }
        if (!this.isNullUndefinedOrBlank(time)) {
            this.config.timeout = time;
        }

        var toast: Toast = {
            type: type,
            title: '',
            body: content,
            showCloseButton: true
        };

        this.toasterService.pop(toast);

        // this.toasterService.pop(type, message, content);
    }
    resetAllNotification() {
        this.notificationsService.remove();
    }
    putMethodAPI(isDisplayToast, url, params, id, callback: (response, isRoute) => void, isLoaderHide?: boolean) {
        console.log(this.isNullUndefinedOrBlank(isLoaderHide));
        if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
            this.loaderStart++;
        }
        // console.log('loader:: ' + this.loaderStart);
        // let httpHeader = new HttpHeaders();
        // if (!this.isAllowRoutes.includes(url)) {
        //   httpHeader = httpHeader.set('Authorization', this.getAccessToken());
        // }
        url = this.URL + url + '/' + id;
        // let httpParams = new URLSearchParams();
        // httpParams.set('id', id);
        // const options = {
        //   headers: httpHeader
        // };
        return this.http.put(url, params).subscribe(
            getResponse => {
                if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
                    if (this.loaderStart > 0) {
                        this.loaderStart--;
                    }
                }
                if (getResponse) {
                    // console.log(getResponse);
                    this.serverResponse = Deserialize(getResponse, ResponseWrapperDTO);
                    if (getResponse['status'] < 200 || getResponse['status'] >= 300) {
                        this.CreateNotification(
                            'error',
                            'Error..!',
                            'error msg'
                            // this.serverResponse.message
                        );
                        callback(this.serverResponse.message, false);
                    } else {
                        if (isDisplayToast) {
                            this.CreateNotification(
                                'success',
                                'Success..!',
                                'success msg'
                                // this.serverResponse.message
                            );
                        }
                        callback(this.serverResponse.data, true);
                    }
                }
            },
            (err: HttpErrorResponse) => {
                console.log(
                    `Backend returned code ${err.status}, body was: ${err.error}`
                );
                if (this.loaderStart > 0) {
                    this.loaderStart--;
                }
                console.log(err.status);
                if (err.status === 0) {
                    this.CreateNotification('error', 'Error', 'Server down.');
                } else if (err.status === 404) {
                    this.CreateNotification('error', 'Error', 'API not found.');
                } else {
                    this.serverResponse = Deserialize(err.error, ResponseWrapperDTO);
                    // if (!this.isNullUndefinedOrBlank(this.serverResponse.message)) {
                    //     console.error('33333333333333333333333333')
                    //     this.CreateNotification(
                    //         'error',
                    //         'Error',
                    //         this.serverResponse.message
                    //     );
                    // } else {
                    //     console.error('44444444444444444444444')
                    //     this.CreateNotification(
                    //         'error',
                    //         'Error',
                    //         this.serverResponse.error
                    //     );
                    // }
                    if (isDisplayToast) {
                        this.CreateNotification(
                            'error',
                            'Error',
                            this.serverResponse.message ? this.serverResponse.message : this.serverResponse.error
                        );
                    }
                    callback(this.serverResponse.message ? this.serverResponse.message : this.serverResponse.error, false);
                }
            }
        );
    }

    postMethodAPI(isDisplayToast, url, params, callback: (response, isRoute) => void, isLoaderHide?: boolean, isResponseOnPage?: boolean) {

        if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
            this.loaderStart++;
        }
        url = this.URL + url;
        return this.http.post(url, params).subscribe(
            getResponse => {
                console.log(getResponse);
                if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
                    if (this.loaderStart > 0) {
                        this.loaderStart--;
                    }
                }
                if (getResponse) {

                    this.serverResponse = Deserialize(getResponse, ResponseWrapperDTO);
                    if (getResponse['status'] < 200 || getResponse['status'] > 300) {
                        this.CreateNotification(
                            'error',
                            'Error..!',
                            this.serverResponse.message
                        );
                        callback(this.serverResponse.message, false);
                    } else {
                        if (isDisplayToast) {
                            this.CreateNotification(
                                'success',
                                'Success..!',
                                this.serverResponse.message
                            );
                        }
                        if (300 <= getResponse['status'] && 400 > getResponse['status']) {
                            this.CreateNotification(
                                'info',
                                'info..!',
                                this.serverResponse.message
                            );
                        }
                        callback(this.serverResponse.data, true);
                    }
                    // callback(this.serverResponse.data);
                }
            },
            (err: HttpErrorResponse) => {
                console.log(
                    `Backend returned code ${err.status}, body was: ${err.error}`
                );
                if (this.loaderStart > 0) {
                    this.loaderStart--;
                }
                if (err.status === 0) {
                    this.CreateNotification('error', 'Error', 'Server down.');
                } else if (err.status === 404) {
                    this.CreateNotification('error', 'Error', 'API Not found.');
                } else {
                    this.serverResponse = Deserialize(err.error, ResponseWrapperDTO);
                    if (isDisplayToast && !isResponseOnPage) {
                        this.CreateNotification(
                            'error',
                            'Error',
                            this.serverResponse.message ? this.serverResponse.message : this.serverResponse.error
                        );
                    }
                    if (isResponseOnPage) {
                        callback(this.serverResponse.message ? this.serverResponse.message : this.serverResponse.error, false);
                    }
                }

            }
        );
    }
    getMethodAPI(isDisplayToast, apiName, params, callback: (response, isRoute) => void, isLoaderHide?: boolean, isDataRequired?: boolean, isResponseOnPage?: boolean) {
        if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
            this.loaderStart++;
        }
        // let headers = new HttpHeaders();
        // if (!this.isAllowRoutes.includes(apiName) && !this.isNullUndefinedOrBlank(this.getAccessToken())) {
        //     headers = headers.set('Authorization', this.getAccessToken());
        //     headers.append('Content-Type', 'Application/json');
        // }
        apiName = this.URL + apiName;
        let httpParams = new HttpParams();
        if (!this.isNullUndefinedOrBlank(params)) {
            Object.keys(params).forEach((key) => {
                if (key && params[key] && params.hasOwnProperty(key)) {
                    httpParams = httpParams.append(key, params[key]);
                }
            });

        }
        // const options = new RequestOptions({ params: httpParams });
        return this.http.get(apiName, { params: httpParams }).subscribe(
            getResponse => {
                // Read the result field from the JSON response.
                if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
                    if (this.loaderStart > 0) {
                        this.loaderStart--;
                    }
                }
                if (getResponse) {
                    this.serverResponse = Deserialize(getResponse, ResponseWrapperDTO);
                    if (getResponse['status'] < 200 || getResponse['status'] > 300) {
                        this.CreateNotification(
                            'error',
                            'Error..!',
                            this.serverResponse.message
                        );
                        callback(this.serverResponse.data, false);

                    } else {
                        if (isDisplayToast) {
                            this.CreateNotification(
                                'success',
                                'Success..!',
                                this.serverResponse.message
                            );
                        }
                        callback(this.serverResponse.data, true);
                    }
                }
            },
            (err: HttpErrorResponse) => {
                console.log(
                    `Backend returned code ${err.status}, body was: ${err.error}`
                );
                if (this.loaderStart > 0) {
                    this.loaderStart--;
                }
                if (err.status === 0) {
                    this.CreateNotification('error', 'Error', 'Server down.');
                }
                else if (err.status === 404) {
                    this.CreateNotification('error', 'Error', 'API Not Found..');
                } else {
                    this.serverResponse = Deserialize(err.error, ResponseWrapperDTO);
                    if (!isResponseOnPage) {
                        this.CreateNotification(
                            'error',
                            'Error',
                            this.serverResponse.message ? this.serverResponse.message : this.serverResponse.error
                        );
                        callback(this.serverResponse.message ? this.serverResponse.message : this.serverResponse.error
                            , false);
                    }
                    if (isResponseOnPage) {
                        if (!this.isNullUndefinedOrBlank(isDataRequired) && isDataRequired) {
                            callback(this.serverResponse.data, false);
                        } else {
                            callback(this.serverResponse.message ? this.serverResponse.message : this.serverResponse.error, false);
                        }
                    }
                }
            }
        );
    }
    redirectTo(route) {
        this.router.navigate([route]);
    }

    // to hide modal from ts using modelId
    hideModal(modelId: string) {
        $('' + '#' + modelId + '').modal('hide');
    }
    /* Image Preview*/
    readUrl(event, callback: (response) => void) {
        if (event.target.files && event.target.files[0]) {
            let reader: any;
            reader = new FileReader();
            reader.onload = e => {
                this.imagePreview = e.target.result;
                return callback(this.imagePreview);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    /* End Image Preview*/
    isAdmin() {
        // console.log('****************ID Admin **************')
        if (!this.isNullUndefinedOrBlank(this.getLoginUsers())) {
            return this.getLoginUsers().isAdmin;
        }
    }
    // to get Login Users from local storage
    getLoginUsers() {
        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (user != null) {
            return user;
        }
    }

    getLoginUsersId() {
        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (user != null) {
            return user.id;
        }
        return null;
    }
    isEmptyObject(obj) {
        return obj && Object.keys(obj).length === 0;
    }
    openModal(modelId: string) {
        $('' + '#' + modelId + '').modal({ backdrop: 'static', keyboard: false }); // model will close only on button click
        // $('' + '#' + modelId + '').modal('show');
    }
    /* Download image from server */
    downloadFunction(links, fileName) {
        console.log(links);
        var dlLink = document.createElement('a');
        dlLink.download = fileName;
        dlLink.href = links;
        dlLink.dataset.downloadurl = links;
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
    /* End download image from server */


    /* Check is login any user or not */
    isLogin() {
        if (!this.isNullUndefinedOrBlank(localStorage.getItem(this.storageListnerService.key))) {
            return true;
        } else {
            return false;
        }
    }
    /* End check is login any user or not */

    /**
 * This method is used to check all checkbox of list if isCheckAll is true, otherwise it uncheck all checkboxes of list.
 * @param isCheckAll : indicates true or false.
 * @param detailsArray : indicates list that contains checkboxes.
 */
    checkAll(isCheckAll, detailsArray) {
        if (this.isEmptyObjectOrNullUndefiend(detailsArray)) {
            return;
        }
        detailsArray.forEach(ele => {
            // if (ele.hasOwnProperty('selected')) {
            ele.selected = isCheckAll;
            // }
        });
        return isCheckAll;
        // return detailsArray;
    }
    /***
     * This method is used to make isCheckAll true if all checkboxes of list is checked, otherwise it makes isCheckAll to false;
     * @param isSingleChecked : indicates true if user check checkbox of list otherwise indicates false.
     * @param isCheckAll : indicates true of checkbox for all is checked otherwise indicates false.
     * @param detailsArray : indicates list that contains checkboxes.
     */
    singleCheck(isSingleChecked, isCheckAll, detailsArray) {

        if (!isSingleChecked) {
            isCheckAll = false;
            return isCheckAll;
        }

        for (const i in detailsArray) {
            if (!detailsArray[i].selected) {
                isCheckAll = false;
                return isCheckAll;
            }
        }
        isCheckAll = true;
        return isCheckAll;
    }

    isEmptyObjectOrNullUndefiend(...value) {
        if (value && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                if (this.isNullUndefinedOrBlank(value[i]) || this.isEmptyObject(value[i])) {
                    return true;
                }
            }
        }
        return false;
    }

    getNumberIn4Digit(no: number) {
        var s = "000" + no;
        return s.substr(s.length - 4);
    }

    isFileExtensionAllow(ext) {
        if ((ext == 'jpeg' || ext == 'jpg' || ext == 'pdf'
            || ext == 'doc' || ext == 'docx' || ext == 'xls' || ext == 'xlsx' || ext == 'csv' || ext == 'txt' || ext == 'txt' || ext == 'png' || ext == 'gif')) {
            return true;
        }
        return false;
    }
}


import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MailTemplate } from "../../../models/MailTemplate";
import { UtilService } from '../../../service/util.service';
import { Serialize, Deserialize } from "cerialize";
declare var $: any;
@Injectable({
    providedIn: 'root'
})
export class MailTemplateService {

    form: FormGroup;
    mailTemplate = new MailTemplate();
    allRecords = new Array<MailTemplate>();
    headerText = "Add New Template";
    viewTemplateOb = new MailTemplate();
    errors = new Array<string>();
    idForRemove: string = undefined;
    searchText: string;
    constructor(private formBuilder: FormBuilder, public utilService: UtilService) {

    }
    resetService() {
        this.applyValidation();
        this.mailTemplate = new MailTemplate();
        this.allRecords = new Array<MailTemplate>();
        this.headerText = "Add New Template";
        this.errors = new Array<string>();
        this.idForRemove = undefined;
    }

    resetModal() {
        this.form.controls["templateName"].enable();
        this.applyValidation();
        this.mailTemplate = new MailTemplate();
        this.headerText = "Add New Template";
        this.errors = new Array<string>();


    }
    applyValidation() {
        this.form = this.formBuilder.group({
            templateName: [{ value: null, disabled: this.mailTemplate.id ? true : false }, Validators.compose([Validators.required])],
            templateDescription: [null, Validators.compose([Validators.required])],
        })
        // this.form.controls["templateName"].enable();
    }
    getAllRecords() {
        var param = {
            searchText: this.searchText ? this.searchText : undefined
        }
        this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.getAllEmailTemplateDetailsAPI, param, (response) => {
            console.log(response);
            this.allRecords = new Array<MailTemplate>();
            if (!this.utilService.isNullUndefinedOrBlank(response)) {
                this.allRecords = Deserialize(response, MailTemplate);
            }
        })

    }

    saveOrEdit() {
        this.errors = new Array<string>();
        var param = {
            jsonOfObject: Serialize(this.mailTemplate, MailTemplate)
        }
        if (this.utilService.isNullUndefinedOrBlank(this.mailTemplate.id)) {

            this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.saveEmailTemplateAPI, param, (response, isRoute) => {
                console.log(response);
                console.log(isRoute);
                if (isRoute) {
                    $('#addmanager').modal('hide');
                    this.getAllRecords();
                    this.resetModal();
                } else {
                    this.errors.push(response);
                    var elmnt = document.getElementById("error_div");
                    elmnt.scrollIntoView();
                }
            });
        } else {
            this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.updateEmailTemplateAPI, param, (response, isRoute) => {
                console.log(response)
                if (isRoute) {
                    $('#addmanager').modal('hide');
                    this.getAllRecords();
                    this.resetModal();
                } else {
                    this.errors.push(response);
                    var elmnt = document.getElementById("error_div");
                    elmnt.scrollIntoView();
                }
            });
        }
    }

    getDataForEdit(ob: MailTemplate) {
        this.mailTemplate = $.extend(true, {}, ob);
        this.mailTemplate = Deserialize(this.mailTemplate, MailTemplate);
        // this.mailTemplate = ob;
        this.form.controls["templateName"].disable();
        this.headerText = "Edit Template";
        $('#addmanager').modal('show');
        this.errors = new Array<string>();

    }

    deleteTemplateById() {
        var param = {
            id: this.idForRemove
        }
        this.errors = new Array<string>();

        this.utilService.postMethodAPI(true, this.utilService.ServiceVariable.deleteEmailTemplateByIdAPI, param, (response, isRoute) => {
            console.log(response)
            if (isRoute) {
                this.getAllRecords();
            } else {
                this.errors.push(response);
                var elmnt = document.getElementById("error_div");
                elmnt.scrollIntoView();
            }
        });
    }

    viewData(ob: MailTemplate) {
        this.viewTemplateOb = ob;
    }

    resetError() {
        this.errors = new Array<string>();
    }
}
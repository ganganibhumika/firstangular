import { Component, OnInit, ViewChildren, OnDestroy } from '@angular/core';
import { MailTemplateService } from './MailTemplateService.service';
import { UtilService } from '../../../service/util.service';
declare var CKEDITOR: any;
declare var $: any;

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: ['./mail-template.component.css'],
  providers: [MailTemplateService]
})
export class MailTemplateComponent implements OnInit, OnDestroy {

  @ViewChildren("myckeditor") ckeditor: any;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  geteditor: any;


  constructor(public mailTemplateService: MailTemplateService, public utilsService: UtilService) {
    this.ckeConfig = {
      allowedContent: false,
      // extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }

  ngOnInit() {
    // this.geteditor = CKEDITOR.replace('editor1');
    //this.geteditor2 = CKEDITOR.replace('editor2');
    this.mailTemplateService.applyValidation();
    this.mailTemplateService.getAllRecords();
  }

  onChange($event: any): void {
    console.log("onChange");
  }
  ngOnDestroy() {
    this.mailTemplateService.resetService();
  }
}

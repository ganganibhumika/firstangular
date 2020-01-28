import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../service/util.service';
import { User } from '../../../models/User';
import { Deserialize } from 'cerialize';
import { Documents } from '../../../models/Documents';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user = new User();
  idForRemove:any;
  constructor(public activeRoute: ActivatedRoute, public utilService: UtilService, public router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      console.error(param);
      if (!this.utilService.isNullUndefinedOrBlank(param)) {
        this.user.id = param['id'];
        this.getUserDetailById();
      }
    });
  }


  getUserDetailById() {

    var param = {
      userId: this.user.id
    }
    this.utilService.getMethodAPI(false, this.utilService.ServiceVariable.findUserByIdAPI, param, (response, isRoute) => {
      if (isRoute) {

        if (!this.utilService.isNullUndefinedOrBlank(response)) {
          this.user = Deserialize(response, User);
        }
        console.log(this.user);
      } else {
        this.utilService.notFound = true;
      }
    })
  }
  goToListPage() {
    this.router.navigate(['home/work_area/admin/dashboard/user-list'])
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

}

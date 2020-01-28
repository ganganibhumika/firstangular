import { Component, OnInit } from '@angular/core';
import { UtilService } from '../service/util.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public utilService:UtilService) { }

  ngOnInit() {
  }

}

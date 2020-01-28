import { Injectable } from '@angular/core';
// Excel Import Files
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { log } from 'util';
// import { Serialize } from 'cerialize';
// import { formatDate } from '@progress/kendo-angular-intl';
import { UtilService } from '../service/util.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  arrayBuffer: any; // convert excel to json
  workbook: XLSX.WorkBook;
  excelDataArray = Array<Object>();
  excelHeaderArray = Array<string>();
  formData = new FormData();

  constructor(public utilService: UtilService) { }

  // will accept Json Array Of Object And And File name and Will Generate Excel File.
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  // will accept buffer data and file name will store file as .excel.
  public saveAsExcelFile(data: any, fileName: string): void {
    console.log(data);
    console.log(fileName + '_' + new Date() + EXCEL_EXTENSION);
    const excelData: Blob = new Blob([data], { type: EXCEL_TYPE });
    console.log(excelData);
    // FileSaver.saveAs(
    //   data,
    //   fileName + '_' + new Date() + EXCEL_EXTENSION
    // );
    // var dlLink = document.createElement('a');
    // dlLink.download = fileName;
    // dlLink.href = links;
    // dlLink.dataset.downloadurl = links;
    // document.body.appendChild(dlLink);
    // dlLink.click();
    // document.body.removeChild(dlLink);
    
    const url = window.URL.createObjectURL(excelData);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + EXCEL_EXTENSION;
    link.click();
  
    window.URL.revokeObjectURL(url);
  }




  // convert EXCEL FILE TO JSON DATA   (excel => json)
  excelToJson(file: File, callback) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      callback((XLSX.utils.sheet_to_json(worksheet, { raw: true })));
    };
    fileReader.readAsArrayBuffer(file);
  }

}
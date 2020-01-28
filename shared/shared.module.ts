import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { PaginattionService } from '../service/PaginationService';
import { ServerVariableService } from '../service/servervariable.service';
import { StorageListnerService } from '../service/storage-listner.service';
import { UtilService } from '../service/util.service';
import { ValidationService } from '../service/validation.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    CKEditorModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    CKEditorModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UtilService,ServerVariableService,ValidationService,StorageListnerService , PaginattionService]
    }
  }
}

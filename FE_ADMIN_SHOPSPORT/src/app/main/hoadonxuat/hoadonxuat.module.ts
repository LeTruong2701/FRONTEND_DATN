import { HoadonxuatComponent } from './hoadonxuat.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{CKEditorModule} from 'ckeditor4-angular';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [HoadonxuatComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: 'hoadonxuat',
        component: HoadonxuatComponent,
      }
  ]),  
  ]
})
export class HoaDonXuatModule { }
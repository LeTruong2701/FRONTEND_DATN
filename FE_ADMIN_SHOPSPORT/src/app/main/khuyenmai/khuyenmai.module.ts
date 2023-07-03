
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{CKEditorModule} from 'ckeditor4-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { KhuyenmaiComponent } from './khuyenmai.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [KhuyenmaiComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    RouterModule.forChild([
      {
        path: 'khuyenmai',
        component: KhuyenmaiComponent,
      }
  ]),  
  ]
})
export class KhuyenMaiModule { }
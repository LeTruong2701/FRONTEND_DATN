
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{CKEditorModule} from 'ckeditor4-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ThuonghieuComponent } from './thuonghieu.component';
@NgModule({
  declarations: [ThuonghieuComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    RouterModule.forChild([
      {
        path: 'thuonghieu',
        component: ThuonghieuComponent,
      }
  ]),  
  ]
})
export class ThuongHieuModule { }
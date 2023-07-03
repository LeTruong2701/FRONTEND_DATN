
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NhanvienComponent } from './nhanvien.component';
@NgModule({
  declarations: [NhanvienComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,NgbPaginationModule,
    RouterModule.forChild([
      {
        path: 'nhanvien',
        component: NhanvienComponent,
      }
  ]),  
  ]
})
export class NhanVienModule { }
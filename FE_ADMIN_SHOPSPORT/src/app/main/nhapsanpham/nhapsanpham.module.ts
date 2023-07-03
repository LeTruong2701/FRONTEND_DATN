import { NhapsanphamComponent } from './nhapsanpham.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{CKEditorModule} from 'ckeditor4-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { CurrencyFormatterDirective } from 'src/app/core/CurrencyFormatterDirective/currency-formatter.directive';
@NgModule({
  declarations: [NhapsanphamComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    
    RouterModule.forChild([
      {
        path: 'nhapsanpham',
        component: NhapsanphamComponent,
      }
  ]),  
  ]
})
export class NhapSanPhamModule { }
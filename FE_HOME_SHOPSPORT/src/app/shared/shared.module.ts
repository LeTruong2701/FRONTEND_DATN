import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [HeaderComponent,
    FooterComponent],
  imports: [
    CommonModule,
    RouterModule  ,
    FormsModule
  ]
})
export class SharedModule { }
import { UserManagementComponent } from './user-management.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [UserManagementComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    RouterModule.forChild([
      {
        path: 'user',
        component: UserManagementComponent,
      }
  ]),  
  ]
})
export class UserManagementModule { }
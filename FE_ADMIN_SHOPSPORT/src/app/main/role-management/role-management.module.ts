

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleManagementComponent } from './role-management.component';
@NgModule({
  declarations: [RoleManagementComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    RouterModule.forChild([
      {
        path: 'role',
        component: RoleManagementComponent,
      }
  ]),  
  ]
})
export class RoleManagementModule { }
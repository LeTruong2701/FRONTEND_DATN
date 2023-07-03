
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{CKEditorModule} from 'ckeditor4-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgChartsModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent,
      }
  ]),  
  ]
})
export class DashboardModule { }
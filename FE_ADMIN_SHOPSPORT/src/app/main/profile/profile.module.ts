
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{CKEditorModule} from 'ckeditor4-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
   FormsModule,
    CommonModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,NgbPaginationModule,
    RouterModule.forChild([
      {
        path: 'profile',
        component: ProfileComponent,
      }
  ]),  
  ]
})
export class ProfileModule { }
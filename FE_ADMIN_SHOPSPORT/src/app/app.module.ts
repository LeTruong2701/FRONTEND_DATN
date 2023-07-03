import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgToastModule } from 'ng-angular-popup';
import MatchValidation from 'src/app/core/helpers/must-match.validator';


@NgModule({
  declarations: [		
    AppComponent,
      LoginadminComponent
   ],
  imports: [
    BrowserModule,ReactiveFormsModule,HttpClientModule,
    AppRoutingModule,NgxPaginationModule,
    NgToastModule
  ],
  providers: [ MatchValidation],
  bootstrap: [AppComponent]
})
export class AppModule { }

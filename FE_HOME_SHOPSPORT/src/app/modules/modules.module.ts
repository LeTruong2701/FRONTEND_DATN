import { HomesModule } from './homes/homes.module';
import { ShopComponent } from './homes/shop/shop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ModulesComponent } from './modules.component';
import { modulesRoutes } from './modules.route';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    ModulesComponent,
  ],
  imports: [
    
    CommonModule,
    SharedModule,
    RouterModule.forChild(modulesRoutes),
  ]
})
export class ModulesModule { }
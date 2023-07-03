import { DetailnewsComponent } from './detailnews/detailnews.component';
import { NewsComponent } from './news/news.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopComponent } from './shop/shop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DetailComponent } from './detail/detail.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { DonhangcuabanComponent } from './donhangcuaban/donhangcuaban.component';
import { ProfilecustomerComponent } from './profilecustomer/profilecustomer.component';
import { VechungtoiComponent } from './vechungtoi/vechungtoi.component';
import { ThanhtoanmomoComponent } from './thanhtoanmomo/thanhtoanmomo.component';
import { KetquathanhtoanComponent } from './ketquathanhtoan/ketquathanhtoan.component';





@NgModule({
  declarations: [
    IndexComponent,
    ShopComponent,
    DetailComponent,
    NewsComponent,
    DetailnewsComponent,
    DangkyComponent,
    DangnhapComponent,
    DonhangcuabanComponent,
    ProfilecustomerComponent,
    VechungtoiComponent,
    ThanhtoanmomoComponent,
    KetquathanhtoanComponent
   
    
  ],
  imports: [
    CommonModule,FormsModule,
    NgxPaginationModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'index',component:IndexComponent},
      { path: 'shop',component:ShopComponent},
      { path: 'detail/:id', component: DetailComponent },
      { path: 'shop/:id', component: ShopComponent },

      { path: 'detailnews/:id',component:DetailnewsComponent},
      { path: 'news',component:NewsComponent},
      { path: 'dangky',component:DangkyComponent},
      { path: 'dangnhap',component:DangnhapComponent},
      { path: 'donhangcuaban',component:DonhangcuabanComponent},
      { path: 'profilecustomer',component:ProfilecustomerComponent},
      { path: 'vechungtoi',component:VechungtoiComponent},
      { path: 'thanhtoanmomo',component:ThanhtoanmomoComponent},
      { path: 'ketquathanhtoan',component:KetquathanhtoanComponent},

    ])
    
   
  ]
})
export class HomesModule { }

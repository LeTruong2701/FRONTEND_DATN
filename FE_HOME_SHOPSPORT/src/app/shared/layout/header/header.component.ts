import { SendService } from './../../../core/service/send.service';
import { CallfunctionService } from './../../../core/service/callfunction.service';
import { ShopComponent } from './../../../modules/homes/shop/shop.component';
import { BaseComponent } from './../../../core/common/base-component';
import { Component, Injector, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/core/service/shared.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit,AfterViewInit {

  public tongtien: any;
  public list:any;
  public list_danhmuc: any;

  public soluonggiohang:number = this.sharedService.getSoLuongGioHang();
 
  

  constructor(injector: Injector,private _send: SendService,private sharedService: SharedService,private authenticationService:AuthenticationService ) { super(injector);}



  public user:any;
  ngOnInit() {
    
    var local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
   this.soluonggiohang= local_storage.length;

    this.sharedService.soluongGioHang.subscribe(() => {
      this.soluonggiohang = this.sharedService.getSoLuongGioHang();
      console.log(this.soluonggiohang)
    });


    this.user = this.authenticationService.userValue;
    this._api.get('/api/home/get-danhmuc').subscribe(res => {
      this.list_danhmuc = res;
      console.log(res);
    });

    this.list = JSON.parse(localStorage.getItem('cart') || '[]');
    this.tongtien = this.list.reduce((sum:any, x:any) => sum +  x.giaBan * x.quantity, 0);
   
  }


//thêm ở shoppingmodule cái form module
  public loc: any;
  public page: any = 1;
  public id: any;
  public pageSize: any = 12;
  public list_item: any;
  public totalItem: any;

  public keyword:string="";
  

  // public loadDataKeyword(pageSize:any) {
  //   this.pageSize = pageSize;
  //    this._api.post('/api/shop/search', { loc: this.loc, page: 1, pageSize: pageSize,id_danh_muc: this.id , keyword1: this.keyword }).subscribe(res => {
  //      this.list_item = res.data;
  //      this.totalItem = res.totalItem;
      
  //      console.log(this.list_item)
  //      console.log(this.keyword);
  //    });
  //  }

  setDieuKienLoc(loc: any) {
    this.loc = loc;
    localStorage.setItem('loc',loc); 
    this.sharedService.setKeyword(this.keyword);
    // localStorage.setItem('dulieusearch',this.keyword)

    console.log(this.keyword)
    console.log(this.loc)
    // this._send.reload();
    
  }

  logout() {
    this.authenticationService.logout();
  }

  
  ngAfterViewInit() {
  
  }
}

import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-thanhtoanmomo',
  templateUrl: './thanhtoanmomo.component.html',
  styleUrls: ['./thanhtoanmomo.component.css']
})
export class ThanhtoanmomoComponent extends BaseComponent implements OnInit {

  public message:any;
  public list_items:any;
  public donhang:any;
  public donHangObj:any;
  public tongtien:any;
  public tongtienphaithanhtoan:any;
  

  constructor(injector: Injector,private route: ActivatedRoute) { 
    super(injector);
  }
  ngOnInit() {

    

    console.log(this.donhang)
    
     this.message = this.route.snapshot.queryParams['message'];
    console.log(this.message);
    if(this.message=="Success"){
      this.donhang = sessionStorage.getItem('donhangmomo');
     this.donHangObj = JSON.parse(this.donhang);
      let obj: any = {};
    
        obj.ctdh = [];
        obj.ctdh=this.donHangObj.ctdh;
        this._api.post('/api/donhangkhachhang/get-donhangmomo', obj).subscribe(res => {
          this.list_items = res;
        
        console.log(this.list_items);
        });


        //lưu hóa đơn

        let objhoadon: any = {};
        objhoadon.IdKhachHang=this.donHangObj.IdKhachHang;
        objhoadon.TenKhachHang=this.donHangObj.TenKhachHang,
        objhoadon.TongTien=this.donHangObj.TongTien,
        objhoadon.MaKhuyenMai=this.donHangObj.MaKhuyenMai,
        objhoadon.TrangThaiThanhToan=this.donHangObj.TrangThaiThanhToan,
        objhoadon.GhiChu=this.donHangObj.GhiChu,
          
        objhoadon.DiaChiGiaoHang= this.donHangObj.DiaChiGiaoHang,
        objhoadon.SDT= this.donHangObj.SDT,
        objhoadon.Email=this.donHangObj.Email,
        objhoadon.PhuongThucThanhToan=this.donHangObj.PhuongThucThanhToan;
      
        objhoadon.ctdh = [];
        objhoadon.ctdh=this.donHangObj.ctdh
        console.log(objhoadon)

        this._api.post('/api/checkout/create-donhangmomo', objhoadon).subscribe(res => {
          if (res && res.data) {
           
          } else {
            
          }
        });


      

    }else{
      console.log("lỗi bên momo")
    }





    
  }

}

import { Component, Injector, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BaseComponent } from 'src/app/core/common/base-component';
declare var $: any;

@Component({
  selector: 'app-donhangcuaban',
  templateUrl: './donhangcuaban.component.html',
  styleUrls: ['./donhangcuaban.component.css']
})
export class DonhangcuabanComponent extends BaseComponent implements OnInit {

  public list_donhangs:any;
  public list_chitietdonhangs:any;
  public hienThiModalChiTiet:any;
  

  constructor(injector: Injector,private authenticationService:AuthenticationService,private toast:NgToastService) {
    super(injector);
  }
  public user:any;

  ngOnInit():void {
    this.LoadData()
  }

  public idKhachHang:any;
  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public tongsp!:number;

  public loadPage(page: any) {
    this._api.post('/api/donhangkhachhang/donhang', {  page: page, pageSize: this.pageSize,idkhachhang:this.idKhachHang}).subscribe(res => {
      this.list_donhangs = res.data;
      this.tongsp = res.totalItem;
      console.log(this.tongsp)
    });
  }


  public LoadData() {
    this.user = this.authenticationService.userValue;
    this.idKhachHang=this.user.idKhachHang;
    this.pageSize=this.pageSize;
    this._api.post('/api/donhangkhachhang/donhang', { page: this.page, pageSize: this.pageSize,idkhachhang:this.idKhachHang}).subscribe(res => {
      this.list_donhangs = res.data;
      this.tongsp = res.totalItem;

      console.log(this.list_donhangs);   
    });

  }

  XemChiTiet(idDonHang:any){
    this.hienThiModalChiTiet=true;
    
    setTimeout(() => {
      $('#hienThiModalChiTiet').modal('toggle');
      this._api.get('/api/admin/get-chitiet-by-id-donhang/' + idDonHang).subscribe(res => {
        this.list_chitietdonhangs = res;
        console.log(res);
        

      
      });
    });
  }

  public HuyDon(idDonHang:any,trangThaiDonHang:any,trangThaiThanhToan:any){
    if(trangThaiDonHang==="Chờ xác nhận"){
      if(confirm('Bạn có chắc chắn muốn hủy đơn hàng?')){
          let obj:any={};
          obj.IdDonHang=idDonHang;
          obj.TrangThaiDonHang="Đã hủy";
          obj.TrangThaiThanhToan=trangThaiThanhToan;

          this._api.put('/api/admin/update-donhang', obj).subscribe(res => {
            if (res && res.data) {
            this.toast.success({detail:"Thành công",summary:"Hủy đơn thành công",duration:5000})
              this.LoadData();
            } else {
              this.toast.error({detail:"Thất Bại",summary:"Xảy ra lỗi",duration:5000})
            }
            });
      }
    }else{
      this.toast.warning({detail:"Chỉ hủy khi đơn chưa được xác nhận",summary:"",duration:5000})
    }

  }


  public dongModalChiTiet() {
    $('#hienThiModalChiTiet').closest('.modal').modal('hide');
  }
}

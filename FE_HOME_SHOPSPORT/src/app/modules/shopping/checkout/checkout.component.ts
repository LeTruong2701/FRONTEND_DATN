import { BaseComponent } from 'src/app/core/common/base-component';
import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit,AfterViewInit {

 
  public frmKhachhang!: FormGroup;
  public list_items: any;
  public tongtien: any;
  public tongtienphaithanhtoan: any;
  public khachhang:any;
  public phuongthucthanhtoan:any;
  public trangthaithanhtoan:any;


  public idkhachhang:any;
  public user:any;

  constructor(injector: Injector,private authenticationService:AuthenticationService,private toast:NgToastService,private router: Router ) {
    super(injector);
    this.frmKhachhang = new FormGroup({
      'txt_hoten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'txt_email': new FormControl('', [Validators.email,Validators.pattern("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$")]),
      'txt_diachigiaohang': new FormControl('', [Validators.required]),
      'txt_ghichu': new FormControl(''),
      'txt_makhuyenmai': new FormControl(''),
      'txt_trangthaithanhtoan': new FormControl('',[Validators.required]),
    });
  }


  ngOnInit() {

   

    this.loadCart();

    this.user = this.authenticationService.userValue;

  
    console.log(this.user);
    if (this.user) {
      this.idkhachhang=this.user.idKhachHang
      this._api.get('/api/checkout/get-khachhang-by-id/'+this.idkhachhang).subscribe(res=>{
        this.khachhang=res;
        console.log(this.khachhang);
        this.frmKhachhang = new FormGroup({
          'txt_hoten': new FormControl(this.khachhang.tenKhachHang, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
          'txt_sdt': new FormControl(this.khachhang.sdt, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
          'txt_email': new FormControl(this.khachhang.email, [Validators.email,Validators.pattern("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$")]),
          'txt_diachigiaohang': new FormControl(this.khachhang.diaChiGiaoHang, [Validators.required,Validators.minLength(10)]),
          'txt_ghichu': new FormControl(),
          'txt_makhuyenmai': new FormControl(''),
          'txt_trangthaithanhtoan': new FormControl('',[Validators.required]),
        });
      })
      
    } else {
      this.frmKhachhang = new FormGroup({
        'txt_hoten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        'txt_email': new FormControl('', [Validators.email,Validators.pattern("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$")]),
        'txt_diachigiaohang': new FormControl('', [Validators.required]),
        'txt_ghichu': new FormControl(''),
        'txt_makhuyenmai': new FormControl(''),
        'txt_trangthaithanhtoan': new FormControl('',[Validators.required]),
      });
      
    }
    
  
    
    
    
  }

  ngAfterViewInit(): void {
    this.loadScripts('../assets/js/jquery-3.3.1.min.js','../assets/js/bootstrap.min.js','../assets/js/jquery-ui.min.js','../assets/js/jquery.countdown.min.js',
    '../assets/js/jquery.nice-select.min.js','../assets/js/jquery.zoom.min.js','../assets/js/jquery.dd.min.js','../assets/js/jquery.slicknav.js',
    '../assets/js/owl.carousel.min.js','../assets/js/main.js');
  }

  loadCart() {
    this.list_items = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(this.list_items);
    this.tongtien = this.list_items.reduce((sum: any, x: any) => sum + x.giaBan * x.quantity, 0);
    this.tongtienphaithanhtoan=this.tongtien;
  }


  public onSubmit(val: any) {

    const requiredFields = [ 'txt_hoten','txt_sdt', 'txt_diachigiaohang','txt_trangthaithanhtoan'];

    for (let field of requiredFields) {
      if (!val[field]) {
          if(field === 'txt_hoten') {
              alert(`Vui lòng nhập người nhận hàng`);
          } else if (field === 'txt_sdt')
          {
              alert(`Vui lòng nhập số điện thoại`);
          } else if (field === 'txt_diachigiaohang')
          {
              alert(`Vui lòng nhập địa chỉ giao hàng`);
          }  else if (field === 'txt_trangthaithanhtoan')
          {
              alert(`Vui lòng chọn phương thức thanh toán`);
          } 
          return;
      }
  }


    if (this.frmKhachhang.invalid) {
      return;
    }
    console.log()

    console.log(val.txt_trangthaithanhtoan);
   
    let obj: any = {};
    obj.IdKhachHang=this.idkhachhang;
    obj.TenKhachHang=val.txt_hoten,
    obj.TongTien=this.tongtienphaithanhtoan,
    obj.MaKhuyenMai=this.makm,
    obj.TrangThaiThanhToan=parseInt(this.trangthaithanhtoan),
    obj.GhiChu=val.txt_ghichu,
      
    obj.DiaChiGiaoHang= val.txt_diachigiaohang,
    obj.SDT= val.txt_sdt,
    obj.Email= val.txt_email,
    obj.PhuongThucThanhToan=this.phuongthucthanhtoan;
   
    obj.ctdh = [];
    this.list_items.forEach((x: any) => {
      obj.ctdh.push({
        IdSanPham: x.idSanPham,
        IdSizeSanPham: x.idSizeSanPham,
        IdMauSanPham: x.idMauSanPham,
        SoLuong: x.quantity,
        GiaMua: x.giaBan,
        Size:x.size
      });
    });
    console.log(obj);
   
    this._api.post('/api/checkout/create-donhang', obj).subscribe(res => {
      if (res && res.data) {
        this.toast.success({detail:"Thành công",summary:"Đơn hàng của bạn đã được tiếp nhận",duration:5000})
        // Chuyển hướng đến trang kết quả thanh toán
        this.router.navigate(['/homes/ketquathanhtoan']);
      } else {
        this.toast.error({detail:"Có lỗi",summary:"Xảy ra lỗi",duration:5000})
      }
    });
  }

  get hoten() {
    return this.frmKhachhang.get('txt_hoten')!;
  }
  get sodienthoai() {
    return this.frmKhachhang.get('txt_sdt')!;
  }
  get email() {
    return this.frmKhachhang.get('txt_email')!;
  }
  get diachigiaohang() {
    return this.frmKhachhang.get('txt_diachigiaohang')!;
  }
  get makhuyenmai() {
    return this.frmKhachhang.get('txt_makhuyenmai')!;
  }

  public makm:any;

  public flag=false;
  public ma_khuyenmai:any;
  ThemMaKhuyenMai(){
    this._api.get('/api/checkout/get-khuyenmai-by-makhuyenmai/'+this.makm).subscribe(res=>{
      this.ma_khuyenmai=res;
      console.log(this.ma_khuyenmai);

      
      if (!(new Date()>=new Date(this.ma_khuyenmai.ngayBatDau) && new Date()<= new Date(this.ma_khuyenmai.ngayKetThuc))) {
        this.toast.info({detail:"Mã khuyến mãi không nằm trong thời gian khuyến mãi",summary:"",duration:5000})
        this.makm=null;
        
      }else{
        if(this.tongtien<this.ma_khuyenmai.dieuKienHoaDon){
          this.toast.info({detail:"Hóa đơn của bạn chưa đủ điều kiện",summary:"",duration:5000});
          this.makm=null;
        }else{
          this.toast.success({detail:"Thành công",summary:"Thêm mã khuyến mãi thành công",duration:5000})
          if(this.ma_khuyenmai.phanTramGiam!=null){
            this.tongtienphaithanhtoan=this.tongtien-(this.tongtien*( this.ma_khuyenmai.phanTramGiam/100) );
            this.flag=true;
          }else if(this.ma_khuyenmai.giaTienGiam!=null){
            this.tongtienphaithanhtoan=this.tongtien-this.ma_khuyenmai.giaTienGiam;
            this.flag=true;
          }

        }
      }

    }, error => {
      if (error.status === 400) {
        this.toast.info({detail:"Không có mã khuyến mãi",summary:"Xin mời thử lại",duration:5000});
        this.makm=null;
        // set lại tổng tiền lúc chưa áp mã khuyến mãi, không hiển thị dòng mã khuyến mại
        this.tongtienphaithanhtoan=this.tongtien;
        this.flag=false;
      }else if(error.status === 404){
        this.toast.warning({detail:"Hãy nhập mã khuyến mãi trước",summary:"",duration:5000});
        this.tongtienphaithanhtoan=this.tongtien;
        this.flag=false;
      }
    });
  }



  trangThaiThanhToan(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.trangthaithanhtoan=0
      this.phuongthucthanhtoan="Khi nhận hàng";
      
    } else {
      this.trangthaithanhtoan="";
    }
  }

  thanhtoanmomo(val:any) {


    const requiredFields = [ 'txt_hoten','txt_sdt', 'txt_diachigiaohang'];

    for (let field of requiredFields) {
      if (!val[field]) {
          if(field === 'txt_hoten') {
              alert(`Vui lòng nhập người nhận hàng`);
          } else if (field === 'txt_sdt')
          {
              alert(`Vui lòng nhập số điện thoại`);
          } else if (field === 'txt_diachigiaohang')
          {
              alert(`Vui lòng nhập địa chỉ giao hàng`);
          } 
          return;
      }
  }

    let obj: any = {};
    obj.IdKhachHang=this.idkhachhang;
    obj.TenKhachHang=val.txt_hoten,
    obj.TongTien=this.tongtienphaithanhtoan,
    obj.MaKhuyenMai=this.makm,
    obj.TrangThaiThanhToan=1,
    obj.GhiChu=val.txt_ghichu,
   
    obj.DiaChiGiaoHang= val.txt_diachigiaohang,
    obj.SDT= val.txt_sdt,
    obj.Email= val.txt_email,
    obj.PhuongThucThanhToan="Thanh toán qua ví điện tử MOMO";
   
    obj.ctdh = [];
    this.list_items.forEach((x: any) => {
      obj.ctdh.push({
        IdSanPham: x.idSanPham,
        IdSizeSanPham: x.idSizeSanPham,
        IdMauSanPham: x.idMauSanPham,
        SoLuong: x.quantity,
        GiaMua: x.giaBan,
        Size:x.size
      });
    });
   
    sessionStorage.setItem('donhangmomo', JSON.stringify(obj))

    let tong: any = {};
    tong.TongTien=this.tongtienphaithanhtoan;
    this._api.post('/api/thanhtoanmomo/create-donhangmomo', tong).subscribe(res => {
      if (res ) { 
        console.log(res.url);
        const payUrl = res.url; // lấy url thnha toán momo
        window.location.href = payUrl; // Chuyển hướng trang web đến URL thanh toán
      } else {
        this.toast.error({ detail: "Có lỗi", summary: "Xảy ra lỗi", duration: 5000 });
      }
    }, error => {
      console.error(error);
    });
  }
  
}

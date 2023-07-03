// import { BaseComponent } from './../../../core/common/base-component';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/service/cart.service';
import { SharedService } from 'src/app/core/service/shared.service';
declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends BaseComponent implements OnInit, AfterViewInit {

  public item: any;
  public sanpham: any;
  public idSizeSanPham:any;
  public soluonggiohang:number=0;

  public item_cungloai:any;

  public item_mau:any;

  public soluongcosan:any;

  public soluongmua:number=1;
  
  public sanphamkhongsize:any;
  
  public idsizespdautien:any;

  public idmauspdautien:any;

  public list_size_sp:any;


  public size:any;

  public anhSanPham:any;

  public listspkhmua:any;
  public user:any;
  public idkhachhang:any;
  public idSanPham:any;


  public frmDanhGiaSP!: FormGroup;
  public listDanhGia:any;
  
  public hienThiModal: any;
  public okForm: any;
  public isUpdate = false;
  public danhgia:any;

  public idKhachHangDanhGia:any;


  constructor(injector: Injector,private _cart: CartService,private sharedService: SharedService,private toast:NgToastService,private authenticationService:AuthenticationService ) {
    super(injector);
    this.frmDanhGiaSP = new FormGroup({
      'txt_danhgia': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      
    });
  }

  public iddm:any;

  ngOnInit() {

    this.user = this.authenticationService.userValue;
    if(this.user){
      this.idKhachHangDanhGia=this.user.idKhachHang;
    console.log(this.idKhachHangDanhGia);
    }
    
    
    window.scrollTo(0,0);
    this._route.params.subscribe(params => {
      this.idSanPham = params['id'];
      this.LoadData();
      //lấy thông tin sản phẩm với idsanpham để lấy bộ giá
      this._api.get('/api/sanpham/get-sanpham-by-idsanpham/' + this.idSanPham).subscribe(res => {
        this.sanpham = res;
        this.iddm=this.sanpham.idDanhMuc
        console.log(this.sanpham);
        console.log(this.iddm);
                //lấy sản phẩm cùng loại
        this._api.get('/api/sanpham/get-sanphamcungloai/' + this.iddm).subscribe(res => {
          this.item_cungloai = res;
          console.log(this.item_cungloai);
        });
      });

      //lấy sản phẩm màu đầu tiên với idsanpham để lấy ra idmausanpham
      this._api.get('/api/sanpham/get-sanpham-maudautien-by-idsanpham/' + this.idSanPham).subscribe(res => {
        this.item = res;
      
        this.idmauspdautien=res.idMauSanPham;
        this.iddm=res.idDanhMuc;
        this.anhSanPham=this.item.anhSanPham
        console.log(res);
        console.log(this.iddm);
        console.log(this.anhSanPham);



        //lấy thông tin sản phẩm với màu , idmausanpham
        this._api.get('/api/sanpham/get-san-pham-theo-mau-by-idmausanpham/' + this.idmauspdautien).subscribe(res => {
          this.item = res;
          this.anhSanPham=this.item.anhSanPham
          console.log(this.item_cungloai);
          console.log(this.item.idDanhMuc);
          console.log(this.anhSanPham);
        });

        //lấy list size theo màu sp đầu tiên
        this._api.get('/api/sanpham/get-list-size-san-pham-by-idmausanpham/' + this.idmauspdautien).subscribe(res => {
          this.list_size_sp = res;
          this.sanphamkhongsize = this.list_size_sp[0].size;
          console.log(this.list_size_sp);
          console.log(this.list_size_sp[0].size);
        });

        //lấy size đầu tiên theo màu sp 
        this._api.get('/api/sanpham/get-size-sanpham-dautien-by-idmausanpham/' + this.idmauspdautien).subscribe(res => {
          this.idsizespdautien = res.idSizeSanPham;
          this.size=res.size;
          this.soluongcosan=res.soLuong;
          console.log(this.idsizespdautien);
          this.idSizeSanPham=this.idsizespdautien;
        });


        console.log(this.soluongmua);

        
        // debugger;
        setTimeout(() => {
          this.loadScripts('/assets/js/jquery-3.3.1.min.js','/assets/js/bootstrap.min.js','/assets/js/jquery-ui.min.js','/assets/js/jquery.countdown.min.js',
          '/assets/js/jquery.nice-select.min.js','/assets/js/jquery.zoom.min.js','/assets/js/jquery.dd.min.js','/assets/js/jquery.slicknav.js',
          '/assets/js/owl.carousel.min.js','/assets/js/main.js'
          );
      
        });
      });
       // lấy list màu sản phẩm theo mã sản phẩm
       this._api.get('/api/sanpham/get-list-mau-sanpham-by-id/'+this.idSanPham).subscribe(res => {
        this.item_mau = res;
        console.log(this.item_mau);
        console.log(this.item_mau[0].anhSanPham);

        // console.log(this.item.idDanhMuc);

      });
      
    });

  }


  LoadData(){
    this._api.get('/api/danhgiasanpham/get-list-danh-gia-sanpham/' + this.idSanPham).subscribe(res => {
      this.listDanhGia = res;
    
      console.log(this.listDanhGia);
     
    });
  }


  public  b = document.querySelector('#chonmau') 

  public values:any;


  

  public chon(idMauSanPham:any,event:any){
    var b=document.querySelector('.chonmau')
   
    
      this.values = event.target
    
      $('.mau.active1').removeClass('active1')
      $(event.target).addClass('active1')

      this._api.get('/api/sanpham/get-san-pham-theo-mau-by-idmausanpham/' + idMauSanPham).subscribe(res => {
        this.item = res;
        this.anhSanPham=this.item.anhSanPham
        console.log(res);
        console.log(this.anhSanPham);
      });
      
      //lấy size đầu tiên theo màu sp 
      this._api.get('/api/sanpham/get-size-sanpham-dautien-by-idmausanpham/' + idMauSanPham).subscribe(res => {
        this.size=res.size;
      
        this.idsizespdautien=res.idSizeSanPham;
        this.soluongcosan=res.soLuong;
        this.soluongmua=1;
        this.idSizeSanPham=this.idsizespdautien;
        console.log(this.idsizespdautien);
      });



      //
      console.log(this.values)

      this._api.get('/api/sanpham/get-list-size-san-pham-by-idmausanpham/' + idMauSanPham).subscribe(res => {
        this.list_size_sp = res;
        console.log(res);
      });
  
      console.log(idMauSanPham)

      console.log($('.chonmau'))
  }

  
  public helo(){
    return false
  }


 

  public chonSize(size:any,idSizeSanPham:any,event:any){

    this.idSizeSanPham=idSizeSanPham;
    // localStorage.setItem('size',size)
    this.size=size;
    $('.size.activesize').removeClass('activesize')

    $(event.target).addClass('activesize')

    this._api.get('/api/sanpham/get-size-sanpham-by-id-size/' + idSizeSanPham).subscribe(res => {
      this.soluongcosan = res.soLuong;
      this.soluongmua=1;
      console.log(res.soLuong);
    });



  }

//   $("#menu li a").click( function() {
//     $(this).parent().parent().find("li").removeClass("active").removeClass("hover").addClass("hover");
//     $(this).parent().removeClass("hover").addClass("active");
// });
  
// onChange(event: any) {
//   this.soluongmua = event.target.value;
//   console.log(this.soluongmua);
// }
			

  public _addToCart(item: any) {
    
    // var b=document.querySelector('.chonmau')
    var quantity:number;
    const myInput: HTMLInputElement = document.querySelector(".mySoluong") as HTMLInputElement;
    this.soluongmua=parseInt(myInput.value);
    if(this.soluongmua>this.soluongcosan){
      this.toast.error({detail:"Số lượng có sẵn không đủ",summary:"",duration:5000})
      return;
    }
    console.log(myInput);
    item.size=this.size;
    item.quantity=this.soluongmua;
    item.idSizeSanPham=this.idSizeSanPham;
    console.log(this.idSizeSanPham);
    item.soLuongCoSan=this.soluongcosan;
    
    this._cart.addToCart(item);
    // this._send.addObjct(this._cart.getItems().length);
   alert("Thêm vào giỏ hàng thành công");
    console.log(item.idsizeSanPham);

   // đếm số sản phẩm trong giỏ hàng
   var local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
   this.soluonggiohang= local_storage.length;
   console.log(this.soluonggiohang)
    this.sharedService.setSoLuongGioHang(this.soluonggiohang);
  }

  
  setSize(size:any){
    localStorage.setItem('size',size)
  }



  ngAfterViewInit() {

  }

  tangQuantity() {
    if (this.soluongmua < this.soluongcosan) {
      this.soluongmua++;
    }
  }

  giamQuantity() {
    if (this.soluongmua > 1) {
      this.soluongmua--;
    }
  }
 
guiDanhGia(value:any){

  let flag:boolean=false;
  
  this.user = this.authenticationService.userValue;
  if(!this.user){

    this.toast.error({detail:"Bạn chưa đăng nhập",summary:"Đăng nhập để có thể góp ý",duration:5000})
   
  }else{

      this.idkhachhang=this.user.idKhachHang;
      this._api.get('/api/danhgiasanpham/get-list-idsp-khachhang-da-mua/' + this.idkhachhang).subscribe(res => {
        this.listspkhmua = res;
        console.log(res)
        this.listspkhmua.forEach((x: any) => {
          if(this.idSanPham==x.idSanPham){
            flag=true; 
          }
        }); 
        if(flag){

          let obj: any = {};
          obj.danhgia={

            NoiDungDanhGia:value.txt_danhgia,
            IdSanPham:parseInt(this.idSanPham),
            idKhachHang:parseInt(this.user.idKhachHang)
          }
          if(this.isUpdate){
                obj.danhgia.IdDanhGia=this.danhgia.idDanhGia;
                obj.danhgia.NoiDungDanhGia=value.txt_danhgiamoi;
                this._api.put('/api/danhgiasanpham/update-danhgia', obj).subscribe(res => {
                  if (res && res.data) {
                    this.isUpdate=false;
                    this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
                    this.LoadData();
                    this.dongModal();
                  } else {
                    this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
                  }
                });

          }else{
            this._api.post('/api/danhgiasanpham/create-danhgia', obj).subscribe(res => {
              if (res && res.data) {
                console.log(res);
                console.log(res.data);
                this.toast.success({detail:"Cảm ơn bạn đã góp ý",summary:"",duration:5000})
                this.LoadData(); 
              } else {
                this.toast.error({detail:"Thất bại",summary:"Thêm mới thất bại",duration:5000})
                this.LoadData();
              }
            });
            this.toast.success({detail:"Cảm ơn bạn đã góp ý",summary:"",duration:5000})
          }
          
        }else{
          this.toast.error({detail:"Bạn chưa mua sản phẩm này",summary:"Không thể đánh giá",duration:5000})
        }
      });

    }
   
  }


  xoaDanhGia(idDanhGia:any){
    if(confirm('Bạn có chắc chắn muốn xóa đánh giá này không?')){

      this._api.delete('/api/danhgiasanpham/delete-danhgia/' +idDanhGia).subscribe(res => {
        if(res&&res.data){    
            this.LoadData(); 
            this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        }
       
      });
    }
    else{
      
    }

  }

  suaDanhGia(idDanhGia:any){

    this.hienThiModal=true;
    this.okForm=false;
    this.isUpdate=true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/danhgiasanpham/get-by-id-danhgia/' + idDanhGia).subscribe(res => {
        this.danhgia = res;
      
        console.log(res);
        this.frmDanhGiaSP = new FormGroup({
          'txt_danhgia': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          'txt_danhgiacu': new FormControl(this.danhgia.noiDungDanhGia, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          'txt_danhgiamoi': new FormControl(this.danhgia.noiDungDanhGia, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          
        });

        this.okForm=true;
      });
    });
  }

  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }


}

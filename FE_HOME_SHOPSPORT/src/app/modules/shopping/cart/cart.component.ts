import { BaseComponent } from 'src/app/core/common/base-component';
import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit,AfterViewInit {

  public list: any;
  public tongtien: any;
  public khuyenmaihople: any;

  constructor(injector: Injector, private _router: Router) { 
    super(injector);
  }

  ngOnInit():void {
    this.list = JSON.parse(localStorage.getItem('cart') || '[]');
    this.tongtien = this.list.reduce((sum:any, x:any) => sum +  x.giaBan * x.quantity, 0);

    this._api.get('/api/admin/get-khuyenmai-hople').subscribe(res=>{
      this.khuyenmaihople=res;
      console.log(this.khuyenmaihople);
    })


  }
  ngAfterViewInit() {
    this.loadScripts('../assets/js/jquery-3.3.1.min.js','../assets/js/bootstrap.min.js','../assets/js/jquery-ui.min.js','../assets/js/jquery.countdown.min.js',
    '../assets/js/jquery.nice-select.min.js','../assets/js/jquery.zoom.min.js','../assets/js/jquery.dd.min.js','../assets/js/jquery.slicknav.js',
    '../assets/js/owl.carousel.min.js','../assets/js/main.js');
  }

  public CheckOut () {
    this._router.navigate(['/shopping/checkout']);
  }


  public GiamSoLuong(idMauSanPham: any,size:any) {
    var index = this.list.findIndex((x: any) => x.idMauSanPham == idMauSanPham&&x.size==size);
    if (index >= 0 && this.list[index].quantity > 1) {
      this.list[index].quantity -= 1;
      this.tongtien = this.list.reduce((sum:any, x:any) => sum + x.giaBan  * x.quantity, 0);
    }
  
    localStorage.setItem('cart', JSON.stringify(this.list));
  }
  public TangSoLuong(idMauSanPham: any,size:any) {
    var index = this.list.findIndex((x: any) => x.idMauSanPham == idMauSanPham&&x.size==size);
    if (index >= 0&&this.list[index].quantity<this.list[index].soLuongCoSan) {
      this.list[index].quantity += 1;
      this.tongtien = this.list.reduce((sum:any, x:any) => sum + x.giaBan  * x.quantity, 0);
    }
    localStorage.setItem('cart', JSON.stringify(this.list));
  }
  public XoaCart() {
    if (confirm("Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng!")) {
        localStorage.setItem('cart','');
        this.list = null;
        this.tongtien = 0;
    }
  }
  public capnhatCart() {
    localStorage.setItem('cart', JSON.stringify(this.list));
    alert("Đã cập nhật thông tin giỏ hàng thành công!");
  }


  public XoaSP(idMauSanPham: any,size:any) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng!")) {
      var index = this.list.findIndex((x: any) => x.idMauSanPham == idMauSanPham&&x.size==size);
      if (index >= 0) {
        this.list.splice(index, 1);
        this.tongtien = this.list.reduce((sum:any, x:any) => sum + x.giaBan  * x.quantity, 0);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.list));
  }

  // <script src="js/jquery-3.3.1.min.js"></script>
  // <script src="js/bootstrap.min.js"></script>
  // <script src="js/jquery-ui.min.js"></script>
  // <script src="js/jquery.countdown.min.js"></script>
  // <script src="js/jquery.nice-select.min.js"></script>
  // <script src="js/jquery.zoom.min.js"></script>
  // <script src="js/jquery.dd.min.js"></script>
  // <script src="js/jquery.slicknav.js"></script>
  // <script src="js/owl.carousel.min.js"></script>
  // <script src="js/main.js"></script>
}

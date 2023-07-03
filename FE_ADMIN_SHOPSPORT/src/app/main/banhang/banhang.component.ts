import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-banhang',
  templateUrl: './banhang.component.html',
  styleUrls: ['./banhang.component.css']
})
export class BanhangComponent extends BaseComponent implements OnInit {


  public p!:number;

  public list_item: any;
  public list_order: any = [];
  public tong!: number;
  public frmHoaDon: FormGroup;
  constructor(injector: Injector, private authenticationService: AuthenticationService) {
    super(injector);
    this.frmHoaDon = new FormGroup({
      'txt_hoten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      'txt_dienthoai': new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'txt_diachi': new FormControl('', []),
      'txt_email': new FormControl('', [Validators.email]),
      'txt_tinkhac': new FormControl('', []),
    });
  }

  get diachi() {
    return this.frmHoaDon.get('txt_diachi')!;
  }
  get email() {
    return this.frmHoaDon.get('txt_email')!;
  }

  get dienthoai() {
    return this.frmHoaDon.get('txt_dienthoai')!;
  }
  get hoten() {
    return this.frmHoaDon.get('txt_hoten')!;
  }

  ngOnInit(): void {
    this._api.post('/api/admin/search-hoadonxuat', {  }).subscribe(res => {
      this.list_item = res.data;
      console.log(this.list_item)
      // setTimeout(() => {
      //   this.loadScripts('assets/js/core/app.js');
      // });
    });

  }

  public ThanhToan(vl:any) {
    if (this.frmHoaDon.invalid) {
      return;
    }
    let user = this.authenticationService.userValue;
    let obj:any = {};
    obj.khachhang = {
      TenKhachHang: vl.txt_hoten,
      SDT: vl.txt_dienthoai,
      DiaChi:vl.txt_diachi,
      Email:vl.txt_email
    }
    obj.hoadon = {
      IdNguoiDung: user.idNguoiDung
    }
    obj.chitiethoadon = [];
    this.list_order.forEach((x: any) => {
      obj.chitiethoadon.push({
        IdSanPham: x.idSanPham,
        SoLuong: x.soLuong,
        GiaXuat: x.gia
      });
    }); 
    this._api.post('/api/admin/create-hoadonxuat', obj).subscribe(res => {
      if (res && res.data) {
        alert('Thêm dữ liệu thành công')
      } else {
        alert('Có lỗi')
      }
    });
  }
  public delete(idSanPham: any) {
    this.list_order = this.list_order.filter((x: any) => x.idSanPham != idSanPham);
    this.tong = this.list_order.reduce((sum: any, x: any) => sum + x.gia * x.soLuong, 0);
  }



  public Add(item: any) {
    if (this.list_order.length == 0) {
      item.soLuong = 1;
      this.list_order = [item];
    } else {
      let ok = true;
      for (let x of this.list_order) {
        if (x.idSanPham == item.idSanPham) {
          x.soLuong += 1;
          ok = false;
          break;
        }
      }
      if (ok) {
        item.soLuong = 1;
        this.list_order.push(item);
      }
    }
    this.tong = this.list_order.reduce((sum: any, x: any) => sum + x.gia * x.soLuong, 0);
  }
  public TinhToan() {
    this.tong = this.list_order.reduce((sum: any, x: any) => sum + x.gia * x.soLuong, 0);
  }

  public printHtml() {
    let html_order = '';
  
    this.list_order.forEach((x: any) => {
      html_order += `
      <tr>
      <td>1</td>
      <td>${x.tenSanPham}</td>
      <td>${x.gia}</td>
      <td>${x.soLuong}</td>
      <td>${x.gia * x.soLuong}</td>
      </tr>
      `;
      
    });
    let data = `
    <section style="text-align: center;">
        <h1>HÓA ĐƠN</h1>
       
        <div class="ngay">
            <p id="date"></p>
            <script>
                n = new Date();
                y = n.getFullYear();
                m = n.getMonth() + 1;
                d = n.getDate();
                document.getElementById("date").innerHTML = "Ngày " + d + " tháng " + m + " năm " + y;
            </script>
        </div>
    </section>

    <div class="le dam">Tên Shop: HoduSport</div>
    <div class="le">Từ: Tân Châu - Khoái Châu - Hưng Yên</div>
    <div class="le doi">Điện thoại liên lạc: 0379.517.046</div>
    <div class="le doi">Số tài khoản: 0103795170362701</div>
   
    <div class="le dam">Giao đến: ${this.frmHoaDon.value['txt_hoten']}</div>
    <div class="le">Địa chỉ: ${this.frmHoaDon.value['txt_diachi']}</div>
    <div class="le">Email: ${this.frmHoaDon.value['txt_email']}</div>
    <div class="le">Số điện thoại liên lạc: ${this.frmHoaDon.value['txt_dienthoai']}</div>
    <div class="le doi">Hình thức thanh toán: Nhận hàng thanh toán</div>
   
    <div class="le">Ghi chú: </div>
    <table>
        <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
        </tr>
        ${html_order}
    </table>
    <br>
    <div class="le"><b> Tổng giá trị đơn hàng cần thanh toán: ${this.tong} vnđ</b> </div>
   
    <div class="doi ky">Chỉ dẫn giao hàng:Chuyển hoàn sau 3 lần phát</div>
    <div class="doi dam ky">Chữ ký người nhận</div>
    <div class="doi ky">lưu kho tối đa 5 ngày</div>
    <div class="doi ky1">(Xác nhận hàng nguyên vẹn, không bị bóp méo, bị vỡ)</div>
    `;

    let popupWin: any = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          .print table {
              margin-top: 15px;
              width: 100%;
          }
          print tr {
              line-height: 27px;
          }
  
          .print table,
          th,
          td {
              border: 1px solid black;
              border-collapse: collapse;
              text-align: center;
          }
  
          .print .ngay {
              font-style: italic;
              font-size: 15px;
              margin-bottom: 5px;
          }
  
          .print .ban {
              font-style: italic;
              font-size: 15px;
              margin: 3px 0px;
          }
  
          .print .dam {
              font-weight: bold;
          }
  
          .print .le {
              margin-bottom: 4px;
              font-size: 15px;
          }
  
          .print .doi {
              width: 50%;
              float: left;
          }
  
          .print .ky {
              text-align: center;
              margin-top: 20px;
          }
  
          .print .ky1 {
              font-style: italic;
              text-align: center;
              margin-top: 5px;
          }
      </style>
        </head>
      <body class='print' onload="window.print();window.close()">${data}</body>
      </html>`
    );
    popupWin.document.close();
  }

}

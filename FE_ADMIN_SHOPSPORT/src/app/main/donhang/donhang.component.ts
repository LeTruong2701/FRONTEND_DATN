import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
declare var $: any;
@Component({
  selector: 'app-donhang',
  templateUrl: './donhang.component.html',
  styleUrls: ['./donhang.component.css']
})
export class DonhangComponent extends BaseComponent implements OnInit {

  public p!:number;
  public list_donhangs: any;
  public donhang:any;

  public list_chitietdonhangs:any;
  public frmChiTietDonHang!: FormGroup;
  public frmSearch!: FormGroup;
  public frmDonHang!: FormGroup;

  public hienThiModalChiTiet:any;
  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;

  public idDonHang:any;
  public trangThaiThanhToan:any;



  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tenkh': new FormControl('', []),
      'txt_ngaydat': new FormControl('', []),
      
    });

    this.frmDonHang = new FormGroup({
      'txt_trangthaithanhtoan': new FormControl(''),
      'txt_trangthaidonhang': new FormControl('')
      
    });
  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tenkhachhang': new FormControl('', []),
      'txt_ngaydat': new FormControl('', []),
      
    });
  }

  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public tongsp!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-donhang', {  page: page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tenkhachhang']}).subscribe(res => {
      this.list_donhangs = res.data;
      this.tongsp = res.totalItem;
      console.log(this.tongsp)
      this.trangThaiThanhToan=this.list_donhangs.trangThaiThanhToan;
    });
  }


  public LoadData(pageSize:any) {
    
    this.pageSize=pageSize;
    
    this._api.post('/api/admin/search-donhang', { page: this.page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tenkhachhang']}).subscribe(res => {
      this.list_donhangs = res.data;
      this.tongsp = res.totalItem;
      this.trangThaiThanhToan=this.list_donhangs.trangThaiThanhToan;

      console.log(this.list_donhangs);   
    });
  }


  public changeTrangThaiThanhToan(e:any) {
    console.log(e.target.value);
    this.trangThaiThanhToan=e.target.value
    console.log(this.trangThaiThanhToan);
    
  }

  public trangThaiDonHang:any;
  public changeTrangThaiDonHang(e:any) {


    console.log(e.target.value);
    
    if(this.frmDonHang.get('txt_trangthaithanhtoan')!.value== 0 && this.trangThaiDonHang === "Giao hàng thành công"){
      this.toast.warning({detail:"Chưa được thanh toán",summary:"",duration:5000})


    }else{
      this.trangThaiDonHang=e.target.value;
    }

    console.log(this.trangThaiDonHang);
  
  }


  public xemChiTiet(idDonHang: any){

    this.hienThiModalChiTiet=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienThiModalChiTiet').modal('toggle');
      this._api.get('/api/admin/get-chitiet-by-id-donhang/' + idDonHang).subscribe(res => {
        this.list_chitietdonhangs = res;
        console.log(res);
        

        this.okForm=true;
      });
    });
  }


  public suaModal(idDonHang: any){
 
    this.hienThiModal=true;
   
   
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      this._api.get('/api/admin/get-chitiet-by-id-donhang/' + idDonHang).subscribe(res => {
        this.list_chitietdonhangs = res;
        console.log(res);
        

        this.okForm=true;
      });
      
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-donhang/' + idDonHang).subscribe(res => {
        this.donhang = res;

        this.idDonHang=this.donhang.idDonHang;

        this.trangThaiDonHang=this.donhang.trangThaiDonHang;
        this.trangThaiThanhToan=this.donhang.trangThaiThanhToan;
        let ngayDatStr = new Date(this.donhang.ngayDat).toISOString().substring(0, 10);
        console.log(res);
        this.frmDonHang = new FormGroup({
          'txt_tenkhachhang': new FormControl(this.donhang.tenKhachHang),
           'txt_idkhachhang': new FormControl(this.donhang.idKhachHang),
           'txt_ghichu': new FormControl(this.donhang.ghiChu),
           'txt_sdt': new FormControl(this.donhang.sdt),
          'txt_diachigiaohang': new FormControl(this.donhang.diaChiGiaoHang),
          'txt_ngaydat': new FormControl(ngayDatStr),
          'txt_tongtien': new FormControl(this.donhang.tongTien),
          'txt_makhuyenmai': new FormControl(this.donhang.maKhuyenMai),
          'txt_phuongthucthanhtoan': new FormControl(this.donhang.phuongThucThanhToan),
          'txt_trangthaithanhtoan': new FormControl(this.donhang.trangThaiThanhToan),
          'txt_trangthaidonhang': new FormControl(this.donhang.trangThaiDonHang),
        });

        this.okForm=true;
      });
    });
  }

  public xoaModal(idHoaDOn: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
      this._api.delete('/api/admin/delete-hoadon/' +idHoaDOn).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
        
      });
    }else{}
  }




  OnSubmit(value: any) {
    let obj: any = {};
    obj.TrangThaiDonHang=this.trangThaiDonHang;
    obj.TrangThaiThanhToan=parseInt(this.trangThaiThanhToan);
    

    obj.IdDonHang=this.idDonHang;
    this._api.put('/api/admin/update-donhang', obj).subscribe(res => {
          if (res && res.data) {
          this.toast.success({detail:"Thành công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Xảy ra lỗi",duration:5000})
          }
        });



  }


  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }

  public dongModalChiTiet() {
    $('#hienThiModalChiTiet').closest('.modal').modal('hide');
  }

  ngAfterViewInit(): void {
      
  }


  public list_order: any = [];
  public printHtml() {
    console.log(this.list_chitietdonhangs)
    let html_order = '';
    let tongtienthanhtoan=0;
    this.list_chitietdonhangs.forEach((x: any) => {
      html_order += `
      <tr>
      <td>1</td>
      <td>${x.tenSanPham}</td>
      <td>${x.giaMua.toLocaleString()}</td>
      <td>${x.soLuong}</td>
      <td>${x.giaMua * x.soLuong}</td>
      </tr>
      `;
      tongtienthanhtoan=tongtienthanhtoan+ (x.giaMua*x.soLuong);
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
   
    <div class="le dam">Giao đến: ${this.frmDonHang.value['txt_tenkhachhang']}</div>
    <div class="le">Địa chỉ: ${this.frmDonHang.value['txt_diachigiaohang']}</div>
    <div class="le">Số điện thoại liên lạc: ${this.frmDonHang.value['txt_sdt']}</div>
    <div class="le">Ngày đặt hàng: ${this.frmDonHang.value['txt_ngaydat']}</div>
    <div class="le doi">Hình thức thanh toán: ${this.frmDonHang.value['txt_phuongthucthanhtoan']}</div>
   
    <div class="le">Ghi chú:${this.frmDonHang.value['txt_ghichu']} </div>

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
    ${this.frmDonHang.value['txt_phuongthucthanhtoan'] === 'Khi nhận hàng' ? 
    `<div class="le"><b> Tổng giá trị đơn hàng cần thanh toán: ${tongtienthanhtoan.toLocaleString()} vnđ</b></div>` : 
    `<div class="le"><b> Tổng giá trị đơn hàng cần thanh toán: 0 vnđ</b></div>`
  }
   
   
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

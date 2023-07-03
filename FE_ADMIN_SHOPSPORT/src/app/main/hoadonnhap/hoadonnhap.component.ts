import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';
declare var $: any;
import{ NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-hoadonnhap',
  templateUrl: './hoadonnhap.component.html',
  styleUrls: ['./hoadonnhap.component.css']
})
export class HoadonnhapComponent extends BaseComponent implements OnInit {


  public list_hoadonnhaps: any;
  public hoadonnhap:any;
  public frmHoaDonNhap!: FormGroup;
  public frmSearch!: FormGroup;
  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;
  public id_trangthaihoadonnhap:any;
  public list_cthdn:any;
  public tenSP:any;


  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_tennhacungcap': new FormControl('', [])
      
    });
  }

  ngOnInit():void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tennhacungcap': new FormControl('', []),
      
    });
  }
  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public totalItem!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-hoadonnhap', {  page: page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tennhacungcap']}).subscribe(res => {
      this.list_hoadonnhaps = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem)
    });
  }

  public LoadData(pageSize:any) {
    this.pageSize=pageSize
    this._api.post('/api/admin/search-hoadonnhap', { page: this.page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tennhacungcap']}).subscribe(res => {
      this.list_hoadonnhaps = res.data;
      this.totalItem = res.totalItem;

      console.log(res);
      
    });

    
  }


  public suaModal(idHoaDonNhap: any){
 
    this.hienThiModal=true;
   
   
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {

      this._api.get('/api/admin/get-chitiethoadonnhap-by-id-hoadonnhap/'+idHoaDonNhap).subscribe(res => {
        this.list_cthdn = res;
        this.tenSP=res[0].tenSanPham;

        console.log(this.tenSP);
        console.log(this.list_cthdn);
        
      });
      
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-hoadonnhap/' + idHoaDonNhap).subscribe(res => {
        this.hoadonnhap = res;
        this.id_trangthaihoadonnhap=res.trangThaiHoaDonNhap;
        console.log(this.id_trangthaihoadonnhap)
       
        console.log(this.hoadonnhap);
        this.frmHoaDonNhap = new FormGroup({
          'txt_nhanvien':new FormControl(this.hoadonnhap.tenNguoiDung),
          
          'txt_nhacungcap':new FormControl(this.hoadonnhap.tenNhaCungCap),
          'txt_tongtien':new FormControl(this.hoadonnhap.tongTien),
          'txt_trangthaihoadonnhap': new FormControl(this.hoadonnhap.trangThaiHoaDonNhap),
          
        });

        this.okForm=true;
      });
    });
  }


  public xoaDM(IdHoaDonNhap: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
      this._api.delete('/api/admin/delete-danhmuc/' +IdHoaDonNhap).subscribe(res => {
        alert('Xóa dữ liệu thành công');
        this.LoadData(this.pageSize);
        
      });
    }else{}
  }


  OnSubmit(value: any) {
    if (this.frmHoaDonNhap.invalid) {
      this.toast.warning({detail:"Xuất hiện lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }
    let obj: any = {};
    obj.hoadonnhap = {
      
      TrangThaiHoaDonNhap: parseInt(this.id_trangthaihoadonnhap),
     
      
    }
    if(this.isCreate){
      this._api.post('/api/admin/create-danhmuc', obj).subscribe(res => {
        if (res && res.data) {
          this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
          this.LoadData(this.pageSize);
          this.dongModal();
        } else {
          this.toast.error({detail:"Thất bại",summary:"Thêm mới thất bại",duration:5000})
        }
      });
    }
    else{
      obj.hoadonnhap.IdHoaDonNhap=this.hoadonnhap.idHoaDonNhap;
      this._api.put('/api/admin/update-hoadonnhap', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất bại",summary:"Thêm mới thất bại",duration:5000})
          }
        });
    }
  }
  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }


  public changeTrangThai(e:any) {
    console.log(e.target.value);
    this.id_trangthaihoadonnhap=e.target.value
    console.log(this.id_trangthaihoadonnhap);
   

  }


}

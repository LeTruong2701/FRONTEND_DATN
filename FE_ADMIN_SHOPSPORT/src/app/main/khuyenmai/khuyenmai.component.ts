import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';
declare var $: any;
import{NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-khuyenmai',
  templateUrl: './khuyenmai.component.html',
  styleUrls: ['./khuyenmai.component.css']
})
export class KhuyenmaiComponent extends BaseComponent implements OnInit {

  
  public p!:number;
  public list_khuyenmais: any;
  public khuyenmai:any;
  public frmKhuyenmai!: FormGroup;
  public frmSearch!: FormGroup;

  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;




  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tenkhuyenmai': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tenkhuyenmai': new FormControl('', []),
      
    });
  }

  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public totalItem!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-khuyenmai', {  page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_khuyenmais = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem)
    });
  }

  public LoadData(pageSize:any) {
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-khuyenmai', { page:this.page,pageSize:this.pageSize,ten: this.frmSearch.value['txt_tenkhuyenmai']}).subscribe(res => {
      this.list_khuyenmais = res.data;
      this.totalItem = res.totalItem;
      console.log(res);
      
    });
  }



  public themModal() {
    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      this.frmKhuyenmai = new FormGroup({
        'txt_makhuyenmai': new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(30), Validators.pattern(/^\S*$/)]),

        'txt_tenkhuyenmai': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        'txt_mota': new FormControl('', [Validators.required]),
        'txt_phantramgiam': new FormControl(''),
        'txt_giatiengiam': new FormControl(''),
        'txt_dieukienhoadon': new FormControl(''),
        'txt_ngaybatdau': new FormControl('', [Validators.required]),
        'txt_ngayketthuc': new FormControl('', [Validators.required]),
        'txt_trangthai': new FormControl(''),
        
      })
      this.okForm = true;

    });
  }



  public suaModal(idKhuyenMai: any){

    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-khuyenmai/' + idKhuyenMai).subscribe(res => {
        this.khuyenmai = res;
        this.id_trangthai=res.trangThai;
        console.log(res);
        let ngayBatDauLocal = new Date(this.khuyenmai.ngayBatDau);
        let year = ngayBatDauLocal.getFullYear();
        let month = ('0' + (ngayBatDauLocal.getMonth() + 1)).slice(-2);
        let day = ('0' + ngayBatDauLocal.getDate()).slice(-2);
        let ngayBatDau = `${year}-${month}-${day}`;

        let ngayKetThucLocal = new Date(this.khuyenmai.ngayKetThuc);
        let year1 = ngayKetThucLocal.getFullYear();
        let month1 = ('0' + (ngayKetThucLocal.getMonth() + 1)).slice(-2);
        let day1 = ('0' + ngayKetThucLocal.getDate()).slice(-2);
        let ngayKetThuc = `${year1}-${month1}-${day1}`;
        // let ngayBatDau = new Date(this.khuyenmai.ngayBatDau).toISOString().substring(0, 10);
        // let ngayKetThuc = new Date(this.khuyenmai.ngayKetThuc).toISOString().substring(0, 10);
        this.frmKhuyenmai = new FormGroup({
          'txt_makhuyenmai': new FormControl(this.khuyenmai.maKhuyenMai, [Validators.required]),
        'txt_tenkhuyenmai': new FormControl(this.khuyenmai.tenKhuyenMai, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        'txt_mota': new FormControl(this.khuyenmai.moTa, [Validators.required]),
        'txt_phantramgiam': new FormControl(this.khuyenmai.phanTramGiam),
        'txt_giatiengiam': new FormControl(this.khuyenmai.giaTienGiam),
        'txt_dieukienhoadon': new FormControl(this.khuyenmai.dieuKienHoaDon),
        'txt_ngaybatdau': new FormControl(ngayBatDau, [Validators.required]),
        'txt_ngayketthuc': new FormControl(ngayKetThuc, [Validators.required]),
        'txt_trangthai': new FormControl(this.khuyenmai.trangThai),
        });

        this.okForm=true;
      });
    });
  }

  public xoaNSX(idKhuyenMai: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){

      this._api.delete('/api/admin/delete-khuyenmai/' +idKhuyenMai).subscribe(res => {
        if(res&&res.data){    
            this.LoadData(this.pageSize); 
            this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        }
        console.log(idKhuyenMai);
      });
    }
    else{
      
    }
    
  }


  get makhuyenmai() {
    return this.frmKhuyenmai.get('txt_makhuyenmai')!;
  }
  get tenkhuyenmai() {
    return this.frmKhuyenmai.get('txt_tenkhuyenmai')!;
  }
  get mota() {
    return this.frmKhuyenmai.get('txt_mota')!;
  }
  get phantramgiam() {
    return this.frmKhuyenmai.get('txt_phantramgiam')!;
  }
  get giatiengiam() {
    return this.frmKhuyenmai.get('txt_giatiengiam')!;
  }
  get dieukienhoadon() {
    return this.frmKhuyenmai.get('txt_dieukienhoadon')!;
  }
  get ngaybatdau() {
    return this.frmKhuyenmai.get('txt_ngaybatdau')!;
  }
  get ngayketthuc() {
    return this.frmKhuyenmai.get('txt_ngayketthuc')!;
  }



  OnSubmit(value: any) {

    const requiredFields = ['txt_makhuyenmai', 'txt_tenkhuyenmai', 'txt_ngaybatdau', 'txt_ngayketthuc','txt_giatiengiam','txt_phantramgiam','txt_trangthai'];
let isDateValid = false;

for (let field of requiredFields) {
  if (!value[field]) {
    if (field === 'txt_makhuyenmai') {
      alert(`Vui lòng nhập giá trị cho trường Mã khuyến mại.`);
      return;
    } else if (field === 'txt_tenkhuyenmai') {
      alert(`Vui lòng nhập giá trị cho trường Tên khuyến mại`);
      return;
    }else if (field === 'txt_ngaybatdau') {
      alert(`Vui lòng nhập giá trị cho trường Ngày bắt đầu`);
      return;
    } else if (field === 'txt_ngayketthuc') {
      alert(`Vui lòng nhập giá trị cho trường Ngày kết thúc`);
      return;
    }else if (field === 'txt_trangthai') {
      alert(`Vui lòng nhập giá trị cho trường Trạng thái`);
      return;
    }else if (field === 'txt_giatiengiam') {
      // Nếu ngày bắt đầu không được nhập, cập nhật biến flag thành true
      isDateValid = isDateValid || false;
    } else if (field === 'txt_phantramgiam') {
      // Nếu ngày kết thúc không được nhập, cập nhật biến flag thành true
      isDateValid = isDateValid || false;
    }
  } else if (field === 'txt_giatiengiam' && value[field]) {
    // Nếu ngày bắt đầu được nhập, cập nhật biến flag thành true
    isDateValid = true;
  } else if (field === 'txt_phantramgiam' && value[field]) {
    // Nếu ngày kết thúc được nhập, cập nhật biến flag thành true
    isDateValid = true;
  }
}

if (!isDateValid) {
  alert(`Vui lòng nhập giá trị cho ít nhất một trong hai trường Gía tiền giảm hoặc Phần trăm giảm.`);
  return;
}

if (value['txt_giatiengiam'] || value['txt_phantramgiam']) {
  isDateValid = true;
}

if (!isDateValid) {
  alert(`Vui lòng nhập giá trị cho ít nhất một trong hai trường Gía tiền giảm hoặc Phần trăm giảm.`);
  return;
}

    if (this.frmKhuyenmai.invalid) {
      this.toast.warning({detail:"Xuất hiện lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }
    let obj: any = {};
    obj.khuyenmai = {
      MaKhuyenMai: value.txt_makhuyenmai,
      TenKhuyenMai: value.txt_tenkhuyenmai,
      
      MoTa: value.txt_mota,
      PhanTramGiam: parseInt(value.txt_phantramgiam),
      GiaTienGiam: parseInt(value.txt_giatiengiam),
      DieuKienHoaDon: parseInt(value.txt_dieukienhoadon),
      NgayBatDau: value.txt_ngaybatdau,
      NgayKetThuc: value.txt_ngayketthuc,
      TrangThai: parseInt(this.id_trangthai),
      
    }
    if(this.isCreate){
      this._api.post('/api/admin/create-khuyenmai', obj).subscribe(res => {
        if (res && res.data) {
          this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
          this.LoadData(this.pageSize);
          this.dongModal();
        } else {
          alert('Có lỗi')
        }
      });
    }
    else{
      obj.khuyenmai.IdKhuyenMai=this.khuyenmai.idKhuyenMai;
      this._api.put('/api/admin/update-khuyenmai', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
          }
        });
    }
    
  }
  public id_trangthai:any;
  public changeTrangThai(e:any) {
    console.log(e.target.value);
    this.id_trangthai=e.target.value
    console.log(this.id_trangthai);
  
  }

  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }

  ngAfterViewInit(): void {
      
  }

}

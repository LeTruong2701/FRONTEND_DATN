import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BaseComponent } from 'src/app/core/common/base-component';
declare var $: any;

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent extends BaseComponent implements OnInit {

  public list_nhanviens:any;
  public nhanvien:any;
  public frmNhanVien!: FormGroup;
  public frmThemSanPham!: FormGroup;
  public frmSearch!: FormGroup;
  public file: any;

  public hienThiModal: any;
  public hienThiModalThemSanPham: any;
  public okForm: any;
  public isCreate = false;
  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_hoten': new FormControl('', []),
    });
   }

  ngOnInit() {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_hoten': new FormControl('', []),
      
    });
  }


  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public totalItem!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-nguoidung', {  page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_nhanviens = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem)
    });
  }


  public LoadData(pageSize:any) {
    this.pageSize=pageSize;

    if(true){
      this._api.post('/api/admin/search-nguoidung', {page:this.page,pageSize:this.pageSize,ten : this.frmSearch.value['txt_hoten']}).subscribe(res => {
        this.list_nhanviens = res.data;
        this.totalItem = res.totalItem;
        console.log(res.data);
        
        console.log(this.frmSearch.value['txt_hoten'])
      }); 
    }
  }






  public modalThemNhanVien() {

    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      this.frmNhanVien = new FormGroup({
        'txt_hoten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        'txt_gioitinh': new FormControl('', [Validators.required]),
        'txt_ngaysinh': new FormControl('', [Validators.required]),
        'txt_diachi': new FormControl('', [Validators.required]),
   
        'txt_sdt': new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
          'txt_email':new FormControl('', [Validators.required,Validators.pattern("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$")]),
      })
      this.okForm = true;

    });
    // this.hienThiModal = true;
    // this.isCreate = true;
    // setTimeout(() => {
    //   $('#hienThiModal').modal('toggle');
    //   this.frmNhanVien = new FormGroup({
    //     'txt_hoten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    //     'txt_gioitinh': new FormControl('', [Validators.required]),
    //     'txt_ngaysinh': new FormControl('', [Validators.required]),
    //     'txt_diachi': new FormControl('', [Validators.required]),
   
    //     'txt_sdt': new FormControl('', [Validators.required]),
    //     'txt_email':new FormControl('', [Validators.required]),
        
    //   })
     
    //   this.okForm = true;
  
    // });
  }

  public suaModal(idNguoiDung: any){

    console.log(idNguoiDung);
    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-nguoidung/' + idNguoiDung).subscribe(res => {
        this.nhanvien = res;
        this.gt=res.gioiTinh;

        let ngaySinhLocal = new Date(this.nhanvien.ngaySinh);
let year = ngaySinhLocal.getFullYear();
let month = ('0' + (ngaySinhLocal.getMonth() + 1)).slice(-2);
let day = ('0' + ngaySinhLocal.getDate()).slice(-2);
let ngaySinhStr = `${year}-${month}-${day}`;
        // let ngaySinhStr = new Date(this.nhanvien.ngaySinh).toISOString().substring(0, 10);
        console.log(this.nhanvien)
        console.log(ngaySinhStr)
        this.frmNhanVien = new FormGroup({
          'txt_hoten': new FormControl(this.nhanvien.hoTen, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
          'txt_gioitinh': new FormControl(this.nhanvien.gioiTinh, [Validators.required]),
          'txt_ngaysinh': new FormControl(ngaySinhStr, [Validators.required]),
          'txt_diachi': new FormControl(this.nhanvien.diaChi, [Validators.required]),
     
          'txt_sdt': new FormControl(this.nhanvien.sdt, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
          'txt_email':new FormControl(this.nhanvien.email, [Validators.required,Validators.pattern("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$")]),
        }),

        this.okForm=true;
      });
    });
  }
  public xoaNhanvien(idNguoiDung: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
      this._api.delete('/api/admin/delete-nguoidung/' +idNguoiDung).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
      });
    }else{}
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmNhanVien.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  OnSubmit(value: any) {
    

    const requiredFields = [ 'txt_hoten','txt_gioitinh', 'txt_ngaysinh','txt_diachi','txt_sdt', 'txt_email'];

    for (let field of requiredFields) {
      if (!value[field]) {
          if(field === 'txt_hoten') {
              alert(`Vui lòng nhập Họ tên`);
          } else if (field === 'txt_gioitinh')
          {
              alert(`Vui lòng nhập Giới tính`);
          } else if (field === 'txt_ngaysinh')
          {
              alert(`Vui lòng nhập Ngày sinh`);
          }  else if (field === 'txt_diachi')
          {
              alert(`Vui lòng nhập địa chỉ`);
          }  else if (field === 'txt_sdt')
          {
              alert(`Vui lòng nhập SĐT`);
          } else if (field === 'txt_email')
          {
              alert(`Vui lòng nhập email`);
          }
          return;
      }
  }

    console.log(this.findInvalidControls())
    if (this.frmNhanVien.invalid) {
      return;
    }
    let obj: any = {};
   
      obj.nguoiDung = {
        HoTen: value.txt_hoten,
        GioiTinh: value.txt_gioitinh,
        
        NgaySinh: value.txt_ngaysinh,
        DiaChi:value.txt_diachi,
        SDT:value.txt_sdt,
        Email:value.txt_email,
        TrangThai:1
        
      }

    
    if(this.isCreate){
      if(this.file){
        this._api.uploadFileSingle('/api/upload/upload-single','nguoidung',this.file).subscribe((res:any)=>{
          if(res&&res.body&&res.body.filePath){
            obj.nhanvien.AnhSanPham=res.body.filePath;
            this._api.post('/api/admin/create-sanphamsample', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
              }
            });
          }
        })
      }
      else{
        this._api.post('/api/admin/create-nguoidung', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
          }
        });

      }
    }
    else{
      obj.nguoiDung.IdNguoiDung=this.nhanvien.idNguoiDung;
      if(this.file){
        
        this._api.uploadFileSingle('/api/upload/upload-single','nguoidung',this.file).subscribe((res:any)=>{
          if(res&&res.body&&res.body.filePath){
            obj.nguoiDung.AnhDaiDien=res.body.filePath;
            this._api.put('/api/admin/update-nguoidung', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
              }
            });
          }
        })
      }
      else{
        obj.nguoiDung.IdNguoiDung=this.nhanvien.idNguoiDung;
        this._api.put('/api/admin/update-nguoidung', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Có lỗi xảy ra",duration:5000})
          }
        });
      }
      
    }
    
  }


  get hoten() {
    return this.frmNhanVien.get('txt_hoten')!;
  }
  get gioitinh() {
    return this.frmNhanVien.get('txt_gioitinh')!;
  }
  get ngaysinh() {
    return this.frmNhanVien.get('txt_ngaysinh')!;
  }
  get diachi() {
    return this.frmNhanVien.get('txt_diachi')!;
  }
  get sdt() {
    return this.frmNhanVien.get('txt_sdt')!;
  }
  get email() {
    return this.frmNhanVien.get('txt_email')!;
  }

  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }

  public id_danhmuc:any;
  public id_danhmuccha:any;
  public gt:any;
  

  public changeGioiTinh(e:any) {
    console.log(e.target.value);
    this.gt=e.target.value
    console.log(this.gt);
   

  }

}

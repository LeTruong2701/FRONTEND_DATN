import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/common/base-component';
import{NgToastService} from 'ng-angular-popup'

@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent extends BaseComponent implements OnInit {

  public frmDangKy!: FormGroup;



  constructor(injector: Injector,private toast:NgToastService) { 
    super(injector);
    this.frmDangKy = new FormGroup({
      'txt_tenkhachhang': new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20),
        Validators.pattern(/^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/)]),
       'txt_ngaysinh': new FormControl(''),
       'txt_gioitinh': new FormControl(''),
       'txt_diachi': new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
       'txt_sdt': new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
       'txt_email': new FormControl('', [Validators.required,Validators.email,Validators.pattern("^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$")]),
       'txt_username': new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
      'txt_password': new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(15),Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+|\\-=`{}\\[\\]:";\'<>?,./])(?!.*\\s).{8,}$')]),
    });
  }


  ngOnInit() {
  }

  OnSubmit(value:any){
    let obj: any = {};
    obj.TenKhachHang= value.txt_tenkhachhang,
    obj.NgaySinh=value.txt_ngaysinh,
    obj.GioiTinh= value.txt_gioitinh,
    obj.DiaChi=value.txt_diachi,
    obj.SDT=value.txt_sdt,
    obj.Email=value.txt_email,
    obj.UserName=value.txt_username,
    obj.Password=value.txt_password


    this._api.post('/api/userkhachhang/create-userkhachhang', obj).subscribe(res => {
      if (res && res.data) {
        this.toast.success({detail:"Thành Công",summary:"Tạo tài khoản thành công",duration:5000})
        
      } else {
        this.toast.error({detail:"Thất Bại",summary:"Tạo tài khoản thất bại thất bại",duration:5000})
        
      }
    });
    

  }

  get username() {
    return this.frmDangKy.get('txt_username')!;
  }
  get password() {
    return this.frmDangKy.get('txt_password')!;
  }
  get email() {
    return this.frmDangKy.get('txt_email')!;
  }
  get tenkhachhang() {
    return this.frmDangKy.get('txt_tenkhachhang')!;
  }
  get gioitinh() {
    return this.frmDangKy.get('txt_gioitinh')!;
  }
  get ngaysinh() {
    return this.frmDangKy.get('txt_ngaysinh')!;
  }
  get sdt() {
    return this.frmDangKy.get('txt_sdt')!;
  }
  get diachi() {
    return this.frmDangKy.get('txt_diachi')!;
  }


}

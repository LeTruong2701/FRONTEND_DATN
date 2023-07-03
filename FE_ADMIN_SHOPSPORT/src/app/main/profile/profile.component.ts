import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BaseComponent } from 'src/app/core/common/base-component';
import { matchpassword } from 'src/app/core/helpers/matchpassword.validator';
import MatchValidation from 'src/app/core/helpers/must-match.validator';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  public showPassword:any;
  public hienThiModal:any;
  public err:any;

  public nguoidung:any;
  public frmProfile!: FormGroup;
  public frmDoiMatKhau!: FormGroup;
  public okForm: any;

  public user:any;
  public file:any;
  public id_nguoidung:any;

  public user_name:any;
  public hoTen:any;

  public anhdaidien:any;

  constructor(injector: Injector,private toast:NgToastService,private authenticationService: AuthenticationService,private check:MatchValidation) {
    super(injector);

    this.frmProfile = new FormGroup({
      'txt_username': new FormControl(),
       'txt_email': new FormControl(),
       'txt_hoten': new FormControl(),
      'txt_gioitinh': new FormControl(),
      'txt_ngaysinh': new FormControl(),
      'txt_sdt': new FormControl(),
      'txt_diachi': new FormControl(),
    });
   }

  ngOnInit() {
    this.LoadData();

    
  }

  public LoadData(){

    this.user = this.authenticationService.userValue;
    this.id_nguoidung=this.user.idNguoiDung;
    this.user_name=this.user.userName;
    
    console.log(this.id_nguoidung)
    console.log(this.user)

    this._api.get('/api/admin/get-by-id-nguoidung/' + this.id_nguoidung).subscribe(res => {
      this.nguoidung = res;
      this.anhdaidien=this.nguoidung.anhDaiDien;

      // let ngaySinhStr = new Date(this.nguoidung.ngaySinh).toISOString().substring(0, 10);
      let ngaySinhLocal = new Date(this.nguoidung.ngaySinh);
let year = ngaySinhLocal.getFullYear();
let month = ('0' + (ngaySinhLocal.getMonth() + 1)).slice(-2);
let day = ('0' + ngaySinhLocal.getDate()).slice(-2);
let ngaySinhStr = `${year}-${month}-${day}`;
     
      this.hoTen=this.nguoidung.hoTen;
      console.log(res);
      this.frmProfile = new FormGroup({
        'txt_username': new FormControl(this.user_name),
         'txt_email': new FormControl(this.nguoidung.email),
         'txt_hoten': new FormControl(this.nguoidung.hoTen),
        'txt_gioitinh': new FormControl(this.nguoidung.gioiTinh),
        'txt_ngaysinh': new FormControl(ngaySinhStr),
        'txt_sdt': new FormControl(this.nguoidung.sdt),
        'txt_diachi': new FormControl(this.nguoidung.diaChi),
      });
    });
  }

  public modalDoiMatKhau() {

   
    this.hienThiModal = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');

     
      this.frmDoiMatKhau = new FormGroup({
        txt_username: new FormControl(this.user_name,[Validators.required]),
        txt_matkhaucu: new FormControl('',[Validators.required]),
        txt_matkhaumoi: new FormControl('',[Validators.required]),
        txt_nhaplaimatkhaumoi: new FormControl('',[Validators.required]),
        
      },{validators:matchpassword}
      )

      this.okForm = true;
     

    });

    
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader(); // Tạo đối tượng FileReader

      reader.readAsDataURL(event.target.files[0]); // Đọc nội dung file ảnh

      // Xử lý khi đọc xong nội dung của file ảnh
      reader.onload = () => {
          this.file = event.target.files[0]; // Lưu file vào biến file

          // Hiển thị ảnh mới đã chọn
          const imgElement = document.querySelector('.media > img');
          if (imgElement !== null && reader.result !== null) {
              imgElement.setAttribute('src', reader.result.toString());
          }
      };
    }
  }

  SubmitDoiMatKhau(value: any){
    if (this.frmProfile.invalid) {
      this.toast.warning({detail:"Xuất hiện lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }
   
    let obj: any = {};
    obj.UserName= value.txt_username,
    obj.CurentPassword= value.txt_matkhaucu,
    obj.NewPassword=value.txt_matkhaumoi,
        this._api.put('/api/admin/update-password', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData();
          } else {
            this.toast.error({detail:"thất bại",summary:"thất bại",duration:5000})
          }
        },
        err => {
          console.log(err);
          if (err.status === 400) {
            this.toast.error({ detail: "Thất Bại", summary: "Mật khẩu cũ không đúng", duration: 5000 });
          } else {
            this.toast.error({ detail: "Thất Bại", summary: "Có lỗi xảy ra", duration: 5000 });
          }
        }
    )
   
  }




  public togglePassword(id: string, icon: string) {
    let passwordInput: HTMLInputElement | null = document.getElementById(id) as HTMLInputElement;
    console.log(passwordInput);
    let passwordIcon = document.querySelector('#' + icon + ' i');
    console.log(passwordIcon);

  
    if (passwordInput) {
      this.showPassword = !this.showPassword;
  
      if (passwordIcon instanceof HTMLElement) {
        if (this.showPassword) {
          passwordInput.type = 'text';
          passwordIcon.classList.remove('fa-eye');
          passwordIcon.classList.add('fa-eye-slash');
        } else {
          passwordInput.type = 'password';
          passwordIcon.classList.remove('fa-eye-slash');
          passwordIcon.classList.add('fa-eye');
        }
      }
    }
  }

  OnSubmit(value: any) {
    if (this.frmProfile.invalid) {
      this.toast.warning({detail:"Xuất hiện lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }

    let obj: any = {};
    obj.HoTen= value.txt_hoten,
    obj.GioiTinh= value.txt_gioitinh,
        
    obj.NgaySinh=value.txt_ngaysinh,
    obj.DiaChi=value.txt_diachi,
    obj.SDT=value.txt_sdt,
    obj.Email=value.txt_email,
    
    
    obj.IdNguoiDung=this.id_nguoidung;

    if(this.file){
        this._api.uploadFileSingle('/api/upload/upload-single', 'nguoidung', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.AnhDaiDien=res.body.filePath;
            this._api.put('/api/admin/update-nguoidung', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
                this.LoadData();
              } else {
                this.toast.error({detail:"Thất Bại",summary:"Cập nhật thất bại",duration:5000})

              }
            });
          }
        });

      }else{
        obj.AnhDaiDien=this.anhdaidien;
        this._api.put('/api/admin/update-nguoidung', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Cập nhật thất bại",duration:5000})

          }
        });
      }
      
  }
    

  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }

    

  get username() {
    return this.frmProfile.get('txt_username')!;
  }
  get email() {
    return this.frmProfile.get('txt_email')!;
  }
  get hoten() {
    return this.frmProfile.get('txt_hoten')!;
  }
  get gioitinh() {
    return this.frmProfile.get('txt_gioitinh')!;
  }
  get ngaysinh() {
    return this.frmProfile.get('txt_ngaysinh')!;
  }
  get sdt() {
    return this.frmProfile.get('txt_sdt')!;
  }
  get diachi() {
    return this.frmProfile.get('txt_diachi')!;
  }

  get matkhaucu() {
    return this.frmDoiMatKhau.get('txt_matkhaucu')!;
  }

  get matkhaumoi() {
    return this.frmDoiMatKhau.get('txt_matkhaumoi')!;
  }

  get nhaplaimatkhaumoi() {
    return this.frmDoiMatKhau.get('txt_nhaplaimatkhaumoi')!;
  }

  public gt:any;
  

  public changeGioiTinh(e:any) {
    console.log(e.target.value);
    this.gt=e.target.value
    console.log(this.gt);
   

  }



}

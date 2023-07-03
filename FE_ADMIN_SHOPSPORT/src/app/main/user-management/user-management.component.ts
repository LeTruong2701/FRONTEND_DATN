import { Role } from './../../entities/role';
import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import MatchValidation from 'src/app/core/helpers/must-match.validator';
declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent extends BaseComponent implements OnInit {
  public list_users: any;
  public user:any;
  public frmUser!: FormGroup;
  public frmUserUpdate!: FormGroup;
  public frmSearch!: FormGroup;
  public file: any;

  public id_trangthai:any;
  public tenkhachhang:any;

  public id_NguoiDung:any;
  public idNguoiDung:any;

  public idUser:any;

  public hienThiModal: any;
  public hienthiModalSua:any;
  public okForm: any;
  public isCreate = false;

  public chooseRole: any[] = [];

  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_user': new FormControl('', [])
      
    });
  }


  ngOnInit(): void {
    this.LoadData(this.pageSize);
  }


  public page: any = 1;
  public id: any;
  public pageSize: any = 3;
  public tongsp!:number;
  public listNguoiDung!:any;
  public listRole!:any;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-user', {  page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_users = res.data;
      this.tongsp = res.totalItem;
      console.log(this.tongsp)
    });
  }


  public LoadData(pageSize:any) {
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-user', { page: this.page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_user']}).subscribe(res => {
      this.list_users = res.data;
      this.tongsp = res.totalItem;

      console.log(this.list_users);
      
    });

     //lấy list nguoidung
     this._api.get('/api/admin/get-listnguoidung').subscribe(res => {
      this.listNguoiDung = res;
      console.log(res);
    }); 

    //lấy list role
    this._api.get('/api/admin/get-listrole').subscribe(res => {
      this.listRole = res;
      console.log(res);
    }); 

  }
  // public LoadData() {
  //   this._api.post('/api/user/search', { page: 1, pageSize: 10,hoten: this.frmSearch.value['txt_hoten']}).subscribe(res => {
  //     this.list_users = res.data;
  //     // setTimeout(() => {
  //     //   this.loadScripts(
  //     //     'assets/js/core/app.js',
  //     //     'assets/js/pages/datatables_basic.js',
  //     //     'assets/js/pages/datatables_basic.js'
  //     //   );
  //     // });
  //   });
  // }

  get username() {
    return this.frmUser.get('txt_username')!;
  }

  get password() {
    return this.frmUser.get('txt_password')!;
  }

  get email() {
    return this.frmUser.get('txt_email')!;
  }

  get idnguoidung(){
    return this.frmUser.get('txt_idnguoidung')!;
  }
//form update user
get us() {
  return this.frmUserUpdate.get('txt_us')!;
}

get pw() {
  return this.frmUserUpdate.get('txt_pw')!;
}

get em() {
  return this.frmUserUpdate.get('txt_em')!;
}

get idnd(){
  return this.frmUserUpdate.get('txt_idnd')!;
}

  public themModal() {

    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');

      this.frmUser = new FormGroup({
        'txt_username': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        'txt_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        'txt_idnguoidung': new FormControl('', [Validators.required]),
        'txt_role': new FormControl(''),
        
        'txt_email': new FormControl('', [Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
        
      }); 
      this.okForm = true;

    });
  }


  // public suaModal(id: any){

  //   console.log(id);
    
   
  //   this.hienThiModal=true;
  //   this.okForm=false;
  //   this.isCreate=false;
  //   setTimeout(() => {
  //     $('#hienthiModal').modal('toggle');
  //     this._api.get('/api/admin/get-by-id-user/' + id).subscribe(res => {
  //       this.user = res;
  //       this.id_NguoiDung=this.user.idNguoiDung;

  //       this.chooseRole=this.user.roles
  //       console.log(this.chooseRole);

  //       this.user.roles = this.user.roles || [];
  //       console.log(this.user.roles)



  //       console.log(this.user);
  //       this.frmUser = new FormGroup({
  //       'txt_username': new FormControl(this.user.userName, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  //       'txt_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  //       'txt_idnguoidung': new FormControl(this.user.idNguoiDung, [Validators.required]),
        
  //       'txt_email': new FormControl(this.user.email, [Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
  //       }),

  //       this.okForm=true;
  //     });
  //   });
  // }
  public suaModal(id: any){

    console.log(id);
    
   
    this.hienthiModalSua=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModalSua').modal('toggle');

      


      this._api.get('/api/admin/get-by-id-user/' + id).subscribe(res => {
        this.user = res;
        this.idUser=this.user.id;
        this.idNguoiDung=this.user.idNguoiDung;
        this.id_trangthai=this.user.trangThai;
        console.log(this.id_trangthai);


        this.chooseRole=this.user.roles
        console.log(this.chooseRole);

        this.user.roles = this.user.roles || [];
        console.log(this.user.roles)



        let idkh=this.user.idKhachHang

        this._api.get('/api/admin/get-khachhang-by-idkhachhang/'+idkh).subscribe(res => {
           this.tenkhachhang = res.tenKhachHang;
          console.log(res.tenKhachHang);
          console.log(this.tenkhachhang);
        }); 


        console.log(this.user);
        this.frmUserUpdate = new FormGroup({
        'txt_us': new FormControl(this.user.userName, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        
        'txt_idnd': new FormControl(this.user.idNguoiDung, [Validators.required]),
        'txt_tenkhachhang': new FormControl(this.tenkhachhang),
        'txt_trangthai': new FormControl(this.id_trangthai),
        'txt_role': new FormControl(''),

        
        'txt_em': new FormControl(this.user.email, [Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
        }),

        this.okForm=true;
      });
    });
  }




  public xoaModal(UserName: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
      this._api.delete('/api/admin/delete-user/' +UserName).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
        
      });
    }else{}
  }


  // public xoaNSX(IdNhaCungCap: any) {
  //   this._api.delete('/api/admin/delete-nhacungcap/' +IdNhaCungCap).subscribe(res => {
  //     alert('Xóa dữ liệu thành công');
  //     this.LoadData();
  //     console.log(IdNhaCungCap);
  //   });
  // }a


  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
    $('#hienthiModalSua').closest('.modal').modal('hide');
    this.tenkhachhang=null;
    this.id_trangthai=null;
  }



  ngAfterViewInit() {
    // this.loadScripts('assets/js/core/app.js', 'assets/js/pages/form_layouts.js');
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }



  OnSubmit(vl: any) {

    
    const requiredFields = [ 'txt_username','txt_password', 'txt_idnguoidung','txt_email','txt_role'];

    for (let field of requiredFields) {
      if (!vl[field]) {
          if(field === 'txt_username') {
              alert(`Vui lòng nhập UserName`);
          } else if (field === 'txt_password')
          {
              alert(`Vui lòng nhập Password`);
          } else if (field === 'txt_idnguoidung')
          {
              alert(`Vui lòng chọn Người sở hữu tài khoản`);
          }  else if (field === 'txt_email')
          {
              alert(`Vui lòng nhập Email`);
          } else if (field === 'txt_role')
          {
              alert(`Vui lòng nhập Role`);
          }
          return;
      }
  }

    // console.log(this.findInvalidControls())
    if (this.frmUser.invalid) {
      return;
    }

    let obj: any = {};
    
    obj.UserName= vl.txt_username,
    obj.Password= vl.txt_password,
    obj.IdNguoiDung= parseInt(this.id_nguoidung),
    obj.Email= vl.txt_email,
    obj.Roles=this.chooseRole

    console.log(this.id_nguoidung)

   
    if (this.isCreate) {
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'user', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.nguoidung.Avatar = res.body.filePath;
            this._api.post('/api/user/create-user', obj).subscribe(res => {
              if (res && res.data) {
                alert('Thêm dữ liệu thành công');
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.post('/api/admin/create-user', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thêm tài khoản thành công",summary:"",duration:5000});
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            alert('Có lỗi')
          }
        }, error => {
          console.log(error.error)
          if (error.error.error == 'Username đã tồn tại') {
            this.toast.info({detail:"UserName đã tồn tại",summary:"Vui lòng nhập UserName khác",duration:5000});
           
          }else if (error.error.error == 'Email đã có người sử dụng') {
            
            this.toast.warning({detail:"Email đã có người sử dụng",summary:"",duration:5000});
          }else if (error.error.error == 'Người dùng đã có tài khoản') {
            
            this.toast.warning({detail:"Người dùng đã có tài khoản",summary:"Chọn người dùng khác",duration:5000});
          }
        }
        
        
        );
      }
    } else {
      obj.nguoidung.IdNguoiDung = this.user.idNguoiDung;
      obj.taikhoan.IdNguoiDung = this.user.idNguoiDung;
      if(true) {
        this._api.put('/api/admin/update-user', obj).subscribe(res => {
          if (res && res.data) {
            alert('Cập nhật dữ liệu thành công');
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            alert('Có lỗi')
          }
        }, error => {
          console.log(' heloooo')
          console.log(error)
          if (error.error.error == 'Username đã tồn tại') {
            this.toast.info({detail:"UserName đã tồn tại",summary:"Vui lòng nhập UserName khác",duration:5000});
           
          }else if (error.error == 'Email đã có người sử dụng') {
            
            this.toast.warning({detail:"Email đã có người sử dụng",summary:"",duration:5000});
          }else if (error.error == 'Người dùng đã có tài khoản') {
            
            this.toast.warning({detail:"Người dùng đã có tài khoản",summary:"Chọn người dùng khác",duration:5000});
          }
        }
        
        
        
        );
      }
    }

  }

  //submit sửa modal
  OnSubmitUpdate(vl: any) {
    // console.log(this.findInvalidControls())
    // if (this.frmUserUpdate.invalid) {
    //   return;
    // }
    let obj: any = {};
    obj.Id=this.idUser,
    
    obj.UserName= vl.txt_us,
   
    obj.IdNguoiDung= parseInt(this.idNguoiDung),
    obj.Email= vl.txt_em,
    obj.Roles=this.chooseRole,
    
    obj.TrangThai=parseInt(this.id_trangthai)
    
   
     if(true) {
      
     
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'user', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.nguoidung.Avatar = res.body.filePath;
            this._api.post('/api/user/update-user', obj).subscribe(res => {
              if (res && res.data) {
                alert('Cập nhật dữ liệu thành công');
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        this._api.put('/api/admin/update-user', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Cập nhật thành công",summary:"",duration:5000});
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            alert('Có lỗi')
          }
        }, error => {
          
          console.log(error.error)
          if (error.error.error == 'Username đã tồn tại') {
            this.toast.info({detail:"UserName đã tồn tại",summary:"Vui lòng nhập UserName khác",duration:5000});
           
          }else if (error.error.error == 'Email đã có người sử dụng') {
            
            this.toast.warning({detail:"Email đã có người sử dụng",summary:"",duration:5000});
          }else if (error.error.error == 'Người dùng đã có tài khoản') {
            
            this.toast.warning({detail:"Người dùng đã có tài khoản",summary:"Chọn người dùng khác",duration:5000});
          }
        }
        
        
        );
      }
    }

  }

  public id_nguoidung:any;

  public changeNguoiDung(e:any) {
    console.log(e.target.value);
    this.id_nguoidung=e.target.value

    console.log(this.id_nguoidung)
  }

  onChange(event:any, role:any) {
    if (event.target.checked) {
        this.chooseRole.push(role);
    } else {
        const index = this.chooseRole.findIndex(item => item === role);
        if (index !== -1) {
            this.chooseRole.splice(index, 1);
        }
    }

    console.log(this.chooseRole)
  }

  public changeTrangThai(e:any) {
    console.log(e.target.value);
    this.id_trangthai=e.target.value
    console.log(this.id_trangthai);
  
  }

}

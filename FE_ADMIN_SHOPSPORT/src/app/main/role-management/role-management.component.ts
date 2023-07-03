import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BaseComponent } from 'src/app/core/common/base-component';

declare var $: any;

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent extends BaseComponent implements OnInit {

  public list_roles: any;
  public role:any;
  public frmRole!: FormGroup;
  public frmSearch!: FormGroup;
  public file: any;


  public hienThiModal: any;
  public hienthiModalSua:any;
  public okForm: any;
  public isCreate = false;

  public chooseRole: any[] = [];

  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tenrole': new FormControl('', [])
      
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
    this._api.post('/api/admin/search-role', {  page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_roles = res.data;
      this.tongsp = res.totalItem;
      console.log(this.tongsp)
    });
  }


  public LoadData(pageSize:any) {
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-role', { page: this.page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tenrole']}).subscribe(res => {
      this.list_roles = res.data;
      this.tongsp = res.totalItem;

      console.log(this.list_roles);
      
    });

  

  }
 

  get name() {
    return this.frmRole.get('txt_name')!;
  }

  get description() {
    return this.frmRole.get('txt_description')!;
  }

  
  public themModal() {

    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');

      this.frmRole = new FormGroup({
        'txt_name': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
        'txt_description': new FormControl(''),
        
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
  //     $('#hienThiModal').modal('toggle');
  //     this._api.get('/api/admin/get-by-id-role/' + id).subscribe(res => {
  //       this.role = res;
        
  //       this.frmRole = new FormGroup({
  //         'txt_name': new FormControl(this.role.name, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
  //         'txt_description': new FormControl(this.role.description),
  //       }),

  //       this.okForm=true;
  //     });
  //   });
  // }
  public suaModal(idDanhMuc: any){
 
    this.hienThiModal=true;
   
   
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-role/' + idDanhMuc).subscribe(res => {
        this.role = res;
        
        console.log(res);
        this.frmRole = new FormGroup({
          'txt_name': new FormControl(this.role.name, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
        'txt_description': new FormControl(this.role.description),
        });

        this.okForm=true;
      });
    });
  }




  public xoaModal(name: any) {
    if(confirm('Bạn có chắc chắn muốn xóa role này không?')){
      this._api.delete('/api/admin/delete-role/' +name).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
        
      });
    }else{}
  }





  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }


  public pwdCheckValidator(control: any) {
    var filteredStrings = { search: control.value, select: '@#!$%&*' }
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if (control.value.length < 6 || !result) {
      return { matkhau: true };
    } else {
      return null;
    }
  }

  ngAfterViewInit() {
   
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmRole.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


  OnSubmit(vl: any) {
    console.log(this.findInvalidControls())
    if (this.frmRole.invalid) {
      return;
    }
    let obj: any = {};
    
    obj.Name= vl.txt_name,
    obj.Description= vl.txt_description

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
        this._api.post('/api/admin/create-role', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    } else {     
      obj.Id = this.role.id;
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'user', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.Avatar = res.body.filePath;
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
        this._api.put('/api/admin/update-role', obj).subscribe(res => {
          if (res && res.data) {
            alert('Cập nhật dữ liệu thành công');
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    }
  }


}

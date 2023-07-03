import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
declare var $: any;
import{NgToastService} from 'ng-angular-popup'
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.css']
})
export class NhacungcapComponent extends BaseComponent implements OnInit {


  public p!:number;
  
  public list_nhacungcaps: any;
  public nhacungcap:any;
  public frmNhacungcap!: FormGroup;
  public frmSearch!: FormGroup;

  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;


  constructor(injector: Injector,private toast:NgToastService,private authenticationService:AuthenticationService) { 
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tennhacungcap': new FormControl('', [])
      
    });
  }
  public user = this.authenticationService.userValue;

  ngOnInit() {
   
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
    this._api.post('/api/admin/search-nhacungcap', {  page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_nhacungcaps = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem)
    });
  }

  public LoadData(pageSize:any) {
    this._api.post('/api/admin/search-nhacungcap', { page: 1, pageSize: 10,ten: this.frmSearch.value['txt_tennhacungcap']}).subscribe(res => {
      this.list_nhacungcaps = res.data;
      this.totalItem = res.totalItem;
      console.log(res);
      
    });
  }



  public themModal() {
    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      this.frmNhacungcap = new FormGroup({
        'txt_tennhacungcap': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
        'txt_diachi': new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(100)]),
        'txt_sdt': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        'txt_email': new FormControl('', [Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])
      })
      this.okForm = true;

    });
  }



  public suaModal(idNhaCungCap: any){

    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-nhacungcap/' + idNhaCungCap).subscribe(res => {
        this.nhacungcap = res;
        console.log(res);
        this.frmNhacungcap = new FormGroup({
          'txt_tennhacungcap': new FormControl(this.nhacungcap.tenNhaCungCap, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
          'txt_diachi': new FormControl(this.nhacungcap.diaChi, [Validators.required]),
          'txt_sdt': new FormControl(this.nhacungcap.sdt, [Validators.required]),
          'txt_email': new FormControl(this.nhacungcap.email, [Validators.required]),
        });

        this.okForm=true;
      });
    });
  }

  public xoaNSX(IdNhaCungCap: any) {
    this._api.delete('/api/admin/delete-nhacungcap/' +IdNhaCungCap).subscribe(res => {
      this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
      this.LoadData(this.pageSize);
      console.log(IdNhaCungCap);
    });
  }


  get tennhacungcap() {
    return this.frmNhacungcap.get('txt_tennhacungcap')!;
  }
  get diachi() {
    return this.frmNhacungcap.get('txt_diachi')!;
  }
  get sdt() {
    return this.frmNhacungcap.get('txt_sdt')!;
  }

  get email() {
    return this.frmNhacungcap.get('txt_email')!;
  }




  OnSubmit(value: any) {

    const requiredFields = [ 'txt_tennhacungcap', 'txt_diachi','txt_sdt','txt_email'];

    for (let field of requiredFields) {
      if (!value[field]) {
          if(field === 'txt_tennhacungcap') {
              alert(`Vui lòng nhập giá trị cho trường Tên nhà cung cấp.`);
          } else if (field === 'txt_diachi')
          {
              alert(`Vui lòng nhập giá trị cho trường Địa chỉ`);
          } else if (field === 'txt_sdt')
          {
              alert(`Vui lòng nhập giá trị cho trường SĐT`);
          } else if (field === 'txt_email')
          {
              alert(`Vui lòng nhập giá trị cho trường Email`);
          } 
          
          return;
      }
    }
    if (this.frmNhacungcap.invalid) {
      this.toast.warning({detail:"Có lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }
    let obj: any = {};
    obj.nhacungcap = {
      TenNhaCungCap: value.txt_tennhacungcap,
      DiaChi: value.txt_diachi,
      Sdt: value.txt_sdt,
      Email: value.txt_email
      
    }
   
    if(this.isCreate){
      this._api.postAuthor('/api/admin/create-nhacungcap', obj,this.user.token).subscribe(res => {
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
      obj.nhacungcap.IdNhaCungCap=this.nhacungcap.idNhaCungCap;
      this._api.put('/api/admin/update-nhacungcap', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất bại",summary:"Cập nhật thất bại",duration:5000})
          }
        });
    }
  }

  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }

  ngAfterViewInit(): void {
      
  }

}

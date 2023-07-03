import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-nhasanxuat',
  templateUrl: './nhasanxuat.component.html',
  styleUrls: ['./nhasanxuat.component.css']
})
export class NhasanxuatComponent extends BaseComponent implements OnInit,AfterViewInit {

  public p!:number;
  public list_nhasanxuats: any;
  public nhasanxuat:any;
  public frmNhasanxuat!: FormGroup;
  public frmSearch!: FormGroup;

  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;




  constructor(injector: Injector) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tennhasanxuat': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData();
    this.frmSearch = new FormGroup({
      'txt_tennhasanxuat': new FormControl('', []),
      
    });
  }

  // public LoadData() {
  //   this._api.get("/api/admin/getall-nhasanxuat").subscribe(res => {
  //     this.list_nhasanxuats = res;
  //     console.log(res);
  //   });
  // }

  public LoadData() {
    this._api.post('/api/admin/search-nhasanxuat', { ten: this.frmSearch.value['txt_tennhasanxuat']}).subscribe(res => {
      this.list_nhasanxuats = res.data;
      console.log(res);
      
    });
  }



  public themModal() {
    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      this.frmNhasanxuat = new FormGroup({
        'txt_tennhasanxuat': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_mota': new FormControl('', [Validators.required]),
        
      })
      this.okForm = true;

    });
  }



  public suaModal(idNhaSanXuat: any){

    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-nhasanxuat/' + idNhaSanXuat).subscribe(res => {
        this.nhasanxuat = res;
        console.log(res);
        this.frmNhasanxuat = new FormGroup({
          'txt_tennhasanxuat': new FormControl(this.nhasanxuat.tenNhaSanXuat, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
          'txt_mota': new FormControl(this.nhasanxuat.moTa, [Validators.required]),
        });

        this.okForm=true;
      });
    });
  }

  public xoaNSX(IdNhaSanXuat: any) {
    this._api.delete('/api/admin/delete-nhasanxuat/' +IdNhaSanXuat).subscribe(res => {
      alert('Xóa dữ liệu thành công');
      this.LoadData();
      console.log(IdNhaSanXuat);
    });
  }


  get tennhasanxuat() {
    return this.frmNhasanxuat.get('txt_tennhasanxuat')!;
  }
  get mota() {
    return this.frmNhasanxuat.get('txt_tennhasanxuat')!;
  }



  OnSubmit(value: any) {
    if (this.frmNhasanxuat.invalid) {
      alert('Form chưa đúng định dạng')
      return;
    }
    let obj: any = {};
    obj.nhasanxuat = {
      TenNhaSanXuat: value.txt_tennhasanxuat,
      MoTa: value.txt_mota,
      
    }
    if(this.isCreate){
      this._api.post('/api/admin/create-nhasanxuat', obj).subscribe(res => {
        if (res && res.data) {
          alert('Thêm dữ liệu thành công');
          this.LoadData();
          this.dongModal();
        } else {
          alert('Có lỗi')
        }
      });
    }
    else{
      obj.nhasanxuat.IdNhaSanXuat=this.nhasanxuat.idNhaSanXuat;
      this._api.put('/api/admin/update-nhasanxuat', obj).subscribe(res => {
          if (res && res.data) {
            alert('Cập nhật dữ liệu thành công');
            this.LoadData();
            this.dongModal();
          } else {
            alert('Có lỗi')
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

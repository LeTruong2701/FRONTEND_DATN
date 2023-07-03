import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
declare var $: any;
@Component({
  selector: 'app-kho',
  templateUrl: './kho.component.html',
  styleUrls: ['./kho.component.css']
})
export class KhoComponent extends BaseComponent implements  OnInit {

  public p!:number;
  public list_khos: any;
  public kho:any;

  public list_chitietkhos:any;
  public frmChiTietKho!: FormGroup;
  public frmSearch!: FormGroup;

  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;




  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tenkho': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tensanpham': new FormControl('', []),
      
    });
  }

  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public totalItem!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-kho', {  page: page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tensanpham']}).subscribe(res => {
      this.list_khos = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem)
    });
  }

  public LoadData(pageSize:any) {
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-kho', {page:this.page,pageSize:this.pageSize ,ten: this.frmSearch.value['txt_tensanpham']}).subscribe(res => {
      this.list_khos = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem);
      console.log(this.list_khos);
      
    });
  }



  public themModal() {
    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      
      this.okForm = true;

    });
  }



  public xemChiTiet(idKho: any){

    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-chitiet-kho-by-id/' + idKho).subscribe(res => {
        this.list_chitietkhos = res.data;
        console.log(res);
        

        this.okForm=true;
      });
    });
  }

  public xoaDM(IdDanhMuc: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
      this._api.delete('/api/admin/delete-danhmuc/' +IdDanhMuc).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
        
      });
    }else{}
  }

  // public xoaNSX(IdNhaSanXuat: any) {
  //   this._api.delete('/api/admin/delete-nhasanxuat/' +IdNhaSanXuat).subscribe(res => {
  //     alert('Xóa dữ liệu thành công');
  //     this.LoadData();
  //     console.log(IdNhaSanXuat);
  //   });
  // }


  // get tennhasanxuat() {
  //   return this.frmNhasanxuat.get('txt_tennhasanxuat')!;
  // }
  // get mota() {
  //   return this.frmNhasanxuat.get('txt_tennhasanxuat')!;
  // }



  OnSubmit(value: any) {
    // if (this.frmNhasanxuat.invalid) {
    //   alert('Form chưa đúng định dạng')
    //   return;
    // }
    // let obj: any = {};
    // obj.nhasanxuat = {
    //   TenNhaSanXuat: value.txt_tennhasanxuat,
    //   MoTa: value.txt_mota,
      
    // }
    // if(this.isCreate){
    //   this._api.post('/api/admin/create-nhasanxuat', obj).subscribe(res => {
    //     if (res && res.data) {
    //       alert('Thêm dữ liệu thành công');
    //       this.LoadData();
    //       this.dongModal();
    //     } else {
    //       alert('Có lỗi')
    //     }
    //   });
    // }
    // else{
    //   obj.nhasanxuat.IdNhaSanXuat=this.nhasanxuat.idNhaSanXuat;
    //   this._api.put('/api/admin/update-nhasanxuat', obj).subscribe(res => {
    //       if (res && res.data) {
    //         alert('Cập nhật dữ liệu thành công');
    //         this.LoadData();
    //         this.dongModal();
    //       } else {
    //         alert('Có lỗi')
    //       }
    //     });
    // }
    
  }

  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }

  ngAfterViewInit(): void {
      
  }


}

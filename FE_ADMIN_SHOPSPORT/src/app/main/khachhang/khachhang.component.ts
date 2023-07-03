import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachhangComponent extends BaseComponent implements OnInit {

  public list_khachhangs: any;
  public khachhang:any;
  public frmKhachhang!: FormGroup;
  public frmSearch!: FormGroup;


  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;

  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tenkhachhang': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tenkhachhang': new FormControl('', []),
      
    });
  }


  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public tongsp!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-khachhang', {  page: page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tenkhachhang']}).subscribe(res => {
      this.list_khachhangs = res.data;
      this.tongsp = res.totalItem;
      console.log(this.tongsp)
    });
  }


  public LoadData(pageSize:any) {
    
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-khachhang', { page: this.page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tenkhachhang']}).subscribe(res => {
      this.list_khachhangs = res.data;
      this.tongsp = res.totalItem;

      console.log(this.list_khachhangs);   
    });

  }
  public xoaKH(IdKhachhang: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
      this._api.delete('/api/admin/delete-khachhang/' +IdKhachhang).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
        
      });
    }else{}
  }


}

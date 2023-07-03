import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BaseComponent } from 'src/app/core/common/base-component';
declare var $: any;

@Component({
  selector: 'app-thuonghieu',
  templateUrl: './thuonghieu.component.html',
  styleUrls: ['./thuonghieu.component.css']
})
export class ThuonghieuComponent extends BaseComponent implements OnInit {

  public list_thuonghieus: any;
  public thuonghieu:any;
  public frmThuongHieu!: FormGroup;
  public frmSearch!: FormGroup;


  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;




  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tenthuonghieu': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tenthuonghieu': new FormControl('', []),
      
    });
  }

  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public tongsp!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-thuonghieu', {  page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_thuonghieus = res.data;
      this.tongsp = res.totalItem;
      console.log(this.tongsp)
    });
  }


  public LoadData(pageSize:any) {
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-thuonghieu', { page: this.page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tenthuonghieu']}).subscribe(res => {
      this.list_thuonghieus = res.data;
      this.tongsp = res.totalItem;

      console.log(res);
      
    });

   
  }



  public themModal() {

    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');

      this.frmThuongHieu = new FormGroup({
        'txt_tenthuonghieu': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
       
        'txt_mota': new FormControl('',[Validators.required]),
        'txt_trangthai': new FormControl('',[Validators.required]),
        // 'txt_trangthai': new FormControl('', [Validators.required]),
        
      })
      this.okForm = true;

    });
  }



  public suaModal(idThuongHieu: any){
 
    this.hienThiModal=true;
   
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-thuonghieu/' + idThuongHieu).subscribe(res => {
        this.thuonghieu = res;
       
        this.id_trangthai=res.trangThai;
        
        console.log(res);
        this.frmThuongHieu = new FormGroup({
          'txt_tenthuonghieu': new FormControl(this.thuonghieu.tenThuongHieu, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
       
          'txt_mota': new FormControl(this.thuonghieu.moTa,[Validators.required]),
          'txt_trangthai': new FormControl(this.thuonghieu.trangThai,[Validators.required]),
        });

        this.okForm=true;
      });
    });
  }

  public xoaDM(IdThuongHieu: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){
      this._api.delete('/api/admin/delete-thuonghieu/' +IdThuongHieu).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
        
      });
    }else{}
  }


  get tenthuonghieu() {
    return this.frmThuongHieu.get('txt_tenthuonghieu')!;
  }
  get trangthai() {
    return this.frmThuongHieu.get('txt_trangthai')!;
  }

  get mota() {
    return this.frmThuongHieu.get('txt_mota')!;
  }



  OnSubmit(value: any) {
    if (this.frmThuongHieu.invalid) {
      this.toast.warning({detail:"Xuất hiện lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }
    let obj: any = {};
    obj.thuonghieu = {
     
      TenThuongHieu: value.txt_tenthuonghieu,
      MoTa: value.txt_mota,
      TrangThai: parseInt(this.id_trangthai),
      
    }
    if(this.isCreate){
      this._api.post('/api/admin/create-thuonghieu', obj).subscribe(res => {
        if (res && res.data) {
          this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
          this.LoadData(this.pageSize);
          this.dongModal();
        } else {
          this.toast.error({detail:"Thất Bại",summary:"Xảy ra lỗi",duration:5000})
        }
      });
    }
    else{
      obj.thuonghieu.IdThuongHieu=this.thuonghieu.idThuongHieu;
      this._api.put('/api/admin/update-thuonghieu', obj).subscribe(res => {
          if (res && res.data) {
           this.toast.success({detail:"Thành công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Xảy ra lỗi",duration:5000})
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

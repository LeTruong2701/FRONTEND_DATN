import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
declare var $: any;
import{NgToastService} from 'ng-angular-popup'

@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent extends BaseComponent implements OnInit {

  public list_danhmucs: any;
  public danhmuc:any;
  public frmDanhmuc!: FormGroup;
  public frmSearch!: FormGroup;


  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;




  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tendanhmuc': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tendanhmuc': new FormControl('', []),
      
    });
  }

  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public tongsp!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-danhmuc', {  page: page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tendanhmuc']}).subscribe(res => {
      this.list_danhmucs = res.data;
      this.tongsp = res.totalItem;
      console.log(this.tongsp)
    });
  }


  public LoadData(pageSize:any) {
    
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-danhmuc', { page: this.page, pageSize: this.pageSize,ten: this.frmSearch.value['txt_tendanhmuc']}).subscribe(res => {
      this.list_danhmucs = res.data;
      this.tongsp = res.totalItem;

      console.log(this.list_danhmucs);   
    });

    //get danh mục cha
    this._api.get('/api/admin/get-danhmuclon').subscribe(res => {
      this.listDanhMucLon = res;
      console.log(res);
    }); 
  }



  public themModal() {
   
    

    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');

      this.frmDanhmuc = new FormGroup({
        'txt_tendanhmuc': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_danhmuccha': new FormControl(''),
        'txt_mota': new FormControl(''),
        'txt_trangthai': new FormControl('',[Validators.required]),
        // 'txt_trangthai': new FormControl('', [Validators.required]),
        
      })
      this.okForm = true;

    });
  }



  public suaModal(idDanhMuc: any){
 
    this.hienThiModal=true;
   
   
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-danhmuc/' + idDanhMuc).subscribe(res => {
        this.danhmuc = res;
        this.id_danhmuccha=res.idDanhMucCha;
        this.id_trangthai=res.trangThai;
        
        console.log(res);
        this.frmDanhmuc = new FormGroup({
          'txt_tendanhmuc': new FormControl(this.danhmuc.tenDanhMuc, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
           'txt_danhmuccha': new FormControl(),
           'txt_mota': new FormControl(this.danhmuc.moTa),
          'txt_trangthai': new FormControl(this.danhmuc.trangThai),
        });

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


  get tendanhmuc() {
    return this.frmDanhmuc.get('txt_tendanhmuc')!;
  }
  get trangthai() {
    return this.frmDanhmuc.get('txt_trangthai')!;
  }
  get danhmuccha() {
    return this.frmDanhmuc.get('txt_danhmuccha')!;
  }
  get mota() {
    return this.frmDanhmuc.get('txt_mota')!;
  }



  OnSubmit(value: any) {

    const requiredFields = [ 'txt_tendanhmuc', 'txt_trangthai'];

    for (let field of requiredFields) {
      if (!value[field]) {
          if(field === 'txt_tendanhmuc') {
              alert(`Vui lòng nhập giá trị cho trường Tên danh mục.`);
          } else if (field === 'txt_trangthai')
          {
              alert(`Vui lòng nhập giá trị cho trường Trạng thái`);
          } 
          
          return;
      }
    }


    if (this.frmDanhmuc.invalid) {
      this.toast.warning({detail:"Xuất hiện lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }
    let obj: any = {};
    obj.danhmuc = {
      IdDanhMucCha:  parseInt(this.id_danhmuccha),
      TenDanhMuc: value.txt_tendanhmuc,
      TrangThai: parseInt(this.id_trangthai),
      MoTa: value.txt_mota,
      
    }
    if(this.isCreate){
      this._api.post('/api/admin/create-danhmuc', obj).subscribe(res => {
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
      obj.danhmuc.IdDanhMuc=this.danhmuc.idDanhMuc;
      this._api.put('/api/admin/update-danhmuc', obj).subscribe(res => {
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




  public id_danhmuc:any;
  public id_danhmuccha:any;
  public id_trangthai:any;
  

  public listDanhMucLon:any;


  public changeDanhMucLon(e:any) {
    console.log(e.target.value);
    this.id_danhmuccha=e.target.value

    console.log(this.id_danhmuccha);
    

  }

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

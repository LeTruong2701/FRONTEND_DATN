import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-giasanpham',
  templateUrl: './giasanpham.component.html',
  styleUrls: ['./giasanpham.component.css']
})
export class GiasanphamComponent extends BaseComponent implements OnInit {

  public p!:number;
  public list_giasanphams: any;
  public giasanpham:any;
  public frmGiasanpham!: FormGroup;
  public frmSearch!: FormGroup;

  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;




  constructor(injector: Injector) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tensanpham': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData();
    this.frmSearch = new FormGroup({
      'txt_tensanpham': new FormControl('', []),
      
    });
  }

  // public LoadData() {
  //   this._api.get("/api/admin/getall-nhasanxuat").subscribe(res => {
  //     this.list_nhasanxuats = res;
  //     console.log(res);
  //   });
  // }

  public LoadData() {
    this._api.post('/api/admin/search-tensanpham', {ten: this.frmSearch.value['txt_tensanpham']}).subscribe(res => {
      this.list_giasanphams = res.data;
      console.log(res);
      
    });
  }



  // public themModal() {
  //   this.hienThiModal = true;
  //   this.isCreate = true;
  //   setTimeout(() => {
  //     $('#hienthiModal').modal('toggle');


  //     this.frmGiasanpham = new FormGroup({
  //       'txt_ten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
  //       'txt_mota': new FormControl('', [Validators.required]),
        
  //     })
  //     this.okForm = true;

  //   });
  // }



  public suaModal(idGiaSanPham: any){

    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-gia-by-idgiasanpham/' + idGiaSanPham).subscribe(res => {
        this.giasanpham = res;
        console.log(res);
        this.frmGiasanpham = new FormGroup({
          'txt_gia': new FormControl(this.giasanpham.gia, [Validators.required, Validators.min(100000)]),
          'txt_ngaybatdau': new FormControl('', [Validators.required]),
          'txt_ngayketthuc': new FormControl(''),
          // 'txt_mota': new FormControl(this.nhasanxuat.moTa, [Validators.required]),
        });
        this.frmGiasanpham.get('txt_ngaybatdau')?.patchValue(this.formatDate(new Date(this.giasanpham.ngayBatDau)));
        this.frmGiasanpham.get('txt_ngayketthuc')?.patchValue(this.formatDate(new Date(this.giasanpham.ngayKetThuc)));

        this.okForm=true;
      });
    });
  }




  get gia() {
    return this.frmGiasanpham.get('txt_gia')!;
  }

  get ngaybatdau() {
    return this.frmGiasanpham.get('txt_ngaybatdau')!;
  }
  get ngayketthuc() {
    return this.frmGiasanpham.get('txt_ketthuc')!;
  }
 



  OnSubmit(value: any) {
    if (this.frmGiasanpham.invalid) {
      alert('Form chưa đúng định dạng')
      return;
    }
    let obj: any = {};
    obj.giasanpham = {
      Gia: value.txt_gia,
      NgayBatDau: value.txt_ngaybatdau,
      NgayKetThuc: value.txt_ngayketthuc,
      
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
      obj.giasanpham.IdGiaSanPham=this.giasanpham.idGiaSanPham;
      obj.giasanpham.IdSanPham=this.giasanpham.idSanPham;
      this._api.put('/api/admin/update-giasanpham', obj).subscribe(res => {
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

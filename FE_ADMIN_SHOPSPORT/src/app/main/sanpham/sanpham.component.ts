import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
declare var $: any;
import{NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent extends BaseComponent implements OnInit,AfterViewInit {

  sortProperty: string = 'id';
  sortOrder = 1;
  public list_danhmuc:any;
  public list_sanphams: any;
  public sanpham:any;
  public frmSanPham!: FormGroup;
  public frmThemSanPham!: FormGroup;
  public frmSearch!: FormGroup;
  public file: any;

  public hienThiModal: any;
  public hienThiModalThemSanPham: any;
  public okForm: any;
  public isCreate = false;
  public ngayTao:any;

  public anhSanPham:any;
  public id_danhmucsearch:any;


  public listdanhmucon:any;


  constructor(injector: Injector,private toast:NgToastService) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_tensanpham': new FormControl('', []),
      'txt_giasanpham': new FormControl('', [])
      
    });

    this.frmSanPham = new FormGroup({
      'txt_tensanpham': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      'txt_motasanpham': new FormControl('', [Validators.required]),
      'txt_anhsanpham': new FormControl('', [Validators.required]),
      'txt_iddanhmuc': new FormControl('', [Validators.required]),
      'txt_idthuonghieu': new FormControl('', [Validators.required]),
      'txt_xuatxu': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'txt_chatlieu':new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'txt_gia': new FormControl('', [Validators.required]),
      'txt_ngaytao':new FormControl('', [Validators.required]),
    })

    this.frmThemSanPham = new FormGroup({
      'txt_tensanpham': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      'txt_motasanpham': new FormControl('', [Validators.required]),
      'txt_anhsanpham': new FormControl('', [Validators.required]),
      'txt_iddanhmuc': new FormControl('', [Validators.required]),
      'txt_idthuonghieu': new FormControl('', [Validators.required]),
      'txt_xuatxu': new FormControl('', [Validators.required]),
      'txt_chatlieu':new FormControl('', [Validators.required]),
   
    })

  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    console.log(this.pageSize)
  }

  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public totalItem!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-sanphamsample', {  page: page, pageSize: this.pageSize,ten : this.frmSearch.value['txt_tensanpham'],iddanhmuc:this.id_danhmucsearch}).subscribe(res => {
      this.list_sanphams = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem)
      console.log(this.pageSize)
    });
  }


  public LoadData(pageSize:any) {

    console.log(this.id_danhmucsearch)
    this.pageSize=pageSize;
      this._api.post('/api/admin/search-sanphamsample', {page:this.page,pageSize:this.pageSize,ten : this.frmSearch.value['txt_tensanpham'],iddanhmuc:this.id_danhmucsearch}).subscribe(res => {
        this.list_sanphams = res.data;
        this.totalItem = res.totalItem;
        console.log(res.data);
        console.log(this.totalItem);
        
        console.log(this.frmSearch.value['txt_tensanpham'])
      }); 


      //lấy list danh muc lon
      this._api.get('/api/admin/get-danhmuclon').subscribe(res => {
        this.listDanhMucLon = res;
        console.log(res);
      }); 


      //lấy list thương hiệu
      this._api.get('/api/admin/get-listthuonghieu').subscribe(res => {
        this.listThuongHieu = res;
        console.log(res);
      }); 

      //lấy list danh mục con
      this._api.get('/api/admin/get-listdanhmucon').subscribe(res => {
        this.listdanhmucon = res;
        console.log(res);
      }); 
    
      
      

  }









  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.list_sanphams = [...this.list_sanphams.sort((a: any, b: any) => {
        // sort comparison function
        let result = 0;
        if (a[property] < b[property]) {
            result = -1;
        }
        if (a[property] > b[property]) {
            result = 1;
        }
        return result * this.sortOrder;
    })];
}

sortIcon(property: string) {
    if (property === this.sortProperty) {
        return this.sortOrder === 1 ? '' : '';
    }
    return '';
}


public dsdanhmuclon:any;


public modalThemSanPham() {

  this.anhSPMau=null;
  this.pageSize=this.pageSize;
  this._api.get('/api/admin/get-danhmuclon').subscribe(res => {
    this.dsdanhmuclon = res;
    console.log(this.dsdanhmuclon);
  }); 

  this.hienThiModalThemSanPham=true;
    this.okForm=false;
    this.isCreate=true;
  setTimeout(() => {
    $('#hienthiModalThemSanPham').modal('toggle');
    this.frmThemSanPham = new FormGroup({
      'txt_ten': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      'txt_mota': new FormControl('', [Validators.required]),
      'txt_anh': new FormControl('', [Validators.required]),
      'txt_iddm': new FormControl('', [Validators.required]),
      
      'txt_anhsanpham': new FormControl('', [Validators.required]),
 
      'txt_idth': new FormControl('', [Validators.required]),
   
      'txt_xx': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'txt_cl':new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    })
   
    this.okForm = true;

  });
}

public themModal() {
  this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=true;
  setTimeout(() => {
    $('#hienthiModal').modal('toggle');


    this.frmSanPham = new FormGroup({
      'txt_tensanpham': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      'txt_motasanpham': new FormControl('', [Validators.required]),
      'txt_anhsanpham': new FormControl('', [Validators.required]),
      'txt_iddanhmuccha': new FormControl('', [Validators.required]),
      'txt_iddanhmuccon': new FormControl('', [Validators.required]),
      'txt_idthuonghieu': new FormControl('', [Validators.required]),
      
      'txt_xuatxu':new FormControl('', [Validators.required]),
      'txt_chatlieu':new FormControl('', [Validators.required]),
    })
   
    this.okForm = true;

  });
}



  // public themModal() {
  //   this.hienThiModal = true;
  //   this.isCreate = true;
  //   setTimeout(() => {
  //     $('#hienthiModal').modal('toggle');


  //     this.frmSanPham = new FormGroup({
  //       'txt_tensanpham': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
  //       'txt_motasanpham': new FormControl('', [Validators.required]),
  //       'txt_gia': new FormControl('', [Validators.required,Validators.pattern("^[0-9]+$")]),
  //       'txt_anhsanpham': new FormControl('', [Validators.required]),
  //       'txt_iddanhmuc': new FormControl('', [Validators.required]),
  //       'txt_idnhasanxuat': new FormControl('', [Validators.required]),
  //       'txt_iddonvitinh': new FormControl('', [Validators.required]),
  //       'txt_ngaytao':new FormControl('', [Validators.required]),
  //       'txt_ngaybatdau':new FormControl('', [Validators.required]),
  //     })
  //     this.okForm = true;

  //   });
  // }

  public taoMauModal() {
    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      this.frmSanPham = new FormGroup({
        'txt_tensanpham': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_motasanpham': new FormControl('', [Validators.required]),
        // 'txt_gia': new FormControl('', [Validators.required,Validators.pattern("^[0-9]+$")]),
        'txt_anhsanpham': new FormControl('', [Validators.required]),
        'txt_iddanhmuc': new FormControl('', [Validators.required]),
        'txt_idthuonghieu': new FormControl('', [Validators.required]),
        // 'txt_idnhasanxuat': new FormControl('', [Validators.required]),
        // 'txt_iddonvitinh': new FormControl('', [Validators.required]),
        'txt_ngaytao':new FormControl('', [Validators.required]),
        // 'txt_ngaybatdau':new FormControl('', [Validators.required]),
      })
      this.okForm = true;

    });
  }



  public suaModal(idSanPham: any){

    console.log(idSanPham);
    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-sanphamsample/' + idSanPham).subscribe(res => {
        this.sanpham = res;
        this.anhSPMau=this.sanpham.anhSanPham;
        this.ngayTao=this.sanpham.ngayTao;

        // this.anhSanPham=this.sanpham.anhSanPham;
        this.id_danhmuc=res.idDanhMuc;
        this.id_danhmuccha=res.idDanhMucCha;
        this.id_thuonghieu=res.idThuongHieu;
        console.log(res);
        console.log(this.id_danhmuc);
        console.log(this.id_danhmuccha);

        this._api.get('/api/admin/get-danhmucnho/'+this.id_danhmuccha).subscribe(res => {
          this.listDanhMucNho = res;
          console.log(this.listDanhMucNho);
        });

        this.frmSanPham = new FormGroup({
          'txt_tensanpham': new FormControl(this.sanpham.tenSanPham, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
          'txt_motasanpham': new FormControl(this.sanpham.moTaSanPham, [Validators.required]),
          // // 'txt_gia': new FormControl(this.sanpham.gia, [Validators.required]),
          // 'txt_anhsanpham': new FormControl(this.sanpham.anhSanPham, [Validators.required]),
          'txt_iddanhmuccha': new FormControl(this.sanpham.idDanhMuc, [Validators.required]),
          'txt_iddanhmuccon': new FormControl(this.sanpham.idDanhMuc, [Validators.required]),
          'txt_idthuonghieu': new FormControl(this.sanpham.idThuongHieu, [Validators.required]),
          // 'txt_iddonvitinh': new FormControl(this.sanpham.idDonViTinh, [Validators.required]),
          'txt_ngaytao':new FormControl(this.sanpham.ngayTao, [Validators.required]),
          'txt_xuatxu':new FormControl(this.sanpham.xuatXu, [Validators.required]),
          'txt_chatlieu':new FormControl(this.sanpham.chatLieu, [Validators.required]),
          // 'txt_ngaybatdau':new FormControl(this.sanpham.ngayBatDau, [Validators.required]),
        }),

        this.okForm=true;
      });
    });
  }

  public xoaSanPham(IdSanPham: any) {
    if(confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')){
      this._api.delete('/api/admin/delete-sanphamsample/' +IdSanPham).subscribe(res => {
        this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        this.LoadData(this.pageSize);
      });
    }else{}
  }

  public anhSPMau:any;

  public upload(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader(); // Tạo đối tượng FileReader

      reader.readAsDataURL(event.target.files[0]); // Đọc nội dung file ảnh

      // Xử lý khi đọc xong nội dung của file ảnh
      reader.onload = () => {
          this.file = event.target.files[0]; // Lưu file vào biến file

          // Hiển thị ảnh mới đã chọn
          const imgElement = document.querySelector('.media-left > img');
          if (imgElement !== null && reader.result !== null) {
              imgElement.setAttribute('src', reader.result.toString());
          }
      };
    }
   
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmSanPham.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


  OnSubmit(value: any) {

   

    console.log(this.findInvalidControls())
    if (this.frmSanPham.invalid) {
      return;
    }
    let obj: any = {};
   
      obj.sanpham = {
        TenSanPham: value.txt_tensanpham,
        MoTaSanPham: value.txt_motasanpham,
        IdDanhMuc:parseInt(this.id_danhmuc),
        IdThuongHieu:parseInt(this.id_thuonghieu),
        
        XuatXu:value.txt_xuatxu,
        ChatLieu:value.txt_chatlieu,
        NgayTao:this.ngayTao,
        
      }

    obj.giasanpham = {
      Gia: value.txt_gia,
      NgayBatDau:value.txt_ngaybatdau
    }

    if(this.isCreate){
      if(this.file){
        this._api.uploadFileSingle('/api/upload/upload-single','sanpham',this.file).subscribe((res:any)=>{
          if(res&&res.body&&res.body.filePath){
            obj.sanpham.AnhSanPham=res.body.filePath;
            this._api.post('/api/admin/create-sanphamsample', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
              }
            });
          }
        })
      }
      else{
        this._api.post('/api/admin/create-sanphamsample', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
          }
        });

      }
    }
    else{
      obj.sanpham.IdSanPham=this.sanpham.idSanPham;
      if(this.file){
       
        this._api.uploadFileSingle('/api/upload/upload-single','sanpham',this.file).subscribe((res:any)=>{
          if(res&&res.body&&res.body.filePath){
            obj.sanpham.AnhSanPham=res.body.filePath;
            this._api.put('/api/admin/update-sanphamsample', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
              }
            });
          }
        })
      }
      else{
        obj.sanpham.IdSanPham=this.sanpham.idSanPham;
        obj.sanpham.AnhSanPham=this.anhSPMau;
        this._api.put('/api/admin/update-sanphamsample', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
      
    }
    
  }








  ThemSanPham(value: any) {

    const requiredFields = [ 'txt_ten','txt_mota', 'txt_iddm', 'txt_idth', 'txt_xx', 'txt_cl','txt_anhsanpham'];

    for (let field of requiredFields) {
      if (!value[field]) {
          if(field === 'txt_ten') {
              alert(`Vui lòng nhập giá trị cho trường Tên sản phẩm.`);
          } else if (field === 'txt_mota')
          {
              alert(`Vui lòng nhập giá trị cho trường Mô tả.`);
          } else if (field === 'txt_iddm')
          {
              alert(`Vui lòng nhập giá trị cho trường Danh mục`);
          } else if (field === 'txt_idth')
          {
              alert(`Vui lòng nhập giá trị cho trường Thương hiệu`);
          } else if (field === 'txt_xx')
          {
              alert(`Vui lòng nhập giá trị cho trường Xuất xứ`);
          }else if (field === 'txt_cl')
          {
              alert(`Vui lòng nhập giá trị cho trường Chất liệu`);
          }else if (field === 'txt_anhsanpham')
          {
              alert(`Vui lòng nhập giá trị cho trường Ảnh sản phẩm`);
          }
          return;
      }
  }
    
    
    let obj: any = {};
   
      obj.sanpham = {
        TenSanPham: value.txt_ten,
        MoTaSanPham: value.txt_mota,
        IdDanhMuc:parseInt(this.id_danhmuc),
        IdThuongHieu:parseInt(this.id_thuonghieu),
        AnhSanPham: value.txt_anh,
        XuatXu:value.txt_xx,
        ChatLieu:value.txt_cl,
        NgayTao:Date.now,
        TrangThai:0,
      }

    if(this.isCreate){
      if(this.file){
        this._api.uploadFileSingle('/api/upload/upload-single','sanpham',this.file).subscribe((res:any)=>{
          if(res&&res.body&&res.body.filePath){
            obj.sanpham.AnhSanPham=res.body.filePath;
            this._api.post('/api/admin/create-sanphamsample', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
              }
            });
          }
        })
      }
      else{
        this._api.post('/api/admin/create-sanphamsample', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
          }
        });

      }
    }
    else{
      obj.sanpham.IdSanPham=this.sanpham.idSanPham;
      if(this.file){
        
        this._api.uploadFileSingle('/api/upload/upload-single','sanpham',this.file).subscribe((res:any)=>{
          if(res&&res.body&&res.body.filePath){
            obj.sanpham.AnhSanPham=res.body.filePath;
            this._api.put('/api/admin/update-sanphamsample', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất Bại",summary:"Cập nhật thất bại",duration:5000})
              }
            });
          }
        })
      }
      else{
        obj.sanpham.IdSanPham=this.sanpham.idSanPham;
        this._api.put('/api/admin/update-sanphamsample', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất Bại",summary:"Cập nhật thất bại",duration:5000})
          }
        });
      }
      
    }
    
  }












  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
    $('#hienthiModalThemSanPham').closest('.modal').modal('hide');
  }

  ngAfterViewInit(): void {
      
  }


  
  get tensanpham() {
    return this.frmSanPham.get('txt_tensanpham')!;
  }
  get motasanpham() {
    return this.frmSanPham.get('txt_motasanpham')!;
  }
  get gia() {
    return this.frmSanPham.get('txt_gia')!;
  }
  get anhsanpham() {
    return this.frmSanPham.get('txt_anhsanpham')!;
  }
  get iddanhmuc() {
    return this.frmSanPham.get('txt_iddanhmuc')!;
  }
  // get iddanhmuccon() {
  //   return this.frmSanPham.get('txt_iddanhmuccon')!;
  // }

  get idthuonghieu() {
    return this.frmSanPham.get('txt_idthuonghieu')!;
  }
  get xuatxu() {
    return this.frmSanPham.get('txt_xuatxu')!;
  }

  get chatlieu() {
    return this.frmSanPham.get('txt_chatlieu')!;
  }
  get ngaytao() {
    return this.frmSanPham.get('txt_ngaytao')!;
  }
  get ngaybatdau() {
    return this.frmSanPham.get('txt_ngaybatdau')!;
  }
  ///
  get ten() {
    return this.frmThemSanPham.get('txt_ten')!;
  }
  get mota() {
    return this.frmThemSanPham.get('txt_mota')!;
  }
  get anh() {
    return this.frmThemSanPham.get('txt_anh')!;
  }
  get iddm() {
    return this.frmThemSanPham.get('txt_iddm')!;
  }
  get idth() {
    return this.frmThemSanPham.get('txt_idth')!;
  }
  get xx() {
    return this.frmThemSanPham.get('txt_xx')!;
  }
  get cl() {
    return this.frmThemSanPham.get('txt_cl')!;
  }



  public id_danhmuc:any;
  public id_danhmuccha:any;
  public id_thuonghieu:any;

  public listDanhMucLon:any;
  public listDanhMucNho:any;
  public listThuongHieu:any;

  public changeDanhMucLon(e:any) {

    console.log(e.target.value);
    this.id_danhmuc=e.target.value

    this._api.get('/api/admin/get-danhmucnho/'+this.id_danhmuc).subscribe(res => {
      this.listDanhMucNho = res;
      console.log(res);
      
    });

  }

  public changeDanhMucNho(e:any) {
    console.log(e.target.value);
    this.id_danhmuc=e.target.value

  }

  public changeThuongHieu(e:any) {
    console.log(e.target.value);
    this.id_thuonghieu=e.target.value

    console.log(this.id_thuonghieu)
  }


  public changeDanhMucSearch(e:any) {
    console.log(e.target.value);
    this.id_danhmucsearch=e.target.value

    console.log(this.id_danhmucsearch)
  }
 


}

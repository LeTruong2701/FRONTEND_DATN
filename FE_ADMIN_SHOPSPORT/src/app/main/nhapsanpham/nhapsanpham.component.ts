import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { GetColorName } from 'hex-color-to-color-name';
import {NgToastService} from 'ng-angular-popup'


declare var $: any;
@Component({
  selector: 'app-nhapsanpham',
  templateUrl: './nhapsanpham.component.html',
  styleUrls: ['./nhapsanpham.component.css']
})

export class NhapsanphamComponent extends BaseComponent implements OnInit, AfterViewInit {


  public frmSearch!: FormGroup;
  public frmSanPham!: FormGroup;
  public frmThanhToan!: FormGroup;

  public list_sanphamnhapchuathanhtoan: any;
  public list_spchuathanhtoan: any;
  public listnhacungcap: any;
  public list_mausanpham: any;
  public sanpham: any;
  public hienThiModal: any;
  public hienThiModalThanhToan: any;
  public okForm: any;
  public isCreate = false;
  public file: any;

  public anhSanPham:any;



  public size: string = "";

  public item: any;
  public list_size: any = [];
  public list_size_chua_nhap: any;
  public ListSizeAPI: any;

  public soluong: any;

  public mamau: any;
  public tenmau: any;

  public tensp: any;

  constructor(injector: Injector, private authenticationService: AuthenticationService,private toast:NgToastService) {
    super(injector);



    this.frmSanPham = new FormGroup({
      'txt_tensanpham': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      'txt_motasanpham': new FormControl('', [Validators.required]),
      'txt_gia': new FormControl('', [Validators.required]),
      // 'txt_anhsanpham': new FormControl('', [Validators.required]),
      'txt_iddanhmuc': new FormControl('', [Validators.required]),
      'txt_idnhasanxuat': new FormControl('', [Validators.required]),
      'txt_iddonvitinh': new FormControl('', [Validators.required]),
      'txt_ngaytao': new FormControl('', [Validators.required]),
      'txt_ngaybatdau': new FormControl('', [Validators.required]),
      'txt_anhsanpham': new FormControl(''),

      'txt_mau': new FormControl(''),
      'txt_giaban': new FormControl('', [Validators.required]),
      'txt_gianhap': new FormControl('', [Validators.required,Validators.pattern(/^\d+$/)]),
    })

    this.frmThanhToan = new FormGroup({
      'txt_idnhacungcap': new FormControl('', [Validators.required]),
      'txt_ghichu': new FormControl('', [Validators.required]),
      'txt_tongtien': new FormControl('', [Validators.required]),
      'txt_trangthaihoadonnhap': new FormControl('', [Validators.required]),

    })


  }

  ngOnInit(): void {

    this.LoadData();
  }

  public idmsp:any;
  public idsp: any;

  public LoadData() {

    this._route.params.subscribe(params => {
      this.idsp = params['id'];
      this._api.post('/api/admin/get-mausanpham-by-id-sanphamsample', { idSanPham: this.idsp, page: 1, pageSize: 10 }).subscribe(res => {
        this.list_mausanpham = res.data;
        
        // this.iddm=res.idDanhMuc
        console.log(this.list_mausanpham);
        
 

      });
     
      // console.log(this.iddm);
    })


    this._api.get('/api/admin/get-listnhacungcap').subscribe(res => {
      this.listnhacungcap = res;
      // this.iddm=res.idDanhMuc
      console.log(this.listnhacungcap);
    });


    this._api.get('/api/admin/get-listsanphamchuathanhtoan/' + this.idsp).subscribe(res => {
      this.list_spchuathanhtoan = res;
      // this.iddm=res.idDanhMuc
      console.log(this.list_spchuathanhtoan);

    });

  }

  public user:any;
  public id_nguoidung:any;
  public ten_nguoidung:any;
  public tongtienhoadon:any;

  public Xacnhanthanhtoan() {

    this.user = this.authenticationService.userValue;
  this.id_nguoidung = this.user.idNguoiDung;
  this.ten_nguoidung = this.user.userName;
  console.log(this.user)

    this.id_trangthaihoadonnhap=1;
    this.list_size_chua_nhap = JSON.parse(localStorage.getItem('list_size_chua_nhap') || '[]').filter((x:any)=>x.IdSanPham==this.idsp);
        console.log(this.list_size_chua_nhap)
    
        this.tongtienhoadon=this.TinhTongHoaDon(this.list_size_chua_nhap)
        console.log(this.tongtienhoadon);
    // this._api.get('/api/admin/get-listsanphamnhap/' + this.idsp).subscribe(res => {
    //   this.list_sanphamnhapchuathanhtoan = res;
    //   // this.iddm=res.idDanhMuc
    //   console.log(this.list_sanphamnhapchuathanhtoan);

    // });
    this.hienThiModalThanhToan = true;
    this.isCreate = true;

    setTimeout(() => {
      $('#hienThiModalThanhToan').modal('toggle');
      this.frmThanhToan = new FormGroup({
        'txt_idnhacungcap': new FormControl('', [Validators.required]),

        'txt_ghichu': new FormControl('', [Validators.required]),
        'txt_tongtien': new FormControl('', [Validators.required]),
        'txt_trangthaihoadonnhap': new FormControl('', [Validators.required]),

      })
      this.okForm = true;
    });
  }

  public themModal() {
    console.log(this.idsp);
    this.hienThiModal = true;
    this.isCreate = true;
    this.mamau=null;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      this.list_size_chua_nhap = [];
        console.log(this.list_size_chua_nhap)
      this.frmSanPham = new FormGroup({
        // 'txt_mau': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),

        // 'txt_gia': new FormControl('', [Validators.required,Validators.pattern("^[0-9]+$")]),
        // 'txt_anhsanpham': new FormControl('', [Validators.required]),

        // 'txt_idnhasanxuat': new FormControl('', [Validators.required]),
        // 'txt_iddonvitinh': new FormControl('', [Validators.required]),

        // 'txt_ngaybatdau':new FormControl('', [Validators.required]),

      'txt_anhsanpham': new FormControl(''),

        'txt_mau': new FormControl(),
        'txt_giaban': new FormControl('', [Validators.required,Validators.pattern(/^[1-9]\d*$/),Validators.min(50000)]),
        'txt_gianhap': new FormControl('', [Validators.required,Validators.pattern(/^[1-9]\d*$/),Validators.min(50000)]),

      })
      this.okForm = true;

    });
  }


  public suaModal(idMauSanPham: any) {

    this.hienThiModal = true;
    this.okForm = false;
    this.isCreate = false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-mausanpham-by-id-mausanpham/' + idMauSanPham).subscribe(res => {
        this.sanpham = res;
        this.mamau = res.maMau;
        this.tenmau = res.tenMau;
        this.anhSanPham=res.anhSanPham;
        console.log(res);

        this._api.post('/api/admin/get-listsizesp-by-id-mausanpham', { idMauSanPham: idMauSanPham }).subscribe(res => {
          this.ListSizeAPI = res.data;

          console.log(this.ListSizeAPI);
          this.ListSizeAPI.forEach((x: any) => {
            this.list_size.push({
              IdSizeSanPham: x.idSizeSanPham,
              Size: x.size,
              SoLuong: x.soLuong,
            });
            console.log(this.list_size)
          });
        });

        this.list_size_chua_nhap = JSON.parse(localStorage.getItem('list_size_chua_nhap') || '[]').filter((item: any) => item.IdMauSanPham == idMauSanPham);
        console.log(this.list_size_chua_nhap)
        this.frmSanPham = new FormGroup({
     
          // 'txt_anhsanpham': new FormControl(this.sanpham.anhSanPham, [Validators.required]),
          'txt_giaban': new FormControl(this.sanpham.giaBan, [Validators.required, Validators.pattern('^[0-9]*$')]),
          'txt_gianhap': new FormControl(this.sanpham.giaNhap, [Validators.required, Validators.pattern('^[0-9]*$')]),
          'txt_mau': new FormControl(this.sanpham.tenMau),
         
        }),

          this.okForm = true;
      });
    });
  }



  public xoaMauSanPham(IdSanPham: any) {
    this._api.delete('/api/admin/delete-mausanpham/' + IdSanPham).subscribe(res => {
      alert('Xóa dữ liệu thành công');
      this.LoadData();
    });
  }




  public changeMau(e: any) {
    console.log(e.target.value);
    this.mamau = e.target.value;
    this.tenmau = GetColorName(this.mamau);
    console.log(this.tenmau);
  }




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

    const requiredFields = [ 'txt_mau','txt_gianhap', 'txt_giaban','txt_anhsanpham'];

    for (let field of requiredFields) {
      if (!value[field]) {
          if(field === 'txt_mau') {
              alert(`Vui lòng chọn màu cho sản phẩm`);
          } else if (field === 'txt_gianhap')
          {
              alert(`Vui lòng nhập giá nhập cho sản phẩm`);
          } else if (field === 'txt_giaban')
          {
              alert(`Vui lòng nhập giá bán cho sản phẩm`);
          } else if (field === 'txt_anhsanpham')
          {
              alert(`Vui lòng chọn ảnh sản phẩm`);
          }
          return;
      }
  }

  console.log(this.findInvalidControls())
    if (this.frmSanPham.invalid) {
      return;
    }



    let obj: any = {};
    obj.mausanpham = {
      IdSanPham: parseInt(this.idsp),
      TenMau: value.txt_mau,
      GiaNhap: parseFloat(value.txt_gianhap),
      GiaBan: parseFloat(value.txt_giaban),
      CheckThanhToan: 0,
      MaMau: this.mamau,
      TrangThai: 0,

    }
    obj.GiaNhap=parseFloat(value.txt_gianhap);
    console.log(this.list_size)
    // obj.sizesanpham = [];
    // this.list_size.forEach((x: any) => {
    //   obj.sizesanpham.push({
    //     IdSizeSanPham:parseInt(x.IdSizeSanPham),
    //     IdSanPham: parseInt(this.idsp),
    //     Size: x.Size, 
    //     SoLuong: x.SoLuong,
    //     TrangThai:1
    //   });
    // }); 
    console.log(obj.sizesanpham)

    if (this.isCreate) {
      if (this.file) {

        this._api.uploadFileSingle('/api/upload/upload-single', 'mausanpham', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.mausanpham.AnhSanPham = res.body.filePath;
            this._api.post('/api/admin/create-mausanpham', obj).subscribe(res => {
              if (res && res.data) {
                console.log(res);
                console.log(res.data);
                this.LoadData();
                this.dongModal();
                //
                this.addListSizeChuaNhapLocalStorage(this.list_size_chua_nhap,res.data.idSanPham,res.data.idMauSanPham,res.data.tenMau,res.data.giaNhap);

                this.toast.success({detail:"Thành công",summary:"Thêm mới thành công",duration:5000})
               
              } else {
                this.toast.error({detail:"Thất bại",summary:"Thêm mới thất bại",duration:5000})
                this.dongModal();
              }
            });
          }
        })
      }
      else {
        this._api.post('/api/admin/create-mausanpham', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành công",summary:"Thêm mới thành công",duration:5000})
            this.LoadData();
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất bại",summary:"Thêm mới thất bại",duration:5000});
            this.dongModal();
          }
        });

      }
    }
    else {
      obj.mausanpham.IdMauSanPham = this.sanpham.idMauSanPham;
      if (this.file) {
        
        this.addListSizeChuaNhapLocalStorage(this.list_size_chua_nhap,parseInt(this.idsp),this.sanpham.idMauSanPham,this.sanpham.tenMau,this.sanpham.giaNhap);

        this._api.uploadFileSingle('/api/upload/upload-single', 'mausanpham', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.mausanpham.AnhSanPham = res.body.filePath;
            this._api.put('/api/admin/update-mausanpham', obj).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành công",summary:"Cập nhật thành công",duration:5000})
                this.LoadData();
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất bại",summary:"Cập nhật thất bại",duration:5000})
              }
            });
          }
        })
      }
      else {
        // obj.sanpham.IdSanPham=this.sanpham.idSanPham;
        this.addListSizeChuaNhapLocalStorage(this.list_size_chua_nhap,parseInt(this.idsp),this.sanpham.idMauSanPham,this.sanpham.tenMau,this.sanpham.giaNhap);
        obj.mausanpham.AnhSanPham = this.anhSanPham;
        this._api.put('/api/admin/update-mausanpham', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData();
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất bại",summary:"Cập nhật thất bại",duration:5000})
          }
        });
      }

    }
  }

  // public user = this.authenticationService.userValue;
  // public id_nguoidung = this.user.idNguoiDung;
  // public ten_nguoidung = this.user.hoTen;

  OnThanhToan(value: any) {

    const requiredFields = [ 'txt_idnhacungcap'];

    for (let field of requiredFields) {
      if (!value[field]) {
          if(field === 'txt_idnhacungcap') {
              alert(`Vui lòng chọn Nhà cung cấp`);
          } 
          return;
      }
  }

    let obj: any = {};
    obj.hoadonnhap = {
      IdNhaCungCap: parseInt(this.id_nhacungcap),
      IdNguoiDung: this.id_nguoidung,
      GhiChu: value.txt_ghichu,
      TongTien:parseFloat(this.tongtienhoadon),
      TrangThaiHoaDonNhap: parseInt(this.id_trangthaihoadonnhap),

    }

    console.log(this.list_size_chua_nhap);
    obj.sizesanpham=[];
    this.list_size_chua_nhap.forEach((x: any) => {
      obj.sizesanpham.push({
        IdMauSanPham:parseInt(x.IdMauSanPham),
        IdSanPham: parseInt(this.idsp),
        Size: x.Size, 
        SoLuong: x.SoLuong,
        TrangThai:1
      });
    }); 
    console.log(obj.sizesanpham)

    if (this.isCreate) {
    
      
        this._api.post('/api/admin/create-hoadonnhap', obj).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành công",summary:"Thêm mới thành công",duration:5000})
            localStorage.removeItem('list_size_chua_nhap');
            this.LoadData();
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất bại",summary:"Thêm mới thất bại",duration:5000})
          }
          
        
      })
    }
   
  }

  public TinhTongHoaDon(list_size_chua_nhap:any){
    let tongTien = 0;
    const sumByMauSanPham: {[idMauSanPham: number]: number} = {};
  
  for (let i = 0; i < list_size_chua_nhap.length; i++) {
    const size = list_size_chua_nhap[i];
    
    // Tạo một object để chứa tổng số tiền của các sản phẩm có cùng IdMauSanPham
    if (!sumByMauSanPham[size.IdMauSanPham]) {
      sumByMauSanPham[size.IdMauSanPham] = 0;
    }
    
    // Cộng thêm tổng tiền cho sản phẩm hiện tại
    sumByMauSanPham[size.IdMauSanPham] += size.SoLuong * size.GiaNhap;
  }
  
  // Tính tổng tiền cho tất cả các sản phẩm
  for (const key in sumByMauSanPham) {
    tongTien += sumByMauSanPham[key];
  }
  
  return tongTien;
  }


  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
    $('#hienThiModalThanhToan').closest('.modal').modal('hide');
    this.list_size = [];
    this.anhSanPham=null;
  }


  ngAfterViewInit(): void {

  }

  get tensanpham() {
    return this.frmSanPham.get('txt_tensanpham')!;
  }

  get mau() {
    return this.frmSanPham.get('txt_mau')!;
  }
  get gianhap() {
    return this.frmSanPham.get('txt_gianhap')!;
  }
  get giaban() {
    return this.frmSanPham.get('txt_giaban')!;
  }
  get anhsanpham() {
    return this.frmSanPham.get('txt_anhsanpham')!;
  }

  get tongtien() {
    return this.frmThanhToan.get('txt_tongtien')!;
  }
  get ghichu() {
    return this.frmThanhToan.get('txt_ghichu')!;
  }
  get trangthaihoadonnhap() {
    return this.frmThanhToan.get('txt_trangthaihoadonnhap')!;
  }
  get idnhacungcap() {
    return this.frmThanhToan.get('txt_idnhacungcap')!;
  }




  public addSize() {
    console.log(this.size);
    let found = false;
    for (let i = 0; i < this.list_size.length; i++) {
      if (this.list_size[i].Size === this.size) {
        this.list_size[i].SoLuong = parseInt(this.list_size[i].SoLuong) + parseInt(this.soluong);
        found = true;
        break;
      }
    }
    if (!found) {
      let item: any = {};
      item = {
        IdSizeSanPham: 0,
        Size: this.size,
        SoLuong: this.soluong
      };
      this.list_size.push(item);
    }
    console.log(this.list_size);
   

  }


  //thêm size và số lượng chưa nhập vào list_size_chưa_nhập
  public addSizeChuaNhap() {

    let found = false;
    for (let i = 0; i < this.list_size_chua_nhap.length; i++) {
      if (this.list_size_chua_nhap[i].Size === this.size) {
        this.list_size_chua_nhap[i].SoLuong = parseInt(this.list_size_chua_nhap[i].SoLuong) + parseInt(this.soluong);
        found = true;
        break;
      }
    }
    if (!found) {
      let item: any = {};
      item = {
       
        // IdSanPham: this.idsp,
        // IdMauSanPham: this.sanpham.idMauSanPham,
        Size: this.size,
        SoLuong: this.soluong,
       
      };
      this.list_size_chua_nhap.push(item);
    }
   
  }


  listSize: any = ['S', 'M', 'L', 'XL', 'XXL']

  public changeSize(e: any) {
    console.log(e.target.value);
    this.size = e.target.value
  }


  public XoaSize(index: number) {
    this.list_size_chua_nhap.splice(index, 1);
  }


  public id_nhacungcap: any;

  public changeNhaCungCap(e: any) {
    console.log(e.target.value);
    this.id_nhacungcap = e.target.value
  }


  // thêm list size chưa xác nhận nhập hàng vào kho lên local storage
  public addListSizeChuaNhapLocalStorage(items: any,idSanPham:any,idMauSanPham:any,tenMau:any,giaNhap:any) {
    let local_storage: any[]=[];
    if (localStorage.getItem('list_size_chua_nhap') == null) {
     for(let it of items){
      it.IdSanPham=idSanPham;
      it.IdMauSanPham=idMauSanPham;
      it.TenMau=tenMau;
      it.GiaNhap=giaNhap;
      local_storage.push(it)
     }
    } else {
      local_storage = JSON.parse(localStorage.getItem('list_size_chua_nhap') || '[]');
      for (let item of items) {
        let ok = true;
        for (let x of local_storage) {
          if (x.Size === item.Size && x.IdMauSanPham === idMauSanPham) {
            x.SoLuong = item.SoLuong;
            ok = false;
            break;
          }
        }
        if (ok) {
          
            item.IdSanPham=idSanPham;
            item.IdMauSanPham=idMauSanPham;
            item.TenMau=tenMau;
            item.GiaNhap=giaNhap;
            local_storage.push(item)
          
          
        }
      }
    }
    localStorage.setItem('list_size_chua_nhap', JSON.stringify(local_storage));
  }

  public id_trangthaihoadonnhap:any;
  public changeTrangThaiHoaDonNhap(e:any) {
    console.log(e.target.value);
    this.id_trangthaihoadonnhap=e.target.value
    console.log(this.id_trangthaihoadonnhap);
  }
}

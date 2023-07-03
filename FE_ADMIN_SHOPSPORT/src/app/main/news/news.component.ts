import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from './../../core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
declare var $: any;
import{NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends BaseComponent implements OnInit {

  public p!:number;
  public list_newss: any;
  public news:any;
  public frmNews!: FormGroup;
  public frmSearch!: FormGroup;
  public anhTinTuc:any;

  public hienThiModal: any;
  public okForm: any;
  public isCreate = false;

  public file: any;


  public user = this.authenticationService.userValue;


  constructor(injector: Injector,private authenticationService: AuthenticationService,private toast:NgToastService) {
    super(injector);

    this.frmSearch = new FormGroup({
      'txt_tenloaitin': new FormControl('', [])
      
    });
  }

  ngOnInit(): void {
    this.LoadData(this.pageSize);
    this.frmSearch = new FormGroup({
      'txt_tenloaitin': new FormControl('', []),
    });
  }

  public page: any = 1;
  public id: any;
  public pageSize: any = 5;
  public totalItem!:number;

  public loadPage(page: any) {
    this._api.post('/api/admin/search-news', {  page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_newss = res.data;
      this.totalItem = res.totalItem;
      console.log(this.totalItem)
    });
  }

  
  public LoadData(pageSize:any) {
    this.pageSize=pageSize;
    this._api.post('/api/admin/search-news',{page:1,pageSize:10,ten : this.frmSearch.value['txt_tenloaitin']}).subscribe(res => {
      this.list_newss = res.data;
      this.totalItem = res.totalItem;
      console.log(res);
    });
  }



  public themModal() {
    this.hienThiModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');


      this.frmNews = new FormGroup({
        'txt_loaitin': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_title': new FormControl('', [Validators.required]),
        'txt_noidung': new FormControl('', [Validators.required]),
        'txt_idnguoidung': new FormControl('', []),
        // 'txt_khac': new FormControl('', []),

        
      })
      this.okForm = true;

    });
  }



  public suaModal(idNews: any){

    this.hienThiModal=true;
    this.okForm=false;
    this.isCreate=false;
    setTimeout(() => {
      $('#hienthiModal').modal('toggle');
      this._api.get('/api/admin/get-by-id-news/' + idNews).subscribe(res => {
        this.news = res;
        this.anhTinTuc=this.news.anh;
        console.log(res);
        this.frmNews = new FormGroup({
          'txt_loaitin': new FormControl(this.news.loaiTin, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_title': new FormControl(this.news.title, [Validators.required]),
        'txt_anh': new FormControl(this.news.anh, [Validators.required]),
        'txt_noidung': new FormControl(this.news.noiDung, [Validators.required]),
        // 'txt_idnguoidung': new FormControl(this.news.idNguoiDung, []),
        // 'txt_khac': new FormControl(this.news.khac, []),
        });

        this.okForm=true;
      });
    });
  }

  public xoaNSX(IdNews: any) {
    if(confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')){

      this._api.delete('/api/admin/delete-news/' +IdNews).subscribe(res => {
        if(res&&res.data){    
            this.LoadData(this.pageSize); 
            this.toast.success({detail:"Thành Công",summary:"Xóa thành công",duration:5000})
        }
      });
    }
    else{
      
    }
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader(); // Tạo đối tượng FileReader

      reader.readAsDataURL(event.target.files[0]); // Đọc nội dung file ảnh

      // Xử lý khi đọc xong nội dung của file ảnh
      reader.onload = () => {
          this.file = event.target.files[0]; // Lưu file vào biến file

          // Hiển thị ảnh mới đã chọn
          const imgElement = document.querySelector('.media > img');
          if (imgElement !== null && reader.result !== null) {
              imgElement.setAttribute('src', reader.result.toString());
          }
      };
    }
  }


  public findInvalidControls() {
    const invalid = [];
    const controls = this.frmNews.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


  get loaitin() {
    return this.frmNews.get('txt_loaitin')!;
  }
  get anh() {
    return this.frmNews.get('txt_anh')!;
  }
  get title() {
    return this.frmNews.get('txt_title')!;
  }
  get noidung() {
    return this.frmNews.get('txt_noidung')!;
  }
  get idnguoidung() {
    return this.frmNews.get('txt_idnguoidung')!;
  }
  get khac() {
    return this.frmNews.get('txt_khac')!;
  }

  OnSubmit(value: any) {
    console.log(this.findInvalidControls())
    if (this.frmNews.invalid) {
      this.toast.warning({detail:"Có lỗi",summary:"Form chưa đúng định dạng",duration:5000})
      return;
    }

    let obj: any = {};
    obj.news = {
      LoaiTin: value.txt_loaitin,
      Anh: value.txt_anh,
      Title: value.txt_title,
      NoiDung: value.txt_noidung,
      IdNguoiDung: value.txt_idnguoidung,
      Khac: value.txt_khac,
      NgayDang:Date.now
    }
    if(this.isCreate){
      if(this.file){
        this._api.uploadFileSingle('/api/upload/upload-single','news',this.file).subscribe((res:any)=>{
          if(res&&res.body&&res.body.filePath){
            obj.news.Anh=res.body.filePath;
            obj.news.IdNguoiDung=this.authenticationService.userValue.idNguoiDung;


            this._api.postAuthor('/api/admin/create-news', obj,this.user.token).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất bại",summary:"Có lỗi xảy ra",duration:5000})
              }
            },
            err => {
              console.log(err);
              if (err.status === 403) {
                this.toast.error({ detail: "Thất Bại", summary: "Bạn không có quyền", duration: 5000 });
              } else {
                this.toast.error({ detail: "Thất Bại", summary: "Có lỗi xảy ra", duration: 5000 });
              }
            }
        )
            



            // this._api.post('/api/admin/create-news', obj).subscribe(res => {
            //   if (res && res.data) {
            //     this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
            //     this.LoadData(this.pageSize);
            //     this.dongModal();
            //   } else {
            //     this.toast.error({detail:"Thất Bại",summary:"Thêm mới thất bại",duration:5000})
            //   }
            // });
          }
        })
      }
      else{
        this._api.postAuthor('/api/admin/create-news', obj,this.user.token).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Thêm mới thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất bại",summary:"Có lỗi xảy ra",duration:5000})
          }
        },
        err => {
          console.log(err);
          if (err.status === 403) {
            this.toast.error({ detail: "Thất Bại", summary: "Bạn không có quyền", duration: 5000 });
          } else {
            this.toast.error({ detail: "Thất Bại", summary: "Có lỗi xảy ra", duration: 5000 });
          }
        }
    )

      }
    }
    else{
      obj.news.IdNews=this.news.idNews;
      obj.news.IdNguoiDung=this.authenticationService.userValue.idNguoiDung;

      if(this.file){
        this._api.uploadFileSingle('/api/upload/upload-single', 'news', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            obj.news.Anh=res.body.filePath;
            this._api.putAuthor('/api/admin/update-news', obj,this.user.token).subscribe(res => {
              if (res && res.data) {
                this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
                this.LoadData(this.pageSize);
                this.dongModal();
              } else {
                this.toast.error({detail:"Thất bại",summary:"Có lỗi xảy ra",duration:5000})
              }
            },
            err => {
              console.log(err);
              if (err.status === 403) {
                this.toast.error({ detail: "Thất Bại", summary: "Bạn không có quyền", duration: 5000 });
              } else {
                this.toast.error({ detail: "Thất Bại", summary: "Có lỗi xảy ra", duration: 5000 });
              }
            }
        )
          }
        });

      }else{
        obj.news.Anh=this.anhTinTuc;
        this._api.putAuthor('/api/admin/update-news', obj,this.user.token).subscribe(res => {
          if (res && res.data) {
            this.toast.success({detail:"Thành Công",summary:"Cập nhật thành công",duration:5000})
            this.LoadData(this.pageSize);
            this.dongModal();
          } else {
            this.toast.error({detail:"Thất bại",summary:"Có lỗi xảy ra",duration:5000})
          }
        },
        err => {
          console.log(err);
          if (err.status === 403) {
            this.toast.error({ detail: "Thất Bại", summary: "Bạn không có quyền", duration: 5000 });
          } else {
            this.toast.error({ detail: "Thất Bại", summary: "Có lỗi xảy ra", duration: 5000 });
          }
        }
    )
      }
      
    }
    
  }
  public dongModal() {
    $('#hienthiModal').closest('.modal').modal('hide');
  }

  ngAfterViewInit(): void {
      
  }

}

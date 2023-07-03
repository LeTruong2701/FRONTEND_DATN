import { SendService } from './../../../core/service/send.service';
import { HeaderComponent } from './../../../shared/layout/header/header.component';
import { BaseComponent } from './../../../core/common/base-component';
import { AfterViewInit, Component, Injector, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { SharedService } from 'src/app/core/service/shared.service';
declare var $: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends BaseComponent implements OnInit  {




  public keyword:string = this.sharedService.getKeyword();
  public loc: any;
  public idthuonghieu: any;
  public page: any = 1;
  public id: any;
  public pageSize: any = 6;
  public list_item: any;
  public totalItem: any;

  public list_thuonghieu:any;

  public id_danh_muc:any;
  constructor(injector: Injector,private _send:SendService,private sharedService: SharedService) {
    super(injector);
  }

 

 

  ngOnInit(): void {
    window.scrollTo(0,0);
    // this.keyword = this.sharedService.getKeyword();
    // Từ khóa mặc định
    
    
    this.loadData(this.pageSize);

    this.sharedService.keywordChanged.subscribe(keyword => {
      this.keyword = keyword;
      console.log(this.keyword)
      this.loadData(this.pageSize)
     
    });

    this.loadScripts('../assets/js/jquery-3.3.1.min.js', '../assets/js/bootstrap.min.js', '../assets/js/jquery-ui.min.js', '../assets/js/jquery.countdown.min.js',
      '../assets/js/jquery.nice-select.min.js', '../assets/js/jquery.zoom.min.js', '../assets/js/jquery.dd.min.js', '../assets/js/jquery.slicknav.js',
      '../assets/js/owl.carousel.min.js', '../assets/js/main.js'
    );
  }

  ngAfterViewInit(): void {
    
  }
  
  public isKeywordChanged:any;



  public loadPage(page: any) {
    this._api.post('/api/shop/search', {loc: this.loc,  page: page, pageSize: this.pageSize, id_danh_muc: this.id,keyword1: this.keyword,idthuonghieu:this.idthuonghieu }).subscribe(res => {
      this.list_item = res.data;
      this.totalItem = res.totalItem;
    });
  }

  public loadData(pageSize:number){
    // const idThuongHieu = localStorage.getItem('id_thuonghieu');
    // const label = $('.filter-widget .fw-brand-check label').find(`[data-id=${idThuongHieu}]`);
    // if (label.length) {
    //   label.addClass('activesize');
    // }
    // console.log(label)

    const loc = localStorage.getItem('loc');
    
    // your existing code to load data goes here
     this.pageSize = pageSize;

    
  //  this.keyword = this.sharedService.getKeyword();
    console.log(this.keyword);
    

    this.loc = localStorage.getItem('loc') || '';
    this.idthuonghieu = localStorage.getItem('id_thuonghieu') || '';
    this._route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id!=null){
        this.keyword="";
        this._api.post('/api/shop/search', { loc: this.loc, page: this.page, pageSize: this.pageSize,id_danh_muc: this.id,keyword1: this.keyword ,idthuonghieu:this.idthuonghieu}).subscribe(res => {
          this.list_item = res.data;
          this.totalItem = res.totalItem;
          console.log(this.list_item);
          
        })
      }else{
        this._api.post('/api/shop/search', { loc: this.loc, page: this.page, pageSize: this.pageSize,id_danh_muc: this.id,keyword1: this.keyword ,idthuonghieu:this.idthuonghieu}).subscribe(res => {
          this.list_item = res.data;
          this.totalItem = res.totalItem;
          console.log(this.list_item);
          
        })
      }
      
      localStorage.removeItem('id_thuonghieu');
    });

    this._api.get('/api/shop/get-listthuonghieu').subscribe(res => {
      this.list_thuonghieu = res;
      this.totalItem = res.totalItem;
      console.log(this.list_thuonghieu);
      
    })

  
    // đặt trạng thái hoạt động của nhãn với id phù hợp
    // if (idThuongHieu && loc) {
    //   $(`.bc-calvin[data-id="${idThuongHieu}"][data-loc="${loc}"]`).addClass('activesize');
    // }
  }
 
  
  

  setDieuKienLoc(loc: any) {
    window.scrollTo(0,0);
    this.loc = loc;
    localStorage.setItem('loc',loc); 
    this.loadData(this.pageSize);
    localStorage.removeItem('dulieusearch');
    
  }


  public chonThuongHieu(tenThuongHieu: any, idThuongHieu: any, event: any, loc: string) {
    // Thêm hoặc xóa class activesize cho target (label được click)
    $(event.target).toggleClass('activesize');
  
    if ($(event.target).hasClass('activesize')) {
      // Đặt 'id_thuonghieu' và 'loc' vào localStorage nếu có class activesize
      localStorage.setItem('id_thuonghieu', idThuongHieu);
      localStorage.setItem('loc', loc);
      this.loadData(this.pageSize)
      
    console.log(localStorage.getItem('id_thuonghieu'))
      // Lấy danh sách tất cả các label trong div .fw-brand-check
      const labels = $('.filter-widget .fw-brand-check label');
  
      // Loại bỏ class activesize từ các label trừ label mới được chọn
      labels.not(event.target).removeClass('activesize');
    } else {
      // Xóa 'id_thuonghieu' và 'loc' khỏi localStorage nếu không có class activesize
   
    localStorage.removeItem('id_thuonghieu')
    localStorage.removeItem('loc')
       console.log(localStorage.getItem('id_thuonghieu'))
      
    }
   
    
  }

// public loadData(pageSize:any) {

  //  this.pageSize = pageSize;

  // //  this.keyword = this.sharedService.getKeyword();
  //   console.log(this.keyword);
  //   this.loc = localStorage.getItem('loc') || '';
  //   this.idthuonghieu = localStorage.getItem('id_thuonghieu') || '';
  //   this._route.params.subscribe(params => {
  //     this.id = params['id'];
  //     this._api.post('/api/shop/search', { loc: this.loc, page: this.page, pageSize: this.pageSize,id_danh_muc: this.id,keyword1: this.keyword ,idthuonghieu:this.idthuonghieu}).subscribe(res => {
  //       this.list_item = res.data;
  //       this.totalItem = res.totalItem;
  //       console.log(this.list_item);
        
  //     })
  //   });
  //   this._api.get('/api/shop/get-listthuonghieu').subscribe(res => {
  //     this.list_thuonghieu = res;
  //     this.totalItem = res.totalItem;
  //     console.log(this.list_thuonghieu);
      
  //   })


  //   localStorage.removeItem('loc');

  //   localStorage.removeItem('dulieusearch');
   
  //   // this._api.post('/api/shop/search', { loc: this.loc, page: this.page, pageSize: this.pageSize, id_danh_muc: this.id ,keyword1:this.keyword}).subscribe(res => {
  //   //   this.list_item = res.data;
  //   //   this.totalItem = res.totalItem;
  //   // });
  // }

  
  // public chonThuongHieu(tenThuongHieu:any,idThuongHieu:any,event:any,loc:string){
  //   $(event.target).toggleClass('activesize');

  //   if ($(event.target).hasClass('activesize')) {
  //     // set 'id_thuonghieu' to localStorage if label is active
  //     localStorage.setItem('id_thuonghieu', idThuongHieu);
  //   localStorage.setItem('loc',loc); 
  //   this.loadData(this.pageSize);

  //   } else {
  //     // remove 'id_thuonghieu' from localStorage if label becomes inactive
  //     localStorage.removeItem('id_thuonghieu');
  //     localStorage.removeItem('loc');
  //     this.loadData(this.pageSize);
  //   }
  
  //   // remove class 'activesize' from all labels except the clicked one
  //   $('.bc-calvin').not(event.target).removeClass('activesize');

  // }


  // public chonThuongHieu(tenThuongHieu:any, idThuongHieu:any, event:any, classBgColor:any) {
  //   var target = event.target || event.srcElement;
  //   if (target.className.indexOf(classBgColor) < 0) {
  //     target.classList.add(classBgColor);
  //   } else {
  //     target.classList.remove(classBgColor);
  //   }
  // }



  // public chonThuongHieu(tenThuongHieu:any,idThuongHieu:any,event:any,loc:string){
  //   $(event.target).toggleClass('activesize');
  
  //   if ($(event.target).hasClass('activesize')) {
  //     // đặt 'id_thuonghieu' thành localStorage nếu có class activesize
  //     localStorage.setItem('id_thuonghieu', idThuongHieu);
  //     localStorage.setItem('loc',loc); 
  
  //   } else {
  //     // xóa 'id_thuonghieu' khỏi localStorage nếu nhãn không hoạt động
  //     localStorage.removeItem('id_thuonghieu');
  //     localStorage.removeItem('loc');
  //   }

  // }
  

}

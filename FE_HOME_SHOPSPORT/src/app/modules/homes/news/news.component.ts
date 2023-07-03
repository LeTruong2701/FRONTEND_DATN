import { BaseComponent } from 'src/app/core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends BaseComponent implements OnInit {


  public page: any = 1;
  public id: any;
  public pageSize: any = 4;
  public list_news: any;
  public list_dangganday: any;
  public totalItem: any;
  public frmSearch!: FormGroup;

  constructor(injector: Injector) {
    super(injector);
    this.frmSearch = new FormGroup({
      'txt_tenloaitin': new FormControl(''),
    });

  }


  ngOnInit():void {
    this.loadData(this.pageSize)

    this.frmSearch = new FormGroup({
      'txt_tenloaitin': new FormControl(''),
    });

    localStorage.removeItem('locnews');

    this.loadScripts('../assets/js/jquery-3.3.1.min.js', '../assets/js/bootstrap.min.js', '../assets/js/jquery-ui.min.js', '../assets/js/jquery.countdown.min.js',
      '../assets/js/jquery.nice-select.min.js', '../assets/js/jquery.zoom.min.js', '../assets/js/jquery.dd.min.js', '../assets/js/jquery.slicknav.js',
      '../assets/js/owl.carousel.min.js', '../assets/js/main.js'
    );
  }


  public loadPage(page: any) {
    this._api.post('/api/home/search-news', { page: page, pageSize: this.pageSize}).subscribe(res => {
      this.list_news = res.data;
      this.totalItem = res.totalItem;
    });
  }


  public loadData(pageSize:number){
    this.pageSize=pageSize

    const locnews = localStorage.getItem('locnews');
    this._api.post('/api/home/search-news', { page: this.page, pageSize: this.pageSize, ten : this.frmSearch.value['txt_tenloaitin'],locnews:this.locnews}).subscribe(res => {
      this.list_news = res.data;
      this.totalItem = res.totalItem;
    });
    
    this._api.get('/api/home/get-newsmoi').subscribe(res=>{
      this.list_dangganday=res;
      console.log(this.list_dangganday);
    })
  }

  public locnews:any;
  setDieuKienLoc(locnews: any) {
    window.scrollTo(0,0);
    this.locnews = locnews;
    localStorage.setItem('locnews',locnews); 
    this.loadData(this.pageSize);

    
  }


}

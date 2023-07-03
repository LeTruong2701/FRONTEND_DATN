import { BaseComponent } from './../../../core/common/base-component';
// import { Component, OnInit } from '@angular/core';

import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit {


  public list_item:any;

  public list_item_ao:any;

  public list_item_quan:any;
  public list_item_phukien:any;


  constructor( injector: Injector) {
    super(injector);
   }

  ngOnInit() {
    window.scrollTo(0,0);
    this._api.get('/api/home/get-sanphammoi').subscribe(res => {
      this.list_item = res;
      console.log(this.list_item);
      setTimeout(() => {
        this.loadScripts('assets/js/jquery-3.3.1.min.js','assets/js/bootstrap.min.js','assets/js/jquery-ui.min.js',
        'assets/js/jquery.countdown.min.js','assets/js/jquery.nice-select.min.js','assets/js/jquery.zoom.min.js',
        'assets/js/jquery.dd.min.js','assets/js/jquery.slicknav.js','assets/js/owl.carousel.min.js',
        'assets/js/main.js' ); 
      });
    });

    this._api.get('/api/home/get-aothethao').subscribe(res=>{
      this.list_item_ao=res;
      console.log(this.list_item_ao);
    })


    this._api.get('/api/home/get-quanthethao').subscribe(res=>{
      this.list_item_quan=res;
      console.log(this.list_item_quan);
    })

    this._api.get('/api/home/get-phukienthethao').subscribe(res=>{
      this.list_item_phukien=res;
      console.log(this.list_item_phukien);
    })

   
  }
}

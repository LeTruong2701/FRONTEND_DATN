import { BaseComponent } from 'src/app/core/common/base-component';
import { Component, Injector, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailnews',
  templateUrl: './detailnews.component.html',
  styleUrls: ['./detailnews.component.css']
})
export class DetailnewsComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  public item:any
  ngOnInit() :void{

    window.scrollTo(0,0);
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/home/get-by-id-news/' + id).subscribe(res => {
        this.item = res;
  
        console.log(this.item);
        // debugger;
        // setTimeout(() => {
        //   this.loadScripts('/assets/js/jquery-3.3.1.min.js','/assets/js/bootstrap.min.js','/assets/js/jquery-ui.min.js','/assets/js/jquery.countdown.min.js',
        //   '/assets/js/jquery.nice-select.min.js','/assets/js/jquery.zoom.min.js','/assets/js/jquery.dd.min.js','/assets/js/jquery.slicknav.js',
        //   '/assets/js/owl.carousel.min.js','/assets/js/main.js'
        //   );
      
        // });
      });

      
    });
    
  }

}

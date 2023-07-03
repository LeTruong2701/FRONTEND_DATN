import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-ketquathanhtoan',
  templateUrl: './ketquathanhtoan.component.html',
  styleUrls: ['./ketquathanhtoan.component.css']
})
export class KetquathanhtoanComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector,private route: ActivatedRoute) { 
    super(injector);
  }

  ngOnInit() {
    window.scrollTo(0,0);
  }

}

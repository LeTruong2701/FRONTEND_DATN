import { BaseComponent } from 'src/app/core/common/base-component';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallfunctionService extends BaseComponent{


    constructor(injector: Injector) {
        super(injector);
    }

    public pageSize:any;
    public loc:any;
    public id:any;
    public keyword:any;
    public list_item:any;
    public totalItem:any;

    public loadData(pageSize:any,keyword:any,loc:any,id:any) {
        this.pageSize = pageSize;
        this.keyword=keyword;
        this.loc=loc;
        this.id=id;
         this._api.post('/api/shop/search', { loc: this.loc, page: 1, pageSize: pageSize, id_danh_muc: this.id ,keyword1:this.keyword}).subscribe(res => {
           this.list_item = res.data;
           this.totalItem = res.totalItem;
         });
       }
}
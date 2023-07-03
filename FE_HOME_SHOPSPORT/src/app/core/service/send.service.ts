import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SendService {
  private objSubject = new BehaviorSubject<any>(null);
  objs = this.objSubject.asObservable();
  constructor() {
    this.objSubject.next(null); 
  }

  addObjct(item:any) {
    this.objSubject.next(item);
  }


  
  //theo dõi dữ liệu search

 
  // private reloadSource = new BehaviorSubject<boolean>(false);
  // public reload$ = this.reloadSource.asObservable();
  // private isReloading = false;


  // public reload() {
  //   if (!this.isReloading) {
  //     this.isReloading = true;
  //     this.reloadSource.next(this.isReloading);
  //     setTimeout(() => {
  //       this.isReloading = false;
  //     }, 1000);
  //   }
  // }
  
}

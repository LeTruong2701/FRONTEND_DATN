import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private keyword: string = "";

  private keywordSource = new BehaviorSubject<string>('');
  currentKeyword = this.keywordSource.asObservable();

 

  constructor() { }

  getKeyword(): string {
    return this.keyword;
  }

  setKeyword1(keyword: string): void {
    this.keyword = keyword;
  }

  changeKeyword(keyword: string) {
    this.keywordSource.next(this.keyword);
  }


  public keywordChanged: EventEmitter<string> = new EventEmitter<string>();
  setKeyword(keyword: string) {
    // Set keyword value
    this.keyword = keyword;

    // Emit keywordChanged event
    this.keywordChanged.emit(keyword);
  }


  private soluongiohang: number = 0;
  public soluongGioHang: EventEmitter<number> = new EventEmitter<number>();
  setSoLuongGioHang(soluonggiohang: number) {
    // Set keyword value
    this.soluongiohang = soluonggiohang;

    // Emit keywordChanged event
    this.soluongGioHang.emit(soluonggiohang);
    console.log(soluonggiohang)
  }

  getSoLuongGioHang(): number {
    return this.soluongiohang;
    
  }


}
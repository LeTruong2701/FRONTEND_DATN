import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!local_storage) {
      local_storage = [];
    }
  }
  
  public addToCart(item:any) {
    // item.quantity = 1;
    // item.size=localStorage.getItem('size');
    var quantity:number;
    let local_storage:any;
    if (localStorage.getItem('cart') == null) {
      local_storage = [item];
    }else {
      local_storage = JSON.parse(localStorage.getItem('cart')|| '[]');
      let ok = true;
      for (let x of local_storage) {
        if (x.idSanPham == item.idSanPham &&x.idMauSanPham==item.idMauSanPham&&x.size==item.size) {
          x.quantity += item.quantity;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(item); 
      } 
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    localStorage.setItem('size','');
  }


  

  public getItems() {
    if (localStorage.getItem('cart') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  public deleteItem(idSanPham :any) {
    let local_storage = this.getItems().filter((x:any) => x.idSanPham != idSanPham);
    localStorage.setItem('cart', JSON.stringify(local_storage));
  }

  public addQty(item:any) {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
    for (let x of local_storage) {
      if (x.idSanPham == item.idSanPham) {
        x.quantity = item.quantity;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
  }

  public numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
    return local_storage.length;
  }

  public clearCart() {
   localStorage.clear();
  }
}
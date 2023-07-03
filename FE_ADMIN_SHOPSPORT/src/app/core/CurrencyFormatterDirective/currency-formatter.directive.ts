import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormatter]'
})
export class CurrencyFormatterDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    let formattedValue = '';

    // Xóa các ký tự không phải số khỏi chuỗi giá trị
    value = value.replace(/[^0-9]/g, '');

    // Định dạng giá trị bằng hàm toLocaleString()
    if (value.length > 0) {
      const numberValue = parseInt(value);
      formattedValue = numberValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    // Gán giá trị đã định dạng vào input element
    this.el.nativeElement.value = formattedValue;
  }
}
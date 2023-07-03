import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
    
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent }
    ])
  ]
})
export class ShoppingModule { }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  orderItems: any[] = []; // TODO: add type here

  month = '';

  constructor() {
    console.warn('Add types for `this.orderItems`.');
  }

  ngOnInit() {
    for (let i = 1; i <= 5; i++) {
      this.orderItems.push({ name: `name ${i}`, qty: i * 2, price: i * 2 });
    }
  }
}

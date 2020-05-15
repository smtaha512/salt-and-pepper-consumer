import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  onClick(event: MouseEvent, order) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}

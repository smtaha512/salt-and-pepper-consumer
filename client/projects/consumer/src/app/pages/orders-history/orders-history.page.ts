import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersHistoryPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  onClick(event: MouseEvent, order) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}

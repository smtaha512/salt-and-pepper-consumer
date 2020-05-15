import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPage implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  onClick(event: MouseEvent, order) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

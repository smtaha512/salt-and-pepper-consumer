import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.page.html',
  styleUrls: ['./checkout-success.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutSuccessPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}

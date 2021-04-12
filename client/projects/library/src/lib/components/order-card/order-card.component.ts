import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { OrderInterface } from '../../models/order.interface';

@Component({
  selector: 'lib-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCardComponent implements OnInit {
  @Input() order: OrderInterface;

  @ContentChild(TemplateRef, { static: true }) button: TemplateRef<IonButton>;
  constructor() {}

  ngOnInit() {}
}

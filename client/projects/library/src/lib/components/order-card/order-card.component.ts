import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'lib-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCardComponent implements OnInit {
  @Input() order: any; // TODO: add type here

  @ContentChild(TemplateRef, { static: true }) button: TemplateRef<IonButton>;
  constructor() {}

  ngOnInit() {}
}

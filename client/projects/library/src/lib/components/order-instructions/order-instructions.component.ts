import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { PreferencesEnum } from '../../models/preferences.enum';

@Component({
  selector: 'lib-order-instructions',
  templateUrl: './order-instructions.component.html',
  styleUrls: ['./order-instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInstructionsComponent implements OnInit {
  @Input() orderItems: any[];

  readonly preferences = PreferencesEnum;

  constructor() {}

  ngOnInit() {}
}

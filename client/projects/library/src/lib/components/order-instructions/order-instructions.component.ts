import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-order-instructions',
  templateUrl: './order-instructions.component.html',
  styleUrls: ['./order-instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInstructionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

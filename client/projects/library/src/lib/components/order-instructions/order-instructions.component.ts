import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';

import { PreferencesEnum } from '../../models/preferences.enum';

@Component({
  selector: 'lib-order-instructions',
  templateUrl: './order-instructions.component.html',
  styleUrls: ['./order-instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInstructionsComponent implements OnInit {
  @Input() orderItems: any[]; // TODO: Add type here

  readonly preferences = PreferencesEnum;

  constructor(private readonly elem: ElementRef<HTMLElement>) {}

  ngOnInit() {}

  onItemClick(id: string) {
    const event = new CustomEvent('itemClick', { detail: { id }, bubbles: true });
    this.elem.nativeElement.dispatchEvent(event);
  }

  preferenceColor(item: { preference: PreferencesEnum }) {
    return item.preference === PreferencesEnum.HOT ? 'danger' : item.preference === PreferencesEnum.SPICY ? 'warning' : 'success';
  }

  trackByFn(index: number, item: { _id: string }) {
    return item?._id ?? index;
  }
}

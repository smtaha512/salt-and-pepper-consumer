import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { PredefinedColors } from '@ionic/core';
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
    const preferenceColorMap: Record<PreferencesEnum, PredefinedColors> = {
      [PreferencesEnum.EXTRA_HOT]: 'danger',
      [PreferencesEnum.HOT]: 'danger',
      [PreferencesEnum.MEDIUM_HOT]: 'warning',
      [PreferencesEnum.MEDIUM]: 'warning',
      [PreferencesEnum.MILD]: 'success',
      [PreferencesEnum.NO_SPICE]: 'success',
    };
    const color = preferenceColorMap[item.preference];
    if (!item.preference) {
      throw new Error('Method not implemented');
    }
    return color;
  }

  trackByFn(index: number, item: { _id: string }) {
    return item?._id ?? index;
  }
}

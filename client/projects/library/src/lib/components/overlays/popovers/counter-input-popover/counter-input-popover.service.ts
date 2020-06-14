import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { CounterInputPopoverComponentInterface } from './counter-input-popover.component';

@Injectable()
export class CounterInputPopoverService {
  constructor(private readonly popoverController: PopoverController) {}

  async present(options: CounterInputPopoverComponentInterface) {
    const componentProps: Partial<CounterInputPopoverComponentInterface> = { ...options };
    const component = await import('./counter-input-popover.component').then((c) => c.CounterInputPopoverComponent);
    this.popoverController.create({ component, componentProps }).then((popover) => popover.present());
  }
}

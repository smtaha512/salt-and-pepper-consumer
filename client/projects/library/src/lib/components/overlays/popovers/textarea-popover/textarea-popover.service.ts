import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { TextareaPopoverComponentInterface } from './textarea-popover.component';

@Injectable({ providedIn: 'root' })
export class TextareaPopoverService {
  constructor(private readonly popoverController: PopoverController) {}

  async present(options: TextareaPopoverComponentInterface) {
    const componentProps: TextareaPopoverComponentInterface = { ...options };
    const component = await import('./textarea-popover.component').then((c) => c.TextareaPopoverComponent);
    this.popoverController.create({ component, componentProps }).then((popover) => popover.present());
  }
}

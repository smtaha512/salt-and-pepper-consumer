import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class CustomizeMenuPopoverService {
  constructor(private readonly popoverController: PopoverController) {}

  async present() {
    const component = await import('./customize-menu-popover.component').then((c) => c.CustomizeMenuPopoverComponent);
    this.popoverController.create({ component }).then((popover) => popover.present());
  }
}

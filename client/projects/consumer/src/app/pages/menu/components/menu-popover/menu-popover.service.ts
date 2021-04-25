import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class MenuPopoverService {
  constructor(private readonly popoverController: PopoverController) {}

  async present(event: Event) {
    const component = await import('./menu-popover.component').then((c) => c.MenuPopoverComponent);
    this.popoverController.create({ component, event }).then((popover) => popover.present());
  }
}

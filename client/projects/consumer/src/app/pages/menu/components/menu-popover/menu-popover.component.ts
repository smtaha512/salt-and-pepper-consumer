import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CustomizeMenuPopoverService } from '../customize-menu-popover/customize-menu-popover.service';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPopoverComponent implements OnInit {
  constructor(private readonly popoverController: PopoverController, private readonly menuCustomizer: CustomizeMenuPopoverService) {}

  ngOnInit() {}

  async showCustomizer() {
    this.popoverController.dismiss();
    this.menuCustomizer.present();
  }
}

import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IonTabButton } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage implements OnInit {
  readonly tabs = [
    { tab: 'orders-history', icon: 'calendar-outline', label: 'Recent orders' },
    { tab: 'menu', icon: 'menu-outline', label: 'Menu' },
    { tab: 'cart', icon: 'cart-outline', label: 'Cart' },
  ];

  readonly selectedTab$: BehaviorSubject<Record<'tab', string>> = new BehaviorSubject(this.tabs[0]);

  @ViewChild(IonTabButton) ionTabs: IonTabButton & { el: HTMLElement };

  constructor() {}

  ngOnInit() {}

  getTransform(tab: Record<'tab', string>) {
    const nativeElement = this.ionTabs && this.ionTabs.el;
    if (!nativeElement) {
      return;
    }
    const left = nativeElement.offsetLeft;
    const width = nativeElement.clientWidth;
    const index = this.tabs.findIndex((item) => item.tab === tab.tab);
    const TOTAL_PADDING = 24;
    // 24 is subtracted because 12 px is added as padding on left and right side each
    // 12 is added to accomodate padding
    return { width: width - TOTAL_PADDING + 'px', transform: `translate(${TOTAL_PADDING / 2 + left + width * (!tab ? 0 : index)}px)` };
  }
}

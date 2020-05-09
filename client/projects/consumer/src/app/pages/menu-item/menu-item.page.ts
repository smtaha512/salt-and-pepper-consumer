import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}

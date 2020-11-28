import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize-menu-popover',
  templateUrl: './customize-menu-popover.component.html',
  styleUrls: ['./customize-menu-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeMenuPopoverComponent implements OnInit {
  menu = ['Pakistani Menu'].map((item, idx) => ({
    id: `id${idx}`,
    name: item,
    disabled: ((name) => {
      const lowerCasedName = name.toLowerCase();
      return !(lowerCasedName.includes('indian') || lowerCasedName.includes('pakistan'));
    })(item),
  }));
  constructor() {}

  ngOnInit() {}
}

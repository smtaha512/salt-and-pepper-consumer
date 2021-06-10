import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { togglePakistaniMenu } from '../../../../+state/user/user.actions';
import { showPakistaniMenu } from '../../../../+state/user/user.selectors';

@Component({
  selector: 'app-customize-menu-popover',
  templateUrl: './customize-menu-popover.component.html',
  styleUrls: ['./customize-menu-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeMenuPopoverComponent implements OnInit {
  readonly showPakistaniMenu$ = this.store.pipe(
    select(showPakistaniMenu),
    map((value) => ({ value }))
  );
  menu = ['Pakistani Menu'].map((item, idx) => ({
    id: `id${idx}`,
    name: item,
    disabled: ((name) => {
      const lowerCasedName = name.toLowerCase();
      return !(lowerCasedName.includes('indian') || lowerCasedName.includes('pakistan'));
    })(item),
  }));
  constructor(private readonly store: Store<any>) {}

  ngOnInit() {}

  handleClick(current: boolean) {
    this.store.dispatch(togglePakistaniMenu({ value: !current }));
  }
}

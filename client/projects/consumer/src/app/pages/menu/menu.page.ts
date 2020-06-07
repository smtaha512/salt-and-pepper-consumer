import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ItemInterface, MenuInterface, isNotEmpty } from 'dist/library';
import { loadMenuItems } from '../menu-item/+state/menu-item.actions';
import { menuItems } from '../menu-item/+state/menu-item.selectors';
import { loadMenus } from './+state/menu.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit {
  firstMenu$: Observable<MenuInterface>;
  menuItems$: Observable<Array<ItemInterface>>;

  constructor(private readonly store: Store<any>) {}

  ngOnInit() {
    this.dispatchInitalActions();
    this.selectStates();
  }

  dispatchInitalActions() {
    // ! A wierd bug: Does not dispact success action for first action. In this case does not dispatch success action for loadMenus.
    // ! Cause: Unknown
    this.store.dispatch(loadMenus());
    this.store.dispatch(loadMenuItems());
  }

  selectStates() {
    this.menuItems$ = this.store.pipe(select(menuItems), filter(isNotEmpty));
  }
}

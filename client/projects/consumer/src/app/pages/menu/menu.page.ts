import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, pluck, switchMap } from 'rxjs/operators';

import { ItemInterface, MenuInterface, isNotEmpty } from 'dist/library';
import { loadMenuItems } from '../menu-item/+state/menu-item.actions';
import { menuItemsByMenuId } from '../menu-item/+state/menu-item.selectors';
import { loadMenus } from './+state/menu.actions';
import { firstMenu } from './+state/menu.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit {
  firstMenu$: Observable<MenuInterface>;
  menuItems$: Observable<Array<ItemInterface & { imgLoaded?: boolean }>>;
  constructor(private readonly store: Store<any>) {}

  ngOnInit() {
    this.dispatchInitalActions();
    this.selectStates();
  }

  dispatchInitalActions() {
    this.store.dispatch(loadMenus());
    this.store.dispatch(loadMenuItems());
  }

  selectStates() {
    this.firstMenu$ = this.store.pipe(select(firstMenu), filter(isNotEmpty));

    this.menuItems$ = this.firstMenu$.pipe(
      pluck('_id'),
      switchMap((menuId: string) => this.store.pipe(select(menuItemsByMenuId(menuId)), filter(isNotEmpty)))
    );
  }
}

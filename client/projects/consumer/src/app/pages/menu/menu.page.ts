import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuInterface } from 'dist/library';
import { loadMenus } from './+state/menu.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit {
  constructor(private readonly store: Store<MenuInterface>) {}

  ngOnInit() {
    this.store.dispatch(loadMenus());
  }
}

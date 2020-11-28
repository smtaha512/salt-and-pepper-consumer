import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { isNotEmpty, ItemInterface, MenuInterface } from 'dist/library';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, pluck, switchMap } from 'rxjs/operators';
import { loadMenuItems } from '../menu-item/+state/menu-item.actions';
import { menuItemsByMenuId } from '../menu-item/+state/menu-item.selectors';
import { loadMenus } from './+state/menu.actions';
import { firstMenu } from './+state/menu.selectors';
import { MenuPopoverService } from './components/menu-popover/menu-popover.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit {
  firstMenu$: Observable<MenuInterface>;
  menuItems$: Observable<Array<ItemInterface>>;

  current$ = new BehaviorSubject('APPETIZER');
  segments = ['APPETIZER', 'SALAD / CONDIMENTS', 'SOUPS (G)', 'BREADS', 'Indian Menu', 'DESSERTS', 'Pakistani Menu'].map((item, idx) => ({
    id: `id${idx}`,
    name: item,
  }));

  constructor(
    private readonly store: Store<any>,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly menuPopover: MenuPopoverService
  ) {}

  ngOnInit() {
    this.dispatchInitalActions();
    this.selectStates();
  }

  dispatchInitalActions() {
    // ! A wierd bug: Does not dispatch success action for first action. In this case does not dispatch success action for loadMenus.
    // ! Cause: Unknown
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

  trackBy(idx: number, item: string) {
    return idx ?? item;
  }

  handleSlideChange(slides: IonSlides) {
    this.updateCurrentSegment(slides);
    this.moveCurrentSegmentIntoView(slides);
  }

  private updateCurrentSegment(slides: IonSlides) {
    slides.getActiveIndex().then((idx) => {
      this.current$.next(this.segments[idx].name);
    });
  }

  private moveCurrentSegmentIntoView(slides: IonSlides) {
    slides.getActiveIndex().then((idx) => {
      this.document.querySelector(`#${this.segments[idx].id}`).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    });
  }

  showPopover(event: Event) {
    this.menuPopover.present(event);
  }
}

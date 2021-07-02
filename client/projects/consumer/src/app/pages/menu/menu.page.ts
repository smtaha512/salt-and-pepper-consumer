import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Device } from '@capacitor/device';
import { isNotEmpty, ItemInterface, MenuInterface } from 'dist/library';
import { BehaviorSubject, from, Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { showPakistaniMenu } from '../../+state/user/user.selectors';
import { loadMenus } from './+state/menu.actions';
import { menus } from './+state/menu.selectors';
import { MenuPopoverService } from './components/menu-popover/menu-popover.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements OnInit, OnDestroy {
  private readonly subs = new Subscription();
  current$ = new BehaviorSubject('');
  menus$: Observable<MenuInterface[]> = this.menuService.menuWithItems().pipe(
    filter(isNotEmpty),

    shareReplay({ refCount: true, bufferSize: 1 })
  );
  menuItems$: Observable<ItemInterface[]> = of([]);
  isiOS = Device.getInfo().then((info) => info.operatingSystem === 'ios');

  private initalItems: { element: HTMLIonSegmentButtonElement; distanceFromOrigin: number }[];

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly menuPopover: MenuPopoverService,
    private readonly menuService: MenuService,
    private readonly cd: ChangeDetectorRef,
    private readonly store: Store<any>
  ) {}

  ngOnInit() {
    this.fetchMenu();
  }

  fetchMenu() {
    this.store.dispatch(loadMenus());
    this.menus$ = this.store.pipe(
      select(menus),
      filter(isNotEmpty),
      tap((fetchedMenus) => this.updateCurrentSegment(fetchedMenus[0]._id)),
      switchMap((menu) =>
        this.store.pipe(
          select(showPakistaniMenu),
          map((shouldShowPakistaniMenu) =>
            shouldShowPakistaniMenu ? menu : menu.filter((m) => !m.title.toLowerCase().includes('pakistan'))
          )
        )
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.cd.detectChanges();
  }

  trackBy(idx: number, item: string) {
    return idx ?? item;
  }

  handleSlideChange(slides: IonSlides) {
    const activeIndex$ = from(slides.getActiveIndex());
    const selectedMenu$ = activeIndex$.pipe(switchMap((activeIndex) => this.menus$.pipe(map((menuz) => menuz[activeIndex]))));
    const currentId$ = selectedMenu$.pipe(
      map((menu) => menu._id),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
    this.subs.add(currentId$.pipe(tap((id) => this.updateCurrentSegment(id))).subscribe());
    this.subs.add(currentId$.pipe(tap((id) => this.moveCurrentSegmentIntoView(id))).subscribe());
  }

  private updateCurrentSegment(id: string) {
    this.current$.next(id);
  }

  private moveCurrentSegmentIntoView(index: string) {
    const items = Array.from(this.document.querySelectorAll('ion-segment-button')).map((item, idx, original) => ({
      element: item,
      distanceFromOrigin: original.reduce((acc, curr, i) => (i >= idx ? acc : acc + curr.getBoundingClientRect().width), 0),
    }));
    this.document.querySelector('ion-segment').scrollTo({
      left: items.find((item) => item.element.id.includes(index)).distanceFromOrigin,
      behavior: 'smooth',
    });
  }

  showPopover(event: Event) {
    this.menuPopover.present(event);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

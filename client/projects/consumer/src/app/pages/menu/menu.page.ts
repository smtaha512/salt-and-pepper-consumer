import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { isNotEmpty, ItemInterface, MenuInterface } from 'dist/library';
import { BehaviorSubject, from, Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
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
    tap(([menu]) => this.current$.next(menu?._id)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  menuItems$: Observable<ItemInterface[]> = of([]);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly menuPopover: MenuPopoverService,
    private readonly menuService: MenuService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchMenu();
  }

  fetchMenu() {
    this.menus$ = this.menuService.menuWithItems().pipe(
      filter(isNotEmpty),
      tap(([menu]) => this.current$.next(menu?._id)),
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
    const currentId$ = selectedMenu$.pipe(map((menu) => menu._id));
    this.subs.add(currentId$.pipe(tap((id) => this.updateCurrentSegment(id))).subscribe());
    this.subs.add(currentId$.pipe(tap((id) => this.moveCurrentSegmentIntoView(id))).subscribe());
  }

  private updateCurrentSegment(id: string) {
    this.current$.next(id);
  }

  private moveCurrentSegmentIntoView(index: string) {
    this.document?.querySelector('#segment-'.concat(index))?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }

  showPopover(event: Event) {
    this.menuPopover.present(event);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

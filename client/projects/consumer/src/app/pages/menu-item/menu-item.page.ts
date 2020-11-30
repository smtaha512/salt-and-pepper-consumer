import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { isNotEmpty, ItemInterface, PreferencesEnum } from 'dist/library';
import { Observable, Subject } from 'rxjs';
import { filter, map, pluck, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { upsertCurrentOrderItem } from '../cart/+state/current-order-item.actions';
import { currentOrderItemById } from '../cart/+state/current-order-item.selectors';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  form: FormGroup;
  id$: Observable<string>;
  menuItem$: Observable<ItemInterface>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly store: Store<any>,
    private readonly toastController: ToastController,
    private readonly navController: NavController
  ) {}

  ngOnInit() {
    this.id$ = this.route.params.pipe(pluck('id'));

    this.menuItem$ = this.route.data.pipe(
      pluck('item'),
      tap((item) => this.preference.setValue(item.defaultPreference)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.buildForm();
    this.updateFormUsingCurrentOrderItem();
  }

  buildForm() {
    this.form = this.fb.group({
      notes: this.fb.control('', [Validators.maxLength(240)]),
      preference: this.fb.control('', [Validators.required]),
      quantity: this.fb.control(1, [Validators.required, Validators.min(1)]),
    });
  }

  updateFormUsingCurrentOrderItem() {
    this.id$
      .pipe(
        switchMap((id) => this.store.pipe(select(currentOrderItemById(id)))),
        filter(isNotEmpty),
        map(({ quantity, notes, preference }) => ({ quantity, notes, preference })),
        tap(({ notes }) => this.notes.setValue(notes)),
        tap(({ preference }) => this.preference.setValue(preference)),
        tap(({ quantity }) => this.quantity.setValue(quantity)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  onSubmit(menuItem: ItemInterface) {
    if (this.form.invalid) {
      return;
    }

    const { preference, quantity, notes } = this.form.value;
    this.store.dispatch(upsertCurrentOrderItem({ currentOrderItem: { ...menuItem, notes, preference, quantity } }));
    this.toastController
      .create({ message: 'Item added to cart', buttons: [{ text: 'OK', role: 'Cancel' }], cssClass: ['ion-toast-custom'], duration: 5000 })
      .then((toast) => toast.present())
      .then(() => this.navController.pop());

    this.resetForm();
  }

  get notes() {
    return this.form.get('notes');
  }
  get preference() {
    return this.form.get('preference');
  }
  get quantity() {
    return this.form.get('quantity');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.resetForm();
  }

  private resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.preference.setValue(PreferencesEnum.MILD);
    this.quantity.setValue(1);
  }
}

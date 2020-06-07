import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ItemInterface, PreferencesEnum } from 'dist/library';
import { addCurrentOrderItem } from '../cart/+state/current-order-item.actions';
import { menuItemById } from './+state/menu-item.selectors';
import { ToastController, NavController } from '@ionic/angular';

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

    this.menuItem$ = this.id$.pipe(
      switchMap((id) => this.store.pipe(select(menuItemById(id)))),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      notes: this.fb.control('', [Validators.maxLength(240)]),
      preference: this.fb.control(PreferencesEnum.MILD, [Validators.required]),
      quantity: this.fb.control(1, [Validators.required, Validators.min(1)]),
    });
  }

  onSubmit(menuItem: ItemInterface) {
    if (this.form.invalid) {
      return;
    }

    const { preference, quantity, notes } = this.form.value;
    this.store.dispatch(addCurrentOrderItem({ currentOrderItem: { ...menuItem, notes, preference, quantity } }));
    this.toastController
      .create({ message: 'Item added to cart', buttons: [{ text: 'OK', role: 'Cancel' }], duration: 5000 })
      .then((toast) => toast.present());
    this.navController.pop();
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

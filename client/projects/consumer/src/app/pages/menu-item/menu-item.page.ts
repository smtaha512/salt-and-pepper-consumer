import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ItemInterface, PreferencesEnum } from 'dist/library';
import { menuItemById } from './+state/menu-item.selectors';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemPage implements OnInit {
  form: FormGroup;
  menuItem$: Observable<ItemInterface>;

  constructor(private readonly store: Store<any>, private readonly route: ActivatedRoute, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.menuItem$ = this.route.params.pipe(
      pluck('id'),
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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

  get quantity() {
    return this.form.get('quantity');
  }
}

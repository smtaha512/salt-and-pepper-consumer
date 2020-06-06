import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';

enum ClickStateEnum {
  INCREMENT,
  DECREMENT,
}

@Component({
  selector: 'lib-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CounterInputComponent), multi: true }],
})
export class CounterInputComponent implements OnInit, ControlValueAccessor {
  @Input() step = 1;
  @Input() min = 0;
  @Input() max = Number.MAX_SAFE_INTEGER;

  private readonly currentValue$$ = new BehaviorSubject(0);
  private readonly isDisabled$$ = new BehaviorSubject(false);
  readonly clickState = ClickStateEnum;
  readonly value$ = this.currentValue$$.asObservable();

  onTouch: () => any = Function;
  onChange: (value: number) => any = (value: number) => {};

  writeValue(value: number): void {
    this.currentValue$$.next(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled$$.next(isDisabled);
  }

  onClick(state: ClickStateEnum) {
    const change = state === ClickStateEnum.DECREMENT ? -this.step : +this.step;
    const destroyed$ = new Subject();

    const decrementer = this.value$.pipe(filter((value) => state === ClickStateEnum.INCREMENT && value < this.max));
    const incrementer = this.value$.pipe(filter((value) => state === ClickStateEnum.DECREMENT && value > this.min));

    merge(incrementer, decrementer)
      .pipe(
        first(),
        map((value) => value + change),
        tap((nextValue) => this.currentValue$$.next(nextValue)),
        tap((value) => this.onChange(value)),
        takeUntil(destroyed$),
        tap((_) => destroyed$.next())
      )
      .subscribe();
  }

  ngOnInit() {}
}

import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'lib-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateRangePickerComponent), multi: true }],
})
export class DateRangePickerComponent implements OnInit, ControlValueAccessor {
  constructor(private readonly cd: ChangeDetectorRef) {}

  /** Set default value for `from`. The accepted format is `YYYY-MM-DD` */
  @Input() from: string;
  /** Set default value for `to`. The accepted format is `YYYY-MM-DD` */
  @Input() to: string;
  // tslint:disable-next-line: variable-name
  __disabled = false;

  onTouched: () => any = Function;
  onChange: (value: Record<'from' | 'to', string>) => any = () => {};

  ngOnInit() {}

  onValueChange() {
    this.onChange({ from: this.from, to: this.to });
  }

  writeValue({ from, to }: Record<'from' | 'to', string>): void {
    this.from = from;
    this.to = to;

    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.__disabled = isDisabled;

    this.cd.markForCheck();
  }

  get disabled() {
    return this.__disabled;
  }
}

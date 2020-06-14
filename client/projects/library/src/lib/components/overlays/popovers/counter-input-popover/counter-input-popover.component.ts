import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { EMPTY, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

export interface CounterInputPopoverComponentInterface {
  onChange: (quantity: number) => void;
  quantity: number;
  subtitle: string;
  title: string;
}

@Component({
  selector: 'lib-counter-input-popover',
  templateUrl: './counter-input-popover.component.html',
  styleUrls: ['./counter-input-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CounterInputPopoverComponent implements OnInit, OnDestroy, CounterInputPopoverComponentInterface {
  quantityControl: FormControl;
  shouldDisableChangeButton$: Observable<boolean> = EMPTY;
  readonly min = 1;

  @Input() quantity: number;
  @Input() subtitle: string;
  @Input() title: string;
  @Input() onChange: (quantity: number) => void = () => {};

  constructor(private readonly fb: FormBuilder, private readonly popoverController: PopoverController) {}

  ngOnInit(): void {
    this.quantityControl = this.fb.control(this.quantity, Validators.min(this.min));
    this.shouldDisableChangeButton$ = this.quantityControl.valueChanges.pipe(
      startWith(this.quantityControl.value),
      map((value) => value === this.quantity || this.quantityControl.invalid),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  handleChange() {
    this.onChange(this.quantityControl.value);
    this.popoverController.dismiss();
  }

  ngOnDestroy(): void {
    this.quantityControl.reset();
  }
}

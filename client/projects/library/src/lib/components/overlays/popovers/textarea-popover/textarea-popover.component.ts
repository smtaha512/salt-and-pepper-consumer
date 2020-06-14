import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { EMPTY, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

export interface TextareaPopoverComponentInterface {
  label: string;
  notes: string;
  onChange: (notes: string) => void;
  placeholder: string;
  subtitle: string;
  title: string;
}

@Component({
  selector: 'lib-textarea-popover',
  templateUrl: './textarea-popover.component.html',
  styleUrls: ['./textarea-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextareaPopoverComponent implements OnInit, OnDestroy, TextareaPopoverComponentInterface {
  notesControl: FormControl;
  shouldDisableChangeButton$: Observable<boolean> = EMPTY;

  @Input() label: string;
  @Input() notes: string;
  @Input() onChange: (notes: string) => void;
  @Input() subtitle: string;
  @Input() title: string;
  @Input() placeholder: string;

  constructor(private readonly fb: FormBuilder, private readonly popoverController: PopoverController) {}

  ngOnInit() {
    this.notesControl = this.fb.control(this.notes);
    this.shouldDisableChangeButton$ = this.notesControl.valueChanges.pipe(
      startWith(this.notesControl.value),
      map((value) => value === this.notes),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }
  closePopover() {
    this.popoverController.dismiss();
  }

  handleChange() {
    this.onChange(this.notesControl.value);
    this.popoverController.dismiss();
  }

  ngOnDestroy(): void {
    this.notesControl.reset();
  }
}

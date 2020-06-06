import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

const DATA_ETA = 'data-eta';

/**
 * @description `data-eta` attribute can not be bound by angular data binding.
 * This directive provides attribute to bind values to `data-eta` attribute
 * @export
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: `[${DATA_ETA}]`,
})
export class DataEtaDirective implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input(`${DATA_ETA}`) dataEta: string;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.el.nativeElement, `${DATA_ETA}`, this.dataEta);
  }
}

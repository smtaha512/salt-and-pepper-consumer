import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'consumer';

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    timer(4000)
      .pipe(
        tap((_) => this.document.querySelector('div').setAttribute('class', 'd-none')),
        mapTo(true)
      )
      .subscribe();
  }
}

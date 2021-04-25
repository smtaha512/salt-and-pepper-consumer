import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { NetworkService } from 'dist/library';
import { pullStateFromStorage } from 'projects/library/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'consumer';
  readonly isConnected$ = this.networkService.networkStatus$.pipe(pluck('connected'));

  constructor(private readonly networkService: NetworkService, private readonly store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(pullStateFromStorage());
  }
}

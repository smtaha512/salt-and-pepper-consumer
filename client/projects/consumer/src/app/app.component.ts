import { Component } from '@angular/core';
import { NetworkService } from 'dist/library';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'consumer';
  readonly isConnected$ = this.networkService.networkStatus$.pipe(pluck('connected'));

  constructor(private readonly networkService: NetworkService) {}
}

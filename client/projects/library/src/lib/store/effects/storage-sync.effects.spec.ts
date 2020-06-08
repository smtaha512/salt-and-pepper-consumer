import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StorageSyncEffects } from './storage-sync.effects';

describe('StorageSyncEffects', () => {
  let actions$: Observable<any>;
  let effects: StorageSyncEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageSyncEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StorageSyncEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

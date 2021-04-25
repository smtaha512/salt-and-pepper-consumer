import { TestBed } from '@angular/core/testing';

import { CounterInputPopoverService } from './counter-input-popover.service';

describe('CounterInputPopoverService', () => {
  let service: CounterInputPopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterInputPopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
